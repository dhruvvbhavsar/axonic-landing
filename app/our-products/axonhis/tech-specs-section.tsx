import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Users, 
  DollarSign, 
  Globe, 
  Activity, 
  BarChart3, 
  Package, 
  Settings,
  Shield,
  Sparkles,
  CheckCircle2
} from "lucide-react"

export function TechSpecsSection() {
  return (
    <section id="tech-specs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 scroll-mt-[120px]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4" />
            Why Choose AxonHIS
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Complete Hospital Management Solution</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to run a modern, efficient hospital from a single unified platform
          </p>
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300">
              <Building2 className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">50+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Integrated Modules</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">100%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Charge Capture</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300">
              <Activity className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">Real-Time</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">BI Dashboards</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-gray-900 mb-1">Multi</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Lingual Support</div>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Unified EMR */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Unified EMR for All Departments</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    ER / OPD / IPD / OT / ICU
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Unified interface for all clinical areas</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Smart triage and bed management</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Seamless patient flow from ER to discharge</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Templates, order sets, and favorites</span>
                </div>
              </div>
            </div>
          </div>

          {/* Automated Billing */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Automated Billing & Revenue Protection</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Zero Revenue Leakage
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Charge capture at point of care</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Real-time billing for all services</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Automated invoice generation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Audit-ready revenue tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* BI & Analytics */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Real-Time BI & MIS Dashboards</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Built-in Analytics
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Occupancy, TAT, and utilization metrics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Role-based dashboards (management, nursing, billing)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Revenue and performance tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Drill-down by department and provider</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostics Integration */}
          <div className="group relative h-full">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl ring-1 ring-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Activity className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Diagnostics Integration</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    End-to-End Workflows
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>LIS, RIS/PACS integration</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Pharmacy, blood bank, CSSD</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>eOrders and auto-posting results</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Complete audit trails</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Asset Management */}
          <Card className="rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Asset & Inventory Management</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Equipment tracking with alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Maintenance scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Stock & expiry monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Reduce loss and downtime</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Multilingual */}
          <Card className="rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multilingual Support</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Patient-facing communications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Staff UI in multiple languages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Consent forms and documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Improve accessibility</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Customization */}
          <Card className="rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Configurable Reports</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Branded discharge summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Custom templates per department</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Invoices and claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>MIS reports</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Clinical Workflow Highlights */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Clinical Workflows</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-200">
              <div className="text-3xl mb-2">🏥</div>
              <div className="font-semibold text-gray-900 text-sm">ER Triage</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-200">
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <div className="font-semibold text-gray-900 text-sm">OPD</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-200">
              <div className="text-3xl mb-2">🛏️</div>
              <div className="font-semibold text-gray-900 text-sm">IPD</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-200">
              <div className="text-3xl mb-2">⚕️</div>
              <div className="font-semibold text-gray-900 text-sm">OT</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-200">
              <div className="text-3xl mb-2">💓</div>
              <div className="font-semibold text-gray-900 text-sm">ICU</div>
            </div>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-10 text-center border border-blue-200">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Standards-Aligned & Secure</h3>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Built with global healthcare compliance at its core
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-2">ABDM</div>
              <div className="text-gray-700 text-sm">India Digital Health</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-2">HIPAA</div>
              <div className="text-gray-700 text-sm">US Compliance</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-2">GDPR</div>
              <div className="text-gray-700 text-sm">EU Data Protection</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-2">SOC 2</div>
              <div className="text-gray-700 text-sm">Security Standards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



