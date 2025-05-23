import { Download, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import DashboardHeader from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import AccountInfo from "@/components/dashboard/account-info"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Account</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">First Name</label>
                        <input
                          type="text"
                          defaultValue="Alex"
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Johnson"
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Email Address</label>
                        <input
                          type="email"
                          defaultValue="alex.johnson@example.com"
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="+44 7700 900123"
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <h3 className="text-md font-medium text-white mb-4">Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">Address Line 1</label>
                          <input
                            type="text"
                            defaultValue="123 Broadband Street"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">Address Line 2</label>
                          <input
                            type="text"
                            defaultValue="Apartment 4B"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">City</label>
                          <input
                            type="text"
                            defaultValue="London"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">Postal Code</label>
                          <input
                            type="text"
                            defaultValue="SW1A 1AA"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button className="bg-[#bddfef] hover:bg-[#a5c7d7] text-black">Save Changes</Button>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Security</h2>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Current Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label htmlFor="two-factor" className="text-sm font-medium text-white">
                              Two-Factor Authentication
                            </label>
                            <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button className="bg-[#bddfef] hover:bg-[#a5c7d7] text-black">Update Password</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <AccountInfo />

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="email-notifications" className="text-sm text-white">
                            Email Notifications
                          </label>
                          <p className="text-xs text-gray-400">Receive updates via email</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="sms-notifications" className="text-sm text-white">
                            SMS Notifications
                          </label>
                          <p className="text-xs text-gray-400">Receive updates via text message</p>
                        </div>
                        <Switch id="sms-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label htmlFor="marketing-emails" className="text-sm text-white">
                            Marketing Emails
                          </label>
                          <p className="text-xs text-gray-400">Receive offers and promotions</p>
                        </div>
                        <Switch id="marketing-emails" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                      >
                        <Download className="mr-2 h-4 w-4 text-[#bddfef]" />
                        Download My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-700 text-rose-400 hover:bg-gray-800 hover:text-rose-300"
                      >
                        <Trash className="mr-2 h-4 w-4 text-rose-400" />
                        Delete Account
                      </Button>
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
