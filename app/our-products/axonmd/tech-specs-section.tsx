import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Shield, Database, WifiOff, Award, Sparkles, Clock, Target, Globe, Stethoscope, Users, Activity, Pill } from "lucide-react"

export function TechSpecsSection() {
  return (
    <section id="tech-specs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 scroll-mt-[120px]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4" />
            Advanced Clinic Management Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Technical Specifications</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built with enterprise-grade architecture for mission-critical clinic management environments
          </p>
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Hero Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">2hrs</div>
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
              <Brain className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">AI</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Voice Assistant</div>
            </div>
          </div>

          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">15+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Languages</div>
            </div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-16">
          {/* AI Architecture */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Voice AI Technology</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Natural Language Processing
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">99%+</div>
                  <div className="text-gray-600 text-sm">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">15+</div>
                  <div className="text-gray-600 text-sm">Languages</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">24/7</div>
                  <div className="text-gray-600 text-sm">Available</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Advanced AI architecture with specialized models for medical terminology, multilingual support, and seamless clinic workflow integration.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Lightning Performance</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Real-time Processing</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">50%</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Time Reduction</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">2x</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Patient Capacity</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">99.9%</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Uptime</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">2hrs</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Setup Time</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">Continuous Operation</div>
                <div className="text-gray-700 text-sm">Designed for 24/7 clinic operations with zero downtime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* EMR Intelligence */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Stethoscope className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart EMR Intelligence</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Clinical Decision Support</Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Smart Automation Features</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Smart Buttons
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      Order Sets
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Smart History
                    </Badge>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">70%</div>
                  <div className="text-gray-700">Faster Documentation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Clinic Management */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Multi-Clinic Management</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scalable Architecture</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Unified Patient Management</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Manage multiple clinic locations from a single dashboard with unified patient records, billing, and reporting across all locations.
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-900 font-medium">Real-time Synchronization</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-16 p-10 bg-blue-50 rounded-3xl border border-blue-200 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Enterprise-Grade Technology</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">Experience the future of clinic management with unparalleled reliability, security, and performance</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-700">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-700">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">2hrs</div>
              <div className="text-gray-700">Quick Setup</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">ABDM</div>
              <div className="text-gray-700">Fully Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}




