import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Video, Zap, Shield, Database, Award, Sparkles, Clock, Target, Globe, Stethoscope, Users, Activity } from "lucide-react"

export function TechSpecsSection() {
  return (
    <section id="tech-specs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 scroll-mt-[120px]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4" />
            Advanced Healthcare Platform Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Technical Specifications</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built with enterprise-grade architecture for unified virtual care, diagnostics, and population health management
          </p>
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Hero Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">72hrs</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Setup Time</div>
            </div>
          </div>

          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">99.9%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Uptime</div>
            </div>
          </div>

          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Video className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">24/7</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Virtual Care</div>
            </div>
          </div>

          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">ABDM</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Ready</div>
            </div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-16">
          {/* Virtual Care Platform */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Video className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Always-On Virtual Care</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    24/7 Availability
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">24/7</div>
                  <div className="text-gray-600 text-sm">Access</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">HD</div>
                  <div className="text-gray-600 text-sm">Video</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">Smart</div>
                  <div className="text-gray-600 text-sm">Triage</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Provide instant video consultations with certified physicians via video consults with smart triage and specialty routing—so patients never wait for help when it matters.
                </p>
              </div>
            </div>
          </div>

          {/* Connected Diagnostics */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Activity className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Connected Diagnostics</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Real-time POCT</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">Minutes</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">TAT Reduction</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">Auto</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">EMR Sync</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">Real-time</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Results</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">Zero</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Manual Entry</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">Walk-in Tests</div>
                <div className="text-gray-700 text-sm">POCT devices with auto-uploaded results</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Unified Health Record */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Database className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Unified Health Record</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Longitudinal Data</Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Complete Patient History</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Lab Results
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      Consult Notes
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      E-Prescriptions
                    </Badge>
                    <Badge className="bg-pink-100 text-pink-800 border-pink-200">
                      Care Plans
                    </Badge>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">Single</div>
                  <div className="text-gray-700">Source of Truth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Population Health Management */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Program & Population Health</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Central Dashboards</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Corporate/Community Programs</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Run health initiatives with screening workflows, cohorts, dashboards, and trend analytics from a single console.
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-900 font-medium">Track Preventive Screenings & Outcomes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Process Section */}
        <div className="mt-16 p-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border border-blue-200">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Quick Setup Process</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">Get up and running with AxonHealthHub in just a few steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-bold text-gray-900 mb-2">Share Profile</h4>
              <p className="text-gray-700 text-sm">Organization profile and program objectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-bold text-gray-900 mb-2">Environment Setup</h4>
              <p className="text-gray-700 text-sm">Provisioning, connector setup within 72 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-bold text-gray-900 mb-2">Go Live</h4>
              <p className="text-gray-700 text-sm">Staff onboarding, device validation, and support</p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-16 p-10 bg-white rounded-3xl border-2 border-blue-200 text-center shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Enterprise-Grade Healthcare Platform</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">Enable continuous, data-driven care for your communities with unparalleled reliability and security</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">ABDM</div>
              <div className="text-gray-700">Fully Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-700">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">72hrs</div>
              <div className="text-gray-700">Quick Setup</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">Cloud</div>
              <div className="text-gray-700">Or On-Premise</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

