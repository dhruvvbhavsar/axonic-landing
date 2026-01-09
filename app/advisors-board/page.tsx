"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Linkedin, Quote } from "lucide-react";

// Import advisor images
import premJainImg from "@/public/assets/advisors/prem-jain.jpeg";
import bansiRainaImg from "@/public/assets/advisors/bansi-raina.jpg";

export default function AdvisorsBoardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader title="Advisors & Board Members" />

      {/* Intro Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
              Guided by <span className="text-yellow-600">Visionary</span>{" "}
              Leadership
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Axonic Health is privileged to be guided by a distinguished board
              of advisors. These global icons bring unparalleled expertise from
              the heights of Silicon Valley innovation to the frontiers of
              advanced scientific research, ensuring our mission to
              revolutionize healthcare is built on a foundation of excellence.
            </p>
            <div className="w-24 h-1.5 bg-yellow-500 mx-auto mt-10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Prem Jain Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Image Side */}
            <div className="w-full lg:w-5/12 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] aspect-[4/5] transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={premJainImg}
                  alt="Prem Jain"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full -z-0 opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-50 rounded-full -z-0 opacity-70"></div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-7/12">
              <div className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold tracking-widest uppercase mb-4">
                Strategic Advisor
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-2 tracking-tighter">
                Prem Jain
              </h2>
              <p className="text-2xl font-bold text-yellow-600 mb-8">
                Technology Pioneer & Business Leader
              </p>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
                  Prem Jain is a highly accomplished technology entrepreneur and
                  business leader with a distinguished track record of building
                  and scaling global enterprise companies.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  He is the CEO and Founder of Pensando, and has previously
                  founded and led several successful technology ventures,
                  including Crescendo, Nuova Systems, and Insieme Networks.
                  Following these successes, Prem served as a Senior Vice
                  President at Cisco, where he led organizations of over 5,000
                  employees and managed more than $6B in annual revenue,
                  contributing significantly to large-scale growth, operational
                  excellence, and strategic transformation.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  In addition to his corporate leadership, Prem brings deep
                  strategic insight to Axonic Health as an advisor, working
                  closely with the leadership team on long-term vision, market
                  expansion, partnerships, and building enterprise-ready
                  platforms. His experience in scaling complex technology
                  organizations, driving innovation, and aligning product
                  strategy with global market needs provides valuable guidance
                  as Axonic Health expands its intelligent healthcare solutions
                  worldwide.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8">
                <Link
                  href="https://www.linkedin.com/in/prem-jain-b50341/"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </Link>

                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                    Notable Impact
                  </span>
                  <span className="text-sm font-semibold text-slate-700 underline decoration-yellow-500 underline-offset-4">
                    Chairperson of JITO USA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <hr className="border-slate-100" />
      </div>

      {/* Prof. Raina Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            {/* Image Side */}
            <div className="w-full lg:w-5/12 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] aspect-[4/5] transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={bansiRainaImg}
                  alt="Prof. (Dr.) B.L. Raina"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full -z-0 opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-50 rounded-full -z-0 opacity-70"></div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-7/12">
              <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold tracking-widest uppercase mb-4">
                Technical & Academic Advisor
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-2 tracking-tighter">
                Prof. (Dr.) B.L. Raina
              </h2>
              <p className="text-2xl font-bold text-blue-600 mb-8">
                Distinguished Academician & Scientist
              </p>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
                  An M.Tech gold medalist and Ph.D. holder from the USA, Dr.
                  Raina is a distinguished researcher with over 30 years of
                  experience across India and the United States.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  He has served as Vice Chancellor at Starex, Glocal, and
                  Sunrise Universities and Director at GITM Group of Engineering
                  Colleges. Dr. Raina has made pioneering contributions to
                  research in string theory, topology, and astronomy,
                  particularly on Calabi-Yau spaces, aiming to unify general
                  relativity with quantum laws.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  With leadership roles in academia and industry, including as
                  CEO of Divergent Technologies, Inc., USA, and his current
                  deputation with IBM, he has led groundbreaking projects such
                  as transferring high-speed CMOS processes to global companies.
                  His advisory roles in international educational and research
                  organizations highlight his continued impact on academia and
                  technology.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-yellow-500 mb-8">
                <div className="flex gap-4">
                  <Quote className="w-8 h-8 text-yellow-500 shrink-0" />
                  <p className="italic text-slate-700">
                    Recognized in "Who’s Who Asia-Pacific" and awarded the
                    Gandhi Global Award (2022) for excellence in research and
                    technology.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8">
                <Link
                  href="https://www.linkedin.com/in/bansi-raina-2bbb2923/"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </Link>

                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                    Honorary Mention
                  </span>
                  <span className="text-sm font-semibold text-slate-700 underline decoration-blue-500 underline-offset-4">
                    Best Researcher Award (USA)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                A Global Collective of Expertise
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Our advisors are more than just names; they are the architects
                of modern technology and pillars of academic excellence. Their
                collective wisdom guides Axonic Health's product roadmap, global
                scaling strategies, and commitment to scientific rigor.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-yellow-500 mb-1">
                    30+
                  </div>
                  <div className="text-sm text-slate-300 uppercase tracking-widest font-semibold">
                    Years Experience
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500 mb-1">
                    Global
                  </div>
                  <div className="text-sm text-slate-300 uppercase tracking-widest font-semibold">
                    Network
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-1 rounded-3xl">
                <div className="bg-slate-900 rounded-[22px] p-10">
                  <h3 className="text-2xl font-bold mb-6">Join Our Mission</h3>
                  <p className="text-slate-300 mb-8">
                    We are building a healthcare ecosystem that transcends
                    borders. If you share our vision for a healthier world
                    through intelligent technology, we'd love to connect.
                  </p>
                  <Link
                    href="/contact-us"
                    className="block text-center bg-white text-slate-900 py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-white transition-all duration-300"
                  >
                    Partner With Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
