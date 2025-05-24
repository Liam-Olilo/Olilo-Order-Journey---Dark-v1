"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Check,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowUpRight,
  Network,
  Users,
  Download,
  Upload,
  Gamepad2,
  Home,
  Building,
  CheckCircle,
  X,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Calendar,
  MousePointer,
  Hand,
  Clock,
  Router,
  Headphones,
  Server,
  Maximize2,
  Banknote,
  PieChart,
  Percent,
  BarChart3,
  Settings,
  LineChart,
  RefreshCwIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

interface PlanSelectionProps {
  orderData: any
  updateOrderData: (data: any) => void
  errors?: Record<string, string[]>
}

export default function PlanSelection({ orderData, updateOrderData, errors = {} }: PlanSelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<any>(orderData.plan || null)
  const [showTechDetails, setShowTechDetails] = useState(false)
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null)
  const [comparisonView, setComparisonView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedDetailPlan, setSelectedDetailPlan] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("features")
  const [showPaymentBreakdown, setShowPaymentBreakdown] = useState<number | null>(null)
  const [showSpeedComparison, setShowSpeedComparison] = useState(false)
  const [showBreakdownView, setShowBreakdownView] = useState(false)
  const [isAltF4DropdownOpen, setIsAltF4DropdownOpen] = useState(false)
  // Add a new state variable to track the speed dropdown state
  const [isSpeedDropdownOpen, setIsSpeedDropdownOpen] = useState(false)
  // Add a new state variable to track the expanded view
  const [isSpeedExpandedView, setIsSpeedExpandedView] = useState(false)
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false)
  const [isPricingExpandedView, setIsPricingExpandedView] = useState(false)
  // Add new state variables for tracking which feature box is expanded
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

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
    3: "#bddfef", // light blue for plan 3
    4: "#c4dfc8", // light mint green for plan 4 (changed from "#f6c7b4")
  }

  const plans = [
    {
      id: 1,
      name: "Olilo v0.9",
      tagline: "Perfect for everyday browsing and streaming",
      speed: "900 Mbps",
      downloadSpeed: 900,
      uploadSpeed: 900,
      price: 35.99,
      setupFee: 0,
      features: [
        "900 Mbps download speed",
        "900 Mbps upload speed",
        "Unlimited data",
        "Free standard router",
        "24/7 customer support",
      ],
      techSpecs: {
        latency: "10-15ms",
        reliability: "99.5% uptime",
        ipAddress: "Dynamic IP",
        router: "Standard Wi-Fi 6 Router",
        installation: "Self-installation available",
        bandwidth: "Dedicated 1 Gbps line",
        congestion: "Managed during peak hours",
        dns: "Standard DNS servers",
        ipv6: "Full IPv6 support",
        ports: "Standard ports open",
        traffic: "No traffic shaping",
      },
      idealFor: [
        "Small households (1-3 people)",
        "HD streaming",
        "Social media & browsing",
        "Light work from home",
        "Casual gaming",
      ],
      notIdealFor: [
        "4K/8K streaming on multiple devices",
        "Competitive gaming",
        "Large file uploads",
        "Smart home with many devices",
      ],
      popular: false,
      color: "bg-pink-400",
      gradient: "from-pink-400 to-pink-500",
      technology: "GPON",
      upgradePath: "Upgradeable to XGS-PON for £50 one-time fee",
      icon: Home,
      planSwitchingInfo: {
        upgradeFee: 0,
        downgradeFee: "Not applicable (lowest tier)",
        switchingPeriod: "After 30 days of service",
        upgradingProcess: "Instant upgrade available through your online account",
        downgradingProcess: "Not applicable (lowest tier)",
        contractImpact: "Upgrading resets your contract to 18 months",
      },
      routerDetails: {
        model: "Olilo RT-1000",
        wifi: "Wi-Fi 6 (802.11ax)",
        ports: "4x Gigabit Ethernet",
        coverage: "Up to 1,500 sq ft",
        features: ["Parental controls", "Guest network", "Basic QoS"],
        dimensions: "22 x 16 x 5 cm",
        warranty: "1 year manufacturer warranty",
        upgrades: "Compatible with mesh extenders (sold separately)",
      },
      supportDetails: {
        hours: "24/7 for technical issues, 8am-8pm for billing",
        channels: ["Phone", "Email", "Live chat"],
        responseTime: "Within 24 hours",
        installation: "Self-installation with phone support",
        prioritySupport: false,
        onSiteSupport: "Available for £50 per visit",
      },
      usageScenarios: [
        {
          name: "Video Streaming",
          performance: "Excellent for HD, Good for 4K on 1-2 devices",
          details: "Supports up to 3 simultaneous HD streams or 1-2 4K streams",
        },
        {
          name: "Video Calls",
          performance: "Excellent for 1080p calls",
          details: "Supports up to 4 simultaneous HD video calls",
        },
        {
          name: "Gaming",
          performance: "Good for casual gaming",
          details: "Suitable for most online games with good ping times",
        },
        {
          name: "Work From Home",
          performance: "Good for basic tasks",
          details: "Handles email, web browsing, and video calls well",
        },
        {
          name: "Smart Home",
          performance: "Good for basic setups",
          details: "Supports up to 15-20 smart home devices",
        },
      ],
      paymentBreakdown: {
        networkInfrastructure: 35,
        maintenance: 20,
        customerSupport: 15,
        researchDevelopment: 10,
        marketing: 8,
        payroll: 7,
        profit: 5,
      },
    },
    {
      id: 2,
      name: "Olilo v1.2",
      tagline: "Our most popular plan for digital families",
      speed: "1.2 Gbps",
      downloadSpeed: 1200,
      uploadSpeed: 1200,
      price: 39.99,
      setupFee: 0,
      features: [
        "1.2 Gbps download speed",
        "1.2 Gbps upload speed",
        "Unlimited data",
        "Free enhanced router",
        "24/7 priority customer support",
        "Free installation",
        "Smart Wi-Fi app",
        "Parental controls",
      ],
      techSpecs: {
        latency: "8-12ms",
        reliability: "99.7% uptime",
        ipAddress: "Dynamic IP (Static available)",
        router: "Enhanced Wi-Fi 6 Router",
        installation: "Professional installation included",
        bandwidth: "Dedicated 2 Gbps line",
        congestion: "Priority during peak hours",
        dns: "Enhanced DNS with malware blocking",
        ipv6: "Full IPv6 support",
        ports: "All standard ports open",
        traffic: "No traffic shaping",
      },
      idealFor: [
        "Medium households (3-5 people)",
        "4K streaming on multiple devices",
        "Regular work from home",
        "Online gaming",
        "Video conferencing",
        "Smart home with multiple devices",
      ],
      notIdealFor: ["Professional content creation", "Server hosting", "Very large households"],
      popular: true,
      color: "bg-[#bddfef]",
      gradient: "from-[#a5c7d7] to-[#8fb8c9]",
      technology: "XGS-PON",
      upgradePath: "Latest technology - no upgrade needed",
      icon: Users,
      planSwitchingInfo: {
        upgradeFee: 0,
        downgradeFee: 25,
        switchingPeriod: "After 30 days of service",
        upgradingProcess: "Instant upgrade available through your online account",
        downgradingProcess: "Submit downgrade request through your account or by calling customer service",
        contractImpact: "Upgrading resets your contract to 18 months, downgrading maintains current contract",
      },
      routerDetails: {
        model: "Olilo RT-2000",
        wifi: "Wi-Fi 6 (802.11ax)",
        ports: "4x Gigabit Ethernet, 1x 2.5G Ethernet",
        coverage: "Up to 2,500 sq ft",
        features: ["Advanced parental controls", "Guest network", "QoS", "VPN server"],
        dimensions: "24 x 18 x 6 cm",
        warranty: "2 year manufacturer warranty",
        upgrades: "Includes one mesh extender, compatible with additional units",
      },
      supportDetails: {
        hours: "24/7 for all issues",
        channels: ["Phone", "Email", "Live chat", "SMS"],
        responseTime: "Within 12 hours",
        installation: "Professional installation included",
        prioritySupport: true,
        onSiteSupport: "First visit free, then £30 per visit",
      },
      usageScenarios: [
        {
          name: "Video Streaming",
          performance: "Excellent for 4K, Good for 8K",
          details: "Supports up to 5 simultaneous 4K streams or 1 8K stream",
        },
        {
          name: "Video Calls",
          performance: "Excellent for multiple HD calls",
          details: "Supports 8+ simultaneous HD video calls",
        },
        {
          name: "Gaming",
          performance: "Excellent for online gaming",
          details: "Low latency and high bandwidth for competitive gaming",
        },
        {
          name: "Work From Home",
          performance: "Excellent for most tasks",
          details: "Handles multiple video calls, cloud services, and large file transfers",
        },
        {
          name: "Smart Home",
          performance: "Excellent for advanced setups",
          details: "Supports 30+ smart home devices with reliable connectivity",
        },
      ],
      paymentBreakdown: {
        networkInfrastructure: 32,
        maintenance: 18,
        customerSupport: 17,
        researchDevelopment: 12,
        marketing: 8,
        payroll: 8,
        profit: 5,
      },
    },
    {
      id: 3,
      name: "Olilo v2.0",
      tagline: "Serious speed for serious users",
      speed: "2.0 Gbps",
      downloadSpeed: 2000,
      uploadSpeed: 1000,
      price: 50.99,
      setupFee: 0,
      features: [
        "2.0 Gbps download speed",
        "1.0 Gbps upload speed",
        "Unlimited data",
        "Premium Wi-Fi 6 router",
        "24/7 priority customer support",
        "Free installation",
        "Static IP address",
        "Advanced security features",
        "Priority traffic management",
        "Enhanced parental controls",
      ],
      techSpecs: {
        latency: "5-10ms",
        reliability: "99.8% uptime",
        ipAddress: "Static IP included",
        router: "Premium Wi-Fi 6 Router with extended range",
        installation: "Priority professional installation",
        bandwidth: "Dedicated 2.5 Gbps line",
        congestion: "High priority during peak hours",
        dns: "Premium DNS with security features",
        ipv6: "Full IPv6 support with multiple subnets",
        ports: "All ports open with port forwarding",
        traffic: "No traffic shaping, business priority",
      },
      idealFor: [
        "Large households (5+ people)",
        "4K/8K streaming on multiple devices",
        "Dedicated home office",
        "Competitive gaming",
        "Content creation",
        "Smart home enthusiasts",
        "Multiple simultaneous heavy users",
      ],
      notIdealFor: ["Small households with basic needs", "Budget-conscious users"],
      popular: false,
      color: "bg-blue-400",
      gradient: "from-blue-400 to-blue-500",
      technology: "XGS-PON",
      upgradePath: "Latest technology - no upgrade needed",
      icon: Gamepad2,
      planSwitchingInfo: {
        upgradeFee: 0,
        downgradeFee: 35,
        switchingPeriod: "After 30 days of service",
        upgradingProcess: "Instant upgrade available through your online account",
        downgradingProcess: "Submit downgrade request through your account or by calling customer service",
        contractImpact: "Upgrading resets your contract to 18 months, downgrading maintains current contract",
      },
      routerDetails: {
        model: "Olilo RT-3000",
        wifi: "Wi-Fi 6E (802.11ax with 6GHz)",
        ports: "4x Gigabit Ethernet, 2x 2.5G Ethernet",
        coverage: "Up to 3,500 sq ft",
        features: [
          "Advanced parental controls",
          "Guest network",
          "Advanced QoS",
          "VPN server",
          "Network storage",
          "Security scanning",
        ],
        dimensions: "26 x 20 x 7 cm",
        warranty: "3 year manufacturer warranty",
        upgrades: "Includes two mesh extenders, compatible with additional units",
      },
      supportDetails: {
        hours: "24/7 for all issues with dedicated team",
        channels: ["Phone", "Email", "Live chat", "SMS", "Video call"],
        responseTime: "Within 4 hours",
        installation: "Priority professional installation with network optimization",
        prioritySupport: true,
        onSiteSupport: "Two free visits per year, then £20 per visit",
      },
      usageScenarios: [
        {
          name: "Video Streaming",
          performance: "Excellent for multiple 4K/8K streams",
          details: "Supports 8+ simultaneous 4K streams or 2-3 8K streams",
        },
        {
          name: "Video Calls",
          performance: "Excellent for multiple HD/4K calls",
          details: "Supports 12+ simultaneous HD video calls or 4+ 4K calls",
        },
        {
          name: "Gaming",
          performance: "Excellent for competitive gaming",
          details: "Ultra-low latency and high bandwidth for professional gaming",
        },
        {
          name: "Work From Home",
          performance: "Excellent for professional use",
          details: "Handles multiple video calls, large file transfers, and cloud services simultaneously",
        },
        {
          name: "Smart Home",
          performance: "Excellent for advanced smart homes",
          details: "Supports 50+ smart home devices with dedicated bandwidth",
        },
      ],
      paymentBreakdown: {
        networkInfrastructure: 30,
        maintenance: 17,
        customerSupport: 18,
        researchDevelopment: 15,
        marketing: 7,
        payroll: 8,
        profit: 5,
      },
    },
    {
      id: 4,
      name: "Olilo v2.3",
      tagline: "Ultimate performance for power users",
      speed: "2.3 Gbps",
      downloadSpeed: 2300,
      uploadSpeed: 2300,
      price: 51.99,
      setupFee: 0,
      features: [
        "2.3 Gbps download speed",
        "2.3 Gbps upload speed",
        "Unlimited data",
        "Enterprise-grade router",
        "Dedicated business support",
        "Free priority installation",
        "Multiple static IP addresses",
        "99.9% uptime guarantee",
        "Advanced network management",
        "Business-grade security",
        "Quality of Service (QoS) controls",
        "VPN support",
      ],
      techSpecs: {
        latency: "3-8ms",
        reliability: "99.9% uptime guaranteed",
        ipAddress: "Multiple static IPs included",
        router: "Enterprise-grade Wi-Fi 6E Router",
        installation: "Expert installation with network optimization",
        bandwidth: "Dedicated 10 Gbps line with 2.5 Gbps provisioned",
        congestion: "Business priority at all times",
        dns: "Enterprise DNS with advanced security",
        ipv6: "Full IPv6 support with multiple subnets and routing",
        ports: "All ports open with advanced port management",
        traffic: "Business-grade traffic prioritization",
      },
      idealFor: [
        "Home businesses",
        "Professional content creators",
        "Streamers and YouTubers",
        "Developers and tech professionals",
        "Ultra HD streaming on multiple devices",
        "Competitive esports",
        "Large file transfers",
        "Server hosting",
        "Smart home power users",
      ],
      notIdealFor: ["Basic internet users", "Budget-conscious customers"],
      popular: false,
      color: "bg-yellow-400",
      gradient: "from-yellow-300 to-yellow-500",
      technology: "XGS-PON",
      upgradePath: "Latest technology - no upgrade needed",
      icon: Building,
      planSwitchingInfo: {
        upgradeFee: "Not applicable (highest tier)",
        downgradeFee: 50,
        switchingPeriod: "After 30 days of service",
        upgradingProcess: "Not applicable (highest tier)",
        downgradingProcess: "Submit downgrade request through your account or by calling customer service",
        contractImpact: "Downgrading maintains current contract",
      },
      routerDetails: {
        model: "Olilo RT-4000 Enterprise",
        wifi: "Wi-Fi 6E (802.11ax with 6GHz) with MU-MIMO",
        ports: "4x Gigabit Ethernet, 2x 2.5G Ethernet, 1x 10G SFP+",
        coverage: "Up to 5,000 sq ft",
        features: [
          "Enterprise security",
          "Multiple SSIDs",
          "VLAN support",
          "Advanced QoS",
          "VPN server",
          "Network storage",
          "Intrusion detection",
          "Traffic analysis",
        ],
        dimensions: "30 x 22 x 8 cm",
        warranty: "5 year manufacturer warranty with next-day replacement",
        upgrades: "Includes three mesh extenders, compatible with additional units",
      },
      supportDetails: {
        hours: "24/7 for all issues with dedicated business team",
        channels: ["Phone", "Email", "Live chat", "SMS", "Video call", "On-site"],
        responseTime: "Within 2 hours",
        installation: "Expert installation with network optimization and security setup",
        prioritySupport: true,
        onSiteSupport: "Four free visits per year, then £10 per visit",
        dedicatedManager: "Assigned account manager for your service",
      },
      usageScenarios: [
        {
          name: "Video Streaming",
          performance: "Excellent for multiple 8K streams",
          details: "Supports 10+ simultaneous 4K streams or 3-4 8K streams",
        },
        {
          name: "Video Calls",
          performance: "Excellent for multiple 4K calls",
          details: "Supports 20+ simultaneous HD video calls or 8+ 4K calls",
        },
        {
          name: "Gaming",
          performance: "Excellent for professional gaming",
          details: "Ultra-low latency and highest bandwidth for professional esports",
        },
        {
          name: "Work From Home",
          performance: "Excellent for business operations",
          details: "Handles multiple simultaneous business applications with dedicated bandwidth",
        },
        {
          name: "Smart Home",
          performance: "Excellent for advanced smart home/office",
          details: "Supports 100+ smart devices with dedicated bandwidth and security",
        },
        {
          name: "Server Hosting",
          performance: "Excellent for small business servers",
          details: "Supports hosting websites, game servers, and small business applications",
        },
      ],
      paymentBreakdown: {
        networkInfrastructure: 28,
        maintenance: 16,
        customerSupport: 20,
        researchDevelopment: 16,
        marketing: 7,
        payroll: 8,
        profit: 5,
      },
    },
  ]

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan)
    updateOrderData({ plan })
  }

  useEffect(() => {
    // If no plan is selected yet, select the popular one by default
    if (!selectedPlan) {
      const popularPlan = plans.find((plan) => plan.popular)
      if (popularPlan) {
        handleSelectPlan(popularPlan)
      }
    }
  }, [])

  const getTechIcon = (technology: string, isSelected: boolean, planId: number) => {
    const iconColor = isSelected
      ? "black"
      : planId === 1
        ? "#f0cad7"
        : planId === 2
          ? "#bcb8d8"
          : planId === 3
            ? "#bddfef"
            : "#f6c7b4"

    if (technology === "GPON") {
      return <Network className="h-4 w-4 mr-1" style={{ color: iconColor }} />
    } else {
      return <Zap className="h-4 w-4 mr-1" style={{ color: iconColor }} />
    }
  }

  const openDetailModal = (plan: any, e: React.MouseEvent, initialTab = "features") => {
    if (e) {
      e.stopPropagation()
    }
    setSelectedDetailPlan(plan)
    setShowDetailModal(true)
    setActiveTab(initialTab)
  }

  const getSpeedRating = (speed: number) => {
    if (speed <= 900) return 1
    if (speed <= 1200) return 2
    if (speed <= 2000) return 3
    return 4
  }

  // Helper function to get the color for a plan's header icons (turns black when selected)
  const getHeaderIconColor = (planId: number, isSelected: boolean) => {
    if (isSelected) return "black"
    return planId === 1 ? "#f0cad7" : planId === 2 ? "#bcb8d8" : planId === 3 ? "#bddfef" : "#f6c7b4"
  }

  // Helper function to get the color for a plan's section icons (always stays in plan color)
  const getPlanColor = (planId: number) => {
    return planId === 1
      ? "#f0cad7"
      : planId === 2
        ? "#bcb8d8"
        : planId === 3
          ? "#bddfef"
          : planId === 4
            ? "#c4dfc8"
            : "#f6c7b4"
  }

  // Icons for the detail modal tabs
  const tabIcons = {
    features: <Check className="h-4 w-4 mr-2" />,
    technical: <Server className="h-4 w-4 mr-2" />,
    router: <Router className="h-4 w-4 mr-2" />,
    support: <Headphones className="h-4 w-4 mr-2" />,
    usage: <Users className="h-4 w-4 mr-2" />,
    switching: <RefreshCw className="h-4 w-4 mr-2" />,
    breakdown: <Banknote className="h-4 w-4 mr-2" />,
  }

  // Replace the existing togglePaymentBreakdown function with this updated version
  const togglePaymentBreakdown = (planId: number, e: React.MouseEvent) => {
    // Stop event propagation to prevent the plan selection from triggering
    e.stopPropagation()
    e.preventDefault()

    // Toggle the breakdown for this specific plan
    setShowPaymentBreakdown((prevState) => (prevState === planId ? null : planId))
  }

  // Replace the existing renderPaymentBreakdown function with this updated version
  const renderPaymentBreakdown = (plan: any) => {
    const planColor = getPlanColor(plan.id)

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full left-0 mb-2 w-64 overflow-hidden rounded-lg bg-gray-900/95 p-4 shadow-xl border border-gray-700/50 backdrop-blur-sm z-20"
      >
        <h4 className="text-white font-medium mb-3 flex items-center">
          <PieChart className="h-4 w-4 mr-2" style={{ color: planColor }} />
          Payment Breakdown
        </h4>

        <div className="space-y-3">
          {Object.entries(plan.paymentBreakdown)
            .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
            .map(([category, percentage]: [string, any]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-300 capitalize flex items-center">
                    {category === "networkInfrastructure" ? (
                      <>
                        <Network className="h-3 w-3 mr-1" style={{ color: planColor }} />
                        Network
                      </>
                    ) : category === "researchDevelopment" ? (
                      <>
                        <Zap className="h-3 w-3 mr-1" style={{ color: planColor }} />
                        R&D
                      </>
                    ) : category === "customerSupport" ? (
                      <>
                        <Headphones className="h-3 w-3 mr-1" style={{ color: planColor }} />
                        Support
                      </>
                    ) : category === "maintenance" ? (
                      <>
                        <Settings className="h-3 w-3 mr-1" style={{ color: planColor }} />
                        Maintenance
                      </>
                    ) : category === "marketing" ? (
                      <>
                        <BarChart3 className="h-3 w-3 mr-1" style={{ color: planColor }} />
                        Marketing
                      </>
                    ) : category === "payroll" ? (
                      <>
                        <Users className="h-3 w-3 mr-1" style={{ color: planColor }} />
                        Payroll
                      </>
                    ) : (
                      <>
                        <Percent className="h-3 w-3 mr-1" style={{ color: planColor }} />
                        Profit
                      </>
                    )}
                  </span>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-white">{percentage}%</span>
                    <span className="text-xs text-gray-400 ml-1">
                      (£{((plan.price * percentage) / 100).toFixed(2)})
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: planColor,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700/50 text-xs text-gray-400">
          <p>We believe in transparency. This breakdown shows how your monthly payment is allocated.</p>
        </div>
      </motion.div>
    )
  }

  // Get top 3 payment categories for a plan
  const getTopCategories = (plan: any) => {
    return Object.entries(plan.paymentBreakdown)
      .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
      .slice(0, 3)
  }

  // Render the mini payment breakdown visualization
  const renderMiniBreakdown = (plan: any) => {
    const planColor = getPlanColor(plan.id)
    const topCategories = getTopCategories(plan)

    return (
      <div className="mt-3 pt-3 border-t border-gray-700/30">
        <div className="flex items-center mb-2">
          <PieChart className="h-3 w-3 mr-1" style={{ color: planColor }} />
          <span className="text-xs text-gray-400">Payment Allocation</span>
        </div>
        <div className="flex h-3 w-full rounded-full overflow-hidden">
          {topCategories.map(([category, percentage]: [string, any], index) => (
            <div
              key={category}
              className="h-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: planColor,
                opacity: index === 0 ? 1 : index === 1 ? 0.7 : 0.4,
              }}
              title={`${category}: ${percentage}%`}
            />
          ))}
          <div
            className="h-full"
            style={{
              width: `${100 - topCategories.reduce((acc, [, value]) => acc + value, 0)}%`,
              backgroundColor: planColor,
              opacity: 0.2,
            }}
            title="Other"
          />
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: planColor }}></span>
            <span className="text-xs text-gray-400">
              {topCategories[0][0] === "networkInfrastructure"
                ? "Network"
                : topCategories[0][0] === "customerSupport"
                  ? "Support"
                  : topCategories[0][0] === "researchDevelopment"
                    ? "R&D"
                    : topCategories[0][0]}
              : {topCategories[0][1]}%
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: planColor, opacity: 0.7 }}></span>
            <span className="text-xs text-gray-400">
              {topCategories[1][0] === "networkInfrastructure"
                ? "Network"
                : topCategories[1][0] === "customerSupport"
                  ? "Support"
                  : topCategories[1][0] === "researchDevelopment"
                    ? "R&D"
                    : topCategories[1][0]}
              : {topCategories[1][1]}%
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Render the full payment breakdown comparison view
  const renderBreakdownComparisonView = () => {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mb-6"
      >
        <div className="bg-black border border-[#474c54]/30 p-5 rounded-xl transition-all hover:shadow-md hover:shadow-[#000000]/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Banknote className="h-5 w-5 mr-2 text-[#bddfef]" />
              Payment Breakdown Comparison
            </h3>
            <button
              onClick={() => setShowBreakdownView(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {plans.map((plan) => {
              const planColor = getPlanColor(plan.id)
              return (
                <div key={plan.id} className="bg-gray-900/30 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-full mr-2" style={{ backgroundColor: `${planColor}20` }}>
                      <plan.icon className="h-4 w-4" style={{ color: planColor }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{plan.name}</h4>
                      <p className="text-xs text-gray-400">£{plan.price.toFixed(2)}/mo</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(plan.paymentBreakdown)
                      .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
                      .map(([category, percentage]: [string, any]) => (
                        <div key={category} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-300 capitalize">
                              {category === "networkInfrastructure"
                                ? "Network"
                                : category === "customerSupport"
                                  ? "Support"
                                  : category === "researchDevelopment"
                                    ? "R&D"
                                    : category}
                            </span>
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-white">{percentage}%</span>
                              <span className="text-xs text-gray-400 ml-1">
                                (£{((plan.price * percentage) / 100).toFixed(2)})
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: planColor,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-600/30">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <Info className="h-4 w-4 text-gray-400 mr-2" />
              Understanding Your Payment
            </h4>
            <p className="text-sm text-gray-300">
              We believe in transparency about how your monthly payment is allocated. The largest portion goes to
              network infrastructure and maintenance, ensuring you get reliable, high-speed service. Customer support
              and R&D investments help us provide excellent service and continue improving our technology.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  // Add these new functions after the renderBreakdownComparisonView function
  const toggleFeatureExpansion = (feature: string) => {
    setExpandedFeature(expandedFeature === feature ? null : feature)
  }

  const renderExpandedFeatureContent = () => {
    if (!expandedFeature) return null

    switch (expandedFeature) {
      case "speed":
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-[#474c54]/30 p-5 rounded-xl mb-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-[#bddfef]" />
                Speed Comparison
              </h3>
              <button
                onClick={() => setExpandedFeature(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Speed Visualization */}
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Download className="h-4 w-4 mr-2 text-[#bddfef]" />
                  Plan Speed Comparison
                </h4>
                <div className="space-y-4">
                  {plans.map((plan, index) => (
                    <div key={plan.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 flex items-center">
                          <plan.icon className="h-4 w-4 mr-2" style={{ color: getPlanColor(plan.id) }} />
                          {plan.name}
                        </span>
                        <span className="text-gray-400">{plan.downloadSpeed} Mbps</span>
                      </div>
                      <div className="w-full h-5 bg-gray-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(plan.downloadSpeed / 2500) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full rounded-full relative"
                          style={{
                            width: `${(plan.downloadSpeed / 2500) * 100}%`,
                            backgroundColor: getPlanColor(plan.id),
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 w-full"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${getPlanColor(plan.id)}60, transparent)`,
                            }}
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-world usage examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/40 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Download className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Download Times
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-700/50">
                          <th className="text-left py-2 font-medium text-gray-400">File Type</th>
                          {plans.map((plan) => (
                            <th key={`header-${plan.id}`} className="text-center py-2 font-medium text-gray-400">
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800/30">
                          <td className="py-2 text-gray-300">Photo (5MB)</td>
                          {plans.map((plan) => (
                            <td
                              key={`photo-${plan.id}`}
                              className="py-2 text-center font-medium"
                              style={{ color: getPlanColor(plan.id) }}
                            >
                              {((5 * 8) / plan.downloadSpeed).toFixed(2)}s
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-800/30">
                          <td className="py-2 text-gray-300">4K Movie (15GB)</td>
                          {plans.map((plan) => (
                            <td
                              key={`4kmovie-${plan.id}`}
                              className="py-2 text-center font-medium"
                              style={{ color: getPlanColor(plan.id) }}
                            >
                              {Math.floor((15 * 1000 * 8) / (plan.downloadSpeed * 60))}m{" "}
                              {Math.round(((15 * 1000 * 8) / plan.downloadSpeed) % 60)}s
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-300">Game (100GB)</td>
                          {plans.map((plan) => (
                            <td
                              key={`game-${plan.id}`}
                              className="py-2 text-center font-medium"
                              style={{ color: getPlanColor(plan.id) }}
                            >
                              {Math.floor((100 * 1000 * 8) / (plan.downloadSpeed * 60))}m{" "}
                              {Math.round(((100 * 1000 * 8) / plan.downloadSpeed) % 60)}s
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-900/40 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Upload className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Upload Times
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-700/50">
                          <th className="text-left py-2 font-medium text-gray-400">File Type</th>
                          {plans.map((plan) => (
                            <th key={`upload-header-${plan.id}`} className="text-center py-2 font-medium text-gray-400">
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800/30">
                          <td className="py-2 text-gray-300">Photos (50MB)</td>
                          {plans.map((plan) => (
                            <td
                              key={`photos-${plan.id}`}
                              className="py-2 text-center font-medium"
                              style={{ color: getPlanColor(plan.id) }}
                            >
                              {((50 * 8) / plan.uploadSpeed).toFixed(2)}s
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-800/30">
                          <td className="py-2 text-gray-300">Cloud Backup (10GB)</td>
                          {plans.map((plan) => (
                            <td
                              key={`backup-${plan.id}`}
                              className="py-2 text-center font-medium"
                              style={{ color: getPlanColor(plan.id) }}
                            >
                              {Math.floor((10 * 1000 * 8) / (plan.uploadSpeed * 60))}m{" "}
                              {Math.round(((10 * 1000 * 8) / plan.uploadSpeed) % 60)}s
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-600/30">
                <button
                  onClick={() => setShowSpeedComparison(true)}
                  className="px-4 py-2 bg-[#bddfef] text-black rounded-lg hover:bg-[#a5c7d7] transition-colors flex items-center"
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  View Full Speed Comparison
                </button>
              </div>
            </div>
          </motion.div>
        )
      case "payment":
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-[#474c54]/30 p-5 rounded-xl mb-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Banknote className="h-5 w-5 mr-2 text-[#bddfef]" />
                Payment Breakdown
              </h3>
              <button
                onClick={() => setExpandedFeature(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {plans.map((plan) => {
                const planColor = getPlanColor(plan.id)
                return (
                  <div key={plan.id} className="bg-gray-900/30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full mr-2" style={{ backgroundColor: `${planColor}20` }}>
                        <plan.icon className="h-4 w-4" style={{ color: planColor }} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{plan.name}</h4>
                        <p className="text-xs text-gray-400">£{plan.price.toFixed(2)}/mo</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(plan.paymentBreakdown)
                        .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
                        .slice(0, 4)
                        .map(([category, percentage]: [string, any]) => (
                          <div key={category} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-300 capitalize">
                                {category === "networkInfrastructure"
                                  ? "Network"
                                  : category === "customerSupport"
                                    ? "Support"
                                    : category === "researchDevelopment"
                                      ? "R&D"
                                      : category}
                              </span>
                              <div className="flex items-center">
                                <span className="text-xs font-medium text-white">{percentage}%</span>
                                <span className="text-xs text-gray-400 ml-1">
                                  (£{((plan.price * percentage) / 100).toFixed(2)})
                                </span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: planColor,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-600/30">
              <h4 className="font-medium text-white mb-3 flex items-center">
                <Info className="h-4 w-4 text-gray-400 mr-2" />
                Understanding Your Payment
              </h4>
              <p className="text-sm text-gray-300 mb-4">
                We believe in transparency about how your monthly payment is allocated. The largest portion goes to
                network infrastructure and maintenance, ensuring you get reliable, high-speed service. Customer support
                and R&D investments help us provide excellent service and continue improving our technology.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/40 p-3 rounded-lg">
                  <h5 className="text-white text-sm font-medium mb-2 flex items-center">
                    <Network className="h-3.5 w-3.5 mr-1.5 text-[#bddfef]" />
                    Network Investment
                  </h5>
                  <p className="text-xs text-gray-300">
                    28-35% of your payment goes directly to maintaining and expanding our high-speed fiber network
                    infrastructure, ensuring consistent speeds and reliability.
                  </p>
                </div>
                <div className="bg-gray-900/40 p-3 rounded-lg">
                  <h5 className="text-white text-sm font-medium mb-2 flex items-center">
                    <Headphones className="h-3.5 w-3.5 mr-1.5 text-[#bddfef]" />
                    Customer Support
                  </h5>
                  <p className="text-xs text-gray-300">
                    15-20% funds our 24/7 customer support team, technical assistance, and installation services to
                    ensure you have the best experience.
                  </p>
                </div>
                <div className="bg-gray-900/40 p-3 rounded-lg">
                  <h5 className="text-white text-sm font-medium mb-2 flex items-center">
                    <Zap className="h-3.5 w-3.5 mr-1.5 text-[#bddfef]" />
                    Research & Development
                  </h5>
                  <p className="text-xs text-gray-300">
                    10-16% is invested in developing new technologies and services to improve your internet experience
                    and keep our network future-proof.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      case "contract":
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-[#474c54]/30 p-5 rounded-xl mb-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#bddfef]" />
                Alt + F4 Anytime: Monthly Rolling Contracts
              </h3>
              <button
                onClick={() => setExpandedFeature(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full mr-3 bg-[#bddfef]/20">
                    <Calendar className="h-5 w-5 text-[#bddfef]" />
                  </div>
                  <h4 className="font-medium text-white">No Long-Term Commitment</h4>
                </div>
                <p className="text-sm text-gray-300">
                  All our plans come with our Alt + F4 Anytime policy, which means you're never locked into a long-term
                  contract. Stay with us because you want to, not because you have to.
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Monthly rolling contracts with just 30 days notice</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">No early termination fees</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Simple online cancellation process</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/30 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full mr-3 bg-[#bddfef]/20">
                    <RefreshCw className="h-5 w-5 text-[#bddfef]" />
                  </div>
                  <h4 className="font-medium text-white">How It Works</h4>
                </div>
                <ol className="mt-3 space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#bddfef]/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-[#bddfef]">1</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-white">Sign Up</h5>
                      <p className="text-xs text-gray-300">Choose your plan and complete the signup process</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#bddfef]/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-[#bddfef]">2</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-white">Enjoy Your Service</h5>
                      <p className="text-xs text-gray-300">
                        Experience our high-speed broadband with no commitment worries
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#bddfef]/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-[#bddfef]">3</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-white">Cancel Anytime</h5>
                      <p className="text-xs text-gray-300">
                        If needed, simply give 30 days notice through your account dashboard
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-900/30 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full mr-3 bg-[#bddfef]/20">
                    <AlertCircle className="h-5 w-5 text-[#bddfef]" />
                  </div>
                  <h4 className="font-medium text-white">Frequently Asked Questions</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-white">Are there any hidden fees?</h5>
                    <p className="text-xs text-gray-300">
                      No, we're completely transparent about our pricing. What you see is what you pay.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">What happens to my equipment if I cancel?</h5>
                    <p className="text-xs text-gray-300">
                      We'll provide a prepaid return label for the router. Other equipment is yours to keep.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">
                      Can I switch plans without restarting my contract?
                    </h5>
                    <p className="text-xs text-gray-300">
                      Yes! You can upgrade or downgrade your plan at any time without affecting your monthly rolling
                      status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }
  return (
    <div>
      {errors.plan && (
        <div className="mb-4 p-3 bg-red-900/20 backdrop-blur-sm border border-red-500/50 rounded-xl">
          <p className="text-sm text-red-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.plan[0]}
          </p>
        </div>
      )}

      {/* Expanded Speed Comparison View */}
      <AnimatePresence>
        {isSpeedExpandedView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-black border border-[#474c54]/30 p-5 rounded-xl transition-all hover:shadow-md hover:shadow-[#000000]/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-[#bddfef]" />
                  Speed Comparison
                </h3>
                <button
                  onClick={() => {
                    setIsSpeedExpandedView(false)
                    setIsSpeedDropdownOpen(false)
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Speed Visualization */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Download className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Plan Speed Comparison
                  </h4>
                  <div className="space-y-4">
                    {plans.map((plan, index) => (
                      <div key={plan.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300 flex items-center">
                            <plan.icon className="h-4 w-4 mr-2" style={{ color: getPlanColor(plan.id) }} />
                            {plan.name}
                          </span>
                          <span className="text-gray-400">{plan.downloadSpeed} Mbps</span>
                        </div>
                        <div className="w-full h-5 bg-gray-900 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full relative"
                            style={{
                              width: `${(plan.downloadSpeed / 2500) * 100}%`,
                              backgroundColor: getPlanColor(plan.id),
                            }}
                          >
                            <div
                              className="absolute inset-0 w-full"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${getPlanColor(plan.id)}60, transparent)`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-world usage examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/40 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Download className="h-4 w-4 mr-2 text-[#bddfef]" />
                      Download Times
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-700/50">
                            <th className="text-left py-2 font-medium text-gray-400">File Type</th>
                            {plans.map((plan) => (
                              <th key={`header-${plan.id}`} className="text-center py-2 font-medium text-gray-400">
                                {plan.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800/30">
                            <td className="py-2 text-gray-300">Photo (5MB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`photo-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {((5 * 8) / plan.downloadSpeed).toFixed(2)}s
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800/30">
                            <td className="py-2 text-gray-300">Song (30MB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`song-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {((30 * 8) / plan.downloadSpeed).toFixed(2)}s
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800/30">
                            <td className="py-2 text-gray-300">HD Movie (4GB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`hdmovie-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {((4 * 1000 * 8) / plan.downloadSpeed).toFixed(0)}s
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800/30">
                            <td className="py-2 text-gray-300">4K Movie (15GB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`4kmovie-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {Math.floor((15 * 1000 * 8) / (plan.downloadSpeed * 60))}m{" "}
                                {Math.round(((15 * 1000 * 8) / plan.downloadSpeed) % 60)}s
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-300">Game (100GB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`game-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {Math.floor((100 * 1000 * 8) / (plan.downloadSpeed * 60))}m{" "}
                                {Math.round(((100 * 1000 * 8) / plan.downloadSpeed) % 60)}s
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-900/40 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Upload className="h-4 w-4 mr-2 text-[#bddfef]" />
                      Upload Times
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-700/50">
                            <th className="text-left py-2 font-medium text-gray-400">File Type</th>
                            {plans.map((plan) => (
                              <th
                                key={`upload-header-${plan.id}`}
                                className="text-center py-2 font-medium text-gray-400"
                              >
                                {plan.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800/30">
                            <td className="py-2 text-gray-300">Photos (50MB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`photos-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {((50 * 8) / plan.uploadSpeed).toFixed(2)}s
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800/30">
                            <td className="py-2 text-gray-300">Video Call (1 hour)</td>
                            {plans.map((plan) => (
                              <td
                                key={`videocall-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {plan.uploadSpeed >= 5 ? "Excellent" : plan.uploadSpeed >= 2 ? "Good" : "Fair"}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-800/30">
                            <td className="py-2 text-gray-300">Cloud Backup (10GB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`backup-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {Math.floor((10 * 1000 * 8) / (plan.uploadSpeed * 60))}m{" "}
                                {Math.round(((10 * 1000 * 8) / plan.uploadSpeed) % 60)}s
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-300">Video Upload (1GB)</td>
                            {plans.map((plan) => (
                              <td
                                key={`videoup-${plan.id}`}
                                className="py-2 text-center font-medium"
                                style={{ color: getPlanColor(plan.id) }}
                              >
                                {((1000 * 8) / plan.uploadSpeed).toFixed(0)}s
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Device requirements */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Multiple Device Usage
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {plans.map((plan) => (
                      <div key={`devices-${plan.id}`} className="bg-gray-900/40 p-3 rounded-lg">
                        <h5 className="text-white text-xs font-medium mb-2 flex items-center">
                          <plan.icon className="h-3.5 w-3.5 mr-1.5" style={{ color: getPlanColor(plan.id) }} />
                          {plan.name} ({plan.downloadSpeed} Mbps)
                        </h5>
                        <div className="text-xs text-gray-300">
                          {plan.downloadSpeed <= 900 ? (
                            <p>
                              Supports up to 3-4 devices streaming HD content simultaneously, or 1 device streaming 4K
                              while others browse.
                            </p>
                          ) : plan.downloadSpeed <= 1200 ? (
                            <p>
                              Supports up to 5-6 devices streaming HD content, 2-3 devices streaming 4K, or multiple
                              gaming sessions.
                            </p>
                          ) : plan.downloadSpeed <= 2000 ? (
                            <p>
                              Supports 8+ devices streaming HD, 3-4 devices streaming 4K, or a mix of gaming, video
                              calls, and streaming.
                            </p>
                          ) : (
                            <p>
                              Supports 10+ devices streaming HD, 4-5 devices streaming 4K, multiple gaming sessions, and
                              professional workloads.
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Requirements */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Speed Requirements by Activity
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/40 p-3 rounded-lg">
                      <h5 className="text-white text-sm font-medium mb-2">Streaming</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">SD Video:</span>
                          <span className="text-gray-300">3-5 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">HD Video:</span>
                          <span className="text-gray-300">5-10 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">4K Video:</span>
                          <span className="text-gray-300">25-35 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">8K Video:</span>
                          <span className="text-gray-300">65-85 Mbps</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-lg">
                      <h5 className="text-white text-sm font-medium mb-2">Gaming</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Casual Gaming:</span>
                          <span className="text-gray-300">3-6 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Online Gaming:</span>
                          <span className="text-gray-300">15-25 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Competitive Gaming:</span>
                          <span className="text-gray-300">25-50 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cloud Gaming:</span>
                          <span className="text-gray-300">35-100 Mbps</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-lg">
                      <h5 className="text-white text-sm font-medium mb-2">Video Conferencing</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Standard Quality:</span>
                          <span className="text-gray-300">1-2 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">HD Quality:</span>
                          <span className="text-gray-300">3-4 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Group Calls:</span>
                          <span className="text-gray-300">5-10 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">4K Video Calls:</span>
                          <span className="text-gray-300">15-20 Mbps</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 p-3 rounded-lg">
                      <h5 className="text-white text-sm font-medium mb-2">Work From Home</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Basic (Email, Web):</span>
                          <span className="text-gray-300">5-10 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Standard (Video Calls):</span>
                          <span className="text-gray-300">15-25 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Advanced (File Transfers):</span>
                          <span className="text-gray-300">50-100 Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Professional (Multiple Users):</span>
                          <span className="text-gray-300">100+ Mbps</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latency Comparison */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Latency Comparison
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {plans.map((plan) => (
                      <div key={`latency-${plan.id}`} className="bg-gray-900/40 p-3 rounded-lg">
                        <h5 className="text-white text-xs font-medium mb-2 flex items-center">
                          <plan.icon className="h-3.5 w-3.5 mr-1.5" style={{ color: getPlanColor(plan.id) }} />
                          {plan.name}
                        </h5>
                        <div className="text-center mb-2">
                          <span className="text-lg font-bold" style={{ color: getPlanColor(plan.id) }}>
                            {plan.techSpecs.latency}
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          {plan.id === 1 ? (
                            <p>
                              Good for casual gaming and video calls. May experience occasional lag in competitive
                              games.
                            </p>
                          ) : plan.id === 2 ? (
                            <p>Great for most online gaming and video conferencing with minimal lag.</p>
                          ) : plan.id === 3 ? (
                            <p>Excellent for competitive gaming and professional video conferencing.</p>
                          ) : (
                            <p>Ultra-low latency ideal for professional esports and mission-critical applications.</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Speed Comparison Box */}
        <div
          className={`bg-black border transition-all cursor-pointer hover:shadow-md ${
            expandedFeature === "speed" ? "border-[#bddfef]" : "border-gray-600/50 hover:border-[#bddfef]/60"
          } rounded-lg p-4`}
          onClick={() => toggleFeatureExpansion("speed")}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full mr-3 bg-[#bddfef]/20">
              <Zap className="h-5 w-5 text-[#bddfef]" />
            </div>
            <h3 className="font-medium text-lg text-white">Speed Comparison</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            See how our different plans perform with real-world examples and interactive visualizations.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1 text-[#bddfef]" />
              <span className="text-xs text-gray-300">900 - 2300 Mbps</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${expandedFeature === "speed" ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Payment Breakdown Box */}
        <div
          className={`bg-black border transition-all cursor-pointer hover:shadow-md ${
            expandedFeature === "payment" ? "border-[#bddfef]" : "border-gray-600/50 hover:border-[#bddfef]/60"
          } rounded-lg p-4`}
          onClick={() => toggleFeatureExpansion("payment")}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full mr-3 bg-[#bddfef]/20">
              <Banknote className="h-5 w-5 text-[#bddfef]" />
            </div>
            <h3 className="font-medium text-lg text-white">Payment Breakdown</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Transparent pricing with detailed breakdown of how your monthly payment is allocated.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <PieChart className="h-4 w-4 mr-1 text-[#bddfef]" />
              <span className="text-xs text-gray-300">See where your money goes</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${expandedFeature === "payment" ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Alt + F4 Anytime Box */}
        <div
          className={`bg-black border transition-all cursor-pointer hover:shadow-md ${
            expandedFeature === "contract" ? "border-[#bddfef]" : "border-gray-600/50 hover:border-[#bddfef]/60"
          } rounded-lg p-4`}
          onClick={() => toggleFeatureExpansion("contract")}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full mr-3 bg-[#bddfef]/20">
              <Calendar className="h-5 w-5 text-[#bddfef]" />
            </div>
            <h3 className="font-medium text-lg text-white">Alt + F4 Anytime</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Our monthly rolling contracts give you complete freedom with no long-term commitments.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-1 text-[#bddfef]" />
              <span className="text-xs text-gray-300">30-day rolling contracts</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${expandedFeature === "contract" ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </div>

      {/* Clickable Plans Hint */}
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

      {/* Expanded Feature Content */}
      <AnimatePresence>{expandedFeature && renderExpandedFeatureContent()}</AnimatePresence>

      {/* Plans Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 grid-flow-row auto-rows-fr">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan?.id === plan.id
          const pastelColor = pastelColors[plan.id as keyof typeof pastelColors]
          const planColor = getPlanColor(plan.id)
          const headerIconColor = getHeaderIconColor(plan.id, isSelected)
          const showBreakdown = showPaymentBreakdown === plan.id

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleSelectPlan(plan)}
              className={`border border-gray-600/50 transition-all rounded-lg backdrop-blur-sm overflow-hidden cursor-pointer hover:shadow-md h-full flex flex-col ${
                isSelected
                  ? "shadow-lg shadow-[#bddfef]/20"
                  : "bg-black hover:border-gray-500 hover:shadow-md hover:border-[#bddfef]/60"
              }`}
              style={isSelected ? { borderColor: pastelColor } : {}}
              role="button"
              aria-pressed={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleSelectPlan(plan)
                }
              }}
            >
              {/* Plan Header - Colored when selected */}
              <div
                className={`p-4 border-b border-gray-700/30 ${isSelected ? "" : ""}`}
                style={isSelected ? { backgroundColor: pastelColor } : {}}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div>
                      <h3 className={`font-bold text-xl ${isSelected ? "text-black" : "text-white"}`}>{plan.name}</h3>
                      <p className={`text-sm ${isSelected ? "text-black/80" : "text-gray-400"}`}>{plan.tagline}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-black" />
                    </div>
                  )}
                </div>

                {/* Price and Alt+F4 Anytime */}
                <div className="flex justify-between items-center mt-3">
                  <div className={`text-2xl font-bold ${isSelected ? "text-black" : "text-white"}`}>
                    £{plan.price.toFixed(2)}
                    <span className={`text-sm font-normal ${isSelected ? "text-black/70" : "text-gray-400"}`}>/mo</span>
                  </div>
                  <div className={`flex items-center text-xs ${isSelected ? "text-black/80" : "text-gray-400"}`}>
                    <Calendar className="h-4 w-4 mr-1" />
                    Alt + F4 Anytime
                  </div>
                </div>
              </div>

              {/* Plan Content */}
              <div className="p-4 bg-black flex-grow flex flex-col">
                {/* Speed Indicators */}
                <div className="bg-gray-900/30 p-3 rounded-lg flex justify-between items-center mb-4">
                  <div className="flex flex-col items-center flex-1 border-r border-gray-700/30 pr-2">
                    <Download className="h-4 w-4 mb-1" style={{ color: planColor }} />
                    <div className="text-sm font-medium text-white">{plan.downloadSpeed}</div>
                    <div className="text-xs text-gray-400">Download</div>
                  </div>
                  <div className="flex flex-col items-center flex-1 border-r border-gray-700/30 px-2">
                    <Upload className="h-4 w-4 mb-1" style={{ color: planColor }} />
                    <div className="text-sm font-medium text-white">{plan.uploadSpeed}</div>
                    <div className="text-xs text-gray-400">Upload</div>
                  </div>
                  <div className="flex flex-col items-center flex-1 pl-2">
                    {plan.technology === "GPON" ? (
                      <Network className="h-4 w-4 mb-1" style={{ color: planColor }} />
                    ) : (
                      <Zap className="h-4 w-4 mb-1" style={{ color: planColor }} />
                    )}
                    <div className="text-sm font-medium text-white">{plan.technology}</div>
                    <div className="text-xs text-gray-400">Technology</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-4 flex-grow">
                  <h4 className="font-medium text-white mb-2 text-sm">Key Features</h4>
                  <ul className="space-y-2">
                    {[
                      "Static IPv4 address",
                      "/48 IPv6 subnet",
                      "Toggle (upgrade or downgrade anytime)",
                      "Unlimited data",
                      "Bring your own IP's",
                      "Bring your own router",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: planColor }} />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment Breakdown Visualization - NEW SECTION */}
                {renderMiniBreakdown(plan)}

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-700/30 flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={(e) => openDetailModal(plan, e, "features")}
                      className="text-xs flex items-center px-3 py-1.5 rounded-full transition-colors"
                      style={{
                        backgroundColor: `${planColor}20`,
                        color: planColor,
                        borderColor: `${planColor}30`,
                        border: "1px solid",
                      }}
                    >
                      <Maximize2 className="h-3 w-3 mr-1" />
                      Plan Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openDetailModal(plan, e, "breakdown")
                      }}
                      className="text-xs flex items-center px-3 py-1.5 rounded-full transition-colors"
                      style={{
                        backgroundColor: `${planColor}20`,
                        color: planColor,
                        borderColor: `${planColor}30`,
                        border: "1px solid",
                      }}
                    >
                      <Banknote className="h-3 w-3 mr-1.5" />
                      See Full Breakdown
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* View Toggle - Moved to bottom */}
      <div className="flex items-center mt-8 mb-6 justify-center">
        <button
          onClick={() => setShowTechDetails(!showTechDetails)}
          className="flex items-center text-sm text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full border border-[#474c54]/30"
        >
          <Info className="h-4 w-4 mr-2" />
          Fibre Technology Info
          {showTechDetails ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
        </button>
      </div>
      {/* Technology Details Section */}
      <AnimatePresence>
        {showTechDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-black border border-[#474c54]/30 p-5 rounded-xl transition-all hover:shadow-md hover:shadow-[#000000]/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-black p-2 rounded-full mr-3 border border-[#474c54]/30">
                      <Network className="h-5 w-5 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-white">GPON Technology</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Up to 2.5 Gbps downstream capacity</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Up to 1.25 Gbps upstream capacity</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Perfect for residential use</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Widely deployed technology</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-black p-2 rounded-full mr-3 border border-[#474c54]/30">
                      <Zap className="h-5 w-5 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-white">XGS-PON Technology</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Up to 10 Gbps downstream capacity</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Up to 10 Gbps upstream capacity (symmetric)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Ideal for heavy uploaders and businesses</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Future-proof technology</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-600/30">
                <h4 className="font-medium text-white mb-2">Upgrade Path</h4>
                <p className="text-sm text-gray-300">
                  All our GPON connections can be upgraded to XGS-PON in the future for a one-time fee. This upgrade
                  requires an engineer visit to replace your ONT (Optical Network Terminal) with an XGS-PON compatible
                  unit. The upgrade process typically takes 1-2 hours and allows you to access our higher-tier plans.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-600/30">
                <h4 className="font-medium text-white mb-2 flex items-center">
                  <RefreshCw className="h-4 w-4 text-gray-400 mr-2" />
                  Plan Switching Policy
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  You can switch between plans after your first 30 days of service. Upgrading to a higher tier is
                  usually free and can be done instantly through your online account, while downgrading may incur a fee
                  depending on your current plan.
                </p>
                <div className="bg-black p-3 rounded-lg border border-[#474c54]/30">
                  <h5 className="text-sm font-medium text-white mb-2">Important Notes:</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">
                        Upgrading to a higher tier resets your contract to 18 months
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">Downgrading maintains your current contract length</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">
                        Switching between GPON and XGS-PON technologies may require an engineer visit
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">
                        You can switch plans up to 2 times per year at no additional administrative cost
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plan Details Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-gray-700">
          {selectedDetailPlan && (
            <>
              <DialogHeader>
                <div className="flex items-center">
                  <div
                    className="p-2 mr-3 rounded-full"
                    style={{ backgroundColor: `${getPlanColor(selectedDetailPlan.id)}30` }}
                  >
                    <selectedDetailPlan.icon
                      className="h-5 w-5"
                      style={{ color: getPlanColor(selectedDetailPlan.id) }}
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-xl flex items-center">
                      {selectedDetailPlan.name}
                      {selectedDetailPlan.popular && (
                        <span className="ml-2 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
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
                  <div className="text-2xl font-bold text-white">£{selectedDetailPlan.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex flex-col mr-4">
                      <div className="text-sm text-gray-400 mb-1">Speed & Technology</div>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-gray-800/40 text-white border border-gray-700/30 text-xs px-2.5 py-0.5 inline-flex items-center rounded-md shadow-sm">
                          <Download className="h-3 w-3 mr-1.5" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          <span className="font-medium">{selectedDetailPlan.downloadSpeed}</span> Mbps
                        </div>
                        <div className="bg-gray-800/40 text-white border border-gray-700/30 text-xs px-2.5 py-0.5 inline-flex items-center rounded-md shadow-sm">
                          <Upload className="h-3 w-3 mr-1.5" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          <span className="font-medium">{selectedDetailPlan.uploadSpeed}</span> Mbps
                        </div>
                        <div className="bg-gray-800/40 text-white border border-gray-700/30 text-xs px-2.5 py-0.5 inline-flex items-center rounded-md shadow-sm">
                          {selectedDetailPlan.technology === "GPON" ? (
                            <Network
                              className="h-3 w-3 mr-1.5"
                              style={{ color: getPlanColor(selectedDetailPlan.id) }}
                            />
                          ) : (
                            <Zap className="h-3 w-3 mr-1.5" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          )}
                          <span className="font-medium">{selectedDetailPlan.technology}</span>
                        </div>
                      </div>
                    </div>
                    {selectedPlan?.id !== selectedDetailPlan.id && (
                      <Button
                        onClick={() => {
                          handleSelectPlan(selectedDetailPlan)
                          setShowDetailModal(false)
                        }}
                        className="px-6 py-2 rounded-full text-sm font-medium"
                        style={{ backgroundColor: getPlanColor(selectedDetailPlan.id), color: "black" }}
                      >
                        Select Plan
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Speed Visualization - NEW SECTION */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    <Zap className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                    Speed Visualization
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-400">Download: </div>
                    <div className="font-medium text-white">{selectedDetailPlan.downloadSpeed} Mbps</div>
                    <div className="mx-2 text-gray-500">|</div>
                    <div className="text-sm text-gray-400">Upload: </div>
                    <div className="font-medium text-white">{selectedDetailPlan.uploadSpeed} Mbps</div>
                  </div>
                </div>
                <div className="bg-gray-900/30 rounded-lg overflow-hidden border border-gray-700/50 p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        </motion.div>
                        Download Speed
                      </h4>
                      <div className="h-6 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedDetailPlan.downloadSpeed / 2500) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full relative"
                          style={{ backgroundColor: getPlanColor(selectedDetailPlan.id) }}
                        >
                          <motion.div
                            className="absolute inset-0 w-full"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${getPlanColor(selectedDetailPlan.id)}40, transparent)`,
                            }}
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-2 text-center font-bold text-white"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        >
                          {selectedDetailPlan.downloadSpeed} Mbps
                        </motion.span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-4 space-y-2"
                      >
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1, duration: 0.3 }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <CheckCircle
                            className="h-3.5 w-3.5 mr-2"
                            style={{ color: getPlanColor(selectedDetailPlan.id) }}
                          />
                          {selectedDetailPlan.downloadSpeed >= 1000 ? "Multiple 4K streams" : "HD streaming"}
                        </motion.div>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.3 }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <CheckCircle
                            className="h-3.5 w-3.5 mr-2"
                            style={{ color: getPlanColor(selectedDetailPlan.id) }}
                          />
                          {selectedDetailPlan.downloadSpeed >= 2000 ? "Fast large file downloads" : "Quick downloads"}
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 0.3,
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        </motion.div>
                        Upload Speed
                      </h4>
                      <div className="h-6 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedDetailPlan.uploadSpeed / 2500) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                          className="h-full rounded-full relative"
                          style={{ backgroundColor: getPlanColor(selectedDetailPlan.id) }}
                        >
                          <motion.div
                            className="absolute inset-0 w-full"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${getPlanColor(selectedDetailPlan.id)}40, transparent)`,
                            }}
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.5 }}
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-2 text-center font-bold text-white"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 0.2,
                          }}
                        >
                          {selectedDetailPlan.uploadSpeed} Mbps
                        </motion.span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-4 space-y-2"
                      >
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.3, duration: 0.3 }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <CheckCircle
                            className="h-3.5 w-3.5 mr-2"
                            style={{ color: getPlanColor(selectedDetailPlan.id) }}
                          />
                          {selectedDetailPlan.uploadSpeed >= 1000 ? "Video conferencing" : "Video calls"}
                        </motion.div>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.5, duration: 0.3 }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <CheckCircle
                            className="h-3.5 w-3.5 mr-2"
                            style={{ color: getPlanColor(selectedDetailPlan.id) }}
                          />
                          {selectedDetailPlan.uploadSpeed >= 2000 ? "Fast cloud backups" : "File sharing"}
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap border-b border-gray-700 mb-6">
                {[
                  { id: "features", label: "Features" },
                  { id: "technical", label: "Technical Specs" },
                  { id: "support", label: "Support" },
                  { id: "switching", label: "Plan Switching" },
                  { id: "breakdown", label: "Payment Breakdown" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium flex items-center ${
                      activeTab === tab.id
                        ? "border-b-2 text-white"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                    }`}
                    style={activeTab === tab.id ? { borderColor: getPlanColor(selectedDetailPlan.id) } : undefined}
                  >
                    {tabIcons[tab.id as keyof typeof tabIcons]}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mb-6">
                {/* Features Tab */}
                {activeTab === "features" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-mediummmm text-white mb-4 flex items-center">
                        <Check className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        All Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedDetailPlan.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle
                              className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                              style={{ color: getPlanColor(selectedDetailPlan.id) }}
                            />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-700">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                          <Users className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          Ideal For
                        </h3>
                        <div className="space-y-2">
                          {selectedDetailPlan.idealFor.map((item: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <Check
                                className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                                style={{ color: getPlanColor(selectedDetailPlan.id) }}
                              />
                              <span className="text-sm text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                          <X className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          Not Ideal For
                        </h3>
                        <div className="space-y-2">
                          {selectedDetailPlan.notIdealFor.map((item: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <X
                                className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                                style={{ color: getPlanColor(selectedDetailPlan.id) }}
                              />
                              <span className="text-sm text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Specs Tab */}
                {activeTab === "technical" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Server className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        Technical Specifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {Object.entries(selectedDetailPlan.techSpecs).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400 capitalize">
                              {key === "ipAddress"
                                ? "IP Address"
                                : key === "ipv6"
                                  ? "IPv6"
                                  : key === "dns"
                                    ? "DNS"
                                    : key}
                            </span>
                            <span className="text-base text-gray-200">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Network className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        Technology & Upgrade Path
                      </h3>
                      <div className="p-4 bg-gray-900/30 rounded-lg">
                        <div className="flex items-center mb-3">
                          {selectedDetailPlan.technology === "GPON" ? (
                            <Network className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          ) : (
                            <Zap className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          )}
                          <span className="text-lg font-medium text-white">
                            {selectedDetailPlan.technology} Technology
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">
                          {selectedDetailPlan.technology === "GPON"
                            ? "GPON (Gigabit Passive Optical Network) provides up to 2.5 Gbps downstream and 1.25 Gbps upstream shared capacity. It's perfect for residential use with excellent reliability."
                            : "XGS-PON (10 Gigabit Symmetric Passive Optical Network) provides up to 10 Gbps symmetric bandwidth. This future-proof technology offers the highest performance for demanding users."}
                        </p>
                        <div className="flex items-center">
                          {selectedDetailPlan.technology === "GPON" ? (
                            <ArrowUpRight
                              className="h-4 w-4 mr-2"
                              style={{ color: getPlanColor(selectedDetailPlan.id) }}
                            />
                          ) : (
                            <Check className="h-4 w-4 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          )}
                          <span className="text-sm text-gray-300">{selectedDetailPlan.upgradePath}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Router Details Tab */}
                {activeTab === "router" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Router className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        Router Specifications
                      </h3>
                      <div className="p-4 bg-gray-900/30 rounded-lg">
                        <div className="flex items-center mb-4">
                          <div
                            className="p-3 rounded-full mr-3"
                            style={{ backgroundColor: `${getPlanColor(selectedDetailPlan.id)}20` }}
                          >
                            <Router className="h-6 w-6" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white">{selectedDetailPlan.routerDetails.model}</h4>
                            <p className="text-sm text-gray-400">Included with your {selectedDetailPlan.name} plan</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Wi-Fi Standard</span>
                            <span className="text-base text-gray-200">{selectedDetailPlan.routerDetails.wifi}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Ethernet Ports</span>
                            <span className="text-base text-gray-200">{selectedDetailPlan.routerDetails.ports}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Coverage</span>
                            <span className="text-base text-gray-200">{selectedDetailPlan.routerDetails.coverage}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Dimensions</span>
                            <span className="text-base text-gray-200">
                              {selectedDetailPlan.routerDetails.dimensions}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Warranty</span>
                            <span className="text-base text-gray-200">{selectedDetailPlan.routerDetails.warranty}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Mesh Compatibility</span>
                            <span className="text-base text-gray-200">{selectedDetailPlan.routerDetails.upgrades}</span>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-base font-medium text-white mb-3">Features</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedDetailPlan.routerDetails.features.map((feature: string, index: number) => (
                              <div key={index} className="flex items-center">
                                <Check
                                  className="h-4 w-4 mr-2"
                                  style={{ color: getPlanColor(selectedDetailPlan.id) }}
                                />
                                <span className="text-sm text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Support Tab */}
                {activeTab === "support" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Headphones className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        Support Details
                      </h3>
                      <div className="p-4 bg-gray-900/30 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Support Hours</span>
                            <span className="text-base text-gray-200">{selectedDetailPlan.supportDetails.hours}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Response Time</span>
                            <span className="text-base text-gray-200">
                              {selectedDetailPlan.supportDetails.responseTime}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Installation</span>
                            <span className="text-base text-gray-200">
                              {selectedDetailPlan.supportDetails.installation}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">Priority Support</span>
                            <span className="text-base text-gray-200">
                              {selectedDetailPlan.supportDetails.prioritySupport ? "Yes" : "No"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">On-Site Support</span>
                            <span className="text-base text-gray-200">
                              {selectedDetailPlan.supportDetails.onSiteSupport}
                            </span>
                          </div>
                          {selectedDetailPlan.supportDetails.dedicatedManager && (
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-400">Account Manager</span>
                              <span className="text-base text-gray-200">
                                {selectedDetailPlan.supportDetails.dedicatedManager}
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          <h5 className="text-base font-medium text-white mb-3">Support Channels</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedDetailPlan.supportDetails.channels.map((channel: string, index: number) => (
                              <div
                                key={index}
                                className="px-3 py-1 rounded-full text-sm"
                                style={{
                                  backgroundColor: `${getPlanColor(selectedDetailPlan.id)}20`,
                                  color: getPlanColor(selectedDetailPlan.id),
                                }}
                              >
                                {channel}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Usage Scenarios Tab */}
                {activeTab === "usage" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        Usage Scenarios
                      </h3>
                      <div className="space-y-4">
                        {selectedDetailPlan.usageScenarios.map((scenario: any, index: number) => (
                          <div key={index} className="p-4 bg-gray-900/30 rounded-lg">
                            <h4 className="text-base font-medium text-white mb-2">{scenario.name}</h4>
                            <div className="flex items-center mb-2">
                              <div
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: `${getPlanColor(selectedDetailPlan.id)}20`,
                                  color: getPlanColor(selectedDetailPlan.id),
                                }}
                              >
                                {scenario.performance}
                              </div>
                            </div>
                            <p className="text-sm text-gray-300">{scenario.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Plan Switching Tab */}
                {activeTab === "switching" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <RefreshCw className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        Plan Switching Information
                      </h3>
                      <div className="p-4 bg-gray-900/30 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-base font-medium text-white mb-3 flex items-center">
                              <ArrowUp
                                className="h-4 w-4 mr-2"
                                style={{ color: getPlanColor(selectedDetailPlan.id) }}
                              />
                              Upgrading
                            </h5>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-sm font-medium text-gray-400 w-24 flex-shrink-0">Fee:</span>
                                <span className="text-sm text-gray-300">
                                  {selectedDetailPlan.planSwitchingInfo.upgradeFee === 0
                                    ? "Free"
                                    : `£${selectedDetailPlan.planSwitchingInfo.upgradeFee}`}
                                </span>
                              </div>
                              <div className="flex items-start">
                                <span className="text-sm font-medium text-gray-400 w-24 flex-shrink-0">Process:</span>
                                <span className="text-sm text-gray-300">
                                  {selectedDetailPlan.planSwitchingInfo.upgradingProcess}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-base font-medium text-white mb-3 flex items-center">
                              <ArrowDown
                                className="h-4 w-4 mr-2"
                                style={{ color: getPlanColor(selectedDetailPlan.id) }}
                              />
                              Downgrading
                            </h5>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <span className="text-sm font-medium text-gray-400 w-24 flex-shrink-0">Fee:</span>
                                <span className="text-sm text-gray-300">
                                  {selectedDetailPlan.planSwitchingInfo.downgradeFee}
                                </span>
                              </div>
                              <div className="flex items-start">
                                <span className="text-sm font-medium text-gray-400 w-24 flex-shrink-0">Process:</span>
                                <span className="text-sm text-gray-300">
                                  {selectedDetailPlan.planSwitchingInfo.downgradingProcess}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Calendar
                            className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5"
                            style={{ color: getPlanColor(selectedDetailPlan.id) }}
                          />
                          <div>
                            <h5 className="text-base font-medium text-white mb-1">Waiting Period</h5>
                            <p className="text-sm text-gray-300">
                              {selectedDetailPlan.planSwitchingInfo.switchingPeriod}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock
                            className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5"
                            style={{ color: getPlanColor(selectedDetailPlan.id) }}
                          />
                          <div>
                            <h5 className="text-base font-medium text-white mb-1">Contract Impact</h5>
                            <p className="text-sm text-gray-300">
                              {selectedDetailPlan.planSwitchingInfo.contractImpact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Breakdown Tab */}
                {activeTab === "breakdown" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Banknote className="h-5 w-5 mr-2" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                        Where Your Payment Goes
                      </h3>
                      <p className="text-sm text-gray-300 mb-6">
                        We believe in transparency. Here's a breakdown of how your monthly payment of £
                        {selectedDetailPlan.price.toFixed(2)} is allocated across our operations.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          {Object.entries(selectedDetailPlan.paymentBreakdown).map(
                            ([category, percentage]: [string, any]) => (
                              <div key={category} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-300 capitalize">
                                    {category === "networkInfrastructure"
                                      ? "Network Infrastructure"
                                      : category === "researchDevelopment"
                                        ? "Research & Development"
                                        : category === "customerSupport"
                                          ? "Customer Support"
                                          : category}
                                  </span>
                                  <span className="text-sm font-medium text-white">{percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                      width: `${percentage}%`,
                                      backgroundColor: getPlanColor(selectedDetailPlan.id),
                                    }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-400">
                                  {category === "networkInfrastructure" &&
                                    "Investment in fiber optic cables, equipment, and data centers to ensure fast, reliable service."}
                                  {category === "maintenance" &&
                                    "Regular maintenance and upgrades to keep our network running smoothly."}
                                  {category === "customerSupport" &&
                                    "Our dedicated support team available to help you 24/7."}
                                  {category === "researchDevelopment" &&
                                    "Developing new technologies and services to improve your experience."}
                                  {category === "marketing" && "Reaching new customers and communicating our services."}
                                  {category === "payroll" &&
                                    "Salaries for our talented team members who make everything possible."}
                                  {category === "profit" &&
                                    "Reinvestment in our business and returns to our investors."}
                                </p>
                              </div>
                            ),
                          )}
                        </div>

                        <div className="bg-gray-900/30 p-5 rounded-lg">
                          <h4 className="font-medium text-white mb-4">Our Commitment to Value</h4>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div
                                className="p-2 rounded-full mr-3 flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: `${getPlanColor(selectedDetailPlan.id)}20` }}
                              >
                                <Network className="h-4 w-4" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Network Investment</h5>
                                <p className="text-xs text-gray-300">
                                  The largest portion of your payment goes directly to maintaining and expanding our
                                  high-speed fiber network.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div
                                className="p-2 rounded-full mr-3 flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: `${getPlanColor(selectedDetailPlan.id)}20` }}
                              >
                                <Headphones
                                  className="h-4 w-4"
                                  style={{ color: getPlanColor(selectedDetailPlan.id) }}
                                />
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Customer-First Approach</h5>
                                <p className="text-xs text-gray-300">
                                  We prioritize customer support and service quality, ensuring you always have a great
                                  experience.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div
                                className="p-2 rounded-full mr-3 flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: `${getPlanColor(selectedDetailPlan.id)}20` }}
                              >
                                <Zap className="h-4 w-4" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Future Innovation</h5>
                                <p className="text-xs text-gray-300">
                                  We're constantly investing in research and development to bring you the latest
                                  technology and fastest speeds.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div
                                className="p-2 rounded-full mr-3 flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: `${getPlanColor(selectedDetailPlan.id)}20` }}
                              >
                                <Check className="h-4 w-4" style={{ color: getPlanColor(selectedDetailPlan.id) }} />
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Transparent Pricing</h5>
                                <p className="text-xs text-gray-300">
                                  No hidden fees or surprise charges. What you see is what you pay, with clear
                                  allocation of your subscription.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* Speed Comparison Modal */}
      <AnimatePresence>
        {showSpeedComparison && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-5 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-medium text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-[#bddfef]" />
                  Speed Comparison
                </h2>
                <button
                  onClick={() => setShowSpeedComparison(false)}
                  className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="p-5">
                <p className="text-gray-300 mb-6">
                  Compare how our different speed tiers perform for various online activities.
                </p>

                {/* Speed visualization */}
                <div className="mb-8">
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Download className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Speed Comparison
                  </h3>
                  <div className="space-y-4">
                    {plans.map((plan, index) => (
                      <motion.div
                        key={plan.name}
                        className="space-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="space-y-1"
                      >
                        <div className="flex justify-between text-sm">
                          <motion.span
                            className="text-gray-300 flex items-center"
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <plan.icon className="h-4 w-4 mr-2" style={{ color: getPlanColor(plan.id) }} />
                            {plan.name}
                          </motion.span>
                          <motion.span
                            className="text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                          >
                            {plan.downloadSpeed} Mbps
                          </motion.span>
                        </div>
                        <div className="w-full h-6 bg-gray-900 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full relative"
                            style={{
                              backgroundColor: getPlanColor(plan.id),
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(plan.downloadSpeed / 2500) * 100}%` }}
                            transition={{
                              duration: 1.2,
                              delay: 0.3 + index * 0.1,
                              ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
                            }}
                            whileHover={{
                              boxShadow: `0 0 12px ${getPlanColor(plan.id)}80`,
                              transition: { duration: 0.2 },
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 w-full"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${getPlanColor(plan.id)}60, transparent)`,
                              }}
                              animate={{ x: ["0%", "100%"] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                                delay: index * 0.2,
                              }}
                            />
                            <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* File Size Calculator - NEW SECTION */}
                <FileCalculator plans={plans} getPlanColor={getPlanColor} />

                {/* Download time comparison */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-[#bddfef]" />
                    Download Times for Common Files
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 text-gray-400">Plan</th>
                          <th className="text-center py-2 text-gray-400">Photo (5MB)</th>
                          <th className="text-center py-2 text-gray-400">Song (30MB)</th>
                          <th className="text-center py-2 text-gray-400">4K Movie (15GB)</th>
                          <th className="text-center py-2 text-gray-400">Game (100GB)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plans.map((plan, index) => (
                          <motion.tr
                            key={plan.name}
                            className="border-b border-gray-800"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                          >
                            <td className="py-3 text-white flex items-center">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 20,
                                  delay: 0.7 + index * 0.1,
                                }}
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: getPlanColor(plan.id) }}
                              />
                              {plan.name}
                            </td>
                            <motion.td
                              className="py-3 text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                            >
                              <span className="text-gray-300 font-medium" style={{ color: getPlanColor(plan.id) }}>
                                {((5 * 8) / plan.downloadSpeed).toFixed(2)}s
                              </span>
                            </motion.td>
                            <motion.td
                              className="py-3 text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                            >
                              <span className="text-gray-300 font-medium" style={{ color: getPlanColor(plan.id) }}>
                                {((30 * 8) / plan.downloadSpeed).toFixed(2)}s
                              </span>
                            </motion.td>
                            <motion.td
                              className="py-3 text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                            >
                              <span className="text-gray-300 font-medium" style={{ color: getPlanColor(plan.id) }}>
                                {((15 * 1000 * 8) / plan.downloadSpeed).toFixed(0)}s
                              </span>
                            </motion.td>
                            <motion.td
                              className="py-3 text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                            >
                              <span className="text-gray-300 font-medium" style={{ color: getPlanColor(plan.id) }}>
                                {Math.floor((100 * 1000 * 8) / (plan.downloadSpeed * 60))}m{" "}
                                {Math.round(((100 * 1000 * 8) / plan.downloadSpeed) % 60)}s
                              </span>
                            </motion.td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Real-world examples */}
                <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
                  <h3 className="text-white font-medium mb-3">What These Speeds Mean in Real Life</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <span className="font-medium">900 Mbps:</span> Perfect for households with multiple devices
                      streaming HD content, browsing, and casual gaming.
                    </p>
                    <p>
                      <span className="font-medium">1.2 Gbps:</span> Ideal for families with heavy streaming needs,
                      including 4K content on multiple devices and online gaming.
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
                  onClick={() => setShowSpeedComparison(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Add the FileCalculator component at the end of the file, before the final closing bracket
function FileCalculator({ plans, getPlanColor }: { plans: any[]; getPlanColor: (id: number) => string }) {
  const [fileSize, setFileSize] = useState(1)
  const [unit, setUnit] = useState("GB")
  const [calculatedResults, setCalculatedResults] = useState<null | { plan: any; time: string; seconds: number }[]>(
    null,
  )
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const unitMultipliers = {
    KB: 1 / 1000,
    MB: 1,
    GB: 1000,
    TB: 1000000,
  }

  const handleCalculate = () => {
    setIsCalculating(true)

    // Convert file size to MB for calculation
    const sizeInMB = fileSize * unitMultipliers[unit as keyof typeof unitMultipliers]

    // Calculate download time for each plan (in seconds)
    const results = plans.map((plan) => {
      const downloadTimeSeconds = (sizeInMB * 8) / plan.downloadSpeed

      let timeString
      if (downloadTimeSeconds < 60) {
        timeString = `${downloadTimeSeconds.toFixed(2)}s`
      } else if (downloadTimeSeconds < 3600) {
        const minutes = Math.floor(downloadTimeSeconds / 60)
        const seconds = Math.round(downloadTimeSeconds % 60)
        timeString = `${minutes}m ${seconds}s`
      } else {
        const hours = Math.floor(downloadTimeSeconds / 3600)
        const minutes = Math.floor((downloadTimeSeconds % 3600) / 60)
        timeString = `${hours}h ${minutes}m`
      }

      return {
        plan,
        time: timeString,
        seconds: downloadTimeSeconds,
      }
    })

    // Simulate calculation time for better UX
    setTimeout(() => {
      setCalculatedResults(results)
      setIsCalculating(false)
      setShowResults(true)
    }, 600)
  }

  // Find the maximum download time for scaling the bars
  const maxTime = calculatedResults ? Math.max(...calculatedResults.map((result) => result.seconds)) : 0

  return (
    <motion.div
      className="mb-8 p-5 bg-gray-900/30 rounded-lg border border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-white font-medium mb-4 flex items-center">
        <Download className="h-4 w-4 mr-2 text-[#bddfef]" />
        Custom File Size Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">File Size</label>
          <div className="flex items-center">
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={fileSize}
              onChange={(e) => setFileSize(Number.parseFloat(e.target.value) || 0)}
              className="w-full bg-gray-800 border border-gray-700 rounded-l-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef]/50"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="bg-gray-800 border border-gray-700 border-l-0 rounded-r-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#bddfef]/50"
            >
              <option value="KB">KB</option>
              <option value="MB">MB</option>
              <option value="GB">GB</option>
              <option value="TB">TB</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Adjust Size</label>
          <Slider
            value={[fileSize]}
            min={0.01}
            max={unit === "KB" ? 1000 : unit === "MB" ? 100 : unit === "GB" ? 10 : 1}
            step={unit === "KB" ? 1 : unit === "MB" ? 0.1 : 0.01}
            onValueChange={(value) => setFileSize(value[0])}
            className="py-2"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleCalculate}
            disabled={isCalculating || fileSize <= 0}
            className={`w-full px-4 py-2 rounded-md text-white font-medium flex items-center justify-center transition-colors ${
              isCalculating || fileSize <= 0
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-[#bddfef] text-black hover:bg-[#a5c7d7]"
            }`}
          >
            {isCalculating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2"
                >
                  <RefreshCwIcon className="h-4 w-4" />
                </motion.div>
                Calculating...
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Calculate Download Time
              </>
            )}
          </button>
        </div>
      </div>

      {/* File size examples */}
      <div className="flex flex-wrap gap-2 mb-4">
        <p className="text-xs text-gray-400 w-full">Common file sizes:</p>
        <button
          onClick={() => {
            setFileSize(5)
            setUnit("MB")
          }}
          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
        >
          Photo (5 MB)
        </button>
        <button
          onClick={() => {
            setFileSize(30)
            setUnit("MB")
          }}
          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
        >
          Song (30 MB)
        </button>
        <button
          onClick={() => {
            setFileSize(500)
            setUnit("MB")
          }}
          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
        >
          TV Episode (500 MB)
        </button>
        <button
          onClick={() => {
            setFileSize(4)
            setUnit("GB")
          }}
          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
        >
          Movie (4 GB)
        </button>
        <button
          onClick={() => {
            setFileSize(15)
            setUnit("GB")
          }}
          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
        >
          4K Movie (15 GB)
        </button>
        <button
          onClick={() => {
            setFileSize(100)
            setUnit("GB")
          }}
          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
        >
          Game (100 GB)
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && calculatedResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-white font-medium mb-3">
                Download time for {fileSize} {unit}:
              </h4>
              <div className="space-y-4">
                {calculatedResults.map((result, index) => (
                  <motion.div
                    key={result.plan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: getPlanColor(result.plan.id) }}
                        />
                        <span className="text-sm text-gray-300">
                          {result.plan.name} ({result.plan.downloadSpeed} Mbps)
                        </span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: getPlanColor(result.plan.id) }}>
                        {result.time}
                      </span>
                    </div>
                    <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(result.seconds / maxTime) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: getPlanColor(result.plan.id) }}
                      >
                        <motion.div
                          className="absolute inset-0 w-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${getPlanColor(result.plan.id)}60, transparent)`,
                          }}
                          animate={{ x: ["0%", "100%"] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-400">
                <p>
                  * Download times are theoretical and based on maximum speeds. Actual performance may vary based on
                  network conditions, server capacity, and other factors.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
