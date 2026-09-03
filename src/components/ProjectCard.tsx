"use client";

import { Column, Flex, Heading, SmartImage, Text } from "@/once-ui/components";
import { TiltCard } from "@/components/TiltCard";

interface ProjectCardProps {
  href: string;
  images: string[];
  title: string;
  description: string;
  content: string;
  avatars: { src: string }[];
  link: string;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  content,
  avatars,
  link,
  priority,
}) => {
  return (
    <TiltCard
      tiltAmount={8}
      glareOpacity={0.12}
      style={{ width: "100%", borderRadius: "16px" }}
    >
      <Column
        fillWidth
        gap="m"
        padding="0"
        style={{
          background: "var(--surface-background)",
          border: "1px solid var(--neutral-alpha-medium)",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "box-shadow 0.4s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 20px 48px rgba(0,0,0,0.15), 0 0 0 1px color-mix(in srgb, var(--brand-background-strong) 10%, transparent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {images.length > 0 && (
          <SmartImage
            priority={priority}
            sizes="(max-width: 960px) 100vw, 50vw"
            src={images[0]}
            alt={title}
            aspectRatio="16 / 9"
            style={{ width: "100%" }}
          />
        )}

        <Column fillWidth gap="8" paddingX="20" paddingY="16">
          <Heading as="h2" variant="heading-strong-xl">
            {title}
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {description}
          </Text>
          {avatars?.length > 0 && (
            <Flex gap="8" vertical="center">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundImage: `url(${avatar.src})`,
                    backgroundSize: "cover",
                    border: "2px solid var(--surface-background)",
                    marginLeft: index > 0 ? "-8px" : "0",
                  }}
                />
              ))}
            </Flex>
          )}
        </Column>
      </Column>
    </TiltCard>
  );
};