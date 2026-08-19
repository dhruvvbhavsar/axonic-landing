"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import image1 from "@/public/assets/aboutSection/aboutSection1.png";
import image2 from "@/public/assets/aboutSection/aboutSection2.png";
import image3 from "@/public/assets/aboutSection/aboutSection3.png";
import image4 from "@/public/assets/aboutSection/aboutSection4.png";
import image5 from "@/public/assets/aboutSection/aboutSection5.png";

export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image Grid */}

          <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[550px] self-center p-5">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image1}
                alt="Healthcare professional with tablet"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative row-span-2 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image2}
                alt="Healthcare team discussion"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image3}
                alt="Medical consultation"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image4}
                alt="Medical technology"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image5}
                alt="Medical equipment and consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Healthcare Redefined. Outcomes Redesigned.
                </h2>
                <h3 className="text-2xl font-semibold text-gray-800">
                  AxonCare by Axonic
                </h3>
                <div className="w-20 h-1 bg-yellow-500 mt-4"></div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  The current state of healthcare is failing millions. Delays,
                  inaccessibility, cost barriers, and uneven quality claim lives
                  every year. In India alone, over 2.3 million people died in
                  2018 from these failures. Worldwide, the toll climbs to a
                  staggering 5 million. Even advanced healthcare systems like
                  England's report hundreds of preventable deaths weekly due to
                  emergency room delays.
                </p>

                <p>
                  <span className="font-semibold text-gray-900">
                    Axonic is rewriting the rules.
                  </span>{" "}
                  We built a future where intelligent, connected data puts
                  quality care within reach of{" "}
                  <span className="font-semibold">everyone</span>, everywhere.
                  Our service{" "}
                  <span className="font-semibold text-yellow-600">
                    AxonCare
                  </span>
                  , demolishes distance, cost, and complexity. No excuses. No
                  barriers. Just care that finds you.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="https://axoncare.axonichealth.com"
                  target="_blank"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
