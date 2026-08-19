import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Our Customers | Axonic Health",
  description:
    "Meet the healthcare organisations using Axonic Health to deliver more connected, efficient care.",
};

const customers = [
  { name: "Sonoclinic Diagnostic Center - Pimpri", logo: "/assets/customer-logos/customer-01.png" },
  { name: "Aarogya Pathology labs and X-ray", logo: "/assets/customer-logos/customer-02.png" },
  { name: "NAHAR MEDICAL CENTER LLP", logo: "/assets/customer-logos/customer-03.png" },
  { name: "SHRI SHYAM HOSPITAL (A UNIT OF SS NIRAMAYA PVT LTD)", logo: "/assets/customer-logos/customer-04.png" },
  { name: "Gemini Heart & Emergency Care", logo: "/assets/customer-logos/customer-05.png" },
  { name: "RAJRIT HEALTHCARE SERVICES", logo: "/assets/customer-logos/customer-06.png" },
  { name: "WELLNESS LABORATORIES", logo: "/assets/customer-logos/customer-07.jpg" },
  { name: "Bharati Diagnostics", logo: "/assets/customer-logos/customer-08.png" },
  { name: "GURU NANAK MEDICAL FOUNDATION", logo: "/assets/customer-logos/customer-09.png" },
  { name: "Nakoda Bhairav Foundation Charitable Trust", logo: "/assets/customer-logos/customer-10.jpg" },
  { name: "Next Gen Health & Wellness", logo: "/assets/customer-logos/customer-11.png" },
  { name: "Nikhil Hospitals", logo: "/assets/customer-logos/customer-12.jpeg" },
  { name: "SVH SPECIALITY HOSPITAL", logo: "/assets/customer-logos/customer-13.png" },
  { name: "BALAJI HOSPITALS AND DIABETES CENTRE", logo: "/assets/customer-logos/customer-14.jpg" },
  { name: "Orthocare Tezpur Pvt. Ltd.", logo: "/assets/customer-logos/customer-15.jpg" },
  { name: "SHREE SIDDHIVINAYAK NURSING HOME", logo: "/assets/customer-logos/customer-16.png" },
  { name: "NJSM DIAGNOSTICS VEERAYATAN", logo: "/assets/customer-logos/customer-17.png" },
  { name: "INDO US HOSPITAL", logo: "/assets/customer-logos/customer-18.png" },
  { name: "Neo TrueNorth Hospitals", logo: "/assets/customer-logos/customer-19.png" },
  { name: "GLOBAL HOSPITAL", logo: "/assets/customer-logos/customer-20.png" },
  { name: "Privy Wellness Clinic", logo: "/assets/customer-logos/customer-21.png" },
  { name: "FAH Superspeciality Hospitals", logo: "/assets/customer-logos/customer-22.jpeg" },
];

export default function OurCustomersPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Our Customers" />

      <section className="border-b border-gray-200 bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-600">
                Trusted across healthcare
              </p>
              <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                Built alongside the teams delivering better care every day.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-gray-600 lg:justify-self-end">
              From independent clinics to growing hospital networks, healthcare
              teams choose Axonic to simplify operations and create more connected
              patient experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-20" aria-labelledby="customer-list-heading">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 id="customer-list-heading" className="sr-only">
            Customer organisations
          </h2>
          <div className="grid grid-cols-2 border-l border-t border-gray-200 bg-white sm:grid-cols-3 lg:grid-cols-4">
            {customers.map((customer) => (
              <div
                key={customer.name}
                className="group flex min-h-44 flex-col items-center justify-center gap-5 border-b border-r border-gray-200 px-4 py-8 text-center transition-colors duration-300 hover:bg-yellow-50/70"
              >
                <div className="relative flex h-20 w-full items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  <Image
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 220px"
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-semibold leading-5 text-gray-800 sm:text-base">
                  {customer.name}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-gray-500">
            Placeholder company names and logos — ready to be replaced with customer assets.
          </p>
        </div>
      </section>
    </div>
  );
}
