"use client";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { ProductTestimonialsSection } from "@/components/product-testimonials-section";
import HeroYouTubePlayer from "../axonscribe/hero-video";
import {
  Video,
  Activity,
  FileText,
  UserCheck,
  Users,
  Globe,
  Heart,
  Smartphone,
  Bot,
  Home,
} from "lucide-react";

type Feature = { title: string; description: string; image: string };

function OverviewSectionInner({
  product,
  features,
  videoId,
}: {
  product: any;
  features: Feature[];
  videoId: string;
}) {
  return (
    <div id="overview">
      {/* Overview Hero */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-100/40 overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Copy */}
            <div className="space-y-5 lg:col-span-5">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm md:text-base font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Your Personal Smart Health Hub
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                AxonHomeClinic
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-blue-700 mb-2">
                Clinic-grade care at home, connected to doctors 24×7.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                Experience comprehensive healthcare from the comfort of your
                home. With integrated vital monitoring, AI-powered health
                assistance, and instant access to doctors, AxonHomeClinic
                transforms how families manage their health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    const element = document.getElementById("pricing");
                    if (element) {
                      const offsetTop = element.offsetTop - 140;
                      window.scrollTo({ top: offsetTop, behavior: "smooth" });
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200 shadow-lg"
                >
                  Contact Us
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200"
                    >
                      Learn More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Get More Information
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Send us a message and we'll get back to you within 24
                        hours
                      </DialogDescription>
                    </DialogHeader>
                    <ContactForm productName={product.name} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="relative lg:col-span-7">
              <div className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_40%)]" />
              <div className="relative overflow-hidden rounded-3xl border-2 border-gray-200 shadow-xl ring-1 ring-black/5 w-full">
                <HeroYouTubePlayer
                  videoId={videoId}
                  title={`${product.name} Overview Video`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Key Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Complete home healthcare with AI-powered monitoring and 24×7
              doctor access
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Video className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                24×7 Doctor Access
              </h4>
              <p className="text-sm text-gray-600">
                Instant video consultations anytime, day or night
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Activity className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                6+ Vital Parameters
              </h4>
              <p className="text-sm text-gray-600">
                BP, Pulse, Respiratory Rate, Temperature, SpO₂, ECG
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Bot className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                AI Health Assistant
              </h4>
              <p className="text-sm text-gray-600">
                Multilingual AxonDoc™ guides your care pathway
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Why AxonHomeClinic
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Healthcare That Comes Home
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your home into a connected health hub with clinic-grade
              monitoring and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 24/7 Access Card */}
            <div className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="text-6xl font-extrabold text-gray-900 mb-4">
                    24<span className="text-4xl text-blue-600">×7</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Doctor Access
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Instant video consultations with Axoncare Network doctors from
                  home
                </p>
              </div>
            </div>

            {/* Real-time Vitals Card */}
            <div className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-6xl font-extrabold text-gray-900">
                      📊
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Real-time Vitals
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  All vitals synced live to the Axoncare Patient App
                </p>
              </div>
            </div>

            {/* Family Profiles Card */}
            <div className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-6xl font-extrabold text-gray-900">
                      👨‍👩‍👧‍👦
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Multi-Member Profiles
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  One device for the whole family — children to elderly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features - Full-width Zig-Zag */}
      <section
        id="key-features"
        className="py-10 sm:py-12 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-x-hidden scroll-mt-[120px]"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Integrated IoT vital monitoring, AI-powered health assistance,
              24×7 doctor access, remote auscultation, real-time data sync,
              chronic disease management, and multi-member family support.
            </p>
            <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
          </div>
        </div>

        <div className="w-full">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`${isEven ? "bg-gradient-to-br from-blue-50 via-white to-blue-100/60" : "bg-gradient-to-bl from-blue-50 via-white to-blue-100/60"} grid grid-cols-1 md:grid-cols-12 items-stretch`}
              >
                {/* Image (smaller), alternates left/right */}
                <div
                  className={`${isEven ? "order-1" : "order-1 md:order-2"} md:col-span-5 relative`}
                >
                  <div className="relative w-full h-60 sm:h-80 md:h-[448px] lg:h-[512px] xl:h-[576px]">
                    <Image
                      src={feature.image}
                      alt={`${feature.title} - AxonHomeClinic feature showing ${feature.description.substring(0, 80)}...`}
                      fill
                      className="object-contain rounded-none"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Content (larger) */}
                <div
                  className={`${isEven ? "order-2" : "order-2 md:order-1"} md:col-span-7 flex items-center`}
                >
                  <div className="px-6 sm:px-10 lg:px-16 py-10 md:py-16">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Get Started Section */}
      <section
        id="get-started"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden scroll-mt-[120px]"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Get Started in 3 Steps
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Setting up your AxonHomeClinic is quick and easy. Start
              experiencing clinic-grade care at home today.
            </p>
            <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
          </div>

          {/* Row: Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center text-center">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 w-full">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Set Up Family Profile
                </h4>
                <p className="text-sm text-gray-600">
                  Create health profiles for each family member on AxonCare App
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 w-full">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Connect Vital Device
                </h4>
                <p className="text-sm text-gray-600">
                  Pair your vital monitoring device via Bluetooth to AxonCare
                  App
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 w-full">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Start Using AxonHomeClinic
                </h4>
                <p className="text-sm text-gray-600">
                  Connect to doctors 24×7 and let AxonDoc guide your health
                  journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-x-hidden scroll-mt-[120px]"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Pricing
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Contact us for pricing options tailored to individuals, families,
              and real estate developers.
            </p>
            <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Sales Card */}
            <Card className="rounded-3xl border-2 border-blue-400 shadow-2xl relative h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Custom Pricing
                  </h3>
                  <div className="text-4xl font-extrabold text-gray-900 mb-4">
                    Contact Us
                  </div>
                  <p className="text-gray-600 mt-2 mb-6">
                    Pricing tailored to your needs
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-gray-700">
                    <li>✅ 24×7 Access to Doctors from Home</li>
                    <li>✅ AxonDoc™ Multilingual AI Assistant</li>
                    <li>✅ Integrated IoT Vital Monitoring Hub</li>
                    <li>✅ Digital Stethoscope for Remote Auscultation</li>
                    <li>✅ Real-Time Health Data on Axoncare App</li>
                    <li>✅ Chronic Disease Management Support</li>
                    <li>✅ Multi-Member Family Health Profiles</li>
                    <li>✅ Premium Health-First Living Amenity</li>
                  </ul>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">
                      Contact Sales
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Contact Sales Team
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Get in touch for custom pricing and solutions
                      </DialogDescription>
                    </DialogHeader>
                    <ContactForm productName={product.name} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Real Estate Partners Card */}
            <Card className="rounded-3xl border-0 shadow-lg h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    For Real Estate Developers
                  </h3>
                  <p className="text-gray-600 mt-4 mb-6">
                    Transform your projects with health-first living amenities
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Differentiate Your Projects
                        </h4>
                        <p className="text-sm text-gray-600">
                          Stand out with smart healthcare amenities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Justify Premium Pricing
                        </h4>
                        <p className="text-sm text-gray-600">
                          Add value with wellness-focused features
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Future-Ready Communities
                        </h4>
                        <p className="text-sm text-gray-600">
                          Build wellness-focused residential projects
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                      Partner With Us
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Real Estate Partnership
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Get in touch for bulk deployment options
                      </DialogDescription>
                    </DialogHeader>
                    <ContactForm
                      productName={`${product.name} - Real Estate Partnership`}
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 font-medium mb-4">
              Bring clinic-grade healthcare to your home or community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-lg"
                  >
                    Get Started Today
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      Contact Us
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Send us a message and we'll get back to you within 24
                      hours
                    </DialogDescription>
                  </DialogHeader>
                  <ContactForm productName={product.name} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-10 overflow-x-hidden px-4 sm:px-6 lg:px-8">
        <ProductTestimonialsSection
          testimonialUrl={product.testimonialUrl}
          productName={product.name}
          additionalVideos={[]}
        />
      </section>
    </div>
  );
}

export const OverviewSection = React.memo(OverviewSectionInner);
