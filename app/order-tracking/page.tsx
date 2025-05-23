"use client"

import type React from "react"

import { useState } from "react"
import {
  Package,
  Truck,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Wifi,
  Router,
  User,
  Phone,
  Mail,
  ArrowLeft,
  CalendarClock,
  Download,
  Edit,
  X,
  CalendarIcon,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Link from "next/link"

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModifyInstallation, setShowModifyInstallation] = useState(false)
  const [showModifyDelivery, setShowModifyDelivery] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [modificationSuccess, setModificationSuccess] = useState<string | null>(null)

  // Mock order data - in a real app, this would come from an API
  const [orderData, setOrderData] = useState({
    orderNumber: "ORD-123456",
    orderDate: "2023-05-15",
    status: "In Progress",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "07700 900123",
    },
    address: {
      line1: "123 High Street",
      line2: "Apartment 4B",
      city: "London",
      postcode: "SW1A 1AA",
    },
    plan: {
      name: "Premium Fiber",
      speed: "350 Mbps",
      price: 45.99,
    },
    installation: {
      date: "2023-05-25",
      timeSlot: "Morning (8am - 1pm)",
      status: "Scheduled",
    },
    equipment: {
      status: "Dispatched",
      trackingNumber: "TRK-987654321",
      estimatedDelivery: "2023-05-22",
    },
    timeline: [
      {
        step: "Order Placed",
        date: "2023-05-15",
        time: "14:32",
        status: "completed",
        description: "Your order has been received and is being processed.",
      },
      {
        step: "Payment Confirmed",
        date: "2023-05-15",
        time: "14:35",
        status: "completed",
        description: "Your payment has been successfully processed.",
      },
      {
        step: "Equipment Dispatched",
        date: "2023-05-18",
        time: "09:15",
        status: "completed",
        description: "Your router and equipment have been dispatched.",
      },
      {
        step: "Equipment Delivery",
        date: "2023-05-22",
        time: "All day",
        status: "upcoming",
        description: "Expected delivery of your router and equipment.",
      },
      {
        step: "Installation",
        date: "2023-05-25",
        time: "Morning (8am - 1pm)",
        status: "scheduled",
        description: "Engineer visit to install and set up your service.",
      },
      {
        step: "Service Activation",
        date: "2023-05-26",
        time: "By end of day",
        status: "pending",
        description: "Your broadband service will be activated.",
      },
    ],
  })

  // Form state for delivery address modification
  const [deliveryForm, setDeliveryForm] = useState({
    line1: orderData.address.line1,
    line2: orderData.address.line2,
    city: orderData.address.city,
    postcode: orderData.address.postcode,
    specialInstructions: "",
  })

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsTracking(true)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "in-progress":
        return "text-purple-400"
      case "upcoming":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-400" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-purple-400" />
      case "upcoming":
        return <Calendar className="h-5 w-5 text-yellow-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  // Time slots - morning and afternoon
  const timeSlots = ["Morning (8am - 1pm)", "Afternoon (1pm - 6pm)"]

  // Generate calendar data for the current month
  const generateCalendarData = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()
    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Calculate days from previous month to show
    const prevMonthDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    // Generate calendar days array
    const calendarDays = []

    // Add days from previous month
    const prevMonth = new Date(year, month, 0)
    const prevMonthTotalDays = prevMonth.getDate()

    for (let i = prevMonthTotalDays - prevMonthDays + 1; i <= prevMonthTotalDays; i++) {
      calendarDays.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
        isSelectable: false,
      })
    }

    // Add days from current month
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const minInstallDate = new Date(today)
    minInstallDate.setDate(today.getDate() + 3) // Minimum 3 days from today

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const isSelectable = date >= minInstallDate

      calendarDays.push({
        date,
        isCurrentMonth: true,
        isSelectable,
      })
    }

    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - calendarDays.length

    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isSelectable: false,
      })
    }

    return calendarDays
  }

  // Format date for display and comparison
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })
  }

  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date)
    setSelectedDate(formattedDate)
  }

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
  }

  const handleModifyInstallation = () => {
    // In a real app, this would make an API call to update the installation date
    if (selectedDate && selectedTimeSlot) {
      setOrderData((prev) => ({
        ...prev,
        installation: {
          ...prev.installation,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
        },
        timeline: prev.timeline.map((item) => {
          if (item.step === "Installation") {
            return {
              ...item,
              date: selectedDate,
              time: selectedTimeSlot,
            }
          }
          return item
        }),
      }))

      // Show success message
      setModificationSuccess("Installation date and time updated successfully!")

      // Close the modal
      setTimeout(() => {
        setShowModifyInstallation(false)
        // Clear success message after a delay
        setTimeout(() => {
          setModificationSuccess(null)
        }, 3000)
      }, 1000)
    }
  }

  const handleDeliveryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDeliveryForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleModifyDelivery = () => {
    // In a real app, this would make an API call to update the delivery address
    setOrderData((prev) => ({
      ...prev,
      address: {
        line1: deliveryForm.line1,
        line2: deliveryForm.line2,
        city: deliveryForm.city,
        postcode: deliveryForm.postcode,
      },
    }))

    // Show success message
    setModificationSuccess("Delivery details updated successfully!")

    // Close the modal
    setTimeout(() => {
      setShowModifyDelivery(false)
      // Clear success message after a delay
      setTimeout(() => {
        setModificationSuccess(null)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          {!isTracking ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-md"
            >
              <div className="border-b border-gray-800 p-6">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <Package className="h-6 w-6 mr-3 text-purple-400" />
                  Track Your Order
                </h1>
                <p className="text-gray-400 mt-2">
                  Enter your order details below to track the status of your broadband installation.
                </p>
              </div>

              <div className="p-6">
                <form onSubmit={handleTrackOrder} className="space-y-6">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-300 mb-1">
                      Order Number
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g. ORD-123456"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter the email used for your order"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Search className="mr-2 h-5 w-5" />
                        Track Order
                      </span>
                    )}
                  </Button>

                  <div className="text-center text-gray-400 text-sm">
                    <p>
                      Can't find your order number?{" "}
                      <a href="#" className="text-purple-400 hover:underline">
                        Check your email
                      </a>{" "}
                      or{" "}
                      <a href="#" className="text-purple-400 hover:underline">
                        contact support
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
                <span className="text-sm text-gray-300 bg-gray-800 px-4 py-1.5 rounded-full">
                  Order #{orderData.orderNumber}
                </span>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {modificationSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <p className="text-green-400">{modificationSuccess}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Order Status Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-md"
              >
                <div className="border-b border-gray-800 p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <Package className="h-5 w-5 mr-3 text-purple-400" />
                      Order Status
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        orderData.status === "Completed"
                          ? "bg-green-900/30 text-green-400"
                          : "bg-purple-900/30 text-purple-400"
                      }`}
                    >
                      {orderData.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                          <h3 className="text-white font-medium">Installation</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                          onClick={() => setShowModifyInstallation(true)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modify
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{orderData.installation.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time:</span>
                          <span className="text-white">{orderData.installation.timeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span
                            className={
                              orderData.installation.status === "Completed" ? "text-green-400" : "text-yellow-400"
                            }
                          >
                            {orderData.installation.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-gray-700 hover:border-purple-400 hover:text-purple-400"
                        >
                          <CalendarClock className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-purple-400 mr-2" />
                          <h3 className="text-white font-medium">Equipment</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                          onClick={() => setShowModifyDelivery(true)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modify
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className="text-green-400">{orderData.equipment.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tracking:</span>
                          <span className="text-white">{orderData.equipment.trackingNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Delivery:</span>
                          <span className="text-white">{orderData.equipment.estimatedDelivery}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-gray-700 hover:border-purple-400 hover:text-purple-400"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Track Shipment
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Wifi className="h-5 w-5 text-purple-400 mr-2" />
                        <h3 className="text-white font-medium">Service</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Plan:</span>
                          <span className="text-white">{orderData.plan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Speed:</span>
                          <span className="text-white">{orderData.plan.speed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Activation:</span>
                          <span className="text-yellow-400">Pending Installation</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-gray-700 hover:border-purple-400 hover:text-purple-400"
                        >
                          <Router className="h-4 w-4 mr-2" />
                          Setup Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Order Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-md"
              >
                <div className="border-b border-gray-800 p-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-purple-400" />
                    Order Timeline
                  </h2>
                </div>

                <div className="p-6">
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gray-800"></div>

                    <div className="space-y-8">
                      {orderData.timeline.map((item, index) => (
                        <div key={index} className="flex items-start relative">
                          <div
                            className={`z-10 flex items-center justify-center w-11 h-11 rounded-full mr-4 flex-shrink-0 ${
                              item.status === "completed"
                                ? "bg-green-900/30"
                                : item.status === "in-progress"
                                  ? "bg-purple-900/30"
                                  : "bg-gray-900"
                            }`}
                          >
                            {getStatusIcon(item.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <h3 className="text-white font-medium">{item.step}</h3>
                              <div className="flex items-center mt-1 sm:mt-0">
                                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-gray-400 text-sm">
                                  {item.date} • {item.time}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-400 mt-1">{item.description}</p>

                            {item.status === "completed" && (
                              <div className="mt-2 flex items-center">
                                <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                                <p className="text-green-400 text-sm">Completed</p>
                              </div>
                            )}

                            {item.status === "in-progress" && (
                              <div className="mt-2 flex items-center">
                                <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                                <p className="text-purple-400 text-sm">In Progress</p>
                              </div>
                            )}

                            {item.status === "upcoming" && (
                              <div className="mt-2 flex items-center">
                                <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
                                <p className="text-yellow-400 text-sm">Upcoming</p>
                              </div>
                            )}

                            {item.status === "pending" && (
                              <div className="mt-2 flex items-center">
                                <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                                <p className="text-gray-400 text-sm">Pending</p>
                              </div>
                            )}

                            {item.status === "scheduled" && (
                              <div className="mt-2 flex items-center">
                                <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
                                <p className="text-yellow-400 text-sm">Scheduled</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Customer & Address Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-md"
              >
                <div className="border-b border-gray-800 p-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <User className="h-5 w-5 mr-3 text-purple-400" />
                    Customer Information
                  </h2>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <User className="h-4 w-4 text-purple-400 mr-2" />
                        Contact Details
                      </h3>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-white font-medium">{orderData.customer.name}</p>
                        <div className="mt-2 space-y-2">
                          <p className="text-gray-400 flex items-center">
                            <Mail className="h-4 w-4 text-gray-500 mr-2" />
                            {orderData.customer.email}
                          </p>
                          <p className="text-gray-400 flex items-center">
                            <Phone className="h-4 w-4 text-gray-500 mr-2" />
                            {orderData.customer.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <MapPin className="h-4 w-4 text-purple-400 mr-2" />
                        Installation Address
                      </h3>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-white">
                          {orderData.address.line1}
                          <br />
                          {orderData.address.line2}
                          <br />
                          {orderData.address.city}, {orderData.address.postcode}
                        </p>
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-gray-700 hover:border-purple-400 hover:text-purple-400"
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            View on Map
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-6 flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Order Details
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border border-gray-700 hover:bg-gray-800 text-white py-6 flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
                  size="lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-400 mb-3">Need help with your order?</p>
                <div className="inline-flex items-center bg-gray-900 px-6 py-4 rounded-lg">
                  <Phone className="h-5 w-5 text-purple-400 mr-3" />
                  <span className="font-medium text-white">Call us at 0800 123 4567</span>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      {/* Modify Installation Modal */}
      {showModifyInstallation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Modify Installation Date</h3>
              <button
                onClick={() => setShowModifyInstallation(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 text-purple-400 mr-2" />
                  Current Installation
                </h4>
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                    <p className="text-gray-300">{orderData.installation.date}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-purple-400 mr-2" />
                    <p className="text-gray-300">{orderData.installation.timeSlot}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Select New Date</h4>
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={goToPrevMonth}
                      className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <h5 className="text-white font-medium">
                      {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h5>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center text-gray-500 text-sm py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarData()
                      .filter((day) => day.isCurrentMonth)
                      .map((day, index) => {
                        const formattedDate = formatDate(day.date)
                        const isSelected = selectedDate === formattedDate
                        return (
                          <div
                            key={index}
                            onClick={() => day.isSelectable && handleDateSelect(day.date)}
                            className={`
                              h-10 flex items-center justify-center rounded-md cursor-pointer transition-colors
                              ${!day.isSelectable ? "text-gray-600 cursor-not-allowed" : "text-gray-300 hover:bg-gray-800"}
                              ${isSelected ? "bg-purple-900/50 text-white border border-purple-500/50" : ""}
                            `}
                          >
                            {day.date.getDate()}
                          </div>
                        )
                      })}
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    <p className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-yellow-400" />
                      Installation dates are available from 3 days after today
                    </p>
                  </div>
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h4 className="text-white font-medium mb-3">Select New Time Slot</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map((timeSlot, index) => (
                      <div
                        key={index}
                        onClick={() => handleTimeSlotSelect(timeSlot)}
                        className={`
                          p-4 rounded-lg cursor-pointer transition-all
                          ${
                            selectedTimeSlot === timeSlot
                              ? "bg-purple-900/30 border border-purple-500/50"
                              : "bg-black/50 border border-gray-700/50 hover:border-gray-600"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-purple-400 mr-3" />
                            <span className="text-white">{timeSlot}</span>
                          </div>
                          {selectedTimeSlot === timeSlot && <CheckCircle2 className="h-5 w-5 text-purple-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-700">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700"
                    onClick={() => setShowModifyInstallation(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={handleModifyInstallation}
                    disabled={!selectedDate || !selectedTimeSlot}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-3 text-center">
                  Changes to installation date must be made at least 24 hours in advance
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modify Delivery Modal */}
      {showModifyDelivery && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Modify Delivery Details</h3>
              <button
                onClick={() => setShowModifyDelivery(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <MapPin className="h-5 w-5 text-purple-400 mr-2" />
                  Current Delivery Address
                </h4>
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700/50">
                  <p className="text-gray-300">
                    {orderData.address.line1}
                    <br />
                    {orderData.address.line2}
                    <br />
                    {orderData.address.city}, {orderData.address.postcode}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Update Delivery Address</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="line1" className="block text-sm font-medium text-gray-300 mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="line1"
                      name="line1"
                      value={deliveryForm.line1}
                      onChange={handleDeliveryFormChange}
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="line2" className="block text-sm font-medium text-gray-300 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      id="line2"
                      name="line2"
                      value={deliveryForm.line2}
                      onChange={handleDeliveryFormChange}
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={deliveryForm.city}
                        onChange={handleDeliveryFormChange}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="postcode" className="block text-sm font-medium text-gray-300 mb-1">
                        Postcode
                      </label>
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={deliveryForm.postcode}
                        onChange={handleDeliveryFormChange}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-300 mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      value={deliveryForm.specialInstructions}
                      onChange={handleDeliveryFormChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder="E.g., Leave with neighbor, security code, etc."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700"
                    onClick={() => setShowModifyDelivery(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={handleModifyDelivery}
                    disabled={!deliveryForm.line1 || !deliveryForm.city || !deliveryForm.postcode}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-3 text-center">
                  Changes to delivery address must be made before equipment is dispatched
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto border-t border-border py-6 pb-24 md:pb-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2023 Olilo Broadband. All rights reserved.</p>
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
    </div>
  )
}

// ChevronLeft and ChevronRight components
const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)
