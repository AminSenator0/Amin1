"use client";

import Masonry from "react-masonry-css";
import { SmartImage, Flex, Text } from "@/once-ui/components";
import { gallery } from "@/app/resources/content";
import { ParallaxImage } from "@/components/ParallaxImage";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  if (!gallery.images || gallery.images.length === 0) {
    return (
      <Flex horizontal="center" vertical="center" padding="xl">
        <Text onBackground="neutral-weak">No images found in gallery.</Text>
      </Flex>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {gallery.images.map((image, index) => (
          <div
            key={index}
            style={{
              marginBottom: "16px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <ParallaxImage
              src={image.src}
              alt={image.alt}
              aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
              speed={0.1 + (index % 3) * 0.05}
              radius="m"
            />
          </div>
        ))}
      </Masonry>

      <style>{`
        .masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .masonry-grid-column {
          padding-left: 16px;
          background-clip: padding-box;
        }
        @media (max-width: 720px) {
          .masonry-grid {
            margin-left: 0;
          }
          .masonry-grid-column {
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  );
}