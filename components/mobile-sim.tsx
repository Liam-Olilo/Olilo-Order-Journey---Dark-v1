"use client"

import type React from "react"

import { useEffect } from "react"

import { useState } from "react"
import {
  Check,
  Smartphone,
  Signal,
  Phone,
  MessageSquare,
  CheckCircle,
  Info,
  Minus,
  Tag,
  Cpu,
  AlertCircle,
  Search,
  MousePointer,
  Hand,
  ChevronDown,
  Loader2,
  Shield,
  ArrowLeft,
  CheckCheck,
  X,
  RefreshCw,
  Maximize2,
  Users,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
// Tooltip removed as requested
import {
  AppleLogo,
  SamsungLogo,
  GoogleLogo,
  OnePlusLogo,
  SonyLogo,
  XiaomiLogo,
  MotorolaLogo,
  NothingLogo,
  OtherLogo,
} from "@/components/manufacturer-logos"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface MobileSimProps {
  orderData: any
  updateOrderData: (data: any) => void
}

// Common device manufacturers with their models
const commonDevices = [
  {
    name: "Apple",
    icon: <AppleLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "iPhone 15 Pro", compatible: true },
      { name: "iPhone 15", compatible: true },
      { name: "iPhone 14 Pro", compatible: true },
      { name: "iPhone 14", compatible: true },
      { name: "iPhone 13", compatible: true },
      { name: "iPhone 12", compatible: true },
      { name: "iPhone 11", compatible: true },
      { name: "iPhone SE (2022)", compatible: true },
      { name: "iPhone XS", compatible: true },
      { name: "iPhone XR", compatible: true },
      { name: "iPhone X", compatible: false },
      { name: "iPhone 8", compatible: false },
    ],
  },
  {
    name: "Samsung",
    icon: <SamsungLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "Galaxy S23 Ultra", compatible: true },
      { name: "Galaxy S23", compatible: true },
      { name: "Galaxy S22", compatible: true },
      { name: "Galaxy S21", compatible: true },
      { name: "Galaxy S20", compatible: true },
      { name: "Galaxy Z Fold 5", compatible: true },
      { name: "Galaxy Z Flip 5", compatible: true },
      { name: "Galaxy Note 20", compatible: true },
      { name: "Galaxy A54", compatible: true },
      { name: "Galaxy A53", compatible: true },
      { name: "Galaxy S10", compatible: false },
      { name: "Galaxy S9", compatible: false },
    ],
  },
  {
    name: "Google",
    icon: <GoogleLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "Pixel 8 Pro", compatible: true },
      { name: "Pixel 8", compatible: true },
      { name: "Pixel 7 Pro", compatible: true },
      { name: "Pixel 7", compatible: true },
      { name: "Pixel 6 Pro", compatible: true },
      { name: "Pixel 6", compatible: true },
      { name: "Pixel 5", compatible: true },
      { name: "Pixel 4a", compatible: true },
      { name: "Pixel 4", compatible: true },
      { name: "Pixel 3", compatible: false },
    ],
  },
  {
    name: "OnePlus",
    icon: <OnePlusLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "OnePlus 11", compatible: true },
      { name: "OnePlus 10 Pro", compatible: true },
      { name: "OnePlus 10T", compatible: true },
      { name: "OnePlus Nord 3", compatible: true },
      { name: "OnePlus Nord 2", compatible: true },
      { name: "OnePlus 9 Pro", compatible: true },
      { name: "OnePlus 9", compatible: true },
      { name: "OnePlus 8T", compatible: false },
    ],
  },
  {
    name: "Sony",
    icon: <SonyLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "Xperia 1 V", compatible: true },
      { name: "Xperia 5 V", compatible: true },
      { name: "Xperia 10 V", compatible: true },
      { name: "Xperia 1 IV", compatible: true },
      { name: "Xperia 5 IV", compatible: true },
      { name: "Xperia 10 IV", compatible: true },
      { name: "Xperia 1 III", compatible: false },
    ],
  },
  {
    name: "Xiaomi",
    icon: <XiaomiLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "Xiaomi 13", compatible: true },
      { name: "Xiaomi 13 Pro", compatible: true },
      { name: "Xiaomi 12", compatible: true },
      { name: "Xiaomi 12 Pro", compatible: true },
      { name: "Redmi Note 12 Pro", compatible: true },
      { name: "Poco F5", compatible: true },
      { name: "Xiaomi 11T", compatible: false },
    ],
  },
  {
    name: "Motorola",
    icon: <MotorolaLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "Edge 40 Pro", compatible: true },
      { name: "Edge 40", compatible: true },
      { name: "Razr 40 Ultra", compatible: true },
      { name: "Razr 40", compatible: true },
      { name: "Moto G84", compatible: true },
      { name: "Moto G73", compatible: true },
      { name: "Edge 30", compatible: false },
    ],
  },
  {
    name: "Nothing",
    icon: <NothingLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "Phone (2)", compatible: true },
      { name: "Phone (1)", compatible: true },
    ],
  },
  {
    name: "Other",
    icon: <OtherLogo className="h-5 w-5 text-black" />,
    models: [
      { name: "Oppo Find X5", compatible: true },
      { name: "Oppo Find X5 Pro", compatible: true },
      { name: "Vivo X90 Pro", compatible: true },
      { name: "Honor Magic5 Pro", compatible: true },
      { name: "Asus Zenfone 10", compatible: true },
      { name: "Asus ROG Phone 7", compatible: true },
    ],
  },
]

// Mobile SIM plans
const mobilePlans = [
  {
    id: 1,
    name: "Standard",
    tagline: "Perfect for everyday mobile usage",
    data: "25GB",
    dataAmount: 25,
    minutes: "Unlimited",
    texts: "Unlimited",
    price: 12.99,
    discountedPrice: 9.99,
    features: [
      "UK Roaming",
      "5G Ready",
      "30-day rolling contract",
      "Keep your number",
      "Tethering included",
      "Data rollover",
      "EU Roaming included",
    ],
    bestFor: ["Medium users", "Streaming", "Remote working"],
    popular: true,
    color: "bg-pink-100",
  },
  {
    id: 2,
    name: "Unlimited",
    tagline: "No limits for power users",
    data: "Unlimited",
    dataAmount: 999,
    minutes: "Unlimited",
    texts: "Unlimited",
    price: 22.99,
    discountedPrice: 17.99,
    features: [
      "UK Roaming",
      "5G Ready",
      "30-day rolling contract",
      "Keep your number",
      "Tethering included",
      "No speed caps",
      "EU Roaming included",
      "Priority customer support",
      "International minutes (60)",
      "Global roaming options",
    ],
    bestFor: ["Power users", "4K streaming", "Hotspot", "International travelers"],
    highlight: "Best Value",
    color: "bg-purple-100",
  },
]

export default function MobileSim({ orderData, updateOrderData }: MobileSimProps) {
  const [selectedPlan, setSelectedPlan] = useState<any>(orderData.mobilePlan || null)
  const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null)
  const [bundleDiscount, setBundleDiscount] = useState<boolean>(true)
  const [simType] = useState<"esim">("esim")
  const [deviceInfo, setDeviceInfo] = useState({
    manufacturer: orderData.mobileSim?.deviceInfo?.manufacturer || "",
    model: orderData.mobileSim?.deviceInfo?.model || "",
    compatible: orderData.mobileSim?.deviceInfo?.compatible || null,
  })
  const [showDeviceForm, setShowDeviceForm] = useState(false)
  const [deviceCompatible, setDeviceCompatible] = useState<boolean | null>(
    orderData.mobileSim?.deviceInfo?.compatible || null,
  )
  const [isMobile, setIsMobile] = useState(false)
  const [isCheckingCompatibility, setIsCheckingCompatibility] = useState(false)
  const [showPaymentBreakdown, setShowPaymentBreakdown] = useState<number | null>(null)

  // New state for the step-by-step compatibility checker
  const [compatibilityStep, setCompatibilityStep] = useState(1)
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [customManufacturer, setCustomManufacturer] = useState("")
  const [customModel, setCustomModel] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCompatibilityResult, setShowCompatibilityResult] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedDetailPlan, setSelectedDetailPlan] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("features")

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Map plan IDs to pastel colors - using exact color codes
  const pastelColors = {
    1: "#f0cad7", // light pink for plan 1
    2: "#bcb8d8", // light purple for plan 2
  }

  const selectPlan = (plan: any) => {
    if (selectedPlan && selectedPlan.id === plan.id) {
      setSelectedPlan(null)
      updateOrderData({ mobilePlan: null, mobileSim: null })
    } else {
      const updatedPlan = {
        ...plan,
        bundleDiscount: bundleDiscount,
        effectivePrice: bundleDiscount ? plan.discountedPrice : plan.price,
      }
      setSelectedPlan(updatedPlan)
      updateOrderData({
        mobilePlan: updatedPlan,
        mobileSim: {
          type: "esim",
          deviceInfo: deviceInfo,
        },
      })
    }
  }

  // Replace the togglePaymentBreakdown function with this updated version
  const togglePaymentBreakdown = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPaymentBreakdown((prev) => (prev === id ? null : id))
  }

  // Replace the renderPaymentBreakdown function with this updated version
  const renderPaymentBreakdown = (plan: any) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full right-0 mb-2 w-64 overflow-hidden rounded-lg bg-gray-900/95 p-4 shadow-xl border border-gray-700/50 backdrop-blur-sm z-20"
    >
      <h4 className="text-white font-medium mb-3">Payment Breakdown</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">Monthly plan fee</span>
          <span className="text-white font-medium">£{plan.price.toFixed(2)}</span>
        </div>
        {plan.bundleDiscount && (
          <div className="flex justify-between">
            <span className="text-gray-300">Bundle discount</span>
            <span className="text-green-400">-£{(plan.price - plan.discountedPrice).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-gray-700">
          <span className="font-medium text-white">Total monthly cost</span>
          <span className="font-medium text-white">
            £{(plan.bundleDiscount ? plan.discountedPrice : plan.price).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  )

  const togglePlanExpansion = (planId: number) => {
    if (expandedPlanId === planId) {
      setExpandedPlanId(null)
    } else {
      setSelectedDetailPlan(mobilePlans.find((plan) => plan.id === planId) || null)
      setShowDetailModal(true)
    }
  }

  const toggleBundleDiscount = () => {
    const newBundleDiscount = !bundleDiscount
    setBundleDiscount(newBundleDiscount)

    // Update the selected plan with the appropriate price
    if (selectedPlan) {
      const updatedPlan = {
        ...selectedPlan,
        bundleDiscount: newBundleDiscount,
        effectivePrice: newBundleDiscount ? selectedPlan.discountedPrice : selectedPlan.price,
      }
      setSelectedPlan(updatedPlan)
      updateOrderData({
        mobilePlan: updatedPlan,
        mobileSim: {
          type: "esim",
          deviceInfo: deviceInfo,
        },
      })
    }
  }

  // Helper function to visualize data amount
  const renderDataBar = (dataAmount: number) => {
    const maxData = 100 // For visualization purposes
    const percentage = Math.min((dataAmount / maxData) * 100, 100)

    return (
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    )
  }

  const selectManufacturer = (manufacturer: string) => {
    setSelectedManufacturer(manufacturer)
    setCompatibilityStep(2)
    setSearchTerm("")
  }

  const selectModel = (model: string, isCompatible: boolean) => {
    setSelectedModel(model)
    setDeviceCompatible(isCompatible)
    setShowCompatibilityResult(true)

    // Update device info
    const updatedDeviceInfo = {
      manufacturer: selectedManufacturer || customManufacturer,
      model: model,
      compatible: isCompatible,
    }

    setDeviceInfo(updatedDeviceInfo)

    // Update order data
    if (selectedPlan) {
      updateOrderData({
        mobilePlan: selectedPlan,
        mobileSim: {
          type: "esim",
          deviceInfo: updatedDeviceInfo,
        },
      })
    }
  }

  const checkCustomDevice = () => {
    setIsCheckingCompatibility(true)

    // Simulate API call for custom device check
    setTimeout(() => {
      // For demo purposes, we'll consider devices with these keywords as compatible
      const compatibleKeywords = [
        "iphone",
        "galaxy",
        "pixel",
        "pro",
        "ultra",
        "fold",
        "flip",
        "edge",
        "oneplus",
        "xperia",
        "nothing",
      ]
      const manufacturer = customManufacturer.toLowerCase()
      const model = customModel.toLowerCase()

      // Check if any compatible keyword is in the model name
      const isCompatible = compatibleKeywords.some(
        (keyword) => manufacturer.includes(keyword) || model.includes(keyword),
      )

      setDeviceCompatible(isCompatible)
      setShowCompatibilityResult(true)
      setIsCheckingCompatibility(false)

      // Update device info
      const updatedDeviceInfo = {
        manufacturer: customManufacturer,
        model: customModel,
        compatible: isCompatible,
      }

      setDeviceInfo(updatedDeviceInfo)

      // Update order data
      if (selectedPlan) {
        updateOrderData({
          mobilePlan: selectedPlan,
          mobileSim: {
            type: "esim",
            deviceInfo: updatedDeviceInfo,
          },
        })
      }
    }, 1500)
  }

  const resetCompatibilityCheck = () => {
    setCompatibilityStep(1)
    setSelectedManufacturer(null)
    setSelectedModel(null)
    setCustomManufacturer("")
    setCustomModel("")
    setSearchTerm("")
    setShowCompatibilityResult(false)
    setDeviceCompatible(null)
  }

  // Helper function to get the color for a plan's header icons (turns black when selected)
  const getHeaderIconColor = (planId: number, isSelected: boolean) => {
    if (isSelected) return "black"
    return planId === 1 ? "#f0cad7" : "#bcb8d8"
  }

  // Filter models based on search term
  const getFilteredModels = (models: any[]) => {
    if (!searchTerm) return models
    return models.filter((model) => model.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // Get manufacturer icon for model selection
  const getManufacturerIcon = (manufacturerName: string) => {
    const manufacturer = commonDevices.find((m) => m.name === manufacturerName)
    return manufacturer ? manufacturer.icon : <OtherLogo className="h-5 w-5 text-black" />
  }

  // Render the compatibility checker steps
  const renderCompatibilityChecker = () => {
    if (showCompatibilityResult) {
      return (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-lg ${
              deviceCompatible
                ? "bg-gradient-to-br from-green-900/30 to-green-800/10 border-2 border-green-500/50"
                : "bg-gradient-to-br from-red-900/30 to-red-800/10 border-2 border-red-500/50"
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div
                className={`p-3 rounded-full flex-shrink-0 ${deviceCompatible ? "bg-green-500/20" : "bg-red-500/20"}`}
              >
                {deviceCompatible ? (
                  <CheckCheck className="h-8 w-8 text-green-400" />
                ) : (
                  <X className="h-8 w-8 text-red-400" />
                )}
              </div>

              <div className="flex-grow">
                <h3 className={`text-xl font-medium ${deviceCompatible ? "text-green-300" : "text-red-300"}`}>
                  {deviceCompatible ? "Your device is compatible!" : "Device not compatible"}
                </h3>

                <p className={`mt-1 ${deviceCompatible ? "text-green-200" : "text-red-200"}`}>
                  {deviceCompatible
                    ? `Great news! Your ${deviceInfo.manufacturer} ${deviceInfo.model} supports eSIM technology.`
                    : `Unfortunately, your ${deviceInfo.manufacturer} ${deviceInfo.model} doesn't support eSIM technology.`}
                </p>

                {deviceCompatible && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      eSIM Compatible
                    </div>
                    <div className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Digital Activation
                    </div>
                    <div className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      No Physical SIM Required
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* What happens next section */}
            <div className="mt-6 p-4 bg-black/30 rounded-lg">
              <h4 className={`text-sm font-medium mb-3 ${deviceCompatible ? "text-green-300" : "text-red-300"}`}>
                {deviceCompatible ? "What happens next:" : "Options:"}
              </h4>

              {deviceCompatible ? (
                <ul className="space-y-3">
                  <li className="flex items-start text-sm text-green-200">
                    <div className="bg-green-500/20 p-1 rounded-full mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-green-300" />
                    </div>
                    <span>Complete your order and we'll send you eSIM activation instructions via email</span>
                  </li>
                  <li className="flex items-start text-sm text-green-200">
                    <div className="bg-green-500/20 p-1 rounded-full mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-green-300" />
                    </div>
                    <span>You'll scan a QR code to activate your eSIM - no physical SIM card needed</span>
                  </li>
                  <li className="flex items-start text-sm text-green-200">
                    <div className="bg-green-500/20 p-1 rounded-full mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-green-300" />
                    </div>
                    <span>Your eSIM will be ready to use as soon as your broadband is installed</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-3">
                  <li className="flex items-start text-sm text-red-200">
                    <div className="bg-red-500/20 p-1 rounded-full mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-red-300" />
                    </div>
                    <span>Try a different device that supports eSIM technology</span>
                  </li>
                  <li className="flex items-start text-sm text-red-200">
                    <div className="bg-red-500/20 p-1 rounded-full mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-red-300" />
                    </div>
                    <span>Contact your device manufacturer to confirm eSIM support</span>
                  </li>
                  <li className="flex items-start text-sm text-red-200">
                    <div className="bg-red-500/20 p-1 rounded-full mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-red-300" />
                    </div>
                    <span>Consider upgrading to a newer device that supports eSIM</span>
                  </li>
                </ul>
              )}
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  if (!deviceCompatible) {
                    setShowDeviceForm(false)
                  }
                }}
                className={`text-sm px-4 py-2 rounded-lg transition-colors ${
                  deviceCompatible ? "opacity-0 pointer-events-none" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Close
              </button>

              <button
                onClick={resetCompatibilityCheck}
                className="flex items-center text-sm px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Another Device
              </button>
            </div>
          </motion.div>
        </div>
      )
    }

    if (compatibilityStep === 1) {
      return (
        <div>
          {/* Section title with better visual hierarchy */}
          <div className="mb-5">
            <h3 className="text-lg font-medium text-white mb-2 flex items-center">
              <Search className="h-5 w-5 text-[#bddfef] mr-2" />
              Select Your Device Manufacturer
            </h3>
            <p className="text-sm text-gray-300">Choose your phone manufacturer to check eSIM compatibility</p>
          </div>

          {/* Popular manufacturers - enhanced grid with better visual hierarchy */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-[#bddfef]/20 text-[#bddfef] rounded-full h-6 w-6 flex items-center justify-center mr-2">
                <span className="text-xs font-medium">1</span>
              </div>
              <h4 className="text-base font-medium text-white">Popular Manufacturers</h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {commonDevices.slice(0, 4).map((manufacturer) => (
                <button
                  key={manufacturer.name}
                  onClick={() => selectManufacturer(manufacturer.name)}
                  className={`relative p-5 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                    selectedManufacturer === manufacturer.name
                      ? "border-[#bddfef] bg-gradient-to-b from-[#bddfef]/15 to-[#bddfef]/5 shadow-lg shadow-[#bddfef]/10"
                      : "border-gray-700/50 bg-black hover:border-[#bddfef]/30 hover:bg-gray-900/70"
                  }`}
                  aria-label={`Select ${manufacturer.name}`}
                >
                  {selectedManufacturer === manufacturer.name && (
                    <div className="absolute top-2 right-2 bg-[#bddfef] text-black rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-full mb-3 flex items-center justify-center w-16 h-16 ${
                      selectedManufacturer === manufacturer.name
                        ? "bg-[#bddfef]/20 ring-2 ring-[#bddfef]/30"
                        : "bg-gray-800/80"
                    }`}
                  >
                    <div className="text-black">{manufacturer.icon}</div>
                  </div>
                  <span
                    className={`font-medium text-center ${
                      selectedManufacturer === manufacturer.name ? "text-[#bddfef]" : "text-white"
                    }`}
                  >
                    {manufacturer.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Other manufacturers - enhanced grid with better visual hierarchy */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-gray-700/50 text-gray-300 rounded-full h-6 w-6 flex items-center justify-center mr-2">
                <span className="text-xs font-medium">2</span>
              </div>
              <h4 className="text-base font-medium text-white">Other Manufacturers</h4>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {commonDevices.slice(4).map((manufacturer) => (
                <button
                  key={manufacturer.name}
                  onClick={() => selectManufacturer(manufacturer.name)}
                  className={`relative p-3 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                    selectedManufacturer === manufacturer.name
                      ? "border-[#bddfef] bg-gradient-to-b from-[#bddfef]/15 to-[#bddfef]/5 shadow-md"
                      : "border-gray-700/50 bg-black hover:border-gray-600/80 hover:bg-gray-900/50"
                  }`}
                  aria-label={`Select ${manufacturer.name}`}
                >
                  {selectedManufacturer === manufacturer.name && (
                    <div className="absolute top-1 right-1 bg-[#bddfef] text-black rounded-full p-0.5">
                      <Check className="h-2 w-2" />
                    </div>
                  )}
                  <div
                    className={`p-2 rounded-full mb-2 flex items-center justify-center w-10 h-10 ${
                      selectedManufacturer === manufacturer.name
                        ? "bg-[#bddfef]/20 ring-1 ring-[#bddfef]/30"
                        : "bg-gray-800/80"
                    }`}
                  >
                    <div className="text-black">{manufacturer.icon}</div>
                  </div>
                  <span
                    className={`text-xs text-center ${
                      selectedManufacturer === manufacturer.name ? "text-[#bddfef]" : "text-white"
                    }`}
                  >
                    {manufacturer.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-700/50 pt-4">
            <h4 className="text-white font-medium mb-3">Or enter your device details manually</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="customManufacturer" className="block text-sm font-medium text-gray-300 mb-1">
                  Manufacturer
                </label>
                <input
                  type="text"
                  id="customManufacturer"
                  value={customManufacturer}
                  onChange={(e) => setCustomManufacturer(e.target.value)}
                  placeholder="e.g. Apple, Samsung, Google"
                  className="w-full px-4 py-2 border border-gray-600/30 bg-black backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef]/50 focus:border-transparent rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="customModel" className="block text-sm font-medium text-gray-300 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  id="customModel"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="e.g. iPhone 14, Galaxy S22"
                  className="w-full px-4 py-2 border border-gray-600/30 bg-black backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef]/50 focus:border-transparent rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={checkCustomDevice}
              disabled={!customManufacturer || !customModel || isCheckingCompatibility}
              className={`w-full py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                !customManufacturer || !customModel || isCheckingCompatibility
                  ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                  : "bg-[#bddfef] text-black hover:bg-[#a5c7d7]"
              }`}
            >
              {isCheckingCompatibility ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking Compatibility...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Check Compatibility
                </>
              )}
            </button>
          </div>
        </div>
      )
    }

    if (compatibilityStep === 2) {
      const manufacturer = commonDevices.find((m) => m.name === selectedManufacturer)

      if (!manufacturer) {
        return null
      }

      const filteredModels = getFilteredModels(manufacturer.models)
      const compatibleModels = filteredModels.filter((model) => model.compatible)
      const incompatibleModels = filteredModels.filter((model) => !model.compatible)

      return (
        <div>
          {/* Section title with better visual hierarchy */}
          <div className="mb-4">
            <h3 className="text-base font-medium text-white flex items-center">
              <Smartphone className="h-4 w-4 text-[#bddfef] mr-2" />
              Select Your {selectedManufacturer} Model
            </h3>
            <p className="text-xs text-gray-400">Choose your specific model to check eSIM compatibility</p>
          </div>

          {/* Enhanced search bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${selectedManufacturer} models...`}
                className="w-full pl-10 pr-4 py-2 border border-gray-700/50 bg-black text-white focus:outline-none focus:ring-1 focus:ring-[#bddfef]/50 focus:border-transparent rounded-lg text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* No results message */}
          {filteredModels.length === 0 && (
            <div className="p-4 text-center border border-gray-700/50 rounded-lg bg-black">
              <Search className="h-5 w-5 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 mb-2 text-sm">No models found matching "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-[#bddfef] text-xs hover:text-[#a5c7d7] transition-colors"
              >
                Clear search
              </button>
            </div>
          )}

          {/* All models in a single list with clear compatibility indicators */}
          {filteredModels.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {filteredModels.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => selectModel(model.name, model.compatible)}
                    className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                      model.compatible
                        ? "border-gray-700/50 bg-black hover:border-green-500/30 hover:bg-green-900/5"
                        : "border-gray-700/50 bg-black hover:border-red-500/30 hover:bg-red-900/5"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-gray-800 mr-2 flex items-center justify-center w-7 h-7">
                        <div className="text-black">{manufacturer.icon}</div>
                      </div>
                      <span className="text-sm text-white">{model.name}</span>
                    </div>

                    <div
                      className={`px-2 py-0.5 rounded-full text-xs flex items-center ${
                        model.compatible ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {model.compatible ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Compatible
                        </>
                      ) : (
                        <>
                          <X className="h-3 w-3 mr-1" />
                          Not Compatible
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced navigation and help section */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-gray-700/50">
            <button
              onClick={() => setCompatibilityStep(1)}
              className="w-full sm:w-auto text-xs text-[#bddfef] flex items-center justify-center hover:text-[#a5c7d7] transition-colors px-3 py-1.5 rounded-lg border border-[#bddfef]/30 hover:bg-[#bddfef]/5"
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to Manufacturers
            </button>

            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-400">
                Don't see your model?
                <button
                  onClick={() => setCompatibilityStep(1)}
                  className="ml-1 text-[#bddfef] hover:text-[#a5c7d7] transition-colors"
                >
                  Try entering it manually
                </button>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  const openDetailModal = (plan: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedDetailPlan(plan)
    setShowDetailModal(true)
    setActiveTab("features")
  }

  return (
    <div>
      <div className="bg-black backdrop-blur-sm border border-gray-700/50 p-4 mb-8 rounded-xl">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-gray-400 mr-3 mt-1" />
          <div>
            <h3 className="font-medium text-gray-300">Bundle Discount Available</h3>
            <p className="text-gray-300 text-sm mb-3">
              Save on your mobile SIM when you bundle it with your broadband package. No long-term commitment required.
            </p>

            <div className="flex items-center">
              <button
                onClick={toggleBundleDiscount}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  bundleDiscount ? "bg-green-500" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    bundleDiscount ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-2 text-sm font-medium text-white">
                Bundle discount {bundleDiscount ? "applied" : "removed"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* eSIM Technology Info */}
      <div className="bg-black backdrop-blur-sm border border-gray-700/50 p-5 mb-8 rounded-xl">
        <h3 className="font-medium text-white mb-4 flex items-center">
          <Cpu className="h-5 w-5 text-gray-400 mr-2" />
          eSIM Technology
        </h3>

        <div className="flex items-start mb-4">
          <div className="p-2 rounded-full mr-3 bg-gray-800">
            <Cpu className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Digital SIM Card</h4>
            <p className="text-sm text-gray-400">
              We exclusively use eSIM technology for all our mobile plans. eSIM is a digital SIM that allows you to
              activate a mobile plan without having to use a physical SIM card.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-black border border-gray-600/20 p-3 rounded-lg">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-300">
              eSIM requires a compatible device. Most recent smartphones support eSIM technology, including iPhone 11 or
              newer, Google Pixel 3 or newer, and Samsung Galaxy S20 or newer.
            </p>
          </div>
        </div>
      </div>

      {/* Device Compatibility Checker - Improved UI */}
      <div className="mb-10">
        <h3 className="text-lg font-medium text-white mb-3 flex items-center">
          <Smartphone className="h-5 w-5 text-[#bddfef] mr-2" />
          Device Compatibility Check
        </h3>

        <div
          className={`rounded-xl border transition-all ${
            deviceCompatible === true
              ? "border-green-500/30 bg-black"
              : deviceCompatible === false
                ? "border-red-500/30 bg-black"
                : "border-gray-700/50 bg-black"
          }`}
        >
          {/* Header section */}
          <button
            onClick={() => setShowDeviceForm(!showDeviceForm)}
            className="w-full flex items-center justify-between p-5 rounded-xl hover:bg-[#bddfef]/10 transition-all"
          >
            <div className="flex items-center">
              <div
                className={`p-3 rounded-full mr-4 ${
                  deviceCompatible === true
                    ? "bg-green-500/20 ring-2 ring-green-500/30"
                    : deviceCompatible === false
                      ? "bg-red-500/20 ring-2 ring-red-500/30"
                      : "bg-[#bddfef]/20 ring-2 ring-[#bddfef]/30"
                }`}
              >
                {deviceCompatible === true ? (
                  <CheckCheck className="h-6 w-6 text-green-400" />
                ) : deviceCompatible === false ? (
                  <X className="h-6 w-6 text-red-400" />
                ) : (
                  <Smartphone className="h-6 w-6 text-[#bddfef]" />
                )}
              </div>
              <div className="text-left">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <h3 className="font-medium text-white text-lg">
                    {deviceCompatible === null
                      ? "Check Your Device"
                      : deviceCompatible === true
                        ? "Compatible Device"
                        : "Incompatible Device"}
                  </h3>
                  {deviceCompatible === null && (
                    <span className="text-xs px-3 py-1 rounded-full bg-[#bddfef]/20 text-[#bddfef] border border-[#bddfef]/30">
                      Required for eSIM
                    </span>
                  )}
                  {deviceCompatible === true && (
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 flex items-center border border-green-500/30">
                      <CheckCheck className="h-3 w-3 mr-1" />
                      eSIM Compatible
                    </span>
                  )}
                  {deviceCompatible === false && (
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 flex items-center border border-red-500/30">
                      <X className="h-3 w-3 mr-1" />
                      Not Compatible
                    </span>
                  )}
                </div>
                <p className="text-sm max-w-2xl">
                  {deviceCompatible === null ? (
                    <span className="text-gray-300">
                      We need to verify if your phone supports eSIM technology before proceeding
                    </span>
                  ) : deviceCompatible === true ? (
                    <span className="text-green-300">
                      Great! Your {deviceInfo.manufacturer} {deviceInfo.model} supports eSIM technology
                    </span>
                  ) : (
                    <span className="text-red-300">
                      Unfortunately, your {deviceInfo.manufacturer} {deviceInfo.model} doesn't support eSIM technology
                    </span>
                  )}
                </p>

                {deviceCompatible === null && (
                  <div className="mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeviceForm(true)
                      }}
                      className="px-4 py-2 bg-[#bddfef] text-black rounded-lg text-sm font-medium hover:bg-[#a5c7d7] transition-colors flex items-center"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Check Compatibility Now
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {deviceCompatible !== null && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    resetCompatibilityCheck()
                    setShowDeviceForm(true)
                  }}
                  className={`mr-3 text-xs px-3 py-1.5 rounded-lg flex items-center ${
                    deviceCompatible
                      ? "bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30"
                      : "bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                  }`}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Check Another Device
                </button>
              )}
              <div
                className={`p-2 rounded-full ${
                  deviceCompatible === true
                    ? "bg-green-500/20"
                    : deviceCompatible === false
                      ? "bg-red-500/20"
                      : "bg-[#bddfef]/20"
                }`}
              >
                <ChevronDown
                  className={`h-5 w-5 ${
                    deviceCompatible === true
                      ? "text-green-400"
                      : deviceCompatible === false
                        ? "text-red-400"
                        : "text-[#bddfef]"
                  } transition-transform duration-300 ${showDeviceForm ? "rotate-180" : "rotate-0"}`}
                />
              </div>
            </div>
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {showDeviceForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-700/50"
              >
                <div className="p-6">
                  {/* Progress indicator - only show when in the selection process and not showing results */}
                  {!showCompatibilityResult && (
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <h3 className="font-medium text-white text-lg flex items-center">
                          {compatibilityStep === 1 ? (
                            <>
                              <Search className="h-5 w-5 text-[#bddfef] mr-2" />
                              Select your device manufacturer
                            </>
                          ) : (
                            <>
                              <Smartphone className="h-5 w-5 text-[#bddfef] mr-2" />
                              Select your {selectedManufacturer} model
                            </>
                          )}
                        </h3>

                        <div className="flex items-center">
                          {compatibilityStep === 2 && (
                            <button
                              onClick={() => setCompatibilityStep(1)}
                              className="text-sm text-[#bddfef] flex items-center hover:text-[#a5c7d7] transition-colors mr-4 px-3 py-1 rounded-lg border border-[#bddfef]/30"
                            >
                              <ArrowLeft className="h-4 w-4 mr-1" />
                              Back to Manufacturers
                            </button>
                          )}
                          <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-lg">
                            <span className="text-xs text-gray-300 mr-2">Step {compatibilityStep} of 2</span>
                            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#bddfef] rounded-full transition-all duration-300"
                                style={{ width: `${(compatibilityStep / 2) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-[#bddfef]/10 backdrop-blur-sm border border-[#bddfef]/30 rounded-lg mb-4">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-[#bddfef] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-white font-medium mb-1">
                              {compatibilityStep === 1
                                ? "Select Your Device Manufacturer"
                                : `Select Your ${selectedManufacturer} Model`}
                            </p>
                            <p className="text-sm text-gray-300">
                              {compatibilityStep === 1
                                ? "Most smartphones from 2020 or newer support eSIM technology. Select your device manufacturer to continue."
                                : `Select your specific ${selectedManufacturer} model to check if it supports eSIM technology.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {renderCompatibilityChecker()}

                  {/* Close button at the bottom */}
                  {showCompatibilityResult && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setShowDeviceForm(false)}
                        className="px-5 py-2.5 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Clickable Mobile Plans Hint */}
      <div className="mb-4 p-3 bg-[#bddfef]/10 backdrop-blur-sm border border-[#bddfef]/30 rounded-xl">
        <p className="text-sm text-gray-300 flex items-center">
          {isMobile ? (
            <>
              <Hand className="h-4 w-4 text-[#bddfef] mr-2" />
              <span>Tap any plan card to select it</span>
            </>
          ) : (
            <>
              <MousePointer className="h-4 w-4 text-[#bddfef] mr-2" />
              <span>Click any plan card to select it</span>
            </>
          )}
        </p>
      </div>

      {/* Mobile Plans - Styled like plan cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 auto-rows-fr">
        {mobilePlans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id
          const pastelColor = pastelColors[plan.id as keyof typeof pastelColors]
          const headerIconColor = getHeaderIconColor(plan.id, isSelected)

          return (
            <motion.div
              key={plan.id}
              layout
              onClick={() => selectPlan(plan)}
              className={`border-2 p-0 transition-all rounded-xl backdrop-blur-sm overflow-hidden cursor-pointer card-hover-animate hover-glow h-full w-full ${
                isSelected
                  ? "shadow-lg shadow-[#bddfef]/20 pulse-animation"
                  : "border-gray-600/50 bg-black hover:border-gray-500 hover:shadow-md hover:border-[#bddfef]/60"
              }`}
              style={isSelected ? { borderColor: pastelColor } : {}}
              role="button"
              aria-pressed={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  selectPlan(plan)
                }
              }}
            >
              {/* Plan Header */}
              <div
                className={`p-5 border-b border-gray-700/30`}
                style={isSelected ? { backgroundColor: pastelColor } : {}}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-start mb-3 sm:mb-0">
                    <div
                      className={`p-2 mr-3 rounded-full ${
                        isSelected ? "bg-white/30" : "bg-black border border-[#474c54]/30"
                      }`}
                    >
                      <Smartphone className="h-5 w-5" style={{ color: headerIconColor }} />
                    </div>
                    <div>
                      <div className="flex items-center flex-wrap">
                        <h3 className={`font-medium mr-2 ${isSelected ? "text-black" : "text-white"}`}>{plan.name}</h3>
                        {plan.popular && (
                          <div
                            className={`${
                              isSelected ? "bg-black text-white" : "bg-gray-700 text-white"
                            } text-xs px-3 py-1 inline-block mt-1 sm:mt-0 rounded-full`}
                          >
                            Most Popular
                          </div>
                        )}
                        {plan.highlight && (
                          <div
                            className={`${
                              isSelected ? "bg-black text-white" : "bg-gray-700 text-white"
                            } text-xs px-3 py-1 inline-block mt-1 sm:mt-0 rounded-full`}
                          >
                            {plan.highlight}
                          </div>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${isSelected ? "text-black" : "text-gray-400"}`}>{plan.tagline}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div
                          className={`${
                            isSelected ? "bg-black/20 text-black" : "bg-gray-700/30 text-gray-300"
                          } text-xs px-3 py-1 inline-flex items-center rounded-full`}
                        >
                          <Signal className="h-3 w-3 mr-1" style={{ color: headerIconColor }} />
                          {plan.data} Data
                        </div>
                        <div
                          className={`${
                            isSelected ? "bg-black/20 text-black" : "bg-gray-700/30 text-gray-300"
                          } text-xs px-3 py-1 inline-flex items-center rounded-full`}
                        >
                          <Phone className="h-3 w-3 mr-1" style={{ color: headerIconColor }} />
                          {plan.minutes} Minutes
                        </div>
                        <div
                          className={`${
                            isSelected ? "bg-black/20 text-black" : "bg-gray-700/30 text-gray-300"
                          } text-xs px-3 py-1 inline-flex items-center rounded-full`}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" style={{ color: headerIconColor }} />
                          {plan.texts} Texts
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <div className={`text-xl sm:text-2xl font-bold ${isSelected ? "text-black" : "text-white"}`}>
                      £{bundleDiscount ? plan.discountedPrice.toFixed(2) : plan.price.toFixed(2)}
                    </div>
                    <div className={`text-sm ${isSelected ? "text-black" : "text-gray-400"}`}>per month</div>

                    {bundleDiscount && (
                      <div className={`text-xs mt-1 ${isSelected ? "text-black/70" : "text-gray-500"}`}>
                        <Tag className="h-3 w-3 mr-1 inline" />
                        Save £{(plan.price - plan.discountedPrice).toFixed(2)}/mo with bundle
                      </div>
                    )}

                    {isSelected && (
                      <div className="mt-3 px-6 py-2 rounded-full text-sm font-medium flex items-center justify-center bg-black text-white shadow-lg">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Selected
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Plan Content */}
              <div className="p-5 bg-black min-h-[320px] flex flex-col">
                {/* Data visualization */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Data Allowance</span>
                    <span className="text-sm text-gray-300 font-medium">{plan.data}</span>
                  </div>
                  {plan.data !== "Unlimited" ? (
                    renderDataBar(plan.dataAmount)
                  ) : (
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500 rounded-full w-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {/* Features Column */}
                  <div className="min-h-[180px]">
                    <h4 className="font-medium text-white mb-3 flex items-center">
                      <Check className="h-4 w-4 mr-2" style={{ color: pastelColor }} />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {plan.features
                        .slice(0, expandedPlanId === plan.id ? plan.features.length : 5)
                        .map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: pastelColor }} />
                            <span className="text-sm text-gray-400">{feature}</span>
                          </li>
                        ))}
                      {plan.features.length > 5 && expandedPlanId !== plan.id && (
                        <li
                          className="text-sm cursor-pointer hover:opacity-80 transition-colors"
                          style={{ color: pastelColor }}
                          onClick={(e) => {
                            e.stopPropagation()
                            togglePlanExpansion(plan.id)
                          }}
                        >
                          + {plan.features.length - 5} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Best For Column */}
                  <div className="min-h-[180px]">
                    <h4 className="font-medium text-white mb-3 flex items-center">
                      <Signal className="h-4 w-4 mr-2" style={{ color: pastelColor }} />
                      Best For
                    </h4>
                    <ul className="space-y-2">
                      {plan.bestFor.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: pastelColor }} />
                          <span className="text-sm text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Show/Hide Details Button */}
                {plan.features.length > 5 && (
                  <div className="mt-4 text-center">
                    <Button onClick={(e) => openDetailModal(plan, e)} variant="outline" size="sm" className="mx-auto">
                      <span>Show More Details</span>
                      <Maximize2 className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
              {/* Replace the payment breakdown button in the mobile plan cards with this */}
              {/* Look for something like: */}
              {/* <button
                onClick={(e) => togglePaymentBreakdown(e, addon.id)}
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Payment Breakdown
                {showPaymentBreakdown === addon.id ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </button> */}

              {/* And replace with: */}

              {/* Remove any existing AnimatePresence sections for payment breakdown that extend the card */}
              {/* Look for something like: */}
              {/* <AnimatePresence>{showPaymentBreakdown === addon.id && renderPaymentBreakdown(addon)}</AnimatePresence> */}
            </motion.div>
          )
        })}
      </div>

      {/* Only show the selected plan section if a plan is selected */}
      {selectedPlan && (
        <div className="mt-8 p-5 border border-gray-700/50 bg-black rounded-xl">
          <h3 className="text-white font-medium mb-4 flex items-center">
            <Smartphone className="h-5 w-5 text-gray-400 mr-2" />
            Your Selected Mobile Plan
          </h3>

          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-white">
                {selectedPlan.name} Plan with {selectedPlan.data} Data
              </p>
              <div className="flex items-center mt-1 text-sm text-gray-400">
                <Check className="h-3 w-3 text-gray-400 mr-1" />
                <span>{selectedPlan.minutes} Minutes</span>
                <span className="mx-2">•</span>
                <Check className="h-3 w-3 text-gray-400 mr-1" />
                <span>{selectedPlan.texts} Texts</span>
                <span className="mx-2">•</span>
                <Check className="h-3 w-3 text-gray-400 mr-1" />
                <span>5G Ready</span>
              </div>

              {/* Add eSIM information */}
              <div className="mt-2 flex items-center">
                <div className="flex items-center text-sm text-gray-300">
                  <Cpu className="h-3 w-3 text-gray-400 mr-1" />
                  <span>eSIM</span>
                  {deviceCompatible === true && (
                    <span className="ml-2 bg-green-500/20 text-green-300 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Compatible Device
                    </span>
                  )}
                  {deviceCompatible === false && (
                    <span className="ml-2 bg-red-500/20 text-red-300 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Compatibility Issue
                    </span>
                  )}
                  {deviceCompatible === null && (
                    <button
                      onClick={() => {
                        setShowDeviceForm(true)
                        resetCompatibilityCheck()
                      }}
                      className="ml-2 bg-[#bddfef]/20 text-[#bddfef] text-xs px-2 py-0.5 rounded-full flex items-center hover:bg-[#bddfef]/30 transition-colors"
                    >
                      <Search className="h-3 w-3 mr-1" />
                      Check Compatibility
                    </button>
                  )}
                </div>
              </div>

              {/* Add device information */}
              {deviceInfo.manufacturer && deviceInfo.model && (
                <div className="mt-2 text-xs text-gray-400">
                  Device: {deviceInfo.manufacturer} {deviceInfo.model}
                  {!showDeviceForm && (
                    <button
                      onClick={() => {
                        setShowDeviceForm(true)
                        resetCompatibilityCheck()
                      }}
                      className="ml-2 text-[#bddfef] hover:text-[#a5c7d7] transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="mt-3 md:mt-0 md:text-right">
              <p className="text-gray-400 text-sm">Monthly Price:</p>
              <p className="text-white font-bold text-xl">
                £{bundleDiscount ? selectedPlan.discountedPrice.toFixed(2) : selectedPlan.price.toFixed(2)}/mo
              </p>
              {bundleDiscount && (
                <p className="text-gray-400 text-xs">
                  Saving £{(selectedPlan.price - selectedPlan.discountedPrice).toFixed(2)}/month with bundle discount
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-600/30">
            <button
              onClick={() => selectPlan(selectedPlan)}
              className="text-[#bddfef] text-sm flex items-center hover:text-[#a5c7d7] transition-colors"
            >
              <Minus className="h-4 w-4 mr-1" />
              Remove Mobile Plan
            </button>
          </div>
        </div>
      )}

      {/* Remove the "How eSIM Works" section that appears after the selected plan section */}

      {/* Plan Details Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-gray-700">
          {selectedDetailPlan && (
            <>
              <DialogHeader>
                <div className="flex items-center">
                  <div
                    className="p-2 mr-3 rounded-full"
                    style={{ backgroundColor: `${pastelColors[selectedDetailPlan.id]}30` }}
                  >
                    <Smartphone className="h-5 w-5" style={{ color: pastelColors[selectedDetailPlan.id] }} />
                  </div>
                  <div>
                    <DialogTitle className="text-xl flex items-center">
                      {selectedDetailPlan.name} Plan
                      {selectedDetailPlan.popular && (
                        <span className="ml-2 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
                      )}
                      {selectedDetailPlan.highlight && (
                        <span className="ml-2 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                          {selectedDetailPlan.highlight}
                        </span>
                      )}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">{selectedDetailPlan.tagline}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Plan Price */}
              <div className="flex justify-between items-center mb-6 p-4 bg-gray-900/30 rounded-lg">
                <div>
                  <div className="text-sm text-gray-400">Monthly Price</div>
                  <div className="text-2xl font-bold text-white">
                    £
                    {bundleDiscount
                      ? selectedDetailPlan.discountedPrice.toFixed(2)
                      : selectedDetailPlan.price.toFixed(2)}
                  </div>
                  {bundleDiscount && (
                    <div className="text-xs text-gray-500">
                      Save £{(selectedDetailPlan.price - selectedDetailPlan.discountedPrice).toFixed(2)}/month with
                      bundle
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <div className="text-sm text-gray-400">Data</div>
                    <div className="text-lg font-medium text-white">{selectedDetailPlan.data}</div>
                    <div className="text-xs text-gray-500">5G Ready</div>
                  </div>
                  <Button
                    onClick={() => {
                      selectPlan(selectedDetailPlan)
                      setShowDetailModal(false)
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-medium ${
                      selectedPlan?.id === selectedDetailPlan.id
                        ? "bg-gray-700 text-white"
                        : "bg-[#bddfef] text-black hover:bg-[#a5c7d7]"
                    }`}
                  >
                    {selectedPlan?.id === selectedDetailPlan.id ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      "Select Plan"
                    )}
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap border-b border-gray-700 mb-6">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-4 py-2 text-sm font-medium flex items-center ${
                    activeTab === "features"
                      ? "border-b-2 border-[#bddfef] text-white"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                  }`}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Features
                </button>
                <button
                  onClick={() => setActiveTab("bestFor")}
                  className={`px-4 py-2 text-sm font-medium flex items-center ${
                    activeTab === "bestFor"
                      ? "border-b-2 border-[#bddfef] text-white"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                  }`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Best For
                </button>
                <button
                  onClick={() => setActiveTab("esim")}
                  className={`px-4 py-2 text-sm font-medium flex items-center ${
                    activeTab === "esim"
                      ? "border-b-2 border-[#bddfef] text-white"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                  }`}
                >
                  <Cpu className="h-4 w-4 mr-2" />
                  eSIM Info
                </button>
              </div>

              {/* Tab Content */}
              <div className="mb-6">
                {/* Features Tab */}
                {activeTab === "features" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Check className="h-5 w-5 mr-2 text-[#bddfef]" />
                        All Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedDetailPlan.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Signal className="h-5 w-5 mr-2 text-[#bddfef]" />
                        Data, Minutes & Texts
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Signal className="h-5 w-5 mr-2 text-[#bddfef]" />
                            <h4 className="text-base font-medium text-white">Data</h4>
                          </div>
                          <p className="text-2xl font-bold text-white mb-1">{selectedDetailPlan.data}</p>
                          <p className="text-sm text-gray-400">5G Ready</p>
                          {selectedDetailPlan.data !== "Unlimited" && (
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                              <div
                                className="h-full bg-gradient-to-r from-[#bddfef]/50 to-[#bddfef] rounded-full"
                                style={{ width: `${Math.min((selectedDetailPlan.dataAmount / 100) * 100, 100)}%` }}
                              ></div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Phone className="h-5 w-5 mr-2 text-[#bddfef]" />
                            <h4 className="text-base font-medium text-white">Minutes</h4>
                          </div>
                          <p className="text-2xl font-bold text-white mb-1">{selectedDetailPlan.minutes}</p>
                          <p className="text-sm text-gray-400">UK Calls</p>
                        </div>

                        <div className="p-4 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center mb-2">
                            <MessageSquare className="h-5 w-5 mr-2 text-[#bddfef]" />
                            <h4 className="text-base font-medium text-white">Texts</h4>
                          </div>
                          <p className="text-2xl font-bold text-white mb-1">{selectedDetailPlan.texts}</p>
                          <p className="text-sm text-gray-400">UK SMS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Best For Tab */}
                {activeTab === "bestFor" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-[#bddfef]" />
                        Best For
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-3">
                            {selectedDetailPlan.bestFor.map((item: string, index: number) => (
                              <div key={index} className="p-3 bg-gray-900/30 rounded-lg flex items-start">
                                <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                                <span className="text-sm text-gray-300">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-gray-900/30 rounded-lg">
                          <h4 className="text-base font-medium text-white mb-3">Plan Highlights</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">
                                {selectedDetailPlan.data === "Unlimited"
                                  ? "No data caps or speed restrictions"
                                  : `${selectedDetailPlan.data} of high-speed data`}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">
                                30-day rolling contract with no long-term commitment
                              </span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">
                                Bundle discount when combined with broadband
                              </span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">5G ready where available</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* eSIM Tab */}
                {activeTab === "esim" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Cpu className="h-5 w-5 mr-2 text-[#bddfef]" />
                        eSIM Technology
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-900/30 rounded-lg">
                          <h4 className="text-base font-medium text-white mb-3">What is eSIM?</h4>
                          <p className="text-sm text-gray-300 mb-3">
                            eSIM (embedded SIM) is a digital SIM that allows you to activate a mobile plan without
                            having to use a physical SIM card. It's built into your device and can be programmed
                            remotely.
                          </p>
                          <h5 className="text-sm font-medium text-white mb-2">Benefits:</h5>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">No physical SIM card needed</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">Quick and easy activation</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">Store multiple profiles on one device</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#bddfef]" />
                              <span className="text-sm text-gray-300">More secure than physical SIM cards</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gray-900/30 rounded-lg">
                          <h4 className="text-base font-medium text-white mb-3">How to Activate</h4>
                          <ol className="space-y-3">
                            <li className="flex items-start">
                              <div className="bg-[#bddfef]/20 text-[#bddfef] rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                1
                              </div>
                              <span className="text-sm text-gray-300">
                                Complete your order and we'll send you eSIM activation instructions via email
                              </span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-[#bddfef]/20 text-[#bddfef] rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                2
                              </div>
                              <span className="text-sm text-gray-300">
                                Scan the QR code in the email using your phone's camera
                              </span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-[#bddfef]/20 text-[#bddfef] rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                3
                              </div>
                              <span className="text-sm text-gray-300">
                                Follow the on-screen instructions to download your eSIM profile
                              </span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-[#bddfef]/20 text-[#bddfef] rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                4
                              </div>
                              <span className="text-sm text-gray-300">
                                Your eSIM will be activated and ready to use
                              </span>
                            </li>
                          </ol>

                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <h5 className="text-sm font-medium text-white mb-2">Need Help?</h5>
                            <p className="text-sm text-gray-300">
                              Our support team is available 24/7 to help you with eSIM activation. Contact us at
                              support@olilo.com or call 0800 123 4567.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button onClick={() => setShowDetailModal(false)} variant="outline" className="mr-2">
                  Close
                </Button>
                {selectedPlan?.id === selectedDetailPlan.id && (
                  <div className="px-6 py-2 rounded-full text-sm font-medium flex items-center justify-center bg-gray-700 text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Selected
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
