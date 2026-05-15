import Image from "next/image";

import { SectionBadge } from "@/components/ui/section-badge";
import { GradientText, SectionHeading } from "@/components/ui/section-heading";

const galleryColumns = [
  [
    {
      alt: "Outdoor landmark sculpture near sauna location",
      className: "h-[430px]",
      src: "/Images/gallery/space-1.png",
    },
    {
      alt: "Guests relaxing in a sauna room",
      className: "h-[216px]",
      src: "/Images/gallery/space-2.png",
    },
  ],
  [
    {
      alt: "Cedar sauna room with heater and towels",
      className: "h-[216px]",
      src: "/Images/gallery/space-3.png",
    },
    {
      alt: "Outdoor landmark sculpture beside stone wall",
      className: "h-[430px]",
      src: "/Images/gallery/space-4.png",
    },
  ],
  [
    {
      alt: "Countryside landscape near sauna location",
      className: "h-[430px]",
      src: "/Images/gallery/space-5.png",
    },
    {
      alt: "Garden barrel sauna entrance",
      className: "h-[216px]",
      src: "/Images/gallery/space-6.png",
    },
  ],
] as const;

export function GallerySection() {
  return (
    <section className="bg-background px-5 pb-[100px] pt-[50px] sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[60px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionBadge>Gallery</SectionBadge>
          <SectionHeading className="capitalize">
            Explore Our <GradientText>Spaces</GradientText>
          </SectionHeading>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
          {galleryColumns.map((column, columnIndex) => (
            <div className="flex flex-col gap-8" key={columnIndex}>
              {column.map((image) => (
                <div
                  className={`relative w-full overflow-hidden rounded-xl bg-foreground ${image.className}`}
                  key={image.src}
                >
                  <Image
                    fill
                    alt={image.alt}
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={image.src}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
