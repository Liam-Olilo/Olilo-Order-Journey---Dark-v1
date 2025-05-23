import { Activity, ArrowDown, ArrowUp, Wifi } from "lucide-react"
import DashboardHeader from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import StatsCard from "@/components/dashboard/stats-card"
import UsageChart from "@/components/dashboard/usage-chart"
import RecentActivity from "@/components/dashboard/recent-activity"
import SpeedTest from "@/components/dashboard/speed-test"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatsCard
                  title="Download Speed"
                  value="350 Mbps"
                  change={5}
                  icon={<ArrowDown className="h-5 w-5 text-[#bddfef]" />}
                />
                <StatsCard
                  title="Upload Speed"
                  value="45 Mbps"
                  change={2}
                  icon={<ArrowUp className="h-5 w-5 text-[#bddfef]" />}
                />
                <StatsCard
                  title="Data Used"
                  value="390 GB"
                  change={-8}
                  icon={<Activity className="h-5 w-5 text-[#bddfef]" />}
                />
                <StatsCard
                  title="Connected Devices"
                  value="8 Devices"
                  change={0}
                  icon={<Wifi className="h-5 w-5 text-[#bddfef]" />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <UsageChart />
                </div>
                <div>
                  <SpeedTest />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentActivity />
                <div className="space-y-6">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                        <Wifi className="h-6 w-6 text-[#bddfef] mb-2" />
                        <span className="text-sm text-white">Restart Router</span>
                      </button>
                      <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                        <Activity className="h-6 w-6 text-[#bddfef] mb-2" />
                        <span className="text-sm text-white">Speed Test</span>
                      </button>
                      <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                        <ArrowDown className="h-6 w-6 text-[#bddfef] mb-2" />
                        <span className="text-sm text-white">Download App</span>
                      </button>
                      <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                        <ArrowUp className="h-6 w-6 text-[#bddfef] mb-2" />
                        <span className="text-sm text-white">Upgrade Plan</span>
                      </button>
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
