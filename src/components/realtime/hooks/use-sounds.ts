import { useCallback, useEffect, useRef } from "react";

async function fetchAudioBuffer(
  ctx: AudioContext,
  url: string
): Promise<AudioBuffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch sound ${url}: ${response.status}`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    // copy — decodeAudioData may detach the underlying buffer
    return await ctx.decodeAudioData(arrayBuffer.slice(0));
  } catch (error) {
    console.error(`Failed to decode sound ${url}`, error);
    return null;
  }
}

export const useSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const pressBufferRef = useRef<AudioBuffer | null>(null);
  const releaseBufferRef = useRef<AudioBuffer | null>(null);
  const confettiBufferRef = useRef<AudioBuffer | null>(null);
  const unlockedRef = useRef(false);

  const ensureContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new AC();
    }
    return audioContextRef.current;
  }, []);

  /** Sync path when already running — no microtask delay on hover. */
  const getRunningContext = useCallback(() => {
    const ctx = audioContextRef.current;
    if (ctx?.state === "running") return ctx;
    return null;
  }, []);

  const resumeContext = useCallback(async () => {
    const ctx = ensureContext();
    if (!ctx) return null;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        /* ignore — will retry on next gesture */
      }
    }
    unlockedRef.current = ctx.state === "running";
    return ctx.state === "running" ? ctx : null;
  }, [ensureContext]);

  useEffect(() => {
    const ctx = ensureContext();
    if (!ctx) return;

    let cancelled = false;

    const loadSound = async () => {
      // Load press/release first in parallel so hover is ready ASAP.
      const [press, release] = await Promise.all([
        fetchAudioBuffer(ctx, "/assets/keycap-sounds/press.mp3"),
        fetchAudioBuffer(ctx, "/assets/keycap-sounds/release.mp3"),
      ]);
      if (cancelled) return;
      pressBufferRef.current = press;
      releaseBufferRef.current = release;

      const confetti = await fetchAudioBuffer(
        ctx,
        "/assets/sounds/vine-boom.mp3"
      );
      if (!cancelled) confettiBufferRef.current = confetti;
    };

    loadSound();

    // Browsers keep AudioContext suspended until a real user gesture.
    // Unlock early so Spline hover can play synchronously afterward.
    const unlock = () => {
      void resumeContext().then((running) => {
        if (!running) return;
        // Warm the audio graph so the first keycap hit isn't cold-start laggy.
        try {
          const silent = running.createBuffer(1, 1, running.sampleRate);
          const source = running.createBufferSource();
          source.buffer = silent;
          source.connect(running.destination);
          source.start(0);
        } catch {
          /* ignore */
        }
      });
    };
    window.addEventListener("pointerdown", unlock, { capture: true });
    window.addEventListener("keydown", unlock, { capture: true });
    window.addEventListener("touchstart", unlock, { capture: true });

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
      window.removeEventListener("touchstart", unlock, { capture: true });
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, [ensureContext, resumeContext]);

  const playTone = useCallback(
    (startFreq: number, endFreq: number, duration: number, vol: number) => {
      const start = (ctx: AudioContext) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = "sine";
        const startTime = ctx.currentTime;

        oscillator.frequency.setValueAtTime(startFreq, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          endFreq,
          startTime + duration
        );

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(vol, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + duration
        );

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      const running = getRunningContext();
      if (running) {
        start(running);
        return;
      }
      void resumeContext().then((ctx) => {
        if (ctx) start(ctx);
      });
    },
    [getRunningContext, resumeContext]
  );

  const playSoundBuffer = useCallback(
    (buffer: AudioBuffer | null, baseDetune = 0) => {
      if (!buffer) return;

      const start = (ctx: AudioContext) => {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.detune.value = baseDetune + Math.random() * 200 - 100;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.4;

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
      };

      // Fast path: already unlocked — play on this tick (no await lag on hover).
      const running = getRunningContext();
      if (running) {
        start(running);
        return;
      }

      void resumeContext().then((ctx) => {
        if (ctx) start(ctx);
      });
    },
    [getRunningContext, resumeContext]
  );

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef.current);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef.current);
  }, [playSoundBuffer]);

  const playSendSound = useCallback(() => {
    playTone(600, 300, 0.25, 0.08);
  }, [playTone]);

  const playReceiveSound = useCallback(() => {
    playTone(800, 400, 0.35, 0.1);
  }, [playTone]);

  const playConfettiSound = useCallback(
    (intensity: number = 0.5) => {
      const buffer = confettiBufferRef.current;
      if (!buffer) return;

      const start = (ctx: AudioContext) => {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = 1.2 - intensity * 0.4;
        source.detune.value = Math.random() * 100 - 50;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.15 + intensity * 0.5;

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
      };

      const running = getRunningContext();
      if (running) {
        start(running);
        return;
      }
      void resumeContext().then((ctx) => {
        if (ctx) start(ctx);
      });
    },
    [getRunningContext, resumeContext]
  );

  const chargeOscRef = useRef<OscillatorNode | null>(null);
  const chargeGainRef = useRef<GainNode | null>(null);

  const startChargeTone = useCallback(() => {
    if (chargeOscRef.current) return;

    const start = (ctx: AudioContext) => {
      if (chargeOscRef.current) return;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 200;

      const gain = ctx.createGain();
      gain.gain.value = 0;

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      chargeOscRef.current = osc;
      chargeGainRef.current = gain;
    };

    const running = getRunningContext();
    if (running) {
      start(running);
      return;
    }
    void resumeContext().then((ctx) => {
      if (ctx) start(ctx);
    });
  }, [getRunningContext, resumeContext]);

  const updateChargeTone = useCallback((intensity: number) => {
    const osc = chargeOscRef.current;
    const gain = chargeGainRef.current;
    if (!osc || !gain) return;
    osc.frequency.value = 200 + intensity * 600;
    gain.gain.value = intensity * 0.06;
  }, []);

  const stopChargeTone = useCallback(() => {
    try {
      chargeOscRef.current?.stop();
    } catch {
      /* already stopped */
    }
    chargeOscRef.current = null;
    chargeGainRef.current = null;
  }, []);

  return {
    playSendSound,
    playReceiveSound,
    playPressSound,
    playReleaseSound,
    playConfettiSound,
    startChargeTone,
    updateChargeTone,
    stopChargeTone,
  };
};
