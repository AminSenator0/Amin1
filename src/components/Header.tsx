"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { person, about, blog, work, gallery } from "@/app/resources/content";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticWrapper } from "./MagneticWrapper";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding={scrolled ? "4" : "8"}
        horizontal="center"
        data-border="rounded"
        style={{
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          backdropFilter: scrolled
            ? "blur(24px) saturate(180%)"
            : "blur(12px) saturate(140%)",
          background: scrolled
            ? "var(--surface-background-strong, rgba(var(--neutral-background-strong), 0.8))"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--neutral-alpha-medium)"
            : "1px solid transparent",
        }}
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>

        <Flex fillWidth horizontal="center">
          <Flex
            background="surface"
            border="neutral-alpha-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
            style={{
              transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: scrolled ? "scale(0.96)" : "scale(1)",
            }}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes["/"] && (
                <MagneticWrapper strength={0.25}>
                  <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
                </MagneticWrapper>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />

              {routes["/about"] && (
                <>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-hide"
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </MagneticWrapper>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-show"
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </MagneticWrapper>
                </>
              )}

              {routes["/work"] && (
                <>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-hide"
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </MagneticWrapper>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-show"
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </MagneticWrapper>
                </>
              )}

              {routes["/blog"] && (
                <>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-hide"
                      prefixIcon="book"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  </MagneticWrapper>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-show"
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                    />
                  </MagneticWrapper>
                </>
              )}

              {routes["/gallery"] && (
                <>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-hide"
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  </MagneticWrapper>
                  <MagneticWrapper strength={0.25}>
                    <ToggleButton
                      className="s-flex-show"
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  </MagneticWrapper>
                </>
              )}

              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <MagneticWrapper strength={0.3}>
                    <ThemeToggle />
                  </MagneticWrapper>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex hide="s">
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};