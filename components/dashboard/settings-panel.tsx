import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function SettingsPanel() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Settings</h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Notifications</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="email-notifications" className="text-sm text-gray-300">
                Email Notifications
              </label>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="sms-notifications" className="text-sm text-gray-300">
                SMS Notifications
              </label>
              <Switch id="sms-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="app-notifications" className="text-sm text-gray-300">
                App Notifications
              </label>
              <Switch id="app-notifications" defaultChecked />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-800 w-full"></div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Privacy</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="usage-data" className="text-sm text-gray-300">
                Share Usage Data
              </label>
              <Switch id="usage-data" />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="marketing" className="text-sm text-gray-300">
                Marketing Communications
              </label>
              <Switch id="marketing" />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-800 w-full"></div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Security</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="two-factor" className="text-sm text-gray-300">
                Two-Factor Authentication
              </label>
              <Switch id="two-factor" />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="session-timeout" className="text-sm text-gray-300">
                Auto Session Timeout
              </label>
              <Switch id="session-timeout" defaultChecked />
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#bddfef] hover:bg-[#a5c7d7] text-black">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
