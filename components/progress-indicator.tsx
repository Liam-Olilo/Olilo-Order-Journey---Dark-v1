"use client"

import { motion } from "framer-motion"
import { Check, ChevronLeft, CreditCard, HomeIcon, Package, Smartphone, User, Wifi } from "lucide-react"
import { useEffect, useState } from "react"
import useMobile from "@/hooks/use-mobile"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  className?: string
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  className = "",
}: ProgressIndicatorProps) {
  const isMobile = useMobile()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(Math.min(100, (currentStep / totalSteps) * 100))
  }, [currentStep, totalSteps])

  const getStepIcon = (step: number, isCurrentStep: boolean, isCompleted: boolean) => {
    const iconClass = isCurrentStep || isCompleted ? "text-black" : "text-white"

    switch (step) {
      case 1:
        return <HomeIcon className={`h-4 w-4 ${iconClass}`} />
      case 2:
        return <Wifi className={`h-4 w-4 ${iconClass}`} />
      case 3:
        return <Package className={`h-4 w-4 ${iconClass}`} />
      case 4:
        return <Smartphone className={`h-4 w-4 ${iconClass}`} />
      case 5:
        return <User className={`h-4 w-4 ${iconClass}`} />
      case 6:
        return <CreditCard className={`h-4 w-4 ${iconClass}`} />
      default:
        return <HomeIcon className={`h-4 w-4 ${iconClass}`} />
    }
  }

  const getStepName = (step: number) => {
    switch (step) {
      case 1:
        return "Address"
      case 2:
        return "Plan"
      case 3:
        return "Add-ons"
      case 4:
        return "Mobile"
      case 5:
        return "Details"
      case 6:
        return "Payment"
      default:
        return ""
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Progress Indicator */}
      <div className="hidden md:block">
        <div className="flex-1 relative">
          <div className="flex justify-between items-center relative max-w-4xl mx-auto px-8">
            {/* Progress line container */}
            <div className="absolute top-[14px] left-0 right-0 z-0 px-8">
              {/* Background progress line */}
              <div className="h-[3px] w-full bg-gray-800/40 rounded-full"></div>

              {/* Filled progress line that grows based on current step */}
              <motion.div
                className="absolute top-0 left-0 h-[3px] bg-primary/80 rounded-full"
                initial={{ width: `${Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100)}%` }}
                animate={{ width: `${Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              ></motion.div>
            </div>

            {/* Step indicators */}
            {Array.from({ length: totalSteps }).map((_, i) => {
              const stepNumber = i + 1
              const isCompleted = stepNumber < currentStep
              const isCurrent = stepNumber === currentStep
              const isClickable = isCompleted || isCurrent

              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center relative z-20"
                  role="button"
                  tabIndex={isClickable ? 0 : -1}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`${getStepName(stepNumber)} ${
                    isCompleted ? "(completed)" : isCurrent ? "(current)" : "(upcoming)"
                  }`}
                  onClick={() => isCompleted && onBack()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <motion.div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 
                      ${isClickable ? "cursor-pointer" : "cursor-default"}
                      ${
                        isCurrent
                          ? "bg-primary border-2 border-primary/90 text-white shadow-md ring-2 ring-primary/20"
                          : isCompleted
                            ? "bg-primary/90 border border-primary/80 text-white shadow-sm"
                            : "bg-black border border-gray-700/60 text-gray-500/90 shadow-sm"
                      }
                      ${isCompleted && !isCurrent ? "hover:ring-2 hover:ring-primary/30 hover:scale-105" : ""}
                    `}
                    whileHover={isCompleted ? { scale: 1.1 } : {}}
                    whileTap={isCompleted ? { scale: 0.95 } : {}}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5 text-black transition-transform duration-200" />
                    ) : (
                      <motion.span
                        className="transition-transform duration-200"
                        animate={{ scale: isCurrent ? 1 : 0.9 }}
                      >
                        {getStepIcon(stepNumber, isCurrent, isCompleted)}
                      </motion.span>
                    )}
                  </motion.div>
                  <motion.span
                    className={`
                      text-xs mt-1.5 font-medium transition-all duration-300
                      ${isCurrent ? "text-primary font-semibold" : isCompleted ? "text-primary/70" : "text-gray-500/70"}
                    `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + 0.1 * i }}
                  >
                    {getStepName(stepNumber)}
                  </motion.span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress Indicator - Simplified to just show progress */}
      <div className="fixed top-[80px] left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-2 flex justify-between items-center md:hidden z-50">
        <div className="flex-1 px-3">
          <div className="flex items-center justify-between mb-1.5">
            <button
              onClick={onBack}
              disabled={currentStep === 1}
              className={`flex items-center justify-center p-1 rounded-md ${
                currentStep === 1 ? "text-gray-600 cursor-not-allowed" : "text-gray-300 hover:text-white"
              }`}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
              <span className="text-xs ml-1">Back</span>
            </button>

            <span className="text-xs text-white font-medium">
              Step {currentStep}: {getStepName(currentStep)}
            </span>

            <span className="text-xs text-gray-400">
              {currentStep}/{totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
