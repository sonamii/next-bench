import "@/custom/styles/trustedby.css";

interface Logo {
  name: string;
  logo: string;
  className: string;
}

interface Logos8Props {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
}

const TrustedBy = ({
  title = "Trusted by",
  subtitle = "The world's leading companies",
  logos = [
    {
      name: "Astro",
      logo: "https://shadcnblocks.com/images/block/logos/tailwind-wordmark.svg",
      className: "h-5 w-auto",
    },
    {
      name: "Supabase",
      logo: "https://shadcnblocks.com/images/block/logos/supabase-wordmark.svg",
      className: "h-6 w-auto",
    },
    {
      name: "Figma",
      logo: "https://shadcnblocks.com/images/block/logos/figma-wordmark.svg",
      className: "h-5 w-auto",
    },
    {
      name: "Astro",
      logo: "https://shadcnblocks.com/images/block/logos/astro-wordmark.svg",
      className: "h-6 w-auto",
    },
  ],
}: Logos8Props) => {
  return (
    <section className="trustedby">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="textTop">{title}</h2>
          <p className="textBottom">{subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-12">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.logo}
                alt={`${logo.name} logo`}
                width={109}
                height={48}
                className={logo.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { TrustedBy };
