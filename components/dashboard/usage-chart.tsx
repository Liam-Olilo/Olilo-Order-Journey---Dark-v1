import { ArrowRight } from "lucide-react"

export default function UsageChart() {
  // Simulated data for the chart
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const usageData = [35, 55, 80, 45, 60, 75, 40]
  const maxUsage = Math.max(...usageData)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Data Usage</h3>
        <button className="text-[#bddfef] text-sm flex items-center hover:underline">
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="h-64">
        <div className="flex h-48 items-end space-x-2">
          {usageData.map((usage, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-[#bddfef]/20 rounded-t-sm relative"
                style={{
                  height: `${(usage / maxUsage) * 100}%`,
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#bddfef] rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${(usage / maxUsage) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-2">{days[index]}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm font-medium text-white">Total Usage</p>
            <p className="text-2xl font-bold text-[#bddfef]">390 GB</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Remaining</p>
            <p className="text-2xl font-bold text-gray-300">610 GB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
