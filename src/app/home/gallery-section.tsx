import Image from "next/image";

import { SectionBadge } from "@/components/ui/section-badge";
import { GradientText, SectionHeading } from "@/components/ui/section-heading";

const galleryColumns = [
  [
    {
      alt: "Warm bedroom beside a night window",
      className: "h-[434px]",
      src: "/Images/gallery/space-1.png",
    },
    {
      alt: "Guests relaxing in a sauna room",
      className: "h-[217px]",
      src: "/Images/gallery/space-2.png",
    },
  ],
  [
    {
      alt: "Steam and forest view from sauna deck",
      className: "h-[217px]",
      src: "/Images/gallery/space-3.png",
    },
    {
      alt: "Sauna interior facing a lake sunset",
      className: "h-[434px]",
      src: "/Images/gallery/space-4.png",
    },
  ],
  [
    {
      alt: "Outdoor barrel sauna with glowing interior",
      className: "h-[434px]",
      src: "/Images/gallery/space-5.png",
    },
    {
      alt: "Garden barrel sauna entrance",
      className: "h-[217px]",
      src: "/Images/gallery/space-6.png",
    },
  ],
] as const;

export function GallerySection() {
  return (
    <section className="bg-background px-5 pb-[100px] pt-[50px] sm:px-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[62px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionBadge>Gallery</SectionBadge>
          <SectionHeading className="capitalize">
            Explore Our <GradientText>Spaces</GradientText>
          </SectionHeading>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {galleryColumns.map((column, columnIndex) => (
            <div className="flex flex-col gap-8" key={columnIndex}>
              {column.map((image) => (
                <div
                  className={`relative w-full overflow-hidden rounded-2xl bg-foreground ${image.className}`}
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
