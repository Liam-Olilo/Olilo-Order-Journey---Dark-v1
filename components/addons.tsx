"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Router,
  Info,
  Package,
  X,
  Wifi,
  CheckCircle,
  Settings,
  Server,
  Network,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Globe,
  Home,
  Building,
  Shield,
  ExternalLink,
  AlertTriangle,
  FileText,
  Send,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip } from "@nextui-org/react"

interface AddonsProps {
  orderData: any
  updateOrderData: (data: any) => void
}

interface Addon {
  id: number
  name: string
  description: string
  price: number
  features: string[]
}

const additionalAddons: Addon[] = [
  {
    id: 1,
    name: "WiFi Extender Pack",
    description: "Extend your WiFi coverage throughout your home",
    price: 5.99,
    features: ["Mesh network technology", "Easy setup", "Covers up to 2,500 sq ft", "Eliminates dead zones"],
  },
  {
    id: 2,
    name: "Security Package",
    description: "Keep your network and devices protected",
    price: 4.99,
    features: ["Advanced firewall", "Malware protection", "Parental controls", "Identity theft protection"],
  },
  {
    id: 3,
    name: "Entertainment Bundle",
    description: "Access to premium streaming services",
    price: 9.99,
    features: ["Multiple streaming services", "4K Ultra HD", "No ads on select platforms", "Family sharing"],
  },
  {
    id: 4,
    name: "Tech Support Plus",
    description: "24/7 priority technical support",
    price: 3.99,
    features: ["Priority queue", "Remote troubleshooting", "In-home support visits", "Setup assistance"],
  },
]

export default function Addons({ orderData, updateOrderData }: AddonsProps) {
  const [selectedAddons, setSelectedAddons] = useState<any[]>(orderData.addons || [])
  const [activeCategory, setActiveCategory] = useState<string>("equipment")
  const [summaryVisible, setSummaryVisible] = useState(false)
  const [selectedAddonForModal, setSelectedAddonForModal] = useState<any | null>(null)
  const [byodEnabled, setByodEnabled] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedIPOption, setSelectedIPOption] = useState("single") // Default to the included single IP
  const [showCompatibilityChecker, setShowCompatibilityChecker] = useState(false)
  const [showPaymentBreakdown, setShowPaymentBreakdown] = useState<number | null>(null)
  const [showJustificationForm, setShowJustificationForm] = useState(false)
  const [justificationText, setJustificationText] = useState("")
  const [justificationSubmitted, setJustificationSubmitted] = useState(false)
  const [justificationError, setJustificationError] = useState("")
  const justificationFormRef = useRef<HTMLDivElement>(null)

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

  // Update the useEffect hook to set network as default category when BYOD is enabled
  useEffect(() => {
    // Set network as the default category when BYOD is enabled
    if (byodEnabled) {
      setActiveCategory("network")
    }
  }, [byodEnabled])

  // Add this effect to scroll to the justification form when it appears
  useEffect(() => {
    if (showJustificationForm && justificationFormRef.current) {
      justificationFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [showJustificationForm])

  // Map addon IDs to pastel colors - using exact color codes
  const pastelColors = {
    1: "#f0cad7", // light pink for addon 1
    2: "#bcb8d8", // light purple for addon 2
    3: "#bddfef", // light blue for addon 3
    4: "#f6c7b4", // light orange/peach for addon 4
    5: "#c7efbd", // light green for addon 5
  }

  // Router options - strictly for equipment category
  const routerAddons = [
    {
      id: 1,
      name: "Linksys WiFi 7 Router",
      description: "Ultra-fast WiFi 7 router with multi-gigabit speeds",
      price: 12.99,
      icon: Router,
      category: "equipment",
      highlight: "Latest Tech",
      benefits: [
        "WiFi 7 technology (BE19000)",
        "Up to 19 Gbps wireless speeds",
        "10 Gigabit Ethernet port",
        "Advanced mesh capability",
      ],
      techSpecs: {
        connectivity: "WiFi 7, 10GbE",
        speed: "Up to 19 Gbps",
        ports: "1x 10GbE, 4x GbE, 1x USB 3.0",
        features: "Multi-Link Operation, 320MHz channels",
      },
    },
    {
      id: 2,
      name: "Mesh WiFi System",
      description: "Eliminate dead zones with multiple access points",
      price: 8.99,
      icon: Wifi,
      category: "equipment",
      benefits: ["Covers up to 5,000 sq ft", "Seamless roaming", "Tri-band technology", "Automatic updates"],
      techSpecs: {
        connectivity: "WiFi 6, Gigabit Ethernet",
        speed: "Up to 5.4 Gbps",
        ports: "4x Gigabit Ethernet, 1x USB 3.0",
        features: "160MHz channels, OFDMA",
      },
    },
  ]

  // Single Static IP (included option)
  const singleStaticIP = {
    id: 3,
    key: "single",
    name: "Single Static IP Address",
    description: "Fixed public IP address for basic home hosting and remote access",
    price: 0,
    icon: Home,
    category: "network",
    benefits: [
      "One dedicated public IP address",
      "Bypass CGNAT restrictions",
      "Access home devices remotely",
      "Run home servers",
    ],
    useCases: [
      "Remote access to home security cameras",
      "Personal VPN server",
      "Game server hosting",
      "Remote desktop access",
    ],
    techSpecs: {
      blockSize: "Single IP (/32)",
      usableIPs: "1 IP address",
      rdns: "Customer configurable",
      routing: "Static only",
    },
    comparison: {
      pros: ["Included with your package", "Simple setup", "Sufficient for most home users"],
      cons: ["Limited to one service per port", "Cannot separate services by IP"],
    },
  }

  // IP Block options (paid upgrades)
  const ipBlockAddons = [
    {
      id: 4,
      key: "block29",
      name: "IP Block /29",
      description: "Small IP block ideal for home labs and small business hosting needs",
      price: 5,
      icon: Server,
      category: "network",
      benefits: [
        "8 total IP addresses (5 usable)",
        "Run multiple services on separate IPs",
        "Ideal for advanced home users",
        "Full reverse DNS control",
      ],
      useCases: ["Home lab environment", "Multiple web servers", "Separate mail server", "Small business hosting"],
      techSpecs: {
        blockSize: "/29 subnet",
        usableIPs: "5 usable IPs (8 total)",
        rdns: "Customer configurable for all IPs",
        routing: "Static routes included",
      },
      comparison: {
        pros: ["Multiple services on different IPs", "Separate IPs for testing", "Good value for small businesses"],
        cons: ["More complex to configure", "May be excessive for basic home use"],
      },
    },
    {
      id: 5,
      key: "block28",
      name: "IP Block /28",
      description:
        "Larger IP block for businesses with multiple services and hosting requirements. Requires business justification.",
      price: 15,
      icon: Building,
      category: "network",
      highlight: "Justification Required",
      benefits: [
        "16 total IP addresses (13 usable)",
        "Ideal for small to medium businesses",
        "Host numerous services on dedicated IPs",
        "Create multiple subnets",
      ],
      useCases: [
        "Business hosting environment",
        "Multiple customer-facing services",
        "Separate development/testing environments",
        "E-commerce with multiple domains",
      ],
      techSpecs: {
        blockSize: "/28 subnet",
        usableIPs: "13 usable IPs (16 total)",
        rdns: "Full reverse DNS delegation",
        routing: "Static routes with optional subnet support",
      },
      comparison: {
        pros: ["Maximum flexibility", "Room for growth", "Professional-grade solution"],
        cons: ["Higher monthly cost", "Requires networking knowledge to fully utilize"],
      },
    },
  ]

  // Combined IP options for modal and reference
  const allIPOptions = [singleStaticIP, ...ipBlockAddons]

  // Get the appropriate addons based on the active category
  const getCategoryAddons = () => {
    if (activeCategory === "equipment") {
      return routerAddons
    } else if (activeCategory === "network") {
      return ipBlockAddons // Only return the paid IP block options
    }
    return []
  }

  const handleJustificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setJustificationError("")

    if (justificationText.trim().length < 50) {
      setJustificationError("Please provide a detailed justification (at least 50 characters)")
      return
    }

    setJustificationSubmitted(true)
    setShowJustificationForm(false)

    // Add the IP Block /28 to selected addons
    const block28 = ipBlockAddons.find((addon) => addon.id === 5)
    if (block28) {
      const filteredAddons = selectedAddons.filter((item) => item.category !== "network")
      const newSelectedAddons = [...filteredAddons, block28]
      setSelectedAddons(newSelectedAddons)
      updateOrderData({ addons: newSelectedAddons })
      setSelectedIPOption("block28")
    }

    // Here you would typically send the justification to your backend
    console.log("Justification submitted:", justificationText)
  }

  // Update the toggleAddon function to hide the justification form when selecting a different IP block
  const toggleAddon = (addon: any) => {
    let newSelectedAddons

    // Special handling for IP Block /28 (id: 5)
    if (addon.id === 5 && !selectedAddons.some((item) => item.id === addon.id) && !justificationSubmitted) {
      setShowJustificationForm(true)
      return // Don't proceed with selection until justification is submitted
    }

    // Hide justification form when selecting any other addon
    if (addon.id !== 5) {
      setShowJustificationForm(false)
    }

    if (selectedAddons.some((item) => item.id === addon.id)) {
      // Remove addon if already selected
      newSelectedAddons = selectedAddons.filter((item) => item.id !== addon.id)

      // If removing a network addon, set selectedIPOption back to single
      if (addon.category === "network") {
        setSelectedIPOption("single")
      }

      // If removing the /28 IP Block, reset justification state
      if (addon.id === 5) {
        setJustificationSubmitted(false)
        setJustificationText("")
      }
    } else {
      // For network category (IP addresses), ensure only one can be selected
      if (addon.category === "network") {
        // Remove any existing network category addons
        const filteredAddons = selectedAddons.filter((item) => item.category !== "network")
        // Add the new network addon
        newSelectedAddons = [...filteredAddons, addon]
        // Update the selected IP option
        setSelectedIPOption(addon.key || `block${addon.id}`)
      } else {
        // For other categories, add addon if not already selected
        newSelectedAddons = [...selectedAddons, addon]
      }
    }

    setSelectedAddons(newSelectedAddons)
    updateOrderData({ addons: newSelectedAddons })
  }

  // Update the selectSingleIP function to also hide the justification form
  const selectSingleIP = () => {
    // Remove any network addons and set selectedIPOption to single
    const filteredAddons = selectedAddons.filter((addon) => addon.category !== "network")
    setSelectedAddons(filteredAddons)
    updateOrderData({ addons: filteredAddons })
    setSelectedIPOption("single")

    // Hide the justification form when selecting the single IP option
    setShowJustificationForm(false)

    // Reset justification state if we're switching away from /28
    if (selectedIPOption === "block28") {
      setJustificationSubmitted(false)
      setJustificationText("")
    }
  }

  const checkIsSelected = (addonId: number) => {
    return selectedAddons.some((addon) => addon.id === addonId)
  }

  // Simplified categories with clearer icons
  const categories = [
    { id: "equipment", name: "Routers", icon: Router },
    { id: "network", name: "IP Addresses", icon: Network },
  ]

  // Get the filtered addons based on the active category
  const filteredAddons = getCategoryAddons()

  // Calculate total price of selected addons
  const calculateTotalPrice = () => {
    const monthlyAddons = selectedAddons.filter((addon) => !addon.oneTime)
    const oneTimeAddons = selectedAddons.filter((addon) => addon.oneTime)

    const monthlyTotal = monthlyAddons.reduce((sum, addon) => sum + addon.price, 0)
    const oneTimeTotal = oneTimeAddons.reduce((sum, addon) => sum + addon.price, 0)

    return { monthlyTotal, oneTimeTotal }
  }

  // Toggle summary visibility on mobile
  const toggleSummary = () => {
    setSummaryVisible(!summaryVisible)
  }

  // Update summary visibility based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSummaryVisible(true)
      } else {
        setSummaryVisible(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const openAddonDetails = (addon: any) => {
    setSelectedAddonForModal(addon)
  }

  const closeAddonDetails = () => {
    setSelectedAddonForModal(null)
  }

  const toggleByod = () => {
    setByodEnabled(!byodEnabled)

    // If disabling BYOD, set active category to equipment (routers)
    if (byodEnabled) {
      setActiveCategory("equipment")
    } else {
      // If enabling BYOD, set active category to network (IPs) and remove any router add-ons
      setActiveCategory("network")
      const newSelectedAddons = selectedAddons.filter((addon) => addon.category !== "equipment")
      setSelectedAddons(newSelectedAddons)
      updateOrderData({ addons: newSelectedAddons })
    }
  }

  // Helper function to get the color for an addon's header icons (turns black when selected)
  const getHeaderIconColor = (addonId: number, isAddonSelected: boolean) => {
    if (isAddonSelected) return "black"
    return addonId === 1
      ? "#f0cad7"
      : addonId === 2
        ? "#bcb8d8"
        : addonId === 3
          ? "#bddfef"
          : addonId === 4
            ? "#f6c7b4"
            : "#c7efbd"
  }

  // Helper function to get appropriate icon for IP comparison
  const getComparisonIcon = (isPositive: boolean) => {
    return isPositive ? (
      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
    ) : (
      <Info className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0" />
    )
  }

  const toggleAdditionalAddon = (id: number) => {
    setSelectedAddons((prev) =>
      prev.some((item) => item.id === id)
        ? prev.filter((addon: any) => addon.id !== id)
        : [...prev, additionalAddons.find((addon) => addon.id === id)],
    )
  }

  const togglePaymentBreakdown = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPaymentBreakdown((prev) => (prev === id ? null : id))
  }

  const renderPaymentBreakdown = (addon: any) => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 mt-4 overflow-hidden rounded-md bg-gray-900/80 p-4 text-white backdrop-blur-sm shadow-lg"
    >
      <h4 className="mb-2 font-semibold">Payment Breakdown</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Monthly addon fee</span>
          <span>£{addon.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total monthly cost</span>
          <span>£{addon.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div>
      {/* Router Options Banner - Always show this section */}
      <div className="mb-8 border border-[#474c54]/30 bg-black rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#474c54]/30">
          <h3 className="font-medium text-white text-lg">Router Options</h3>
        </div>

        <div className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <div
                className={`p-2 mr-3 rounded-full ${byodEnabled ? "bg-green-500/20" : "bg-black border border-[#474c54]/30"}`}
              >
                <Settings className={`h-5 w-5 ${byodEnabled ? "text-green-400" : "text-gray-400"}`} />
              </div>
              <div>
                <h4 className="font-medium text-white">Bring Your Own Router</h4>
                <p className="text-sm text-gray-400 mt-1">Use your existing router with our service</p>
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={toggleByod}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  byodEnabled ? "bg-green-500" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    byodEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-2 text-sm font-medium text-white">{byodEnabled ? "Enabled" : "Disabled"}</span>
            </div>
          </div>

          {byodEnabled && (
            <div className="mt-4">
              <button
                onClick={() => setShowCompatibilityChecker(!showCompatibilityChecker)}
                className="w-full flex items-center justify-between bg-black border border-[#474c54]/30 p-4 rounded-lg text-left hover:bg-black/80 hover:border-[#474c54]/50 transition-colors"
                aria-expanded={showCompatibilityChecker}
              >
                <div className="flex items-center">
                  <div className="bg-black border border-[#474c54]/50 p-1.5 rounded-full mr-3">
                    <HelpCircle className="h-5 w-5 text-[#bddfef]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">Check Router Compatibility</span>
                    <div className="text-xs text-gray-400 font-medium mt-0.5">Recommended for BYOD users</div>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                    showCompatibilityChecker ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {showCompatibilityChecker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 bg-black border border-[#474c54]/30 p-4 rounded-lg"
                >
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-300">
                        Your router must support PPPoE and VLAN tagging for our service to work correctly. You can still
                        add one of our routers by disabling this option.
                      </p>
                      <div className="mt-3 flex flex-col space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-xs text-gray-300">PPPoE Authentication</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-xs text-gray-300">VLAN Tagging (ID: 101)</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-xs text-gray-300">IPv6 Support (Optional)</span>
                        </div>
                      </div>
                      <button className="mt-4 text-[#bddfef] text-sm flex items-center hover:underline">
                        View compatible router list <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main content area based on category selection */}
      <div>
        {/* Category tabs - Only show when BYOD is disabled */}
        {!byodEnabled && (
          <div className="mb-6 overflow-x-auto">
            <div className="flex p-1 bg-black rounded-full border border-[#474c54]/30 w-fit">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-[#bddfef] text-black shadow-md"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Title - Only show when BYOD is enabled */}
        {byodEnabled && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Network className="h-5 w-5 mr-2 text-[#bddfef]" />
              IP Address Options
            </h3>
          </div>
        )}

        {/* IP Options Section - Show when Network category is active */}
        {(byodEnabled || activeCategory === "network") && (
          <>
            {/* Included IP Option Banner */}
            <div className="mb-6">
              <div className="bg-black/50 border border-[#474c54]/30 p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-400" />
                    Included With Your Package
                  </h4>
                  <span className="bg-green-400/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                    Included
                  </span>
                </div>

                {/* Single Static IP Card - Always included */}
                <div
                  className={`p-4 border-2 ${
                    selectedIPOption === "single"
                      ? "border-green-400 bg-green-400/5"
                      : "border-[#474c54]/50 bg-black/30"
                  } rounded-lg cursor-pointer transition-all hover:border-green-400/70`}
                  onClick={selectSingleIP}
                >
                  <div className="flex">
                    <div
                      className={`w-10 h-10 mr-3 rounded-full flex items-center justify-center ${
                        selectedIPOption === "single" ? "bg-green-400/20" : "bg-black/50 border border-[#474c54]/30"
                      }`}
                    >
                      <Home
                        className={`h-5 w-5 ${selectedIPOption === "single" ? "text-green-400" : "text-[#bddfef]"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-white">{singleStaticIP.name}</h5>
                        {selectedIPOption === "single" && (
                          <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{singleStaticIP.description}</p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-300">One dedicated public IP address</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-300">Host a single service or VPN</span>
                        </div>
                      </div>

                      <button
                        className="mt-4 text-[#bddfef] text-xs flex items-center hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          openAddonDetails(singleStaticIP)
                        }}
                      >
                        View details <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IP Blocks Section Title (Paid Options) */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white flex items-center">
                  <Network className="h-5 w-5 mr-2 text-[#bddfef]" />
                  IP Block Upgrades
                </h4>
                <span className="text-gray-400 text-xs">For advanced users and businesses</span>
              </div>
            </div>

            {/* IP Block Addons Grid - Using the original card design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr mb-6">
              <AnimatePresence mode="popLayout">
                {ipBlockAddons.map((addon) => {
                  const isAddonSelected = checkIsSelected(addon.id)
                  const pastelColor = pastelColors[addon.id as keyof typeof pastelColors]
                  const headerIconColor = getHeaderIconColor(addon.id, isAddonSelected)

                  return (
                    <motion.div
                      key={addon.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleAddon(addon)}
                      className={`border-2 p-0 transition-all rounded-xl backdrop-blur-sm overflow-hidden cursor-pointer card-hover-animate hover-glow h-full w-full flex flex-col ${
                        isAddonSelected
                          ? "shadow-lg shadow-[#bddfef]/20 pulse-animation"
                          : "border-gray-600/50 bg-black hover:border-gray-500 hover:shadow-md hover:border-[#bddfef]/60"
                      }`}
                      style={isAddonSelected ? { borderColor: pastelColor } : {}}
                      role="button"
                      aria-pressed={isAddonSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          toggleAddon(addon)
                        }
                      }}
                    >
                      {/* Addon Header - Styled like plan cards */}
                      <div
                        className={`p-5 border-b border-gray-700/30 min-h-[120px] relative`}
                        style={isAddonSelected ? { backgroundColor: pastelColor } : {}}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="flex items-start mb-3 sm:mb-0">
                            <div
                              className={`p-2 mr-3 rounded-full ${
                                isAddonSelected ? "bg-white/30" : "bg-black border border-[#474c54]/30"
                              }`}
                            >
                              <addon.icon className="h-5 w-5" style={{ color: headerIconColor }} />
                            </div>
                            <div>
                              <div className="flex items-center flex-wrap">
                                <h3 className={`font-medium mr-2 ${isAddonSelected ? "text-black" : "text-white"}`}>
                                  {addon.name}
                                </h3>
                                {addon.highlight && (
                                  <div className="flex items-center">
                                    <div
                                      className={`${
                                        isAddonSelected
                                          ? "bg-black text-white"
                                          : addon.highlight === "Justification Required"
                                            ? "bg-amber-500/90 text-black"
                                            : "bg-gray-700 text-white"
                                      } text-xs px-3 py-1 inline-block mt-1 sm:mt-0 rounded-full flex items-center`}
                                    >
                                      {addon.highlight}
                                      {addon.highlight === "Justification Required" && (
                                        <Tooltip
                                          content="Business use case required for approval. You'll need to describe your specific needs including number of services, hosting requirements, and expected traffic volume."
                                          position="top"
                                        >
                                          <Info className="h-3.5 w-3.5 ml-1 cursor-help" />
                                        </Tooltip>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <p className={`text-sm mt-1 ${isAddonSelected ? "text-black" : "text-gray-400"}`}>
                                {addon.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-start sm:items-end">
                            <div
                              className={`text-xl sm:text-2xl font-bold ${isAddonSelected ? "text-black" : "text-white"}`}
                            >
                              £{addon.price.toFixed(2)}
                            </div>
                            <div className={`text-sm ${isAddonSelected ? "text-black" : "text-gray-400"}`}>
                              per month
                            </div>

                            {isAddonSelected && (
                              <div className="mt-2 bg-white/90 rounded-full p-1.5 shadow-lg">
                                <CheckCircle className="h-5 w-5 text-black" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Addon Content */}
                      <div className="p-5 bg-black flex-grow flex flex-col">
                        {/* Benefits list */}
                        {addon.benefits && (
                          <div className="mb-4 min-h-[120px]">
                            <h4 className="font-medium text-white mb-3">Key Features</h4>
                            <div className="grid grid-cols-1 gap-3">
                              {addon.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start">
                                  <CheckCircle
                                    className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                                    style={{ color: pastelColor }}
                                  />
                                  <span className="text-sm text-gray-400">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Additional technical info based on category */}
                        <div className="mb-4 min-h-[80px]">
                          <h4 className="font-medium text-white mb-3">Technical Specifications</h4>

                          {addon.category === "network" && addon.techSpecs && (
                            <div className="grid grid-cols-1 gap-4">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">IP Block Size</span>
                                <span className="text-sm text-gray-300">{addon.techSpecs.blockSize}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Usable Addresses</span>
                                <span className="text-sm text-gray-300">{addon.techSpecs.usableIPs}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Details Button */}
                        <div className="mt-auto text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openAddonDetails(addon)
                            }}
                            className="text-sm hover:bg-[#bddfef]/10 transition-all flex items-center mx-auto text-[#bddfef] px-4 py-2 rounded-full border border-[#bddfef]/30"
                          >
                            <Info className="h-4 w-4 mr-2" /> View More Details <ChevronDown className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Justification Form */}
                {showJustificationForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="col-span-1 md:col-span-2 bg-black border-2 border-amber-500/70 rounded-xl p-6 shadow-lg"
                    ref={justificationFormRef}
                  >
                    <div className="flex items-start mb-4">
                      <div className="bg-amber-500/20 p-2 rounded-full mr-3">
                        <FileText className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Business Justification Required</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Please provide a detailed explanation of why you need a /28 IP block (13 usable IPs) for your
                          business.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleJustificationSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="justification" className="block text-sm font-medium text-gray-300 mb-1">
                          Business Justification <span className="text-amber-500">*</span>
                        </label>
                        <textarea
                          id="justification"
                          rows={5}
                          placeholder="Describe your business needs, including the number of services you plan to host, expected traffic volume, and why you require multiple IP addresses..."
                          className="w-full bg-black border border-[#474c54]/50 rounded-lg p-3 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                          value={justificationText}
                          onChange={(e) => setJustificationText(e.target.value)}
                          required
                        />
                        {justificationError && (
                          <p className="mt-1 text-sm text-red-400 flex items-center">
                            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                            {justificationError}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          Minimum 50 characters. Your justification will be reviewed by our team.
                        </p>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-amber-400 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          Examples of valid justifications:
                        </h4>
                        <ul className="mt-2 text-xs text-gray-400 space-y-1 ml-6 list-disc">
                          <li>Running multiple web servers with dedicated SSL certificates</li>
                          <li>Hosting separate environments for development, testing, and production</li>
                          <li>Operating multiple customer-facing services requiring distinct IP addresses</li>
                          <li>E-commerce platform with multiple domains and services</li>
                        </ul>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setShowJustificationForm(false)}
                          className="px-4 py-2 border border-[#474c54]/50 rounded-lg text-gray-300 hover:bg-[#474c54]/20 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-colors flex items-center"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Justification
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* IP Information Banner */}
            <div className="mb-6 p-4 bg-[#bddfef]/5 border border-[#bddfef]/20 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-[#bddfef] mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-white font-medium mb-1">About IP Addresses</h5>
                  <p className="text-sm text-gray-300">
                    IP addresses allow your devices to communicate on the internet. A single static IP is included
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Equipment Addons Grid - Only shown when Equipment category is active */}
        {activeCategory === "equipment" && !byodEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            <AnimatePresence mode="popLayout">
              {routerAddons.map((addon) => {
                const isAddonSelected = checkIsSelected(addon.id)
                const pastelColor = pastelColors[addon.id as keyof typeof pastelColors]
                const headerIconColor = getHeaderIconColor(addon.id, isAddonSelected)

                return (
                  <motion.div
                    key={addon.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => toggleAddon(addon)}
                    className={`border-2 p-0 transition-all rounded-xl backdrop-blur-sm overflow-hidden cursor-pointer card-hover-animate hover-glow h-full w-full flex flex-col ${
                      isAddonSelected
                        ? "shadow-lg shadow-[#bddfef]/20 pulse-animation"
                        : "border-gray-600/50 bg-black hover:border-gray-500 hover:shadow-md hover:border-[#bddfef]/60"
                    }`}
                    style={isAddonSelected ? { borderColor: pastelColor } : {}}
                    role="button"
                    aria-pressed={isAddonSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleAddon(addon)
                      }
                    }}
                  >
                    {/* Addon Header - Styled like plan cards */}
                    <div
                      className={`p-5 border-b border-gray-700/30 min-h-[120px] relative`}
                      style={isAddonSelected ? { backgroundColor: pastelColor } : {}}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex items-start mb-3 sm:mb-0">
                          <div
                            className={`p-2 mr-3 rounded-full ${
                              isAddonSelected ? "bg-white/30" : "bg-black border border-[#474c54]/30"
                            }`}
                          >
                            <addon.icon className="h-5 w-5" style={{ color: headerIconColor }} />
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap">
                              <h3 className={`font-medium mr-2 ${isAddonSelected ? "text-black" : "text-white"}`}>
                                {addon.name}
                              </h3>
                              {addon.highlight && (
                                <div
                                  className={`${
                                    isAddonSelected
                                      ? "bg-black text-white"
                                      : addon.highlight === "Justification Required"
                                        ? "bg-amber-500/90 text-black"
                                        : "bg-gray-700 text-white"
                                  } text-xs px-3 py-1 inline-block mt-1 sm:mt-0 rounded-full`}
                                >
                                  {addon.highlight}
                                </div>
                              )}
                            </div>
                            <p className={`text-sm mt-1 ${isAddonSelected ? "text-black" : "text-gray-400"}`}>
                              {addon.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-start sm:items-end">
                          <div
                            className={`text-xl sm:text-2xl font-bold ${isAddonSelected ? "text-black" : "text-white"}`}
                          >
                            £{addon.price.toFixed(2)}
                          </div>
                          <div className={`text-sm ${isAddonSelected ? "text-black" : "text-gray-400"}`}>
                            {addon.oneTime ? "one-time" : "per month"}
                          </div>

                          {isAddonSelected && (
                            <div className="mt-2 bg-white/90 rounded-full p-1.5 shadow-lg">
                              <CheckCircle className="h-5 w-5 text-black" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Addon Content */}
                    <div className="p-5 bg-black flex-grow flex flex-col">
                      {/* Benefits list */}
                      {addon.benefits && (
                        <div className="mb-4 min-h-[120px]">
                          <h4 className="font-medium text-white mb-3">Key Features</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {addon.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle
                                  className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                                  style={{ color: pastelColor }}
                                />
                                <span className="text-sm text-gray-400">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Additional technical info based on category */}
                      <div className="mb-4 min-h-[80px]">
                        <h4 className="font-medium text-white mb-3">Technical Specifications</h4>

                        {addon.category === "equipment" && addon.techSpecs && (
                          <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Connectivity</span>
                              <span className="text-sm text-gray-300">{addon.techSpecs.connectivity}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Speed</span>
                              <span className="text-sm text-gray-300">{addon.techSpecs.speed}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Details Button */}
                      <div className="mt-auto text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openAddonDetails(addon)
                          }}
                          className="text-sm hover:bg-[#bddfef]/10 transition-all flex items-center mx-auto text-[#bddfef] px-4 py-2 rounded-full border border-[#bddfef]/30"
                        >
                          <Info className="h-4 w-4 mr-2" /> View More Details <ChevronDown className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* No addons message */}
        {activeCategory === "equipment" && !byodEnabled && routerAddons.length === 0 && (
          <div className="text-center py-12 bg-black rounded-xl border border-[#474c54]/30">
            <Package className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-1">No add-ons found</h3>
            <p className="text-gray-400 text-sm">Try selecting a different category</p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {selectedAddonForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-black rounded-xl shadow-2xl border border-[#474c54]/30 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#474c54]/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#bddfef]/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-black backdrop-blur-md border-b border-[#474c54]/30 p-5 flex justify-between items-start">
                <div className="flex items-center">
                  <div className="p-2 mr-3 rounded-full bg-gradient-to-r from-[#bddfef] to-[#a5c7d7]">
                    <selectedAddonForModal.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedAddonForModal.name}</h3>
                    <div className="flex items-center mt-1">
                      {selectedAddonForModal.price === 0 ? (
                        <span className="text-green-400 font-bold text-lg">Included</span>
                      ) : (
                        <>
                          <span className="text-[#bddfef] font-bold text-lg">
                            £{selectedAddonForModal.price.toFixed(2)}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            {selectedAddonForModal.oneTime ? " one-time" : "/mo"}
                          </span>
                        </>
                      )}
                      {selectedAddonForModal.highlight && (
                        <span
                          className={`ml-2 ${
                            selectedAddonForModal.highlight === "Justification Required"
                              ? "bg-amber-500/90 text-black"
                              : "bg-[#bddfef] text-white"
                          } text-xs px-2 py-0.5 rounded-full flex items-center`}
                        >
                          {selectedAddonForModal.highlight}
                          {selectedAddonForModal.highlight === "Justification Required" && (
                            <Tooltip
                              content="Business use case required for approval. You'll need to describe your specific needs including number of services, hosting requirements, and expected traffic volume."
                              position="bottom"
                            >
                              <Info className="h-3.5 w-3.5 ml-1 cursor-help" />
                            </Tooltip>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeAddonDetails}
                  className="p-1 rounded-full hover:bg-black border border-[#474c54]/30 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Modal Content - Simplified and cleaner */}
              <div className="p-5">
                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Description</h4>
                  <p className="text-gray-300">{selectedAddonForModal.description}</p>
                  <p className="text-gray-400 mt-2">
                    {selectedAddonForModal.category === "network"
                      ? "This IP option provides dedicated public IP addresses that remain fixed and don't change, unlike dynamic IPs. Public IPs allow you to host services that can be accessed from anywhere on the internet."
                      : "This add-on integrates seamlessly with your existing service and can be managed through your online account at any time."}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Key Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAddonForModal.benefits &&
                      selectedAddonForModal.benefits.map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-start bg-black border border-[#474c54]/30 p-3 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Use Cases - For IP options */}
                {selectedAddonForModal.category === "network" && selectedAddonForModal.useCases && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-2">Common Use Cases</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedAddonForModal.useCases.map((useCase: string, idx: number) => (
                        <div key={idx} className="flex items-start bg-black border border-[#474c54]/30 p-3 rounded-lg">
                          <Server className="h-5 w-5 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pros and Cons - For IP options */}
                {selectedAddonForModal.category === "network" && selectedAddonForModal.comparison && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-2">Advantages & Considerations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-white font-medium mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          Advantages
                        </h5>
                        <div className="space-y-2">
                          {selectedAddonForModal.comparison.pros.map((pro: string, idx: number) => (
                            <div key={idx} className="flex items-start">
                              {getComparisonIcon(true)}
                              <span className="text-sm text-gray-300">{pro}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2 flex items-center">
                          <Info className="h-4 w-4 text-amber-400 mr-2" />
                          Considerations
                        </h5>
                        <div className="space-y-2">
                          {selectedAddonForModal.comparison.cons.map((con: string, idx: number) => (
                            <div key={idx} className="flex items-start">
                              {getComparisonIcon(false)}
                              <span className="text-sm text-gray-300">{con}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Specifications - Enhanced for IP options */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Technical Specifications</h4>
                  <div className="bg-black border border-[#474c54]/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedAddonForModal.category === "equipment" && selectedAddonForModal.techSpecs && (
                        <>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Connectivity</span>
                            <span className="text-sm text-gray-300">
                              {selectedAddonForModal.techSpecs.connectivity}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Speed</span>
                            <span className="text-sm text-gray-300">{selectedAddonForModal.techSpecs.speed}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Ports</span>
                            <span className="text-sm text-gray-300">{selectedAddonForModal.techSpecs.ports}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Features</span>
                            <span className="text-sm text-gray-300">{selectedAddonForModal.techSpecs.features}</span>
                          </div>
                        </>
                      )}
                      {selectedAddonForModal.category === "network" && selectedAddonForModal.techSpecs && (
                        <>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">IP Block Size</span>
                            <span className="text-sm text-gray-300">{selectedAddonForModal.techSpecs.blockSize}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Usable IP Addresses</span>
                            <span className="text-sm text-gray-300">{selectedAddonForModal.techSpecs.usableIPs}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Reverse DNS</span>
                            <span className="text-sm text-gray-300">{selectedAddonForModal.techSpecs.rdns}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Routing</span>
                            <span className="text-sm text-gray-300">{selectedAddonForModal.techSpecs.routing}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* IP Address Diagram - Only for network category */}
                {selectedAddonForModal.category === "network" && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-2">IP Address Visualization</h4>
                    <div className="bg-black border border-[#474c54]/30 rounded-lg p-4">
                      <div className="flex flex-col items-center">
                        {selectedAddonForModal.id === 3 && (
                          <div className="w-full max-w-md">
                            <div className="flex justify-center mb-3">
                              <div className="w-16 h-16 rounded-lg bg-[#bddfef]/20 border border-[#bddfef] flex items-center justify-center">
                                <Globe className="h-8 w-8 text-[#bddfef]" />
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-300 mb-1">Single Public IP Address</p>
                              <p className="text-xs text-gray-400">
                                One dedicated IP address for all your internet-facing services
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedAddonForModal.id === 4 && (
                          <div className="w-full max-w-md">
                            <div className="flex justify-center space-x-3 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-10 h-10 rounded-lg bg-[#f6c7b4]/20 border border-[#f6c7b4] flex items-center justify-center"
                                >
                                  <Server className="h-5 w-5 text-[#f6c7b4]" />
                                </div>
                              ))}
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-300 mb-1">/29 Block - 5 Usable IPs</p>
                              <p className="text-xs text-gray-400">
                                Multiple IP addresses for different services and applications
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedAddonForModal.id === 5 && (
                          <div className="w-full max-w-md">
                            <div className="flex flex-wrap justify-center gap-2 mb-3 max-w-xs mx-auto">
                              {[...Array(13)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-8 h-8 rounded-lg bg-[#c7efbd]/20 border border-[#c7efbd] flex items-center justify-center"
                                >
                                  <Network className="h-4 w-4 text-[#c7efbd]" />
                                </div>
                              ))}
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-300 mb-1">/28 Block - 13 Usable IPs</p>
                              <p className="text-xs text-gray-400">
                                Extensive IP range for business applications and multiple subnets
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ - Enhanced for IP options */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    <div className="bg-black border border-[#474c54]/30 p-4 rounded-lg">
                      <h5 className="text-white font-medium mb-1 flex items-center">
                        <HelpCircle className="h-4 w-4 text-[#bddfef] mr-2" />
                        {selectedAddonForModal.category === "equipment"
                          ? "Do I need to use your router?"
                          : "What's the difference between dynamic and static IPs?"}
                      </h5>
                      <p className="text-sm text-gray-300 ml-6">
                        {selectedAddonForModal.category === "equipment"
                          ? "No, you can use your own router with our 'Bring Your Own Router' option. However, your router must support PPPoE and VLAN tagging for our service to work correctly."
                          : "Dynamic IPs can change periodically and are typically behind CGNAT (Carrier-Grade NAT), which prevents hosting services accessible from the internet. Static IPs remain fixed and allow you to host services that others can access remotely."}
                      </p>
                    </div>

                    {selectedAddonForModal.category === "network" && (
                      <div className="bg-black border border-[#474c54]/30 p-4 rounded-lg">
                        <h5 className="text-white font-medium mb-1 flex items-center">
                          <HelpCircle className="h-4 w-4 text-[#bddfef] mr-2" />
                          Why would I need multiple IP addresses?
                        </h5>
                        <p className="text-sm text-gray-300 ml-6">
                          Multiple IP addresses allow you to run different services on separate IPs rather than
                          different ports on a single IP. This provides better security isolation, simplifies firewall
                          configuration, and allows for more flexible hosting setups. For businesses, it enables hosting
                          multiple secure websites with dedicated SSL certificates.
                        </p>
                      </div>
                    )}

                    <div className="bg-black border border-[#474c54]/30 p-4 rounded-lg">
                      <h5 className="text-white font-medium mb-1 flex items-center">
                        <HelpCircle className="h-4 w-4 text-[#bddfef] mr-2" />
                        {selectedAddonForModal.category === "equipment"
                          ? "What's the warranty period?"
                          : selectedAddonForModal.category === "network"
                            ? "How are IP addresses configured?"
                            : "What level of support is included?"}
                      </h5>
                      <p className="text-sm text-gray-300 ml-6">
                        {selectedAddonForModal.category === "equipment"
                          ? "All our routers come with a 2-year warranty and free firmware updates. If you experience any issues, our technical support team is available to help troubleshoot or arrange a replacement."
                          : selectedAddonForModal.category === "network"
                            ? "Your primary IP address is configured automatically on our network. For IP blocks, we provide detailed documentation on how to configure your router and devices to use the additional addresses. Our technical support team can also assist with the initial setup."
                            : "Basic technical support is included with all packages. Priority support and Business SLA provide enhanced response times and dedicated support channels."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Need Help?</h4>
                  <div className="bg-black border border-[#474c54]/30 p-4 rounded-lg flex items-start">
                    <MessageSquare className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-300 text-sm">
                        If you have any questions about this add-on, our support team is available 24/7 to assist you.
                      </p>
                      <button className="mt-2 text-gray-300 text-sm flex items-center hover:text-white transition-colors">
                        Contact Support
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  {selectedAddonForModal.id === 3 ? (
                    <button
                      onClick={() => {
                        selectSingleIP()
                        closeAddonDetails()
                      }}
                      className="flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center bg-green-500 text-white hover:bg-green-600"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Use Included IP
                    </button>
                  ) : (
                    checkIsSelected(selectedAddonForModal.id) && (
                      <button
                        onClick={() => {
                          toggleAddon(selectedAddonForModal)
                          closeAddonDetails()
                        }}
                        className="flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center bg-black text-white hover:bg-gray-900"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Remove from Package
                      </button>
                    )
                  )}
                  <button
                    onClick={closeAddonDetails}
                    className="py-3 px-6 rounded-lg text-sm font-medium transition-all bg-black text-white border border-[#474c54]/30 hover:bg-gray-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
