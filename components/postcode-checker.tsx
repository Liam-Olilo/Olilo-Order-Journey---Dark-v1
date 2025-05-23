"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  CheckCircle,
  XCircle,
  Wifi,
  AlertCircle,
  Home,
  MapPin,
  Loader2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Building,
  Mail,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PostcodeCheckerProps {
  orderData: any
  updateOrderData: (data: any) => void
  errors?: Record<string, string[]>
}

export default function PostcodeChecker({ orderData, updateOrderData, errors = {} }: PostcodeCheckerProps) {
  const [postcode, setPostcode] = useState(orderData.postcode || "")
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<null | "available" | "unavailable">(
    orderData.address ? "available" : null,
  )
  const [addresses, setAddresses] = useState<string[]>([])
  const [selectedAddress, setSelectedAddress] = useState(orderData.address || "")
  const [showCoverageInfo, setShowCoverageInfo] = useState(false)
  const [postcodeTypingTimeout, setPostcodeTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null)
  const [showCustomAddressForm, setShowCustomAddressForm] = useState(false)
  const [customAddress, setCustomAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    county: "",
    postcode: postcode,
  })

  // Add a state for tracking local errors
  const [localErrors, setLocalErrors] = useState<Record<string, string[]>>({})

  // UK postcode regex pattern
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i

  // Format postcode with a space in the correct position
  const formatPostcode = (input: string) => {
    // Remove all spaces first
    const noSpaces = input.replace(/\s/g, "").toUpperCase()

    if (noSpaces.length > 4) {
      // Insert a space before the last three characters
      return `${noSpaces.slice(0, -3)} ${noSpaces.slice(-3)}`
    }

    return noSpaces
  }

  // Handle postcode input change with formatting
  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    // Only allow letters, numbers and spaces
    if (/^[a-zA-Z0-9 ]*$/.test(rawValue)) {
      const formattedPostcode = formatPostcode(rawValue)
      setPostcode(formattedPostcode)

      // Clear any previous timeout
      if (postcodeTypingTimeout) {
        clearTimeout(postcodeTypingTimeout)
      }

      // Set a timeout to validate the postcode after typing stops
      const timeout = setTimeout(() => {
        const isValid = postcodeRegex.test(formattedPostcode)
        setPostcodeValid(formattedPostcode.length > 0 ? isValid : null)

        // Auto-check when valid postcode is entered
        if (isValid && formattedPostcode.length >= 6) {
          checkPostcode(formattedPostcode)
        }
      }, 500)

      setPostcodeTypingTimeout(timeout)
    }
  }

  // Mock function to check postcode availability
  const checkPostcode = (postcodeToCheck = postcode) => {
    if (!postcodeToCheck) return

    setIsChecking(true)
    // Reset states when checking a new postcode
    setSelectedAddress("")
    setShowCustomAddressForm(false)
    setCustomAddress({
      ...customAddress,
      postcode: postcodeToCheck,
    })

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll say all postcodes are valid except those starting with "ZZ"
      const isAvailable = !postcodeToCheck.toUpperCase().startsWith("ZZ")
      setCheckResult(isAvailable ? "available" : "unavailable")

      if (isAvailable) {
        // Mock addresses
        const mockAddresses = [
          "Flat 1, 123 High Street",
          "Flat 2, 123 High Street",
          "Flat 3, 123 High Street",
          "124 High Street",
          "125 High Street",
        ]
        setAddresses(mockAddresses)

        // Auto-select first address if there's only one
        if (mockAddresses.length === 1) {
          handleAddressSelect(mockAddresses[0])
        }
      }

      setIsChecking(false)
    }, 800)
  }

  // Update the handleAddressSelect function to immediately navigate to step 2
  const handleAddressSelect = (address: string) => {
    if (address === "custom") {
      setSelectedAddress("")
      setShowCustomAddressForm(true)
    } else {
      // Update order data with the selected address
      updateOrderData({
        postcode,
        address,
        addressConfirmed: true,
        // Immediately navigate to step 2
        navigateToStep: 2,
      })

      // Scroll to top for better user experience
      window.scrollTo(0, 0)
    }
  }

  // Handle custom address form input changes
  const handleCustomAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomAddress({
      ...customAddress,
      [name]: value,
    })
  }

  // Validate custom address form
  const validateCustomAddress = () => {
    const errors: Record<string, string[]> = {}

    if (!customAddress.line1.trim()) {
      errors.customAddress = ["Address line 1 is required"]
    }

    if (!customAddress.city.trim()) {
      if (!errors.customAddress) errors.customAddress = []
      errors.customAddress.push("City/Town is required")
    }

    setLocalErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Add a new function to handle address confirmation
  const confirmCustomAddress = () => {
    // Validate custom address
    if (!validateCustomAddress()) return

    // Format the custom address as a string
    const formattedAddress = `${customAddress.line1}${customAddress.line2 ? ", " + customAddress.line2 : ""}, ${customAddress.city}${customAddress.county ? ", " + customAddress.county : ""}, ${customAddress.postcode}`

    // Update order data with custom address and immediately navigate to step 2
    updateOrderData({
      postcode: customAddress.postcode,
      address: formattedAddress,
      customAddressDetails: customAddress,
      addressConfirmed: true,
      navigateToStep: 2,
    })

    // Scroll to top for better user experience
    window.scrollTo(0, 0)
  }

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
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-4">
      {/* Optimize the postcode checker section */}
      <motion.div variants={itemVariants} className="bg-black border border-gray-700/50 p-5 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="w-12 h-12 bg-[#a5c7d7]/20 rounded-full flex items-center justify-center border border-[#a5c7d7]/30">
              <MapPin className="h-6 w-6 text-[#a5c7d7]" />
            </div>
          </div>

          <div className="flex-grow">
            <h2 className="text-lg font-medium text-white mb-2 text-center md:text-left">
              Find Your Perfect Connection
            </h2>
            <p className="text-gray-300 text-sm mb-4 text-center md:text-left">
              Enter your postcode to check availability and see plans tailored to your location.
            </p>

            {/* Integrated postcode input with search button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Postcode <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin
                      className={`h-5 w-5 ${postcodeValid === false ? "text-red-400" : postcodeValid === true ? "text-[#a5c7d7]" : "text-gray-500"}`}
                    />
                  </div>
                  <input
                    type="text"
                    id="postcode"
                    value={postcode}
                    onChange={handlePostcodeChange}
                    placeholder="Enter your postcode (e.g. SW1A 1AA)"
                    className={`pl-10 pr-12 w-full px-4 py-3 sm:py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                      errors.postcode
                        ? "border-red-500 bg-red-900/20 focus:ring-red-500/30 focus:border-red-500"
                        : postcodeValid === true
                          ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30 shadow-sm shadow-[#a5c7d7]/20"
                          : postcodeValid === false
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                            : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                    } focus:outline-none focus:ring-2 text-base sm:text-sm`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && postcodeValid && !isChecking) {
                        e.preventDefault()
                        checkPostcode()
                      }
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {postcodeValid !== null && !isChecking && (
                      <div className="pointer-events-none mr-2">
                        {postcodeValid ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                    <motion.button
                      onClick={() => checkPostcode()}
                      disabled={isChecking || !postcode || postcodeValid === false}
                      className={`flex items-center justify-center transition-all rounded-md text-xs font-medium p-1.5 ${
                        isChecking || !postcode || postcodeValid === false
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-[#bddfef] text-black hover:bg-[#a5c7d7]"
                      }`}
                      whileHover={!isChecking && postcode && postcodeValid !== false ? { scale: 1.05 } : {}}
                      whileTap={!isChecking && postcode && postcodeValid !== false ? { scale: 0.95 } : {}}
                      aria-label="Check availability"
                    >
                      {isChecking ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </motion.button>
                  </div>
                </div>
                {errors.postcode && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.postcode[0]}
                  </p>
                )}

                {postcodeValid === false && !errors.postcode && (
                  <p className="mt-1.5 text-xs text-amber-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Please enter a valid UK postcode
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowCoverageInfo(!showCoverageInfo)}
              className="text-[#a5c7d7] text-xs mt-3 flex items-center hover:text-white transition-colors mx-auto sm:mx-0"
            >
              {showCoverageInfo ? (
                <>
                  Hide coverage information <ChevronUp className="h-3 w-3 ml-1" />
                </>
              ) : (
                <>
                  View coverage information <ChevronDown className="h-3 w-3 ml-1" />
                </>
              )}
            </button>

            <AnimatePresence>
              {showCoverageInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 p-3 bg-[#a5c7d7]/5 rounded-lg border border-[#a5c7d7]/20">
                    <div className="p-2.5 rounded-md">
                      <h4 className="text-xs font-medium text-white mb-1.5 flex items-center">
                        <Wifi className="h-3 w-3 mr-1.5 text-[#a5c7d7]" />
                        Our Network Coverage
                      </h4>
                      <ul className="space-y-1.5">
                        <li className="flex items-start">
                          <Check className="h-3 w-3 text-[#a5c7d7] mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-300">Available in over 85% of UK homes</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-3 w-3 text-[#a5c7d7] mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-300">Speeds up to 2.3 Gbps in covered areas</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-md">
                      <h4 className="text-xs font-medium text-white mb-1.5 flex items-center">
                        <Building className="h-3 w-3 mr-1.5 text-[#a5c7d7]" />
                        Building Types
                      </h4>
                      <ul className="space-y-1.5">
                        <li className="flex items-start">
                          <Check className="h-3 w-3 text-[#a5c7d7] mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-300">Houses and single dwellings</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-3 w-3 text-[#a5c7d7] mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-300">Apartment buildings and flats</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Address Selection - Only show when postcode is checked and available */}
      <AnimatePresence>
        {checkResult === "available" && addresses.length > 0 && !selectedAddress && !showCustomAddressForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-black border border-gray-700/50 p-5 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-medium text-white mb-3 pb-2 border-b border-gray-700/50 flex items-center">
              <Home className="h-5 w-5 mr-2 text-[#a5c7d7]" />
              Select Your Address
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              Please select your address from the list below or enter it manually if not listed.
            </p>

            {/* Optimize the address selection for mobile */}
            <div className="space-y-2.5">
              {addresses.map((address, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAddressSelect(address)}
                  className="border border-gray-700/50 hover:border-[#a5c7d7]/50 bg-black p-3 sm:p-3.5 rounded-md cursor-pointer flex items-center justify-between transition-all"
                >
                  <div className="flex items-center">
                    <div className="bg-[#a5c7d7]/10 p-1.5 rounded-full mr-2 border border-[#a5c7d7]/20">
                      <Home className="h-4 w-4 text-[#a5c7d7]" />
                    </div>
                    <span className="text-white text-sm">{address}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#a5c7d7] flex-shrink-0 ml-2" />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: addresses.length * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleAddressSelect("custom")}
                className="border border-gray-700/50 hover:border-[#a5c7d7]/50 bg-black p-3 sm:p-3.5 rounded-md cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center">
                  <div className="bg-[#a5c7d7]/10 p-1.5 rounded-full mr-2 border border-[#a5c7d7]/20">
                    <MapPin className="h-4 w-4 text-[#a5c7d7]" />
                  </div>
                  <span className="text-gray-300 text-sm">My address isn't listed</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#a5c7d7] flex-shrink-0 ml-2" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Address Form */}
      <AnimatePresence>
        {checkResult === "available" && showCustomAddressForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-black border border-gray-700/50 p-5 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-medium text-white mb-3 pb-2 border-b border-gray-700/50 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-[#a5c7d7]" />
              Enter Your Address
            </h3>

            <div className="space-y-4">
              {localErrors.customAddress && (
                <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-md">
                  <h4 className="text-red-400 text-sm font-medium mb-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Please correct the following:
                  </h4>
                  <ul className="space-y-1 pl-5 list-disc">
                    {localErrors.customAddress.map((error, index) => (
                      <li key={index} className="text-xs text-red-300">
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optimize the custom address form for mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="line1" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                    Address Line 1 <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin
                        className={`h-4 w-4 ${localErrors.customAddress ? "text-red-400" : customAddress.line1 ? "text-[#a5c7d7]" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="text"
                      id="line1"
                      name="line1"
                      value={customAddress.line1}
                      onChange={handleCustomAddressChange}
                      placeholder="House number and street name"
                      className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                        localErrors.customAddress
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : customAddress.line1
                            ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                            : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                      } focus:outline-none focus:ring-2 text-base sm:text-sm`}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="line2" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                    Address Line 2 <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="line2"
                    name="line2"
                    value={customAddress.line2}
                    onChange={handleCustomAddressChange}
                    placeholder="Apartment, suite, unit, etc."
                    className="w-full px-4 py-3 border border-gray-700 bg-black/80 text-white rounded-md focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/30 transition-all duration-200 text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                    City/Town <span className="text-red-400 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={customAddress.city}
                    onChange={handleCustomAddressChange}
                    placeholder="City or town"
                    className={`w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                      localErrors.customAddress && localErrors.customAddress.some((e) => e.includes("City"))
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                        : customAddress.city
                          ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                          : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                    } focus:outline-none focus:ring-2 text-base sm:text-sm`}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="county" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                    County <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="county"
                    name="county"
                    value={customAddress.county}
                    onChange={handleCustomAddressChange}
                    placeholder="County"
                    className="w-full px-4 py-3 border border-gray-700 bg-black/80 text-white rounded-md focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/30 transition-all duration-200 text-base sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="customPostcode"
                    className="flex items-center text-sm font-medium text-gray-200 mb-1.5"
                  >
                    Postcode <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-[#a5c7d7]" />
                    </div>
                    <input
                      type="text"
                      id="customPostcode"
                      name="postcode"
                      value={customAddress.postcode}
                      className="pl-10 w-full px-4 py-3 border border-[#a5c7d7]/50 bg-black/80 text-white rounded-md focus:outline-none focus:border-[#a5c7d7] focus:ring-2 focus:ring-[#a5c7d7]/30 transition-all duration-200 text-base sm:text-sm"
                      required
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-5 pt-4 border-t border-gray-700/50">
                <button
                  onClick={() => setShowCustomAddressForm(false)}
                  className="px-4 py-2.5 border border-gray-700/50 hover:border-gray-500 text-white rounded-md text-sm transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back
                </button>
                <motion.button
                  onClick={confirmCustomAddress}
                  className="flex-1 bg-[#bddfef] hover:bg-[#a5c7d7] text-black px-4 py-2.5 rounded-md text-sm font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirm Address
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unavailable Message */}
      {checkResult === "unavailable" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-black border border-red-500/40 p-3 rounded-lg"
        >
          {/* Optimize the unavailable message for mobile */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0">
            <div className="bg-red-500/20 p-2 rounded-full mr-0 sm:mr-3 border border-red-500/30 self-center sm:self-start">
              <XCircle className="h-4 w-4 text-red-400" />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-1 text-center sm:text-left">Not Available Yet</h3>
              <p className="text-red-200 text-xs mb-3 text-center sm:text-left">
                We're sorry, our services aren't available at your location yet. We're expanding our network and may be
                able to serve you soon.
              </p>

              <div className="bg-black border border-gray-500/70 p-3 rounded-md">
                <h4 className="text-xs font-medium text-white mb-2">Register for updates</h4>
                <p className="text-xs text-gray-400 mb-3">
                  Leave your email address and we'll notify you when our services become available in your area.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full pl-8 px-3 py-2.5 sm:py-2 border border-gray-500/70 bg-black text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 rounded-md transition-all duration-200 text-sm border-enhanced text-base sm:text-sm"
                    />
                  </div>
                  <motion.button
                    className="bg-[#bddfef] hover:bg-[#a5c7d7] text-black px-4 py-2.5 sm:py-2 flex items-center justify-center transition-all rounded-md text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Notify Me
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
