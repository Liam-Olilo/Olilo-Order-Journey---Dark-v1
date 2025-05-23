import { ArrowRight, Wifi, Download, Upload, AlertCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    title: "Connection Restored",
    description: "Your internet connection has been restored after a brief outage.",
    time: "2 hours ago",
    icon: <Wifi className="h-4 w-4 text-emerald-500" />,
    iconBg: "bg-emerald-500/20",
  },
  {
    id: 2,
    title: "Speed Boost Activated",
    description: "Your temporary speed boost has been activated for the next 48 hours.",
    time: "5 hours ago",
    icon: <Download className="h-4 w-4 text-[#bddfef]" />,
    iconBg: "bg-[#bddfef]/20",
  },
  {
    id: 3,
    title: "Data Usage Alert",
    description: "You've used 80% of your monthly data allowance.",
    time: "1 day ago",
    icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
    iconBg: "bg-amber-500/20",
  },
  {
    id: 4,
    title: "Upload Speed Optimized",
    description: "Your upload speed has been optimized based on your usage patterns.",
    time: "2 days ago",
    icon: <Upload className="h-4 w-4 text-violet-500" />,
    iconBg: "bg-violet-500/20",
  },
]

export default function RecentActivity() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-[#bddfef] text-sm flex items-center hover:underline">
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${activity.iconBg} mt-1`}>{activity.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium text-white">{activity.title}</h4>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
