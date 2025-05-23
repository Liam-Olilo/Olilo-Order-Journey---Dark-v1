import { Wifi, WifiOff, SignalLow, SignalMedium, SignalHigh } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NetworkStatus() {
  // Simulated network data
  const networkData = {
    broadband: {
      status: "connected",
      uptime: "15 days, 7 hours",
      devices: 8,
      signalStrength: 95,
    },
    router: {
      name: "Olilo Hub Pro",
      ipAddress: "192.168.1.1",
      macAddress: "00:1A:2B:3C:4D:5E",
      firmwareVersion: "v2.5.3",
    },
  }

  const getSignalIcon = (strength: number) => {
    if (strength >= 80) return <SignalHigh className="h-5 w-5 text-emerald-500" />
    if (strength >= 50) return <SignalMedium className="h-5 w-5 text-amber-500" />
    if (strength > 0) return <SignalLow className="h-5 w-5 text-rose-500" />
    return <WifiOff className="h-5 w-5 text-gray-400" />
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Network Status</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Wifi className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Broadband</p>
              <p className="text-xs text-emerald-500">Connected</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Signal</p>
            <div className="flex items-center justify-end">
              {getSignalIcon(networkData.broadband.signalStrength)}
              <span className="text-sm text-white ml-1">{networkData.broadband.signalStrength}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400">Uptime</p>
            <p className="text-sm text-white">{networkData.broadband.uptime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Connected Devices</p>
            <p className="text-sm text-white">{networkData.broadband.devices} devices</p>
          </div>
        </div>

        <div className="h-px bg-gray-800 w-full"></div>

        <div>
          <h4 className="text-sm font-medium text-white mb-3">Router Information</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-xs text-white">{networkData.router.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">IP Address</p>
              <p className="text-xs text-white">{networkData.router.ipAddress}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">MAC Address</p>
              <p className="text-xs text-white">{networkData.router.macAddress}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">Firmware</p>
              <p className="text-xs text-white">{networkData.router.firmwareVersion}</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
          >
            Restart Router
          </Button>
          <Button className="flex-1 bg-[#bddfef] hover:bg-[#a5c7d7] text-black">Troubleshoot</Button>
        </div>
      </div>
    </div>
  )
}
