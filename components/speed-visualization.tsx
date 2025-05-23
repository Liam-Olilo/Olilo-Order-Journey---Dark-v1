"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, Upload, Zap } from "lucide-react"
import { CheckCircle } from "lucide-react"

interface SpeedVisualizationProps {
  downloadSpeed: number
  uploadSpeed: number
  planColor: string
  expanded?: boolean
  className?: string
}

export default function SpeedVisualization({
  downloadSpeed,
  uploadSpeed,
  planColor,
  expanded = false,
  className = "",
}: SpeedVisualizationProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Normalize speeds for visualization (1-5 scale)
  const getSpeedTier = (speed: number): number => {
    if (speed <= 500) return 1
    if (speed <= 1000) return 2
    if (speed <= 1500) return 3
    if (speed <= 2000) return 4
    return 5
  }

  const downloadTier = getSpeedTier(downloadSpeed)
  const uploadTier = getSpeedTier(uploadSpeed)

  // Calculate animation durations based on speed (faster speeds = faster animations)
  const getAnimationDuration = (tier: number): number => {
    const baseDuration = 3
    return baseDuration - tier * 0.4
  }

  const downloadDuration = getAnimationDuration(downloadTier)
  const uploadDuration = getAnimationDuration(uploadTier)

  // Calculate number of particles based on speed tier
  const getParticleCount = (tier: number): number => {
    return tier * 3 + 2
  }

  const downloadParticles = getParticleCount(downloadTier)
  const uploadParticles = getParticleCount(uploadTier)

  // Generate particles for download visualization
  const renderDownloadParticles = () => {
    return Array.from({ length: downloadParticles }).map((_, i) => {
      const delay = (i / downloadParticles) * downloadDuration
      const size = Math.max(3, Math.min(6, downloadTier + 2))

      return (
        <motion.rect
          key={`download-${i}`}
          x="50%"
          y="0%"
          width={size}
          height={size}
          rx={1}
          fill={planColor}
          initial={{ y: "0%", opacity: 0 }}
          animate={{
            y: "100%",
            opacity: [0, 1, 1, 0],
            x: [
              `calc(50% + ${Math.sin(i) * 10}px)`,
              `calc(50% + ${Math.sin(i + 1) * -5}px)`,
              `calc(50% + ${Math.sin(i + 2) * 8}px)`,
              `calc(50% + ${Math.sin(i + 3) * -3}px)`,
            ],
          }}
          transition={{
            duration: downloadDuration,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )
    })
  }

  // Generate particles for upload visualization
  const renderUploadParticles = () => {
    return Array.from({ length: uploadParticles }).map((_, i) => {
      const delay = (i / uploadParticles) * uploadDuration
      const size = Math.max(3, Math.min(6, uploadTier + 2))

      return (
        <motion.rect
          key={`upload-${i}`}
          x="50%"
          y="100%"
          width={size}
          height={size}
          rx={1}
          fill={planColor}
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: "0%",
            opacity: [0, 1, 1, 0],
            x: [
              `calc(50% + ${Math.sin(i) * 10}px)`,
              `calc(50% + ${Math.sin(i + 1) * -5}px)`,
              `calc(50% + ${Math.sin(i + 2) * 8}px)`,
              `calc(50% + ${Math.sin(i + 3) * -3}px)`,
            ],
          }}
          transition={{
            duration: uploadDuration,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )
    })
  }

  // Compact visualization for plan cards
  const renderCompactVisualization = () => (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-16 mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px bg-gray-700/50 relative overflow-hidden">
            {isClient && renderDownloadParticles()}
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-1.5 rounded-full border border-gray-700/50">
          <Download size={14} style={{ color: planColor }} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black p-1.5 rounded-full border border-gray-700/50">
          <Upload size={14} style={{ color: planColor }} />
        </div>
      </div>
      <div className="flex justify-between w-full text-xs text-gray-400">
        <div className="flex flex-col items-center">
          <span className="font-medium text-white">{downloadSpeed}</span>
          <span>Down</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium text-white">{uploadSpeed}</span>
          <span>Up</span>
        </div>
      </div>
    </div>
  )

  // Expanded visualization for detailed view
  const renderExpandedVisualization = () => (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Download Speed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1.5 rounded-full mr-2" style={{ backgroundColor: `${planColor}20` }}>
                <Download size={16} style={{ color: planColor }} />
              </div>
              <h4 className="font-medium text-white">Download Speed</h4>
            </div>
            <div
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${planColor}20`, color: planColor }}
            >
              {downloadTier === 1 && "Basic"}
              {downloadTier === 2 && "Fast"}
              {downloadTier === 3 && "Very Fast"}
              {downloadTier === 4 && "Ultra Fast"}
              {downloadTier === 5 && "Lightning"}
            </div>
          </div>

          <div className="relative h-24 border border-gray-700/30 rounded-lg overflow-hidden bg-black/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-800 relative overflow-hidden">
                {isClient && renderDownloadParticles()}
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold">
              {downloadSpeed} <span className="text-xs font-normal">Mbps</span>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-white">Perfect for:</h5>
            <div className="grid grid-cols-2 gap-2">
              {downloadTier >= 1 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Web browsing
                </div>
              )}
              {downloadTier >= 1 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Email & social media
                </div>
              )}
              {downloadTier >= 2 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  HD streaming
                </div>
              )}
              {downloadTier >= 2 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Video calls
                </div>
              )}
              {downloadTier >= 3 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  4K streaming
                </div>
              )}
              {downloadTier >= 3 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Online gaming
                </div>
              )}
              {downloadTier >= 4 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Multiple 4K streams
                </div>
              )}
              {downloadTier >= 4 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Fast downloads
                </div>
              )}
              {downloadTier >= 5 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  8K streaming
                </div>
              )}
              {downloadTier >= 5 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Professional content creation
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Speed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1.5 rounded-full mr-2" style={{ backgroundColor: `${planColor}20` }}>
                <Upload size={16} style={{ color: planColor }} />
              </div>
              <h4 className="font-medium text-white">Upload Speed</h4>
            </div>
            <div
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${planColor}20`, color: planColor }}
            >
              {uploadTier === 1 && "Basic"}
              {uploadTier === 2 && "Fast"}
              {uploadTier === 3 && "Very Fast"}
              {uploadTier === 4 && "Ultra Fast"}
              {uploadTier === 5 && "Lightning"}
            </div>
          </div>

          <div className="relative h-24 border border-gray-700/30 rounded-lg overflow-hidden bg-black/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-800 relative overflow-hidden">
                {isClient && renderUploadParticles()}
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold">
              {uploadSpeed} <span className="text-xs font-normal">Mbps</span>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-white">Perfect for:</h5>
            <div className="grid grid-cols-2 gap-2">
              {uploadTier >= 1 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Email & social posts
                </div>
              )}
              {uploadTier >= 1 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Basic file sharing
                </div>
              )}
              {uploadTier >= 2 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Video calls
                </div>
              )}
              {uploadTier >= 2 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Photo uploads
                </div>
              )}
              {uploadTier >= 3 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Cloud backups
                </div>
              )}
              {uploadTier >= 3 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  HD video sharing
                </div>
              )}
              {uploadTier >= 4 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Content creation
                </div>
              )}
              {uploadTier >= 4 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Large file transfers
                </div>
              )}
              {uploadTier >= 5 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Live streaming
                </div>
              )}
              {uploadTier >= 5 && (
                <div className="flex items-center text-xs text-gray-300">
                  <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: planColor }} />
                  Server hosting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Download time comparison */}
      <div className="mt-6 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
        <div className="flex items-center mb-3">
          <Zap className="h-4 w-4 mr-2" style={{ color: planColor }} />
          <h4 className="font-medium text-white">Download Time Estimates</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-black/30 rounded-lg border border-gray-700/30">
            <div className="text-xs text-gray-400 mb-1">4K Movie (15GB)</div>
            <div className="font-medium text-white">{Math.ceil((15 * 8 * 1000) / downloadSpeed)} seconds</div>
          </div>

          <div className="p-3 bg-black/30 rounded-lg border border-gray-700/30">
            <div className="text-xs text-gray-400 mb-1">HD Movie (4GB)</div>
            <div className="font-medium text-white">{Math.ceil((4 * 8 * 1000) / downloadSpeed)} seconds</div>
          </div>

          <div className="p-3 bg-black/30 rounded-lg border border-gray-700/30">
            <div className="text-xs text-gray-400 mb-1">Game Update (1GB)</div>
            <div className="font-medium text-white">{Math.ceil((1 * 8 * 1000) / downloadSpeed)} seconds</div>
          </div>

          <div className="p-3 bg-black/30 rounded-lg border border-gray-700/30">
            <div className="text-xs text-gray-400 mb-1">Photo Album (100MB)</div>
            <div className="font-medium text-white">{Math.ceil((0.1 * 8 * 1000) / downloadSpeed)} seconds</div>
          </div>
        </div>
      </div>
    </div>
  )

  return <div className={className}>{expanded ? renderExpandedVisualization() : renderCompactVisualization()}</div>
}
