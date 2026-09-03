import React from "react";
import { Heading, Flex, Column, Text } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { home, newsletter, person, about } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Meta, Schema } from "@/once-ui/modules";
import { HeroSection } from "@/components/hero/HeroSection";
import { VariableFont } from "@/components/VariableFont";
import { StatsCounter } from "@/components/StatsCounter";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  const stats = [
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 99, suffix: "%", label: "Client Satisfaction" },
    { value: 24, suffix: "/7", label: "Support" },
  ];

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: home.title,
          url: `${baseURL}${home.path}`,
          image: `${baseURL}${home.image}`,
        }}
      />

      <HeroSection />

      {/* Stats Section */}
      <Column fillWidth paddingY="xl" gap="24">
        <Heading as="h2" variant="display-strong-s" style={{ textAlign: "center" }}>
          By the Numbers
        </Heading>
        <StatsCounter stats={stats} />
      </Column>

      <Projects range={[1, 1]} />

      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <VariableFont>
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </VariableFont>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}

      <Projects range={[2]} />

      {/* Contact Section */}
      <Column fillWidth paddingY="xl" gap="24" maxWidth="s" horizontal="center">
        <Heading as="h2" variant="display-strong-s" style={{ textAlign: "center" }}>

          Get in Touch
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" style={{ textAlign: "center" }}>
          Have a project in mind or just want to say hi? Drop me a message.
        </Text>
        <ContactForm />
      </Column>

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}