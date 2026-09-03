"use client";

import dynamic from "next/dynamic";
import { Column, Badge, Row, Button, Flex, Avatar, Text, Heading } from "@/once-ui/components";
import { TextScramble } from "./TextScramble";
import { Spotlight } from "./Spotlight";
import { home, about, person } from "@/app/resources/content";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { motion } from "framer-motion";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export function HeroSection() {
  const headlineText =
    typeof home.headline === "string" ? home.headline : "Say Hi";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <ParticleCanvas />
      <Spotlight />

      <Column
        maxWidth="s"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "0 24px",
        }}
      >
        {/* Glassmorphism 2.0 card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            background:
              "color-mix(in srgb, var(--surface-background) 65%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--brand-background-strong) 18%, transparent)",
            borderRadius: "24px",
            padding: "clamp(32px, 5vw, 56px)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
            textAlign: "center",
          }}
        >
          {home.featured && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ marginBottom: "24px" }}
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Heading
              variant="display-strong-l"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1.05,
                marginBottom: "20px",
                display: "block",
              }}
            >
              <TextScramble text={headlineText} delay={0.6} />
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Text
              variant="heading-default-xl"
              onBackground="neutral-weak"
              style={{ marginBottom: "32px", display: "block" }}
            >
              {home.subline}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MagneticWrapper strength={0.3}>
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                arrowIcon
              >
                <Flex gap="8" vertical="center">
                  {about.avatar.display && (
                    <Avatar
                      style={{
                        marginLeft: "-0.75rem",
                        marginRight: "0.25rem",
                      }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Flex>
              </Button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </Column>
    </div>
  );
}