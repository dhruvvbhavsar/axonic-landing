import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Our Customers | Axonic Health",
  description:
    "Meet the healthcare organisations using Axonic Health to deliver more connected, efficient care.",
};

const customers = [
  { name: "Northstar Hospitals", initials: "NH", tone: "bg-blue-950" },
  { name: "Meridian Health", initials: "MH", tone: "bg-emerald-800" },
  { name: "Clearview Clinics", initials: "CC", tone: "bg-sky-700" },
  { name: "Aster Labs", initials: "AL", tone: "bg-violet-800" },
  { name: "Harbour Medical", initials: "HM", tone: "bg-cyan-800" },
  { name: "WellSpring Care", initials: "WC", tone: "bg-teal-700" },
  { name: "Oakline Health", initials: "OH", tone: "bg-stone-800" },
  { name: "Nova Diagnostics", initials: "ND", tone: "bg-indigo-800" },
  { name: "Unity Pharmacy", initials: "UP", tone: "bg-rose-800" },
  { name: "Cedar Medical Group", initials: "CM", tone: "bg-amber-700" },
  { name: "PulsePoint Health", initials: "PH", tone: "bg-red-800" },
  { name: "Evergreen Clinics", initials: "EC", tone: "bg-green-800" },
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
                <div
                  aria-hidden="true"
                  className={`flex size-14 items-center justify-center rounded-xl ${customer.tone} text-sm font-bold tracking-widest text-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1`}
                >
                  {customer.initials}
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
