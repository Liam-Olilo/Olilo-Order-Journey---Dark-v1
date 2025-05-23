"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Zap, X, ArrowRight, Clock } from "lucide-react"

interface SpeedComparisonProps {
  onClose: () => void
}

export default function SpeedComparison({ onClose }: SpeedComparisonProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)

  const speedTiers = [
    {
      name: "900 Mbps",
      color: "#f0cad7",
      downloadTime: {
        photo: "0.01 seconds",
        song: "0.1 seconds",
        movie: "40 seconds",
        game: "7 minutes",
      },
    },
    {
      name: "1.2 Gbps",
      color: "#bcb8d8",
      downloadTime: {
        photo: "< 0.01 seconds",
        song: "0.07 seconds",
        movie: "30 seconds",
        game: "5 minutes",
      },
    },
    {
      name: "2.0 Gbps",
      color: "#bddfef",
      downloadTime: {
        photo: "< 0.01 seconds",
        song: "0.04 seconds",
        movie: "18 seconds",
        game: "3 minutes",
      },
    },
    {
      name: "2.3 Gbps",
      color: "#f6c7b4",
      downloadTime: {
        photo: "< 0.01 seconds",
        song: "0.03 seconds",
        movie: "15 seconds",
        game: "2.5 minutes",
      },
    },
  ]

  const activities = [
    { id: "photo", name: "Photo (5MB)", icon: "📷" },
    { id: "song", name: "Song (30MB)", icon: "🎵" },
    { id: "movie", name: "4K Movie (15GB)", icon: "🎬" },
    { id: "game", name: "Game (100GB)", icon: "🎮" },
  ]

  const getSpeedBarWidth = (speedName: string) => {
    if (speedName === "900 Mbps") return "40%"
    if (speedName === "1.2 Gbps") return "55%"
    if (speedName === "2.0 Gbps") return "85%"
    return "100%"
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-black border border-gray-700 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-5 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-medium text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-[#bddfef]" />
            Speed Comparison
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-800 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-gray-300 mb-6">
            See how our different speed tiers compare and what you can do with each one. Select an activity below to see
            download times across all plans.
          </p>

          {/* Speed visualization */}
          <div className="mb-8">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Download className="h-4 w-4 mr-2 text-[#bddfef]" />
              Speed Comparison
            </h3>
            <div className="space-y-4">
              {speedTiers.map((tier) => (
                <div key={tier.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{tier.name}</span>
                    <span className="text-gray-400">
                      {tier.name === "900 Mbps"
                        ? "900 Mbps"
                        : tier.name === "1.2 Gbps"
                          ? "1,200 Mbps"
                          : tier.name === "2.0 Gbps"
                            ? "2,000 Mbps"
                            : "2,300 Mbps"}
                    </span>
                  </div>
                  <div className="w-full h-6 bg-gray-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: getSpeedBarWidth(tier.name) }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: tier.color }}
                    >
                      <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity selection */}
          <div className="mb-8">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-[#bddfef]" />
              Select an Activity to See Download Times
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => setSelectedActivity(activity.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedActivity === activity.id
                      ? "border-[#bddfef] bg-[#bddfef]/10"
                      : "border-gray-700 hover:border-gray-600 bg-gray-900/50"
                  }`}
                >
                  <div className="text-2xl mb-1">{activity.icon}</div>
                  <div className="text-sm font-medium text-white">{activity.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Download time comparison */}
          {selectedActivity && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h3 className="text-white font-medium mb-3 flex items-center">
                <ArrowRight className="h-4 w-4 mr-2 text-[#bddfef]" />
                Download Times for {activities.find((a) => a.id === selectedActivity)?.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {speedTiers.map((tier) => (
                  <div key={tier.name} className="p-3 rounded-lg border border-gray-700 bg-gray-900/50">
                    <div className="text-sm text-gray-400 mb-1">{tier.name}</div>
                    <div className="text-lg font-bold" style={{ color: tier.color }}>
                      {tier.downloadTime[selectedActivity as keyof typeof tier.downloadTime]}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Real-world examples */}
          <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
            <h3 className="text-white font-medium mb-3">What These Speeds Mean in Real Life</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <span className="font-medium">900 Mbps:</span> Perfect for households with multiple devices streaming HD
                content, browsing, and casual gaming.
              </p>
              <p>
                <span className="font-medium">1.2 Gbps:</span> Ideal for families with heavy streaming needs, including
                4K content on multiple devices and online gaming.
              </p>
              <p>
                <span className="font-medium">2.0 Gbps:</span> Excellent for power users, content creators, and
                households with many connected devices requiring simultaneous high-bandwidth activities.
              </p>
              <p>
                <span className="font-medium">2.3 Gbps:</span> Ultimate performance for professional needs, server
                hosting, live streaming, and the most demanding online activities.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}
