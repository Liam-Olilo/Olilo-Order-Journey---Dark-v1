"use client"

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
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"

interface InstallOptionsProps {
  orderData: any
  updateOrderData: (data: any) => void
  errors?: Record<string, string[]>
}

export default function InstallOptions({ orderData, updateOrderData, errors = {} }: InstallOptionsProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(orderData.installOption?.date || null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(orderData.installOption?.timeSlot || null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [reminderMethod, setReminderMethod] = useState<string[]>(orderData.installOption?.reminderMethod || [])
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  // Engineer assigned state removed
  // Calendar view state removed - using list view only

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

  const handleReminderToggle = (method: string, checked: boolean) => {
    if (checked) {
      if (!reminderMethod.includes(method)) {
        setReminderMethod([...reminderMethod, method])
      }
    } else {
      setReminderMethod(reminderMethod.filter((m) => m !== method))
    }
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
  }, [reminderMethod])

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

  const calendarDays = generateCalendarData()

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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 tracking-tight"
      >
        Choose Installation Date & Time
      </motion.h2>

      {errors.installOption && errors.installOption.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-red-900/20 backdrop-blur-sm border border-red-500/50 rounded-xl"
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
        <motion.div variants={itemVariants} className="bg-black border border-[#a5c7d7]/30 p-5 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-0">
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
                className="flex items-center text-[#a5c7d7] text-sm mt-3 hover:text-white transition-colors py-3 px-4"
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
                    <div className="space-y-3 text-sm text-gray-300 p-5 bg-[#a5c7d7]/5 rounded-xl border border-[#a5c7d7]/20">
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
            <h3 className="font-bold text-white flex items-center mb-3">
              <CalendarIcon className="h-5 w-5 mr-2 text-[#a5c7d7]" />
              Select Installation Date
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Choose a date that works for you. Our engineers are available Monday through Saturday.
            </p>
          </div>

          <motion.div
            key="list"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-gray-700/50 rounded-xl p-5 shadow-md"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-3">
              {generateCalendarData()
                .filter((day) => day.isCurrentMonth && day.isSelectable)
                .slice(0, 10)
                .map((day, index) => {
                  const formattedDate = formatDate(day.date)
                  const isSelected = selectedDate === formattedDate
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      onClick={() => handleDateSelect(day.date)}
                      className={`border p-5 cursor-pointer transition-all rounded-xl backdrop-blur-sm flex flex-col items-center justify-center ${
                        isSelected
                          ? "border-[#645bc5] bg-[#645bc5]/20 shadow-lg shadow-[#645bc5]/15"
                          : "border-gray-700/50 bg-black hover:border-[#645bc5]/50 hover:shadow-md hover:shadow-[#645bc5]/10"
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-sm ${isSelected ? "text-[#9992eb]" : "text-gray-400"}`}>
                          {formattedDate.split(",")[0]}
                        </div>
                        <div className={`text-lg font-medium ${isSelected ? "text-white" : "text-gray-300"} mt-1`}>
                          {formattedDate.split(",")[1]}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-2">
                          <CheckCircle className="h-4 w-4 text-[#645bc5]" />
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
                <Clock className="h-5 w-5 mr-2 text-[#645bc5]" />
                Select Time Slot
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Choose a time slot that works best for you. Installation typically takes 1-2 hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4">
                {timeSlots.map((timeSlot, index) => {
                  const isSelected = selectedTimeSlot === timeSlot
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTimeSlotSelect(timeSlot)}
                      className={`border p-5 cursor-pointer transition-all rounded-xl backdrop-blur-sm ${
                        isSelected
                          ? "border-[#645bc5] bg-[#645bc5]/20 shadow-lg shadow-[#645bc5]/15"
                          : "border-gray-700/50 bg-black hover:border-gray-600/30 hover:shadow-md hover:shadow-[#645bc5]/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`p-2 mr-3 rounded-full ${
                              isSelected
                                ? "bg-gradient-to-r from-[#645bc5] to-[#847dd7] hover:from-[#847dd7] hover:to-[#9992eb]"
                                : "bg-gray-800/70"
                            }`}
                          >
                            <Clock className={`h-5 w-5 ${isSelected ? "text-white" : "text-[#645bc5]"}`} />
                          </div>
                          <div>
                            <span className={`font-medium ${isSelected ? "text-white" : "text-gray-300"}`}>
                              {index === 0 ? "Morning" : "Afternoon"}
                            </span>
                            <div className={`text-sm ${isSelected ? "text-[#9992eb]" : "text-gray-400"} mt-1`}>
                              {timeSlot}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            <CheckCircle className="h-5 w-5 text-[#645bc5]" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
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
              className="border border-gray-700/50 bg-black backdrop-blur-sm p-5 rounded-xl shadow-lg"
            >
              <h3 className="font-bold text-white mb-3 flex items-center pb-2 border-b border-gray-700/50">
                <Bell className="h-5 w-5 text-[#645bc5] mr-2" />
                Appointment Reminders
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                How would you like to be reminded about your installation appointment?
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-5 rounded-xl cursor-pointer transition-all bg-gray-800/40 border border-gray-600/30 hover:border-gray-600/50">
                  <div className="flex-grow flex items-start">
                    <Mail
                      className={`h-5 w-5 ${reminderMethod.includes("email") ? "text-[#645bc5]" : "text-gray-500"} mr-3 mt-0.5`}
                    />
                    <div>
                      <h4 className="text-white text-sm font-medium">Email Reminder</h4>
                      <p className="text-gray-400 text-xs">Receive reminders via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={reminderMethod.includes("email")}
                    onCheckedChange={(checked) => handleReminderToggle("email", checked)}
                    size="large"
                    className="flex-shrink-0"
                  />
                </div>

                <div className="flex items-start space-x-3 p-5 rounded-xl cursor-pointer transition-all bg-gray-800/40 border border-gray-600/30 hover:border-gray-600/50">
                  <div className="flex-grow flex items-start">
                    <MessageSquare
                      className={`h-5 w-5 ${reminderMethod.includes("sms") ? "text-[#645bc5]" : "text-gray-500"} mr-3 mt-0.5`}
                    />
                    <div>
                      <h4 className="text-white text-sm font-medium">SMS Reminder</h4>
                      <p className="text-gray-400 text-xs">Receive reminders via text message</p>
                    </div>
                  </div>
                  <Switch
                    checked={reminderMethod.includes("sms")}
                    onCheckedChange={(checked) => handleReminderToggle("sms", checked)}
                    size="large"
                    className="flex-shrink-0"
                  />
                </div>

                <div className="flex items-start space-x-3 p-5 rounded-xl cursor-pointer transition-all bg-gray-800/40 border border-gray-600/30 hover:border-gray-600/50">
                  <div className="flex-grow flex items-start">
                    <Phone
                      className={`h-5 w-5 ${reminderMethod.includes("phone") ? "text-[#645bc5]" : "text-gray-500"} mr-3 mt-0.5`}
                    />
                    <div>
                      <h4 className="text-white text-sm font-medium">Phone Call</h4>
                      <p className="text-gray-400 text-xs">Receive a phone call reminder</p>
                    </div>
                  </div>
                  <Switch
                    checked={reminderMethod.includes("phone")}
                    onCheckedChange={(checked) => handleReminderToggle("phone", checked)}
                    size="large"
                    className="flex-shrink-0"
                  />
                </div>
              </div>

              {reminderMethod.length === 0 && (
                <p className="mt-3 text-amber-400 text-xs flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Please select at least one reminder method
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Message */}
        <AnimatePresence>
          {selectedDate && selectedTimeSlot && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.div className="bg-[#645bc5]/20 backdrop-blur-sm border border-[#645bc5]/50 p-5 rounded-xl shadow-md shadow-[#645bc5]/15">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-0">
                  <div className="bg-[#645bc5]/30 p-2 rounded-full mr-0 sm:mr-3 flex-shrink-0 border border-[#645bc5]/50 self-start">
                    <CheckCircle className="h-5 w-5 text-[#9992eb]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#9992eb] mb-1">Installation Confirmed</h3>
                    <p className="text-[#9992eb]/90 text-sm">
                      Your installation is scheduled for <strong className="text-white">{selectedDate}</strong> between{" "}
                      <strong className="text-white">{selectedTimeSlot}</strong>.
                      {reminderMethod.length > 0 && (
                        <span> You'll receive reminders via {reminderMethod.join(" and ")}.</span>
                      )}
                    </p>
                    <div className="mt-2 pt-2 border-t border-[#645bc5]/30">
                      <p className="text-[#9992eb]/80 text-xs">
                        Our engineer will arrive during your selected time slot. Please ensure someone over 18 is
                        present.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
