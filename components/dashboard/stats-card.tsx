import type React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change >= 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all hover:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">{icon}</div>
      </div>

      <div className="flex items-center mt-4">
        <div className={`flex items-center space-x-1 text-sm ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
          {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
        <span className="text-xs text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  )
}
