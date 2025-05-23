"use client"

import type React from "react"

import { useState } from "react"
import {
  CheckCircle,
  Download,
  Calendar,
  MapPin,
  Wifi,
  Package,
  Mail,
  Phone,
  Tag,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  CreditCard,
  FileText,
  HelpCircle,
  Printer,
  Share2,
  AlertCircle,
  CheckCircle2,
  Router,
  Shield,
  Truck,
  CalendarClock,
  Landmark,
  Receipt,
  BarChart,
  Headphones,
  BookOpen,
  Wrench,
  ChevronRight,
  CalendarPlus,
  X,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface OrderConfirmationProps {
  orderData: any
}

export default function OrderConfirmation({ orderData }: OrderConfirmationProps) {
  const [expandedSections, setExpandedSections] = useState({
    orderDetails: true,
    installationDetails: true,
    paymentDetails: true,
    accountSetup: true,
    nextSteps: true,
    support: false,
    documents: false,
  })

  const [showCalendarModal, setShowCalendarModal] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const calculateDiscount = () => {
    if (!orderData?.promoDiscount) return 0

    const subtotal = orderData?.plan
      ? orderData.plan.price
      : 0 + (orderData?.addons ? orderData.addons.reduce((sum: number, addon: any) => sum + addon.price, 0) : 0)

    if (orderData.promoType === "percentage") {
      return (subtotal * orderData.promoDiscount) / 100
    } else {
      return orderData.promoDiscount
    }
  }

  const calculateTotal = () => {
    const planPrice = orderData?.plan ? orderData.plan.price : 0
    const addonTotal = orderData?.addons
      ? orderData.addons.reduce((sum: number, addon: any) => sum + addon.price, 0)
      : 0
    const mobilePlanPrice = orderData.mobilePlan
      ? orderData.mobilePlan.bundleDiscount
        ? orderData.mobilePlan.discountedPrice
        : orderData.mobilePlan.price
      : 0
    const discount = calculateDiscount()
    return (planPrice + addonTotal + mobilePlanPrice - discount).toFixed(2)
  }

  const calculateAnnualSavings = () => {
    const discount = calculateDiscount()
    return (discount * 12).toFixed(2)
  }

  const calculateContractValue = () => {
    const monthlyTotal = Number.parseFloat(calculateTotal())
    // Assuming 12-month contract as default
    const contractLength = orderData?.plan?.contractLength || 12
    return (monthlyTotal * contractLength).toFixed(2)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    // This is a simple formatter - in a real app, you'd use a proper date library
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getEstimatedActivationDate = () => {
    if (!orderData?.installOption?.date) return ""

    // Create a date object from the installation date
    const installDate = new Date(orderData.installOption.date)

    // Add 1 day to the installation date for the activation
    installDate.setDate(installDate.getDate() + 1)

    return installDate.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getAccountNumber = () => {
    // Generate a random account number based on the order number
    if (!orderData.orderNumber) return ""

    // Extract the numeric part of the order number
    const numericPart = orderData.orderNumber.replace(/\D/g, "")
    return `ACC-${numericPart}`
  }

  const generateCalendarLinks = () => {
    if (!orderData?.installOption?.date) return null

    const installDate = new Date(orderData.installOption.date)
    const endDate = new Date(installDate)
    endDate.setHours(installDate.getHours() + 3) // Assuming 3 hour installation

    const title = "Broadband Installation - Olilo"
    const description = `Broadband installation for your ${orderData?.plan?.name || "broadband"} plan. Order #${orderData.orderNumber || ""}`
    const location = `${orderData.personalDetails?.addressLine1 || ""}, ${orderData.postcode || ""}`

    // Format dates for calendar links
    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "")
    }

    const start = formatDateForCalendar(installDate)
    const end = formatDateForCalendar(endDate)

    // Google Calendar link
    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`

    // iCal/Outlook format
    const icalLink = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`

    return {
      google: googleCalendarLink,
      ical: icalLink,
    }
  }

  const SectionHeader = ({
    title,
    icon,
    section,
    count,
  }: { title: string; icon: React.ReactNode; section: string; count?: number }) => (
    <div
      className="flex items-center justify-between cursor-pointer py-5 border-b border-gray-800 bg-gray-900/40 rounded-t-lg px-4 hover:bg-gray-900/60 transition-colors"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center">
        <div className="bg-[#bddfef]/20 rounded-full p-3 mr-4">{icon}</div>
        <div>
          <h3 className="font-semibold text-white text-xl">{title}</h3>
          {count !== undefined && <span className="text-sm text-gray-300">{count} items</span>}
        </div>
      </div>
      <div className="bg-gray-800 rounded-full p-2">
        {expandedSections[section as keyof typeof expandedSections] ? (
          <ChevronUp className="h-5 w-5 text-[#bddfef]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#bddfef]" />
        )}
      </div>
    </div>
  )

  const CalendarModal = () => {
    const calendarLinks = generateCalendarLinks()

    if (!calendarLinks) return null

    return (
      <div
        className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 ${showCalendarModal ? "block" : "hidden"}`}
      >
        <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Add to Calendar</h3>
            <button onClick={() => setShowCalendarModal(false)} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-gray-300 mb-6">Add your installation appointment to your calendar to receive reminders.</p>

          <div className="space-y-4">
            <a
              href={calendarLinks.google}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-[#bddfef] hover:bg-[#a5c7d7] text-black py-3 px-4 rounded-md transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Add to Google Calendar
            </a>

            <a
              href={calendarLinks.ical}
              download="broadband-installation.ics"
              className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-md transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Download for Apple Calendar/Outlook
            </a>

            <p className="text-gray-400 text-sm text-center mt-4">
              Your installation is scheduled for {formatDate(orderData.installOption?.date || "")} at{" "}
              {orderData.installOption?.timeSlot || ""}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 bg-gradient-to-b from-gray-900/50 to-transparent py-10 rounded-2xl border border-gray-800"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#bddfef]/20 rounded-full mb-6 border-2 border-[#bddfef]/30">
          <CheckCircle className="h-12 w-12 text-[#bddfef]" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-3">Order Confirmed!</h2>
        <p className="text-gray-400 text-lg">
          Thank you for your order.
          {orderData.personalDetails?.email
            ? ` We've sent a confirmation email to ${orderData.personalDetails.email}.`
            : " We've sent a confirmation email to your email address."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="bg-gray-900 rounded-lg px-6 py-3 flex items-center">
            <FileText className="h-5 w-5 text-[#bddfef] mr-3" />
            <div className="text-left">
              <p className="text-sm text-gray-400">Order Number</p>
              <p className="font-medium text-white">{orderData.orderNumber || "ORD-123456"}</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg px-6 py-3 flex items-center">
            <Calendar className="h-5 w-5 text-[#bddfef] mr-3" />
            <div className="text-left">
              <p className="text-sm text-gray-400">Order Date</p>
              <p className="font-medium text-white">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg px-6 py-3 flex items-center">
            <Landmark className="h-5 w-5 text-[#bddfef] mr-3" />
            <div className="text-left">
              <p className="text-sm text-gray-400">Account Number</p>
              <p className="font-medium text-white">{getAccountNumber()}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Order Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-xl"
        >
          <div className="border-b border-gray-800 p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Package className="h-5 w-5 mr-3 text-[#bddfef]" />
                Order Summary
              </h3>
              <span className="text-sm text-gray-300 bg-gray-800 px-4 py-1.5 rounded-full">
                Order #{orderData.orderNumber || "ORD-123456"}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Order Details Section */}
                <div>
                  <SectionHeader
                    title="Order Details"
                    icon={<Package className="h-5 w-5 text-[#bddfef]" />}
                    section="orderDetails"
                    count={orderData.addons ? orderData.addons.length + 1 : 1}
                  />

                  {expandedSections.orderDetails && (
                    <div className="mt-2 space-y-6 p-5 bg-black border border-gray-800 rounded-b-lg mb-6">
                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Wifi className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Broadband Plan</h4>
                          <p className="text-gray-300">
                            {orderData.plan?.name} - {orderData.plan?.speed}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              Download: {orderData.plan?.speed || "100 Mbps"}
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              Upload: {orderData.plan?.uploadSpeed || "20 Mbps"}
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              Contract: {orderData.plan?.contractLength || "12"} months
                            </p>
                            {orderData.plan?.features?.map((feature: string, index: number) => (
                              <p key={index} className="text-gray-400 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                                {feature}
                              </p>
                            ))}
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-gray-500">Monthly fee</p>
                            <p className="font-medium text-white">
                              £{orderData.plan?.price.toFixed(2) || "0.00"}/month
                            </p>
                          </div>
                        </div>
                      </div>

                      {orderData.addons && orderData.addons.length > 0 && (
                        <div className="flex items-start">
                          <div className="bg-gray-900 rounded-full p-2 mr-4">
                            <Package className="h-5 w-5 text-[#bddfef]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-lg">Add-ons</h4>
                            <div className="space-y-4 mt-2">
                              {orderData.addons.map((addon: any, index: number) => (
                                <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                                  <div className="flex justify-between">
                                    <p className="text-gray-300 font-medium">{addon.name}</p>
                                    <p className="text-gray-300">£{addon.price.toFixed(2)}/month</p>
                                  </div>
                                  <p className="text-gray-500 text-sm mt-1">{addon.description}</p>
                                  {addon.features && (
                                    <div className="mt-2 space-y-1">
                                      {addon.features.map((feature: string, idx: number) => (
                                        <p key={idx} className="text-gray-400 text-sm flex items-center">
                                          <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-2" />
                                          {feature}
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {orderData.mobilePlan && (
                        <div className="flex items-start">
                          <div className="bg-gray-900 rounded-full p-2 mr-4">
                            <Smartphone className="h-5 w-5 text-[#bddfef]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-lg">Mobile Plan</h4>
                            <p className="text-gray-300">
                              {orderData.mobilePlan.name} - {orderData.mobilePlan.data} Data
                            </p>
                            <div className="mt-2 space-y-1">
                              <p className="text-gray-400 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                                Data: {orderData.mobilePlan.data}
                              </p>
                              <p className="text-gray-400 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                                Minutes: {orderData.mobilePlan.minutes || "Unlimited"}
                              </p>
                              <p className="text-gray-400 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                                Texts: {orderData.mobilePlan.texts || "Unlimited"}
                              </p>
                              {orderData.mobilePlan.bundleDiscount && (
                                <p className="text-[#bddfef] flex items-center">
                                  <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                                  Bundle Discount Applied
                                </p>
                              )}
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-gray-500">Monthly fee</p>
                              <p className="font-medium text-white">
                                £
                                {orderData.mobilePlan.bundleDiscount
                                  ? orderData.mobilePlan.discountedPrice.toFixed(2)
                                  : orderData.mobilePlan.price.toFixed(2)}
                                /month
                              </p>
                            </div>
                            {orderData.mobileSim && orderData.mobileSim.deviceInfo && (
                              <div className="mt-3 bg-gray-900 p-3 rounded-lg">
                                <p className="text-gray-300 font-medium">eSIM Details</p>
                                <p className="text-gray-400 text-sm mt-1">
                                  Device: {orderData.mobileSim.deviceInfo.manufacturer}{" "}
                                  {orderData.mobileSim.deviceInfo.model}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  eSIM activation: Within 24 hours of order confirmation
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {orderData.promoDiscount > 0 && (
                        <div className="flex items-start">
                          <div className="bg-gray-900 rounded-full p-2 mr-4">
                            <Tag className="h-5 w-5 text-[#bddfef]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-lg">Promo Discount</h4>
                            <p className="text-[#bddfef]">
                              {orderData.promoCode} -
                              {orderData.promoType === "percentage"
                                ? `${orderData.promoDiscount}% off`
                                : `£${orderData.promoDiscount.toFixed(2)} off`}
                            </p>
                            <div className="mt-2 space-y-1">
                              <p className="text-gray-400 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                                Monthly savings: £{calculateDiscount().toFixed(2)}
                              </p>
                              <p className="text-gray-400 flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                                Annual savings: £{calculateAnnualSavings()}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-gray-500">Discount</p>
                              <p className="font-medium text-[#bddfef]">-£{calculateDiscount().toFixed(2)}/month</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Installation Details Section */}
                <div>
                  <SectionHeader
                    title="Installation Details"
                    icon={<Wrench className="h-5 w-5 text-[#bddfef]" />}
                    section="installationDetails"
                  />

                  {expandedSections.installationDetails && (
                    <div className="mt-2 space-y-6 p-5 bg-black border border-gray-800 rounded-b-lg mb-6">
                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Calendar className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Installation Appointment</h4>
                          <div className="mt-2 bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                              <CalendarClock className="h-5 w-5 text-[#bddfef] mr-2" />
                              <p className="text-gray-300 font-medium">
                                {formatDate(orderData.installOption?.date || "")}
                              </p>
                            </div>
                            <p className="text-gray-400 mb-2">
                              Time slot: {orderData.installOption?.timeSlot || "Morning (8am - 1pm)"}
                            </p>
                            <p className="text-gray-400 mb-2">Duration: Approximately 1-2 hours</p>
                            <p className="text-gray-400 flex items-start">
                              <AlertCircle className="h-4 w-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                              <span>Please ensure someone over 18 is present during the installation appointment.</span>
                            </p>
                          </div>

                          <div className="mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-gray-700 hover:border-[#bddfef] hover:text-[#bddfef]"
                              onClick={() => setShowCalendarModal(true)}
                            >
                              <CalendarPlus className="h-4 w-4 mr-2" />
                              Add to Calendar
                            </Button>
                          </div>

                          <h4 className="font-medium text-white text-lg mt-4">What to Expect</h4>
                          <div className="mt-2 space-y-2">
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              Professional engineer visit
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              Router setup and configuration
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              WiFi optimization
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              Connection testing
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <MapPin className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Installation Address</h4>
                          <div className="mt-2 bg-gray-900 p-4 rounded-lg">
                            <p className="text-gray-300">
                              {orderData.personalDetails?.firstName} {orderData.personalDetails?.lastName}
                              <br />
                              {orderData.personalDetails?.addressLine1 || orderData.address}
                              <br />
                              {orderData.personalDetails?.addressLine2 && `${orderData.personalDetails.addressLine2}`}
                              {orderData.personalDetails?.city && `${orderData.personalDetails.city}, `}
                              {orderData.postcode}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center">
                            <Button variant="outline" size="sm" className="text-xs border-gray-700">
                              <MapPin className="h-3 w-3 mr-1" />
                              View on Map
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs border-gray-700 ml-2">
                              <Printer className="h-3 w-3 mr-1" />
                              Print Directions
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Router className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Equipment Delivery</h4>
                          <div className="mt-2 space-y-2">
                            <p className="text-gray-400 flex items-center">
                              <Truck className="h-4 w-4 text-[#bddfef] mr-2" />
                              Estimated delivery: 1-2 business days before installation
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <Package className="h-4 w-4 text-[#bddfef] mr-2" />
                              Package includes: Router, cables, setup guide
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                              Please don't open or install equipment before the engineer arrives
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Details Section */}
                <div>
                  <SectionHeader
                    title="Payment Details"
                    icon={<CreditCard className="h-5 w-5 text-[#bddfef]" />}
                    section="paymentDetails"
                  />

                  {expandedSections.paymentDetails && (
                    <div className="mt-2 space-y-6 p-5 bg-black border border-gray-800 rounded-b-lg mb-6">
                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Receipt className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Billing Summary</h4>

                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between">
                              <p className="text-gray-400">Broadband Plan</p>
                              <p className="text-gray-300">£{orderData.plan?.price.toFixed(2) || "0.00"}/month</p>
                            </div>

                            {orderData.addons && orderData.addons.length > 0 && (
                              <div className="flex justify-between">
                                <p className="text-gray-400">Add-ons</p>
                                <p className="text-gray-300">
                                  £
                                  {orderData.addons
                                    .reduce((sum: number, addon: any) => sum + addon.price, 0)
                                    .toFixed(2)}
                                  /month
                                </p>
                              </div>
                            )}

                            {orderData.mobilePlan && (
                              <div className="flex justify-between">
                                <p className="text-gray-400">Mobile Plan</p>
                                <p className="text-gray-300">
                                  £
                                  {orderData.mobilePlan.bundleDiscount
                                    ? orderData.mobilePlan.discountedPrice.toFixed(2)
                                    : orderData.mobilePlan.price.toFixed(2)}
                                  /month
                                </p>
                              </div>
                            )}

                            {orderData.promoDiscount > 0 && (
                              <div className="flex justify-between">
                                <p className="text-gray-400">Promo Discount</p>
                                <p className="text-[#bddfef]">-£{calculateDiscount().toFixed(2)}/month</p>
                              </div>
                            )}

                            <div className="border-t border-gray-800 pt-2 mt-2">
                              <div className="flex justify-between font-medium">
                                <p className="text-white">Monthly Total</p>
                                <p className="text-white">£{calculateTotal()}/month</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 bg-gray-900 p-4 rounded-lg">
                            <h5 className="font-medium text-white mb-2">One-time Charges</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <p className="text-gray-400">Activation Fee</p>
                                <p className="text-gray-300">£{orderData.activationFee || "0.00"}</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-gray-400">Installation Fee</p>
                                <p className="text-gray-300">£{orderData.installationFee || "0.00"}</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-gray-400">Equipment Fee</p>
                                <p className="text-gray-300">£{orderData.equipmentFee || "0.00"}</p>
                              </div>
                              <div className="border-t border-gray-700 pt-2 mt-2">
                                <div className="flex justify-between font-medium">
                                  <p className="text-white">First Payment Total</p>
                                  <p className="text-white">
                                    £
                                    {(
                                      Number.parseFloat(calculateTotal()) +
                                      (orderData.activationFee || 0) +
                                      (orderData.installationFee || 0) +
                                      (orderData.equipmentFee || 0)
                                    ).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h5 className="font-medium text-white mb-2">Contract Details</h5>
                            <div className="space-y-2">
                              <p className="text-gray-400 flex items-center">
                                <Calendar className="h-4 w-4 text-[#bddfef] mr-2" />
                                Contract length: {orderData.plan?.contractLength || "12"} months
                              </p>
                              <p className="text-gray-400 flex items-center">
                                <BarChart className="h-4 w-4 text-[#bddfef] mr-2" />
                                Total contract value: £{calculateContractValue()}
                              </p>
                              <p className="text-gray-400 flex items-center">
                                <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                                Early termination fee may apply
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h5 className="font-medium text-white mb-2">Payment Method</h5>
                            <div className="bg-gray-900 p-3 rounded-lg flex items-center">
                              <CreditCard className="h-5 w-5 text-[#bddfef] mr-3" />
                              <div>
                                <p className="text-gray-300">
                                  {orderData.paymentDetails?.cardType || "Credit Card"} ending in{" "}
                                  {orderData.paymentDetails?.cardNumber
                                    ? orderData.paymentDetails.cardNumber.slice(-4)
                                    : "****"}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  {orderData.paymentDetails?.cardholderName || "Cardholder Name"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h5 className="font-medium text-white mb-2">Billing Schedule</h5>
                            <p className="text-gray-400">
                              Your first payment will be processed today. Subsequent monthly payments will be charged on
                              the {new Date().getDate()}
                              {getOrdinalSuffix(new Date().getDate())} of each month.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Account Setup Section */}
                <div>
                  <SectionHeader
                    title="Account Setup"
                    icon={<User className="h-5 w-5 text-[#bddfef]" />}
                    section="accountSetup"
                  />

                  {expandedSections.accountSetup && (
                    <div className="mt-2 space-y-6 p-5 bg-black border border-gray-800 rounded-b-lg mb-6">
                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Landmark className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Account Information</h4>
                          <div className="mt-2 space-y-3">
                            <div className="bg-gray-900 p-3 rounded-lg">
                              <p className="text-gray-400 text-sm">Account Number</p>
                              <p className="text-white font-medium">{getAccountNumber()}</p>
                            </div>

                            <div className="bg-gray-900 p-3 rounded-lg">
                              <p className="text-gray-400 text-sm">Username</p>
                              <p className="text-white font-medium">
                                {orderData.personalDetails?.email?.split("@")[0] || "username"}
                              </p>
                            </div>

                            <div className="bg-gray-900 p-3 rounded-lg">
                              <p className="text-gray-400 text-sm">Temporary Password</p>
                              <p className="text-white font-medium">
                                •••••••• <span className="text-xs text-gray-400">(Sent to your email)</span>
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <Button className="w-full bg-[#bddfef] hover:bg-[#a5c7d7] text-black">
                              <User className="h-4 w-4 mr-2" />
                              Set Up Your Account
                            </Button>
                            <p className="text-gray-500 text-sm mt-2 text-center">
                              Please set up your account within 7 days
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Wifi className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Service Activation</h4>
                          <div className="mt-2 space-y-2">
                            <p className="text-gray-400 flex items-center">
                              <Calendar className="h-4 w-4 text-[#bddfef] mr-2" />
                              Estimated activation date: {getEstimatedActivationDate()}
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <Clock className="h-4 w-4 text-[#bddfef] mr-2" />
                              Activation typically occurs within 24 hours after installation
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                              You'll receive an email and SMS when your service is active
                            </p>
                          </div>

                          <div className="mt-4 bg-gray-900 p-3 rounded-lg">
                            <h5 className="font-medium text-white mb-2">Default WiFi Details</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <p className="text-gray-400">Network Name (SSID)</p>
                                <p className="text-gray-300">Olilo-{orderData.orderNumber?.slice(-4) || "1234"}</p>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-gray-400">Default Password</p>
                                <p className="text-gray-300">
                                  •••••••• <span className="text-xs text-gray-400">(On router label)</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {orderData.mobilePlan && (
                        <div className="flex items-start">
                          <div className="bg-gray-900 rounded-full p-2 mr-4">
                            <Smartphone className="h-5 w-5 text-[#bddfef]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-lg">Mobile Service Activation</h4>
                            <div className="mt-2 space-y-2">
                              <p className="text-gray-400 flex items-center">
                                <Calendar className="h-4 w-4 text-[#bddfef] mr-2" />
                                eSIM delivery: Within 24 hours via email
                              </p>
                              <p className="text-gray-400 flex items-center">
                                <Smartphone className="h-4 w-4 text-[#bddfef] mr-2" />
                                Mobile number: {orderData.mobileNumber || "Will be assigned"}
                              </p>
                            </div>

                            <div className="mt-4">
                              <Button variant="outline" className="w-full border-gray-700">
                                <BookOpen className="h-4 w-4 mr-2" />
                                View eSIM Setup Guide
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Next Steps Section */}
                <div>
                  <SectionHeader
                    title="What Happens Next"
                    icon={<ChevronRight className="h-5 w-5 text-[#bddfef]" />}
                    section="nextSteps"
                  />

                  {expandedSections.nextSteps && (
                    <div className="mt-2 space-y-6 p-5 bg-black border border-gray-800 rounded-b-lg mb-6">
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="bg-[#bddfef]/10 w-8 h-8 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                            <span className="text-[#bddfef] font-medium">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-lg">Order Processing</h4>
                            <p className="text-gray-400 mt-1">
                              We're processing your order and will send you updates via email and SMS.
                            </p>
                            <div className="mt-2 flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                              <p className="text-green-400 text-sm">Completed</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-[#bddfef]/10 w-8 h-8 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                            <span className="text-[#bddfef] font-medium">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-lg">Equipment Dispatch</h4>
                            <p className="text-gray-400 mt-1">
                              Your router and equipment will be dispatched 2-3 days before your installation date.
                            </p>
                            <div className="mt-2 flex items-center">
                              <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
                              <p className="text-yellow-400 text-sm">In Progress</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-[#bddfef]/10 w-8 h-8 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                            <span className="text-[#bddfef] font-medium">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-lg">Pre-Installation Check</h4>
                            <p className="text-gray-400 mt-1">
                              Our team will contact you 24-48 hours before your installation to confirm details.
                            </p>
                            <div className="mt-2 flex items-center">
                              <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                              <p className="text-gray-400 text-sm">Pending</p>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">
                              Estimated: {formatDate(orderData.installOption?.date || "")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-[#bddfef]/10 w-8 h-8 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                            <span className="text-[#bddfef] font-medium">4</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-lg">Installation Day</h4>
                            <p className="text-gray-400 mt-1">
                              Our engineer will arrive during your selected time slot to set up your broadband service.
                            </p>
                            <div className="mt-2 flex items-center">
                              <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                              <p className="text-gray-400 text-sm">Scheduled</p>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">
                              {formatDate(orderData.installOption?.date || "")} -{" "}
                              {orderData.installOption?.timeSlot || "Morning (8am - 1pm)"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-[#bddfef]/10 w-8 h-8 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                            <span className="text-[#bddfef] font-medium">5</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-lg">Service Activation</h4>
                            <p className="text-gray-400 mt-1">
                              Once installation is complete, your service will be activated within 24 hours.
                            </p>
                            <div className="mt-2 flex items-center">
                              <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                              <p className="text-gray-400 text-sm">Pending</p>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">Estimated: {getEstimatedActivationDate()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Support Section */}
                <div>
                  <SectionHeader
                    title="Support & Help"
                    icon={<HelpCircle className="h-5 w-5 text-[#bddfef]" />}
                    section="support"
                  />

                  {expandedSections.support && (
                    <div className="mt-2 space-y-6 p-5 bg-black border border-gray-800 rounded-b-lg mb-6">
                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Headphones className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Contact Options</h4>
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-gray-900 p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Phone className="h-5 w-5 text-[#bddfef] mr-3" />
                                <h5 className="font-medium text-white">Phone Support</h5>
                              </div>
                              <p className="text-gray-300 font-medium">0800 123 4567</p>
                              <p className="text-gray-400 text-sm mt-1">Available 24/7 for technical support</p>
                            </div>

                            <div className="bg-gray-900 p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Mail className="h-5 w-5 text-[#bddfef] mr-3" />
                                <h5 className="font-medium text-white">Email Support</h5>
                              </div>
                              <p className="text-gray-300 font-medium">support@olilo.com</p>
                              <p className="text-gray-400 text-sm mt-1">Response within 24 hours</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <Button variant="outline" className="w-full border-gray-700">
                              <HelpCircle className="h-4 w-4 mr-2" />
                              Visit Help Center
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-gray-900 rounded-full p-2 mr-4">
                          <Shield className="h-5 w-5 text-[#bddfef]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-lg">Service Guarantee</h4>
                          <div className="mt-2 space-y-2">
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              30-day satisfaction guarantee
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              99.9% uptime guarantee
                            </p>
                            <p className="text-gray-400 flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-[#bddfef] mr-2" />
                              Next-day engineer visits for critical issues
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Documents Section */}
                <div>
                  <SectionHeader
                    title="Documents & Resources"
                    icon={<FileText className="h-5 w-5 text-[#bddfef]" />}
                    section="documents"
                  />

                  {expandedSections.documents && (
                    <div className="mt-2 space-y-6 p-5 bg-black border border-gray-800 rounded-b-lg mb-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                            <FileText className="h-5 w-5 text-[#bddfef] mr-3" />
                            <div>
                              <p className="text-white font-medium">Order Confirmation</p>
                              <div className="flex items-center mt-1">
                                <Download className="h-4 w-4 text-gray-400 mr-1" />
                                <p className="text-gray-400 text-sm">Download PDF</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                            <FileText className="h-5 w-5 text-[#bddfef] mr-3" />
                            <div>
                              <p className="text-white font-medium">Terms & Conditions</p>
                              <div className="flex items-center mt-1">
                                <Download className="h-4 w-4 text-gray-400 mr-1" />
                                <p className="text-gray-400 text-sm">Download PDF</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                            <Router className="h-5 w-5 text-[#bddfef] mr-3" />
                            <div>
                              <p className="text-white font-medium">Router Setup Guide</p>
                              <div className="flex items-center mt-1">
                                <Download className="h-4 w-4 text-gray-400 mr-1" />
                                <p className="text-gray-400 text-sm">Download PDF</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                            <Smartphone className="h-5 w-5 text-[#bddfef] mr-3" />
                            <div>
                              <p className="text-white font-medium">eSIM Setup Guide</p>
                              <div className="flex items-center mt-1">
                                <Download className="h-4 w-4 text-gray-400 mr-1" />
                                <p className="text-gray-400 text-sm">Download PDF</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full border-gray-700">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View All Resources
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-lg">Monthly Total</span>
                <span className="font-bold text-white text-xl">£{calculateTotal()}/month</span>
              </div>
              <div className="mt-2 text-gray-400 text-sm">
                Contract length: {orderData.plan?.contractLength || "12"} months | Total contract value: £
                {calculateContractValue()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 bg-black border border-gray-800 rounded-xl p-6"
        >
          <Button
            className="bg-[#bddfef] hover:bg-[#a5c7d7] text-black py-7 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] shadow-lg"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Order Details
          </Button>
          <Button
            variant="outline"
            className="border border-gray-700 hover:border-[#bddfef] hover:bg-gray-800 text-white py-7 flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
            size="lg"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email Order Details
          </Button>
          <Button
            variant="outline"
            className="border border-gray-700 hover:border-[#bddfef] hover:bg-gray-800 text-white py-7 flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
            size="lg"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Order Details
          </Button>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 text-center bg-gray-900/40 p-8 rounded-xl border border-gray-800"
        >
          <p className="text-gray-300 mb-4 text-lg">Need help with your order?</p>
          <div className="inline-flex items-center bg-[#bddfef]/10 px-8 py-5 rounded-lg border border-[#bddfef]/30 hover:bg-[#bddfef]/20 transition-colors cursor-pointer">
            <Phone className="h-6 w-6 text-[#bddfef] mr-4" />
            <span className="font-semibold text-white text-lg">Call us at 0800 123 4567</span>
          </div>
        </motion.div>
      </div>

      {/* Calendar Modal */}
      <CalendarModal />
    </div>
  )
}

// Helper function to get ordinal suffix for dates
function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th"
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}
