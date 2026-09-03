"use client";

import { motion } from "framer-motion";
import { Flex, IconButton, Text } from "@/once-ui/components";
import { person, social } from "@/app/resources/content";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
    >
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="space-between"
        vertical="center"
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak">
            / ✨Believe it. Start it. Keep going.
          </Text>
        </Text>
        <Flex gap="16">
          {social.map(
            (item) =>
              item.link && (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.25, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  style={{ position: "relative" }}
                >
                  <IconButton
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      background:
                        "color-mix(in srgb, var(--brand-background-strong) 25%, transparent)",
                      filter: "blur(8px)",
                      zIndex: -1,
                      pointerEvents: "none",
                    }}
                  />
                </motion.div>
              ),
          )}
        </Flex>
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  );
};