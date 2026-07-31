"use client";

import type { CSSProperties } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILL_CATEGORIES, SKILLS } from "@/data/constants";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const SkillsSection = () => {
  const { disable3D, ready } = usePerfProfile();
  const showFallbackGrid = ready && disable3D;

  return (
    <>
      <SectionWrapper
        id="skills"
        className={cn(
          "w-full pointer-events-none",
          showFallbackGrid ? "min-h-0 py-8" : "h-screen md:h-[120dvh]"
        )}
      >
        <SectionHeader
          id="skills"
          title="Tech Stack"
          desc={
            showFallbackGrid
              ? "Robotics, AI/ML, digital manufacturing, and automation"
              : "(Press a key on the keyboard)"
          }
        />
        {showFallbackGrid && (
          <ul className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 pointer-events-auto">
            {Object.values(SKILLS).map((skill) => (
              <li
                key={skill.name}
                style={{ "--skill": skill.color } as CSSProperties}
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-5",
                  "border border-border/60 bg-secondary/20 backdrop-blur-sm",
                  "transition-[transform,border-color,background-color,box-shadow] duration-300",
                  "hover:-translate-y-1 hover:border-[var(--skill)] hover:bg-secondary/40"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.icon}
                  alt={skill.label}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="relative size-9 object-contain md:size-11"
                />
                <span className="relative text-center text-xs font-medium md:text-sm">
                  {skill.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </SectionWrapper>

      <SectionWrapper
        id="expertise"
        className="flex flex-col items-center justify-center min-h-[120vh] py-20"
      >
        <div className="w-full max-w-6xl px-4 md:px-8 mx-auto">
          <SectionHeader
            id="expertise"
            title="Skills & Expertise"
            desc="Robotics, AI/ML, digital manufacturing, and automation"
            className="mb-12 md:mb-20 mt-0"
          />
          <div className="flex flex-col gap-10">
            {SKILL_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.3),
                  ease: "easeOut",
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  {category.title}
                </h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {category.items.map((item) => (
                    <li
                      key={`${category.title}-${item.label}`}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border border-border/60 bg-card px-3 py-3",
                        "hover:border-primary/30 transition-colors shadow-sm"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.icon}
                        alt=""
                        width={28}
                        height={28}
                        loading="lazy"
                        className="size-7 object-contain shrink-0"
                      />
                      <span className="text-xs md:text-sm font-medium leading-tight text-foreground">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default SkillsSection;
