"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SKILLS } from "@/data/constants";
import {
  findSkillObject,
  skillFromObjectName,
} from "@/lib/skill-from-object-name";
import { cn, sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";
import { usePerfProfile } from "@/hooks/use-perf-profile";

gsap.registerPlugin(ScrollTrigger);

const KEY_MESH_NAMES = new Set([
  "keycap",
  "keycap-desktop",
  "keycap-mobile",
  "legend",
]);

/** Runtime proxy exposes parentUuid, not parent — see @splinetool/runtime. */
type ObjectWithParentUuid = SPEObject & {
  parentUuid?: string;
};

function buildUuidMap(app: Application): Map<string, ObjectWithParentUuid> {
  const map = new Map<string, ObjectWithParentUuid>();
  for (const obj of app.getAllObjects()) {
    map.set(obj.uuid, obj as ObjectWithParentUuid);
  }
  return map;
}

/**
 * Unhide object and ancestors via .show() + parentUuid walk up to `keyboard`.
 * (.visible = true alone does not requestRender; .parent does not exist on proxy.)
 */
function revealWithParents(
  obj: SPEObject,
  byUuid: Map<string, ObjectWithParentUuid>
) {
  let current: ObjectWithParentUuid | undefined = obj as ObjectWithParentUuid;
  while (current) {
    current.show();
    current.visible = true;
    if (current.name === "keyboard") break;
    const parentUuid = current.parentUuid;
    if (!parentUuid) break;
    current = byUuid.get(parentUuid);
  }
}

/** Raycasts often hit `keycap`/`legend`; walk parents + aliases to find a skill. */
function resolveSkillFromTarget(
  app: Application,
  target: { name: string; id: string }
): Skill | null {
  const direct = skillFromObjectName(target.name);
  if (direct) return direct;

  const byUuid = buildUuidMap(app);
  let current: ObjectWithParentUuid | undefined =
    byUuid.get(target.id) ??
    (app.findObjectById(target.id) as ObjectWithParentUuid | undefined);

  while (current) {
    const skill = skillFromObjectName(current.name);
    if (skill) return skill;
    if (current.name === "keyboard") break;
    const parentUuid = current.parentUuid;
    if (!parentUuid) break;
    current = byUuid.get(parentUuid);
  }
  return null;
}

const KeyboardScene = ({ maxDpr }: { maxDpr: number }) => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const activeSectionRef = useRef<Section>(activeSection);
  activeSectionRef.current = activeSection;

  const bongoAnimationRef = useRef<{ start: () => void; stop: () => void }>(null);
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>(null);

  // Authored local Y for this scene (must NOT settle to hardcoded 0 / 50).
  const restYByUuid = useRef<Map<string, number>>(new Map());
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);

  const captureRestPositions = () => {
    if (!splineApp || restYByUuid.current.size > 0) return;
    for (const obj of splineApp.getAllObjects()) {
      if (obj.name === "keycap" || skillFromObjectName(obj.name)) {
        restYByUuid.current.set(obj.uuid, obj.position.y);
      }
    }
  };

  const restoreRestPositions = () => {
    if (!splineApp) return;
    for (const obj of splineApp.getAllObjects()) {
      const restY = restYByUuid.current.get(obj.uuid);
      if (restY === undefined) continue;
      gsap.killTweensOf(obj.position);
      obj.position.y = restY;
    }
  };

  const forceKeyMeshesVisible = () => {
    if (!splineApp) return;
    const byUuid = buildUuidMap(splineApp);
    for (const obj of splineApp.getAllObjects()) {
      if (KEY_MESH_NAMES.has(obj.name)) revealWithParents(obj, byUuid);
    }
    for (const skill of Object.values(SKILLS)) {
      const group = findSkillObject(splineApp, skill);
      if (group) revealWithParents(group, byUuid);
    }
  };

  // --- Event Handlers ---

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      return;
    }

    const skill = resolveSkillFromTarget(splineApp, e.target);
    if (!skill) return;
    if (selectedSkillRef.current?.name === skill.name) return;

    if (selectedSkillRef.current) playReleaseSound();
    playPressSound();
    // Labels only in Tech Stack; keep ref for sound dedupe outside that section.
    if (activeSectionRef.current === "skills") {
      setSelectedSkill(skill);
    } else {
      setSelectedSkill(null);
    }
    selectedSkillRef.current = skill;
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
    });
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      const skill = resolveSkillFromTarget(splineApp, e.target);
      if (skill) {
        playPressSound();
        selectedSkillRef.current = skill;
        if (activeSectionRef.current === "skills") setSelectedSkill(skill);
        else setSelectedSkill(null);
      }
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    return gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
      },
    });
  };

  const setupScrollAnimations = (): gsap.core.Timeline[] => {
    if (!splineApp || !splineContainer.current) return [];
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return [];

    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    return [
      createSectionTimeline("#skills", "skills", "hero"),
      createSectionTimeline("#expertise", "expertise", "skills"),
      createSectionTimeline("#experience", "experience", "expertise"),
      createSectionTimeline("#education", "education", "experience"),
      createSectionTimeline("#showcase", "showcase", "education", "top 60%"),
      createSectionTimeline("#projects", "projects", "showcase", "top 70%"),
      createSectionTimeline("#contact", "contact", "projects", "top 30%"),
    ].filter(Boolean) as gsap.core.Timeline[];
  };

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent) {
      return { start: () => {}, stop: () => {} };
    }

    let interval: NodeJS.Timeout;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      frame1.visible = true;
      frame2.visible = false;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };

    let floatTweens: gsap.core.Tween[] = [];
    let settleTweens: gsap.core.Tween[] = [];
    let wasFloating = false;
    const killFloat = () => {
      floatTweens.forEach((t) => t.kill());
      floatTweens = [];
    };
    const killSettle = () => {
      settleTweens.forEach((t) => t.kill());
      settleTweens = [];
    };

    const start = () => {
      killSettle();
      killFloat();
      wasFloating = true;
      captureRestPositions();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = findSkillObject(splineApp, skill);
          if (!keycap) return;
          const restY =
            restYByUuid.current.get(keycap.uuid) ?? keycap.position.y;
          floatTweens.push(
            gsap.to(keycap.position, {
              y: restY + Math.random() * 200 + 200,
              duration: Math.random() * 2 + 2,
              delay: idx * 0.6,
              repeat: -1,
              yoyo: true,
              yoyoEase: "none",
              ease: "elastic.out(1,0.3)",
            })
          );
        });
    };

    const stop = () => {
      killFloat();
      killSettle();
      // Only settle after a real contact float — never bury keys on first load.
      if (!wasFloating) return;
      wasFloating = false;
      Object.values(SKILLS).forEach((skill) => {
        const keycap = findSkillObject(splineApp, skill);
        if (!keycap) return;
        const restY =
          restYByUuid.current.get(keycap.uuid) ?? keycap.position.y;
        settleTweens.push(
          gsap.to(keycap.position, {
            y: restY,
            duration: 4,
            ease: "elastic.out(1,0.7)",
          })
        );
      });
    };

    return { start, stop };
  };

  /**
   * Reveal on YOUR skills_keyboard.spline:
   * show keyboard → immediately unhide all key meshes → scale + restY bounce.
   */
  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    captureRestPositions();

    kbd.show();
    setKeyboardRevealed(true);

    const byUuid = buildUuidMap(splineApp);
    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    const shellName = isMobile ? "keycap-mobile" : "keycap-desktop";

    // Immediate full reveal — no staggered awaits that leave shells dark.
    allObjects
      .filter((obj) => obj.name === shellName)
      .forEach((shell) => revealWithParents(shell, byUuid));
    allObjects
      .filter((obj) => obj.name === "legend")
      .forEach((legend) => revealWithParents(legend, byUuid));
    for (const skill of Object.values(SKILLS)) {
      const group = findSkillObject(splineApp, skill);
      if (group) revealWithParents(group, byUuid);
    }
    keycaps.forEach((keycap) => revealWithParents(keycap, byUuid));
    forceKeyMeshesVisible();

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    keycaps.forEach((keycap, idx) => {
      const restY =
        restYByUuid.current.get(keycap.uuid) ?? keycap.position.y;
      gsap.fromTo(
        keycap.position,
        { y: restY + 120 },
        {
          y: restY,
          duration: 0.5,
          delay: 0.1 + idx * 0.02,
          ease: "bounce.out",
        }
      );
    });

    if (process.env.NODE_ENV === "development") {
      const keys = allObjects.filter((o) => KEY_MESH_NAMES.has(o.name));
      const missingSkills = Object.values(SKILLS)
        .filter((s) => !findSkillObject(splineApp, s))
        .map((s) => s.name);
      const skillHits = Object.values(SKILLS).length - missingSkills.length;
      console.info("[keyboard reveal]", {
        keycap: keys.filter((o) => o.name === "keycap").length,
        keycapDesktop: keys.filter((o) => o.name === "keycap-desktop").length,
        keycapMobile: keys.filter((o) => o.name === "keycap-mobile").length,
        legend: keys.filter((o) => o.name === "legend").length,
        skillHits,
        missingSkills,
        visibleTrue: keys.filter((o) => o.visible).length,
        sample: keys.slice(0, 5).map((o) => ({
          name: o.name,
          visible: o.visible,
          parentUuid: (o as ObjectWithParentUuid).parentUuid,
          y: o.position.y,
          scale: { ...o.scale },
        })),
      });
    }

    // Logos stay baked in Spline — no runtime texture swap.

    await sleep(1000);
    forceKeyMeshesVisible();
    restoreRestPositions();
  };

  useEffect(() => {
    setKeyboardRevealed(false);
    restYByUuid.current = new Map();
  }, [splineApp]);

  useEffect(() => {
    if (!splineApp) return;
    captureRestPositions();
    handleSplineInteractions();
    const timelines = setupScrollAnimations();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, [splineApp, isMobile]);

  useEffect(() => {
    if (!splineApp) return;
    for (const name of [
      "text-desktop-dark",
      "text-desktop",
      "text-mobile-dark",
      "text-mobile",
    ]) {
      const obj = splineApp.findObjectByName(name);
      if (obj) obj.visible = false;
    }
  }, [splineApp, activeSection, theme]);

  useEffect(() => {
    if (activeSection !== "skills") {
      setSelectedSkill(null);
      selectedSkillRef.current = null;
    }
  }, [activeSection]);

  useEffect(() => {
    if (!splineApp) return;

    let cancelled = false;
    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true,
      });

      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
    }

    const manageAnimations = async () => {
      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }

      if (
        activeSection === "skills" ||
        activeSection === "showcase" ||
        activeSection === "projects"
      ) {
        forceKeyMeshesVisible();
        restoreRestPositions();
      }

      if (activeSection === "projects") {
        await sleep(300);
        if (cancelled) return;
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        if (cancelled) return;
        bongoAnimationRef.current?.stop();
      }

      if (activeSection === "contact") {
        await sleep(600);
        if (cancelled) return;
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        if (cancelled) return;
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      cancelled = true;
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [activeSection, splineApp]);

  useEffect(() => {
    const hash = activeSection === "hero" ? "" : `#${activeSection}`;
    const url = window.location.pathname + window.location.search + hash;
    window.history.replaceState(window.history.state, "", url);

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [splineApp, isLoading, activeSection]);

  useEffect(() => {
    if (!splineApp) return;
    return capSplinePixelRatio(splineApp, maxDpr);
  }, [splineApp, maxDpr]);

  useEffect(() => {
    if (!splineApp) return;
    const onVisibility = () => {
      if (document.hidden) splineApp.stop();
      else splineApp.play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [splineApp]);

  const showSkillLabel =
    activeSection === "skills" && selectedSkill !== null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        ref={splineContainer}
        className="fixed inset-0 w-full h-full z-0"
      >
        <Spline
          className="w-full h-full"
          onLoad={(app: Application) => {
            setSplineApp(app);
            bypassLoading();
          }}
          scene="/assets/skills_keyboard.spline"
        />
      </div>
      {showSkillLabel && selectedSkill && (
        <div
          className={cn(
            "fixed z-[2] pointer-events-none",
            "left-4 md:left-10 lg:left-16 top-[28%] md:top-[32%] max-w-[min(22rem,42vw)]"
          )}
        >
          <h3
            className={cn(
              "text-3xl md:text-4xl font-bold tracking-tight",
              "text-black dark:text-white"
            )}
          >
            {selectedSkill.label}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm md:text-base leading-relaxed",
              "text-black/80 dark:text-white/80"
            )}
          >
            {selectedSkill.shortDescription}
          </p>
        </div>
      )}
    </Suspense>
  );
};

const AnimatedBackground = () => {
  const { disable3D, maxDpr, ready } = usePerfProfile();
  if (!ready || disable3D) return null;
  return <KeyboardScene maxDpr={maxDpr} />;
};

function capSplinePixelRatio(app: Application, maxDpr: number) {
  const apply = () => {
    try {
      const renderer = (
        app as unknown as { _renderer?: { setPixelRatio?: (n: number) => void } }
      )._renderer;
      if (renderer?.setPixelRatio) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
      }
    } catch {
      /* internal API moved — fail silent, scene still renders */
    }
  };
  apply();
  window.addEventListener("resize", apply, { passive: true });
  return () => window.removeEventListener("resize", apply);
}

export default AnimatedBackground;
