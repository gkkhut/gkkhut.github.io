"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import EducationSection from "@/components/sections/education";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main
        className={cn(
          "relative z-10 dark:bg-transparent canvas-overlay-mode"
        )}
      >
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        {/* Empty gap so keyboard stays front-facing before Projects (reference pattern) */}
        <section
          id="showcase"
          aria-hidden
          className="relative min-h-[55vh] md:min-h-[70vh] w-full pointer-events-none"
        />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
