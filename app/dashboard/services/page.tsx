import { Package2, Wifi, Tv, Phone, Plus, Settings } from "lucide-react"
import DashboardHeader from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import ServiceStatus from "@/components/dashboard/service-status"

export default function ServicesPage() {
  // Sample services data
  const services = [
    {
      id: 1,
      name: "Fiber Broadband",
      type: "broadband",
      plan: "Ultra Fast Fiber 1 Gbps",
      status: "active",
      nextBilling: "June 15, 2025",
      price: "£39.99/mo",
      features: ["Download: 1 Gbps", "Upload: 100 Mbps", "Unlimited Data", "Free Router"],
    },
    {
      id: 2,
      name: "Mobile SIM",
      type: "mobile",
      plan: "Unlimited Everything",
      status: "active",
      nextBilling: "June 15, 2025",
      price: "£15.00/mo",
      features: ["Unlimited Data", "Unlimited Calls", "Unlimited Texts", "5G Ready"],
    },
    {
      id: 3,
      name: "TV Streaming",
      type: "tv",
      plan: "Entertainment Bundle",
      status: "active",
      nextBilling: "June 15, 2025",
      price: "£10.00/mo",
      features: ["100+ Channels", "On-Demand Content", "HD Streaming", "Multi-device Support"],
    },
    {
      id: 4,
      name: "VoIP Phone",
      type: "phone",
      plan: "Home Office",
      status: "inactive",
      nextBilling: "Not Active",
      price: "£5.00/mo",
      features: ["Unlimited UK Calls", "Voicemail to Email", "Call Forwarding", "Conference Calling"],
    },
  ]

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "broadband":
        return <Wifi className="h-6 w-6 text-[#bddfef]" />
      case "mobile":
        return <Phone className="h-6 w-6 text-[#bddfef]" />
      case "tv":
        return <Tv className="h-6 w-6 text-[#bddfef]" />
      case "phone":
        return <Phone className="h-6 w-6 text-[#bddfef]" />
      default:
        return <Package2 className="h-6 w-6 text-[#bddfef]" />
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-500"
      case "pending":
        return "bg-amber-500/20 text-amber-500"
      case "inactive":
        return "bg-gray-500/20 text-gray-400"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">My Services</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`bg-gray-900 border rounded-xl p-6 ${
                          service.status === "active" ? "border-gray-800" : "border-gray-800 opacity-75"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center">
                              {getServiceIcon(service.type)}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-white">{service.name}</h3>
                              <p className="text-sm text-gray-400">{service.plan}</p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(service.status)}`}>
                            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-300">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#bddfef] mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                          <div>
                            <p className="text-xs text-gray-400">Next Billing</p>
                            <p className="text-sm text-white">{service.nextBilling}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Price</p>
                            <p className="text-lg font-bold text-white">{service.price}</p>
                          </div>
                        </div>

                        <div className="flex space-x-3 mt-4">
                          <button className="flex-1 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors text-sm text-white">
                            Manage
                          </button>
                          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors">
                            <Settings className="h-5 w-5 text-gray-300" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="bg-gray-900 border border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-600 transition-colors cursor-pointer">
                      <div className="h-12 w-12 rounded-full bg-[#bddfef]/20 flex items-center justify-center mb-3">
                        <Plus className="h-6 w-6 text-[#bddfef]" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-1">Add New Service</h3>
                      <p className="text-sm text-gray-400">Explore our other services and add-ons</p>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Bundle Savings</h2>

                    <div className="p-4 rounded-lg bg-[#bddfef]/10 border border-[#bddfef]/20 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Current Bundle Discount</p>
                          <p className="text-xs text-gray-400">Broadband + Mobile + TV</p>
                        </div>
                        <p className="text-xl font-bold text-[#bddfef]">-£5.00/mo</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center space-x-3">
                          <Package2 className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-white">Add VoIP Phone</p>
                            <p className="text-xs text-gray-400">Additional £5.00/mo</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-emerald-500">Save £2.00/mo</p>
                          <button className="text-xs text-[#bddfef] hover:underline">Add</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center space-x-3">
                          <Wifi className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-white">Upgrade to 2 Gbps</p>
                            <p className="text-xs text-gray-400">Additional £10.00/mo</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-emerald-500">Save £5.00/mo</p>
                          <button className="text-xs text-[#bddfef] hover:underline">Upgrade</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <ServiceStatus />

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Service Recommendations</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Based on your usage patterns, we recommend these services to enhance your experience.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="h-8 w-8 rounded-lg bg-[#bddfef]/20 flex items-center justify-center">
                            <Wifi className="h-4 w-4 text-[#bddfef]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Wi-Fi Extender</p>
                            <p className="text-xs text-gray-400">£5.00/mo or £79.99 one-time</p>
                          </div>
                        </div>
                        <button className="w-full p-2 rounded-lg bg-[#bddfef]/20 hover:bg-[#bddfef]/30 text-xs text-[#bddfef] transition-colors">
                          Learn More
                        </button>
                      </div>

                      <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="h-8 w-8 rounded-lg bg-[#bddfef]/20 flex items-center justify-center">
                            <Package2 className="h-4 w-4 text-[#bddfef]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Security Package</p>
                            <p className="text-xs text-gray-400">£3.99/mo</p>
                          </div>
                        </div>
                        <button className="w-full p-2 rounded-lg bg-[#bddfef]/20 hover:bg-[#bddfef]/30 text-xs text-[#bddfef] transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
