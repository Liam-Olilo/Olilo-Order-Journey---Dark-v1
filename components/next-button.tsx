"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface NextButtonProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  isFormValid?: boolean
  className?: string
}

export default function NextButton({
  currentStep,
  totalSteps,
  onNext,
  isFormValid = true,
  className = "",
}: NextButtonProps) {
  // Determine button text based on current step
  const getButtonText = () => {
    switch (currentStep) {
      case 1:
        return "Check Availability"
      case 2:
        return "Select Plan"
      case 3:
        return "Add Extras"
      case 4:
        return "Continue to Details"
      case 5:
        return "Continue to Payment"
      case 6:
        return "Complete Order"
      default:
        return "Next"
    }
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only proceed if the form is valid and user presses Enter (not in a text field)
      if (
        isFormValid &&
        e.key === "Enter" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        document.activeElement?.tagName !== "SELECT"
      ) {
        onNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFormValid, onNext])

  return (
    <Button
      onClick={onNext}
      disabled={!isFormValid}
      className={`
      bg-primary hover:bg-primary/90 text-black font-medium
      px-6 py-3 h-auto text-base transition-all duration-300
      ${!isFormValid ? "opacity-70 cursor-not-allowed" : ""}
      ${className}
    `}
      aria-label={`${getButtonText()}${!isFormValid ? " (Please complete required fields first)" : ""}`}
    >
      {getButtonText()}
      <ChevronRight className="ml-2 h-5 w-5" />
    </Button>
  )
}
