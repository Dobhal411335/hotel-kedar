import { Sunrise, Flame, Mountain, Landmark } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { getCompanyBasicInfo } from "@/services/companyBasicInfo.service";

const features = [
  { icon: Sunrise, label: "Sunrise Mountain View" },
  { icon: Flame, label: "Kedar Maha Aarti" },
  { icon: Mountain, label: "Himalayan hikes" },
  { icon: Landmark, label: "Temple visits" },
];

export async function PhilosophySection() {
  const companyInfo = await getCompanyBasicInfo();
  return (
    <Section spacing="sm" className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-muted">
              Our Philosophy
            </p>
            <h2 className="mt-5 font-heading text-5xl leading-[1.1] text-heading md:text-6xl">
              Mindful travel,{" "}
              <em className="italic text-primary">unhurried</em> by design.
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-base leading-[1.9] text-foreground">
              Nestled in the serene expanse of Sitapur within the Shivalik Himalayan Range, Hotel Kedar Heaven is a sanctuary of peace, comfort, and traditional Garhwal hospitality. Designed for both pilgrims and mountain travelers seeking rejuvenation, the hotel seamlessly blends modern luxury with the raw, untouched beauty of the sacred Kedarnath landscape.
            </p>
            <p className="mt-5 font-body text-base leading-[1.9] text-foreground">
              Step inside to experience an authentic Uttarakhand ambiance characterized by rich wood paneling, antique furnishings, and original artwork. Complemented by high-tech conveniences such as flat-screen TVs and complimentary high-speed Wi-Fi, every detail is crafted for your utmost comfort. Select indoor spaces even feature a mesmerizing starry Swarovski crystal ceiling, bringing the magic of the night sky indoors.
            </p>
            <p className="mt-5 font-body text-base leading-[1.9] text-foreground">
              Wake up to majestic panoramas of endless forests, lush valleys, and snow-capped mountain peaks. Each room features expansive floor-to-ceiling windows and large private terraces or balconies that open up to the magnificent Kedarnath valley, offering front-row seats to unsurpassed natural splendor.
            </p>

            <div className="md:mt-10 mt-5 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.label} className="flex flex-col items-center gap-3 text-center">
                  <feature.icon
                    className="size-6 text-muted"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="font-ui text-xs text-muted">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
