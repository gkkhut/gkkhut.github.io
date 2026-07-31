import { motion } from "motion/react";
import Link from "next/link";
import styles from "./style.module.scss";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeSlider from "@/components/theme/theme-slider";
import { useLenis } from "@/lib/lenis";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useParams();
  const pathname = usePathname();
  const lenis = useLenis();
  const [currentHref, setCurrentHref] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname: path, hash } = window.location;
    setCurrentHref(path + hash);
  }, [params]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsActive(false);

    // Off the homepage, let Next navigate to / or /#section.
    const onHome = pathname === "/" || pathname === "";
    if (!onHome) return;

    const hashIndex = href.indexOf("#");
    const isHomeLink = href === "/" || href === "";

    if (isHomeLink) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { force: true });
      } else {
        window.scrollTo({ top: 0 });
      }
      const url = window.location.pathname + window.location.search;
      window.history.replaceState(window.history.state, "", url);
      setCurrentHref("/");
      return;
    }

    if (hashIndex === -1) return;

    e.preventDefault();
    const hash = href.slice(hashIndex);
    if (lenis) {
      lenis.scrollTo(hash, { force: true });
    } else {
      document.querySelector(hash)?.scrollIntoView();
    }
    const url = window.location.pathname + window.location.search + hash;
    window.history.replaceState(window.history.state, "", url);
    setCurrentHref(window.location.pathname + hash);
  };

  const getChars = (word: string) => {
    let chars: React.JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-end md:flex-row")}>
      <ThemeSlider className="mr-6 mb-4 flex md:hidden" />
      {links.map((link, index) => {
        const { title, href, target } = link;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            className="cursor-can-hover rounded-lg"
            onClick={(e) => handleNavClick(e, href)}
          >
            <motion.p
              className={cn(
                "font-display rounded-lg",
                currentHref !== href ? "text-muted-foreground" : "underline"
              )}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
