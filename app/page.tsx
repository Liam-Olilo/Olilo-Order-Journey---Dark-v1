"use client"

import { useState, useEffect, useRef } from "react"
import { Package } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import ProgressIndicator from "@/components/progress-indicator"
import NextButton from "@/components/next-button"

// Step components
import PostcodeChecker from "@/components/postcode-checker"
import PlanSelection from "@/components/plan-selection"
import Addons from "@/components/addons"
import OrderSummary from "@/components/order-summary"
import PaymentDetails from "@/components/payment-details"
import OrderConfirmation from "@/components/order-confirmation"
import ConfirmationModal from "@/components/confirmation-modal"
import MobileSim from "@/components/mobile-sim"
import InstallAndPersonalDetails from "@/components/install-and-personal-details"

// Custom hook import for mobile detection
import { useMobile } from "@/hooks/use-mobile"

// Confetti component for order completion celebration
const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<
    Array<{
      x: number
      y: number
      size: number
      color: string
      velocity: { x: number; y: number }
      gravity: number
    }>
  >([])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create particles
    const colors = ["#a5c7d7", "#4a90e2", "#5cb85c", "#f0ad4e", "#d9534f"]
    const newParticles = []

    for (let i = 0; i < 150; i++) {
      newParticles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 15,
          y: (Math.random() - 0.5) * 15,
        },
        gravity: 0.1 + Math.random() * 0.1,
      })
    }

    setParticles(newParticles)

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      setParticles(
        (prevParticles) =>
          prevParticles
            .map((particle) => {
              // Update position
              particle.x += particle.velocity.x
              particle.y += particle.velocity.y

              // Apply gravity
              particle.velocity.y += particle.gravity

              // Draw particle
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
              ctx.fillStyle = particle.color
              ctx.fill()

              // Remove particles that are off-screen
              if (
                particle.x + particle.size < 0 ||
                particle.x - particle.size > canvas.width ||
                particle.y - particle.size > canvas.height
              ) {
                return null
              }

              return particle
            })
            .filter(Boolean) as typeof particles,
      )

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

export default function Home() {
  const { theme } = useTheme()
  const isMobile = useMobile()
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)

  // Add orderData state and updateOrderData function
  const [orderData, setOrderData] = useState({
    postcode: "",
    address: "",
    plan: null,
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    installOption: null,
    addons: [],
    paymentDetails: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
    orderComplete: false,
    orderNumber: "",
    promoDiscount: 0,
  })

  // Function to update order data
  const updateOrderData = (data: any) => {
    setOrderData((prev) => {
      const newData = { ...prev, ...data }

      // Check if navigateToStep is set and update currentStep accordingly
      if (data.navigateToStep !== undefined) {
        setCurrentStep(data.navigateToStep)
        // Remove navigateToStep from the data to avoid storing it
        delete newData.navigateToStep
      }

      return newData
    })
  }

  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setShowConfirmation(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    setOrderComplete(true)
    setShowConfetti(true)

    // Generate a random order number
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    updateOrderData({ orderComplete: true, orderNumber })

    // Hide confetti after 6 seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 6000)
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  // Create a formErrors state for validation
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})

  // Check form validity based on current step
  useEffect(() => {
    // This is a simplified validation check - you would implement more detailed validation
    // based on the requirements of each step
    const checkFormValidity = () => {
      switch (currentStep) {
        case 1: // Address
          return !!orderData.postcode && !!orderData.address
        case 2: // Plan
          return !!orderData.plan
        case 3: // Add-ons (optional)
          return true
        case 4: // Mobile (optional)
          return true
        case 5: // Personal Details
          return (
            !!orderData.personalDetails.firstName &&
            !!orderData.personalDetails.lastName &&
            !!orderData.personalDetails.email &&
            !!orderData.personalDetails.phone &&
            !!orderData.installOption
          )
        case 6: // Payment
          return (
            !!orderData.paymentDetails.cardNumber &&
            !!orderData.paymentDetails.cardholderName &&
            !!orderData.paymentDetails.expiryDate &&
            !!orderData.paymentDetails.cvv
          )
        default:
          return true
      }
    }

    // For demo purposes, we'll just set it to true
    // In a real app, you would implement proper validation
    setIsFormValid(true) // Replace with checkFormValidity() for real validation
  }, [currentStep, orderData])

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        {showConfetti && <Confetti />}
        <div className="pt-32">
          <OrderConfirmation orderData={orderData} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <header className="border-b border-border sticky top-0 z-10 bg-background mt-32">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onBack={handleBack}
              className="flex-1"
            />
            <ThemeToggle className="ml-6" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pt-[50px] pb-32 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
              <div className="border-b border-gray-800/60 px-6 py-4">
                <h1 className="text-xl font-bold text-white">
                  {currentStep === 1 && "Check Availability"}
                  {currentStep === 2 && "Choose Your Plan"}
                  {currentStep === 3 && "Customize Your Package"}
                  {currentStep === 4 && "Add Mobile Services"}
                  {currentStep === 5 && "Your Details"}
                  {currentStep === 6 && "Payment Information"}
                </h1>
              </div>
              <div className="p-6">
                {currentStep === 1 && (
                  <PostcodeChecker orderData={orderData} updateOrderData={updateOrderData} errors={formErrors} />
                )}
                {currentStep === 2 && (
                  <PlanSelection orderData={orderData} updateOrderData={updateOrderData} errors={formErrors} />
                )}
                {currentStep === 3 && <Addons orderData={orderData} updateOrderData={updateOrderData} />}
                {currentStep === 4 && <MobileSim orderData={orderData} updateOrderData={updateOrderData} />}
                {currentStep === 5 && (
                  <InstallAndPersonalDetails
                    orderData={orderData}
                    updateOrderData={updateOrderData}
                    errors={formErrors}
                  />
                )}
                {currentStep === 6 && (
                  <PaymentDetails orderData={orderData} updateOrderData={updateOrderData} errors={formErrors} />
                )}

                <div className="mt-8 pt-6 border-t border-gray-800/40 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="border-gray-700 hover:border-gray-600"
                  >
                    Back
                  </Button>

                  {/* Next Button */}
                  <NextButton
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    onNext={handleNext}
                    isFormValid={isFormValid}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[140px]">
              <div className="bg-black border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-900/30 border-b border-gray-800/60 px-4 py-3">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <Package className="h-4 w-4 mr-2 text-primary/80" />
                    Order Summary
                  </h2>
                </div>
                <div className="p-4">
                  <OrderSummary orderData={orderData} updateOrderData={updateOrderData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-border py-6 pb-24 md:pb-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Olilo Broadband. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className="hover:underline transition-colors duration-300">
                Terms & Conditions
              </a>
              {" • "}
              <a href="#" className="hover:underline transition-colors duration-300">
                Privacy Policy
              </a>
              {" • "}
              <a href="#" className="hover:underline transition-colors duration-300">
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </footer>

      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirm Your Order"
        description="You're about to complete your order. Once confirmed, your payment will be processed and your installation will be scheduled. Would you like to proceed?"
        confirmText="Yes, Complete Order"
        cancelText="Review Order"
      />
    </div>
  )
}
