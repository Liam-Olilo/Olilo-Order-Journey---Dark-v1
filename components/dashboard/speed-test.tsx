import { ArrowRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SpeedTest() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Speed Test</h3>
        <button className="text-[#bddfef] text-sm flex items-center hover:underline">
          History
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full border-8 border-gray-800 flex items-center justify-center mb-6 relative">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">350</p>
            <p className="text-sm text-gray-400">Mbps</p>
          </div>
          <div className="absolute inset-0 rounded-full border-t-8 border-[#bddfef] rotate-45"></div>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-400">Download</p>
            <p className="text-xl font-bold text-white">350 Mbps</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Upload</p>
            <p className="text-xl font-bold text-white">45 Mbps</p>
          </div>
        </div>

        <Button className="w-full bg-[#bddfef] hover:bg-[#a5c7d7] text-black">
          <Activity className="mr-2 h-4 w-4" />
          Run Speed Test
        </Button>
      </div>
    </div>
  )
}
