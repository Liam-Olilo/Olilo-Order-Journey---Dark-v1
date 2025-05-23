"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  CalendarIcon,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
  Bell,
  MessageSquare,
  Mail,
  Phone,
  PenToolIcon as Tool,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  User,
  Home,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface InstallAndPersonalDetailsProps {
  orderData: any
  updateOrderData: (data: any) => void
  errors?: Record<string, string[]>
}

export default function InstallAndPersonalDetails({
  orderData,
  updateOrderData,
  errors = {},
}: InstallAndPersonalDetailsProps) {
  // Installation section state
  const [selectedDate, setSelectedDate] = useState<string | null>(orderData.installOption?.date || null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(orderData.installOption?.timeSlot || null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [reminderMethod, setReminderMethod] = useState<string[]>(orderData.installOption?.reminderMethod || [])
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Personal details section state
  const [formData, setFormData] = useState({
    firstName: orderData.personalDetails?.firstName || "",
    lastName: orderData.personalDetails?.lastName || "",
    email: orderData.personalDetails?.email || "",
    phone: orderData.personalDetails?.phone || "",
    addressLine1: orderData.personalDetails?.addressLine1 || "",
    addressLine2: orderData.personalDetails?.addressLine2 || "",
    city: orderData.personalDetails?.city || "",
    county: orderData.personalDetails?.county || "",
    postcode: orderData.postcode || "",
    marketingConsent: orderData.personalDetails?.marketingConsent || false,
  })

  // Time slots - morning and afternoon
  const timeSlots = ["08:00 - 13:00", "13:00 - 18:00"]

  // Toggle expanded sections
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // Handle reminder method selection
  const toggleReminderMethod = (method: string) => {
    if (reminderMethod.includes(method)) {
      setReminderMethod(reminderMethod.filter((m) => m !== method))
    } else {
      setReminderMethod([...reminderMethod, method])
    }
  }

  // Handle form field changes for personal details
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  useEffect(() => {
    // Update order data with reminder preferences
    if (selectedDate && selectedTimeSlot) {
      updateOrderData({
        installOption: {
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          reminderMethod,
        },
      })
    }
  }, [reminderMethod, selectedDate, selectedTimeSlot])

  useEffect(() => {
    // Update parent component when form data changes
    updateOrderData({ personalDetails: formData })
  }, [formData])

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

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date)
    setSelectedDate(formattedDate)

    // If we already had a time slot selected, update the order data
    if (selectedTimeSlot) {
      updateOrderData({
        installOption: {
          date: formattedDate,
          timeSlot: selectedTimeSlot,
          reminderMethod,
        },
      })
    }
  }

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)

    // Update order data with both date and time slot
    if (selectedDate) {
      updateOrderData({
        installOption: {
          date: selectedDate,
          timeSlot,
          reminderMethod,
        },
      })
    }
  }

  // Reset time slot when date changes
  useEffect(() => {
    if (selectedDate && selectedDate !== orderData.installOption?.date) {
      setSelectedTimeSlot(null)
    }
  }, [selectedDate, orderData.installOption?.date])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div>
      {/* Installation Section */}
      <div className="mb-12">
        {errors.installOption && errors.installOption.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg"
          >
            {errors.installOption.map((error, index) => (
              <p key={index} className="text-sm text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            ))}
          </motion.div>
        )}

        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
          {/* Installation Info Section */}
          <motion.div
            variants={itemVariants}
            className="bg-black border border-[#a5c7d7]/30 p-4 sm:p-5 rounded-xl shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0">
              <div className="bg-[#a5c7d7]/20 p-2 rounded-full mr-0 sm:mr-3 flex-shrink-0 border border-[#a5c7d7]/30 self-start">
                <Info className="h-5 w-5 text-[#a5c7d7]" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">What to expect during installation</h3>
                <p className="text-gray-300 text-sm">
                  Our engineer will need access to your property to install your new broadband service. Please ensure
                  someone over 18 is present during the installation.
                </p>
                <button
                  onClick={() => toggleSection("installDetails")}
                  className="flex items-center text-[#a5c7d7] text-sm mt-3 hover:text-white transition-colors"
                >
                  {expandedSection === "installDetails" ? (
                    <>
                      Less details <ChevronUp className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      More details <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {expandedSection === "installDetails" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="space-y-3 text-sm text-gray-300 p-3 bg-[#a5c7d7]/5 rounded-lg border border-[#a5c7d7]/20">
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 text-[#a5c7d7] mr-2 mt-0.5" />
                          <p>Installation typically takes 1-2 hours depending on your property.</p>
                        </div>
                        <div className="flex items-start">
                          <Tool className="h-4 w-4 text-[#a5c7d7] mr-2 mt-0.5" />
                          <p>The engineer will install a new socket or use existing wiring where possible.</p>
                        </div>
                        <div className="flex items-start">
                          <Shield className="h-4 w-4 text-[#a5c7d7] mr-2 mt-0.5" />
                          <p>All our engineers follow COVID-safe practices and will wear appropriate PPE.</p>
                        </div>
                        <div className="flex items-start">
                          <HelpCircle className="h-4 w-4 text-[#a5c7d7] mr-2 mt-0.5" />
                          <p>The engineer will test your connection and help set up your router before leaving.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Date Selection Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <h3 className="font-bold text-white flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-[#a5c7d7]" />
                Select Installation Date
              </h3>
            </div>

            <motion.div
              key="list"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black border border-gray-700/30 rounded-lg p-4"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {generateCalendarData()
                  .filter((day) => day.isCurrentMonth && day.isSelectable)
                  .slice(0, 10)
                  .map((day, index) => {
                    const formattedDate = formatDate(day.date)
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        onClick={() => handleDateSelect(day.date)}
                        className={`border p-3 cursor-pointer transition-all rounded-lg flex flex-col items-center justify-center ${
                          selectedDate === formattedDate
                            ? "border-btn-filled bg-btn-filled/20"
                            : "border-gray-600/50 bg-zinc-900 hover:border-gray-600/50"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm text-gray-400">{formattedDate.split(",")[0]}</div>
                          <div className="text-lg font-medium text-white mt-1">{formattedDate.split(",")[1]}</div>
                        </div>
                        {selectedDate === formattedDate && (
                          <div className="mt-2">
                            <CheckCircle className="h-4 w-4 text-[#a5c7d7]" />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
              </div>
            </motion.div>
          </motion.div>

          {/* Time Slot Selection */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <h3 className="font-bold text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#a5c7d7]" />
                  Select Time Slot
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {timeSlots.map((timeSlot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTimeSlotSelect(timeSlot)}
                      className={`border p-4 cursor-pointer transition-all rounded-lg ${
                        selectedTimeSlot === timeSlot
                          ? "border-btn-filled bg-btn-filled/20"
                          : "border-gray-600/50 bg-gray-900/30 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`p-2 mr-3 rounded-full ${
                              selectedTimeSlot === timeSlot ? "bg-[#a5c7d7]" : "bg-gray-700/30"
                            }`}
                          >
                            <Clock
                              className={`h-5 w-5 ${selectedTimeSlot === timeSlot ? "text-white" : "text-gray-400"}`}
                            />
                          </div>
                          <div>
                            <span className="text-white font-medium">{index === 0 ? "Morning" : "Afternoon"}</span>
                            <div className="text-sm text-gray-400 mt-1">{timeSlot}</div>
                          </div>
                        </div>
                        {selectedTimeSlot === timeSlot && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            <CheckCircle className="h-5 w-5 text-[#a5c7d7]" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reminder Options */}
          <AnimatePresence>
            {selectedDate && selectedTimeSlot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-700/30 bg-black p-5 rounded-lg"
              >
                <h3 className="font-bold text-white mb-4 flex items-center">
                  <Bell className="h-5 w-5 text-[#a5c7d7] mr-2" />
                  Appointment Reminders
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  How would you like to be reminded about your installation appointment?
                </p>

                <div className="space-y-3">
                  <div
                    onClick={() => toggleReminderMethod("email")}
                    className={`flex items-start space-x-3 p-3 rounded-xl cursor-pointer transition-all bg-gray-800/40 border border-gray-600/30 hover:border-gray-600/50`}
                  >
                    <div className="flex-grow flex items-start">
                      <Mail
                        className={`h-5 w-5 ${reminderMethod.includes("email") ? "text-[#645bc5]" : "text-gray-500"} mr-3 mt-0.5`}
                      />
                      <div>
                        <h4 className="text-white text-sm font-medium">Email Reminder</h4>
                        <p className="text-gray-400 text-xs">Receive reminders via email</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        reminderMethod.includes("email") ? "bg-[#645bc5]" : "border border-gray-600/50"
                      }`}
                    >
                      {reminderMethod.includes("email") && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                  </div>

                  <div
                    onClick={() => toggleReminderMethod("sms")}
                    className={`flex items-start space-x-3 p-3 rounded-xl cursor-pointer transition-all bg-gray-800/40 border border-gray-600/30 hover:border-gray-600/50`}
                  >
                    <div className="flex-grow flex items-start">
                      <MessageSquare
                        className={`h-5 w-5 ${reminderMethod.includes("sms") ? "text-[#645bc5]" : "text-gray-500"} mr-3 mt-0.5`}
                      />
                      <div>
                        <h4 className="text-white text-sm font-medium">SMS Reminder</h4>
                        <p className="text-gray-400 text-xs">Receive reminders via text message</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        reminderMethod.includes("sms") ? "bg-[#645bc5]" : "border border-gray-600/50"
                      }`}
                    >
                      {reminderMethod.includes("sms") && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                  </div>

                  <div
                    onClick={() => toggleReminderMethod("phone")}
                    className={`flex items-start space-x-3 p-3 rounded-xl cursor-pointer transition-all bg-gray-800/40 border border-gray-600/30 hover:border-gray-600/50`}
                  >
                    <div className="flex-grow flex items-start">
                      <Phone
                        className={`h-5 w-5 ${reminderMethod.includes("phone") ? "text-[#645bc5]" : "text-gray-500"} mr-3 mt-0.5`}
                      />
                      <div>
                        <h4 className="text-white text-sm font-medium">Phone Call</h4>
                        <p className="text-gray-400 text-xs">Receive a phone call reminder</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        reminderMethod.includes("phone") ? "bg-[#645bc5]" : "border border-gray-600/50"
                      }`}
                    >
                      {reminderMethod.includes("phone") && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confirmation Message */}
          <AnimatePresence>
            {selectedDate && selectedTimeSlot && (
              <motion.div className="bg-[#645bc5]/20 backdrop-blur-sm border border-[#645bc5]/50 p-4 rounded-xl shadow-md shadow-[#645bc5]/15">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0">
                  <div className="bg-[#645bc5]/30 p-2 rounded-full mr-0 sm:mr-3 flex-shrink-0 border border-[#645bc5]/50 self-center sm:self-start">
                    <CheckCircle className="h-5 w-5 text-[#9992eb]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#9992eb] mb-1 text-center sm:text-left">Installation Confirmed</h3>
                    <p className="text-[#9992eb]/90 text-sm text-center sm:text-left">
                      Your installation is scheduled for <strong className="text-white">{selectedDate}</strong> between{" "}
                      <strong className="text-white">{selectedTimeSlot}</strong>.
                      {reminderMethod.length > 0 && (
                        <span> You'll receive reminders via {reminderMethod.join(" and ")}.</span>
                      )}
                    </p>
                    <div className="mt-2 pt-2 border-t border-[#645bc5]/30">
                      <p className="text-[#9992eb]/80 text-xs text-center sm:text-left">
                        Our engineer will arrive during your selected time slot. Please ensure someone over 18 is
                        present.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Personal Details Section */}
      <div className="mt-12 pt-8 border-t border-gray-700/50">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Your Details</h2>

        {errors.personalDetails && errors.personalDetails.length > 0 && (
          <div className="mb-4 p-3 bg-red-900/20 border-l-4 border-red-500">
            {errors.personalDetails.map((error, index) => (
              <p key={index} className="text-sm text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            ))}
          </div>
        )}

        <div className="bg-black border border-gray-700/50 rounded-lg p-4 sm:p-5 shadow-md">
          <Info className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-300">Why we need your details</h3>
            <p className="text-gray-200 text-sm">
              We'll use these details to set up your account, process your order, and keep you updated about your
              installation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
              First Name*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 border bg-zinc-900 text-white focus:outline-none ${
                  errors.personalDetails && errors.personalDetails.some((e) => e.includes("First name"))
                    ? "border-btn-destructive bg-btn-destructive/10 focus:border-btn-destructive"
                    : "border-gray-600/50 focus:border-btn-filled"
                }`}
                placeholder="John"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
              Last Name*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 border bg-zinc-900 text-white focus:outline-none ${
                  errors.personalDetails && errors.personalDetails.some((e) => e.includes("Last name"))
                    ? "border-red-500 bg-red-900/20 focus:border-red-500"
                    : "border-gray-600/50 focus:border-[#a5c7d7]"
                }`}
                placeholder="Smith"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 border bg-zinc-900 text-white focus:outline-none ${
                  errors.personalDetails && errors.personalDetails.some((e) => e.includes("Email"))
                    ? "border-red-500 bg-red-900/20 focus:border-red-500"
                    : "border-gray-600/50 focus:border-[#a5c7d7]"
                }`}
                placeholder="john.smith@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 border bg-zinc-900 text-white focus:outline-none ${
                  errors.personalDetails && errors.personalDetails.some((e) => e.includes("Phone"))
                    ? "border-red-500 bg-red-900/20 focus:border-red-500"
                    : "border-gray-600/50 focus:border-[#a5c7d7]"
                }`}
                placeholder="07123 456789"
                required
              />
            </div>
          </div>
        </div>

        <h3 className="font-bold text-white mb-3 sm:mb-4 mt-4">Installation Address</h3>

        <div className="mb-4">
          <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-300 mb-1">
            Address Line 1*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1 || orderData.address}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-600/50 bg-gray-800/40 text-white focus:outline-none focus:border-[#a5c7d7]"
              placeholder="123 High Street"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-300 mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-600/50 bg-gray-800/40 text-white focus:outline-none focus:border-[#a5c7d7]"
            placeholder="Apartment, suite, unit, etc."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
              City/Town*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-600/50 bg-gray-800/40 text-white focus:outline-none focus:border-[#a5c7d7]"
              placeholder="London"
              required
            />
          </div>

          <div>
            <label htmlFor="county" className="block text-sm font-medium text-gray-300 mb-1">
              County
            </label>
            <input
              type="text"
              id="county"
              name="county"
              value={formData.county}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-600/50 bg-gray-800/40 text-white focus:outline-none focus:border-[#a5c7d7]"
              placeholder="Greater London"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-300 mb-1">
              Postcode*
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-600/50 bg-gray-800/40 text-white focus:outline-none focus:border-[#a5c7d7]"
              placeholder="SW1A 1AA"
              required
            />
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <div className="flex items-start space-x-3 p-3 rounded-md bg-gray-900/30 border border-gray-700/50">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-[#a5c7d7] focus:ring-[#a5c7d7]/50 border-gray-600/50 bg-gray-700/30 rounded flex-shrink-0"
            />
            <span className="text-sm text-gray-300">
              I'd like to receive updates about special offers, product news, and exclusive promotions via email. You
              can unsubscribe at any time.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
