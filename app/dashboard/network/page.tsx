import { Activity, Wifi, Signal, RefreshCw, Zap, Laptop, Smartphone, Tv, Router } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import NetworkStatus from "@/components/dashboard/network-status"
import SpeedTest from "@/components/dashboard/speed-test"

export default function NetworkPage() {
  // Sample connected devices data
  const connectedDevices = [
    {
      id: 1,
      name: "MacBook Pro",
      type: "laptop",
      ipAddress: "192.168.1.2",
      connection: "5GHz",
      lastActive: "Now",
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      type: "smartphone",
      ipAddress: "192.168.1.3",
      connection: "5GHz",
      lastActive: "Now",
    },
    {
      id: 3,
      name: "Living Room TV",
      type: "tv",
      ipAddress: "192.168.1.4",
      connection: "5GHz",
      lastActive: "5 minutes ago",
    },
    {
      id: 4,
      name: "iPad Air",
      type: "tablet",
      ipAddress: "192.168.1.5",
      connection: "5GHz",
      lastActive: "15 minutes ago",
    },
    {
      id: 5,
      name: "Echo Dot",
      type: "smart-speaker",
      ipAddress: "192.168.1.6",
      connection: "2.4GHz",
      lastActive: "Now",
    },
    {
      id: 6,
      name: "Nest Thermostat",
      type: "smart-home",
      ipAddress: "192.168.1.7",
      connection: "2.4GHz",
      lastActive: "10 minutes ago",
    },
  ]

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return <Laptop className="h-5 w-5 text-[#bddfef]" />
      case "smartphone":
        return <Smartphone className="h-5 w-5 text-[#bddfef]" />
      case "tv":
        return <Tv className="h-5 w-5 text-[#bddfef]" />
      case "tablet":
        return <Laptop className="h-5 w-5 text-[#bddfef]" />
      case "smart-speaker":
        return <Zap className="h-5 w-5 text-[#bddfef]" />
      case "smart-home":
        return <Zap className="h-5 w-5 text-[#bddfef]" />
      default:
        return <Laptop className="h-5 w-5 text-[#bddfef]" />
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
              <h1 className="text-2xl font-bold mb-6">Network</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-white">Connected Devices</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {connectedDevices.map((device) => (
                        <div
                          key={device.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center">
                              {getDeviceIcon(device.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{device.name}</p>
                              <p className="text-xs text-gray-400">{device.ipAddress}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end mb-1">
                              <Signal className="h-3 w-3 text-[#bddfef] mr-1" />
                              <span className="text-xs text-gray-300">{device.connection}</span>
                            </div>
                            <p className="text-xs text-gray-400">{device.lastActive}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Network Optimization</h2>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Wifi className="h-5 w-5 text-[#bddfef]" />
                            <p className="text-sm font-medium text-white">Wi-Fi Channel</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
                            Optimized
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">
                          Your router is using the optimal Wi-Fi channel with minimal interference.
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400">Current Channel</p>
                            <p className="text-sm text-white">Channel 11 (2.4GHz) / Channel 149 (5GHz)</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                          >
                            Scan
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Activity className="h-5 w-5 text-[#bddfef]" />
                            <p className="text-sm font-medium text-white">Quality of Service</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-500">
                            Needs Attention
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">
                          Optimize your network for video streaming, gaming, or work applications.
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400">Current Profile</p>
                            <p className="text-sm text-white">Standard (No prioritization)</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                          >
                            Configure
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Router className="h-5 w-5 text-[#bddfef]" />
                            <p className="text-sm font-medium text-white">Firmware</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
                            Up to Date
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">
                          Your router firmware is up to date with the latest security patches.
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400">Current Version</p>
                            <p className="text-sm text-white">v2.5.3 (Released: May 1, 2025)</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                          >
                            Check
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <NetworkStatus />
                  <SpeedTest />

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Network Tips</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="h-6 w-6 rounded-full bg-[#bddfef]/20 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-[#bddfef]">1</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Place your router in a central location for better coverage
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="h-6 w-6 rounded-full bg-[#bddfef]/20 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-[#bddfef]">2</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Keep your router away from other electronic devices to reduce interference
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="h-6 w-6 rounded-full bg-[#bddfef]/20 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-[#bddfef]">3</span>
                        </div>
                        <p className="text-sm text-gray-300">Use 5GHz for faster speeds when close to the router</p>
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
