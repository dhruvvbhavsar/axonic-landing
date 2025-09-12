import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Shield, Database, WifiOff, Award, Sparkles, Clock, Target, Globe } from "lucide-react"

export function TechSpecsSection() {
  return (
    <section id="tech-specs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-yellow-50/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-yellow-200">
            <Sparkles className="w-4 h-4" />
            Advanced AI Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Tech Specifications</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Engineered with cutting-edge AI architecture and designed for mission-critical medical environments
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Hero Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">1-2s</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Response Time</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Target className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">95%+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Accuracy</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Brain className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">54</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">AI Models</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200">
              <Globe className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">36</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Specialties</div>
            </div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-16">
          {/* AI Architecture */}
          <div className="group relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Proprietary AI Architecture</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Small Language Models
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">10M+</div>
                  <div className="text-gray-600 text-sm">Tokens</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">36</div>
                  <div className="text-gray-600 text-sm">Specialties</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-gray-900">54</div>
                  <div className="text-gray-600 text-sm">Models</div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Advanced ensemble of specialized models working seamlessly together for comprehensive medical documentation across all specialties.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="group relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Lightning Performance</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Real-time Processing</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">1-2s</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Latency</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">1500</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Tokens/sec</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">95.1%</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Complete</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">94.7%</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">Accurate</div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">90+ Minutes</div>
                <div className="text-gray-700 text-sm">Continuous Operation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Medical Intelligence */}
          <div className="group relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Database className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Global Medical Intelligence</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Worldwide Standards</Badge>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Medical Coding Standards</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      US Standards
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      UK (CCSD)
                    </Badge>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">2.2L</div>
                  <div className="text-gray-700">Indian Generic & Brand Database</div>
                </div>
              </div>
            </div>
          </div>

          {/* Offline Reliability */}
          <div className="group relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <WifiOff className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Bulletproof Reliability</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Zero Data Loss</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Multi-Layer Protection</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Advanced fail-safe architecture ensures your audio data is preserved even during network interruptions or connectivity issues.
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <Shield className="w-6 h-6 text-yellow-600" />
                  <span className="text-gray-900 font-medium">Guaranteed Data Integrity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-16 p-10 bg-yellow-50 rounded-3xl border border-yellow-200 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Industry-Leading Technology</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">Experience the future of medical documentation with unparalleled speed, accuracy, and reliability</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">Sub-2s</div>
              <div className="text-gray-700">Lightning Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">95%+</div>
              <div className="text-gray-700">Medical Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-700">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



