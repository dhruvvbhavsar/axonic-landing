import Image from "next/image";

const certifications = [
  { src: "/abdm/abdm.png", label: "ABDM compliant", className: "scale-[1.28]" },
  { src: "/abdm/hippa.png", label: "HIPAA compliant", className: "" },
  { src: "/abdm/gdpr.png", label: "GDPR compliant", className: "" },
  { src: "/abdm/soc-2.png", label: "SOC 2 compliant", className: "" },
  { src: "/abdm/iso.png", label: "ISO 27001 certified", className: "" },
] as const;

interface CertificationBadgesProps {
  size?: "panel" | "showcase";
  className?: string;
}

export function CertificationBadges({ size = "panel", className = "" }: CertificationBadgesProps) {
  if (size === "panel") {
    return (
      <div className={`flex items-center rounded-2xl bg-transparent px-3 py-1.5 ${className}`} aria-label="Security and compliance certifications">
        <div className="flex items-center gap-2 sm:gap-3">
          {certifications.map((certification) => (
            <div key={certification.src} className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-transparent p-0 sm:size-14">
              <Image src={certification.src} alt={certification.label} width={80} height={80} className={`h-full w-full object-contain ${certification.className}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-end gap-2 sm:gap-3 ${className}`} aria-label="Security and compliance certifications">
      {certifications.map((certification) => (
        <Image
          key={certification.src}
          src={certification.src}
          alt={certification.label}
          width={112}
          height={112}
          className={`size-24 object-contain sm:size-32 lg:size-40 ${certification.className}`}
        />
      ))}
    </div>
  );
}
