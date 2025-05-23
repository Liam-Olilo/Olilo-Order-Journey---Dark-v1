import { Wifi, Lock, Bell, Globe, Monitor, Moon, Sun, Smartphone, Laptop, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import DashboardHeader from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import SettingsPanel from "@/components/dashboard/settings-panel"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Settings</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Router Settings</h2>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center">
                            <Wifi className="h-5 w-5 text-[#bddfef]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Wi-Fi Settings</p>
                            <p className="text-xs text-gray-400">Manage your wireless network</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                        >
                          Configure
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center">
                            <Lock className="h-5 w-5 text-[#bddfef]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Security</p>
                            <p className="text-xs text-gray-400">Firewall and network protection</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                        >
                          Configure
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-[#bddfef]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">DNS Settings</p>
                            <p className="text-xs text-gray-400">Configure domain name servers</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Appearance</h2>

                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-medium text-white mb-3">Theme</p>
                        <div className="grid grid-cols-3 gap-3">
                          <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                            <Sun className="h-6 w-6 text-[#bddfef] mb-2" />
                            <span className="text-sm text-white">Light</span>
                          </button>
                          <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-[#bddfef] transition-colors flex flex-col items-center justify-center">
                            <Moon className="h-6 w-6 text-[#bddfef] mb-2" />
                            <span className="text-sm text-white">Dark</span>
                          </button>
                          <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                            <Monitor className="h-6 w-6 text-[#bddfef] mb-2" />
                            <span className="text-sm text-white">System</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white mb-3">Accent Color</p>
                        <div className="flex space-x-3">
                          <button className="h-8 w-8 rounded-full bg-[#bddfef] ring-2 ring-white"></button>
                          <button className="h-8 w-8 rounded-full bg-emerald-500"></button>
                          <button className="h-8 w-8 rounded-full bg-violet-500"></button>
                          <button className="h-8 w-8 rounded-full bg-rose-500"></button>
                          <button className="h-8 w-8 rounded-full bg-amber-500"></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Devices</h2>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center">
                              <Laptop className="h-5 w-5 text-[#bddfef]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">MacBook Pro</p>
                              <p className="text-xs text-gray-400">Last active: Now</p>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
                            Current Device
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          <p>Browser: Chrome 112.0.5615.49</p>
                          <p>OS: macOS 13.3.1</p>
                          <p>IP: 192.168.1.2</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center">
                              <Smartphone className="h-5 w-5 text-[#bddfef]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">iPhone 15 Pro</p>
                              <p className="text-xs text-gray-400">Last active: 2 hours ago</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                          >
                            Revoke
                          </Button>
                        </div>
                        <div className="text-xs text-gray-400">
                          <p>App: Olilo Mobile 2.3.0</p>
                          <p>OS: iOS 17.4.1</p>
                          <p>IP: 192.168.1.3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <SettingsPanel />

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-[#bddfef]" />
                          <p className="text-sm text-white">Push Notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-[#bddfef]" />
                          <p className="text-sm text-white">Email Alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-[#bddfef]" />
                          <p className="text-sm text-white">SMS Alerts</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#bddfef]/10 border border-[#bddfef]/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-[#bddfef]/20 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-[#bddfef]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Mobile App</h3>
                        <p className="text-sm text-gray-400">Manage on the go</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Download our mobile app to manage your account, check usage, and control your services from
                      anywhere.
                    </p>
                    <Button className="w-full bg-[#bddfef] hover:bg-[#a5c7d7] text-black">Download App</Button>
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
