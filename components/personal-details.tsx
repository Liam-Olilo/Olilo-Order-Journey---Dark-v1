"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Mail, Phone, Home, Info, AlertCircle, CheckCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"

const mobileInputStyle = "py-2.5 text-base" // Slightly larger touch targets on mobile

interface PersonalDetailsProps {
  orderData: any
  updateOrderData: (data: any) => void
  errors?: Record<string, string[]>
}

export default function PersonalDetails({ orderData, updateOrderData, errors = {} }: PersonalDetailsProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      marketingConsent: checked,
    }))

    updateOrderData({
      personalDetails: {
        ...formData,
        marketingConsent: checked,
      },
    })
  }

  useEffect(() => {
    // Update parent component when form data changes
    updateOrderData({ personalDetails: formData })
  }, [formData])

  // Check if a field has an error
  const hasError = (fieldName: string) => {
    return (
      errors.personalDetails && errors.personalDetails.some((e) => e.toLowerCase().includes(fieldName.toLowerCase()))
    )
  }

  // Get validation status for a field
  const getValidationStatus = (fieldName: string, value: string) => {
    if (hasError(fieldName)) return "error"
    if (value && fieldName !== "addressLine2" && fieldName !== "county") return "valid"
    return "default"
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Your Details</h2>

      {errors.personalDetails && errors.personalDetails.length > 0 && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
          <h3 className="text-red-400 font-medium mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Please correct the following errors:
          </h3>
          <ul className="space-y-1 pl-6 list-disc text-red-300">
            {errors.personalDetails.map((error, index) => (
              <li key={index} className="text-sm">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-black border-l-4 border-[#a5c7d7] p-4 mb-6 rounded-r-lg shadow-md">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-[#a5c7d7] mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-200 mb-1">Why we need your details</h3>
            <p className="text-gray-300 text-sm">
              We'll use these details to set up your account, process your order, and keep you updated about your
              installation.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-black border border-gray-700/50 rounded-xl p-5 shadow-md">
          <h3 className="text-lg font-medium text-white mb-4 pb-2 border-b border-gray-700/50">Personal Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                First Name <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className={`h-5 w-5 ${hasError("firstName") ? "text-red-400" : formData.firstName ? "text-[#a5c7d7]" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                    hasError("firstName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : formData.firstName
                        ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                  } focus:outline-none focus:ring-2`}
                  placeholder="John"
                  required
                />
                {formData.firstName && !hasError("firstName") && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {hasError("firstName") && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  First name is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                Last Name <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className={`h-5 w-5 ${hasError("lastName") ? "text-red-400" : formData.lastName ? "text-[#a5c7d7]" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                    hasError("lastName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : formData.lastName
                        ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                  } focus:outline-none focus:ring-2`}
                  placeholder="Smith"
                  required
                />
                {formData.lastName && !hasError("lastName") && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {hasError("lastName") && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Last name is required
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <div>
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                Email Address <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={`h-5 w-5 ${hasError("email") ? "text-red-400" : formData.email ? "text-[#a5c7d7]" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                    hasError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : formData.email
                        ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                  } focus:outline-none focus:ring-2`}
                  placeholder="john.smith@example.com"
                  required
                />
                {formData.email && !hasError("email") && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {hasError("email") && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Valid email is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                Phone Number <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone
                    className={`h-5 w-5 ${hasError("phone") ? "text-red-400" : formData.phone ? "text-[#a5c7d7]" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                    hasError("phone")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : formData.phone
                        ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                  } focus:outline-none focus:ring-2`}
                  placeholder="07123 456789"
                  required
                />
                {formData.phone && !hasError("phone") && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {hasError("phone") && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Valid phone number is required
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-black border border-gray-700/50 rounded-xl p-5 shadow-md">
          <h3 className="text-lg font-medium text-white mb-4 pb-2 border-b border-gray-700/50 flex items-center">
            <Home className="h-5 w-5 mr-2 text-[#a5c7d7]" />
            Installation Address
          </h3>

          <div className="space-y-5">
            <div>
              <label htmlFor="addressLine1" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                Address Line 1 <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home
                    className={`h-5 w-5 ${hasError("addressLine1") ? "text-red-400" : formData.addressLine1 ? "text-[#a5c7d7]" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1 || orderData.address}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                    hasError("addressLine1")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : formData.addressLine1
                        ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                  } focus:outline-none focus:ring-2`}
                  placeholder="123 High Street"
                  required
                />
                {formData.addressLine1 && !hasError("addressLine1") && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {hasError("addressLine1") && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Address line 1 is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="addressLine2" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                Address Line 2 <span className="text-gray-500 text-xs ml-1">(Optional)</span>
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-700 bg-black/80 text-white rounded-md focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/30 transition-all duration-200"
                placeholder="Apartment, suite, unit, etc."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="city" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                  City/Town <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                      hasError("city")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                        : formData.city
                          ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                          : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="London"
                    required
                  />
                  {formData.city && !hasError("city") && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
                {hasError("city") && (
                  <p className="mt-1 text-xs text-red-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    City/Town is required
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="county" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                  County <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="county"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-700 bg-black/80 text-white rounded-md focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/30 transition-all duration-200"
                  placeholder="Greater London"
                />
              </div>

              <div>
                <label htmlFor="postcode" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                  Postcode <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                      hasError("postcode")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                        : formData.postcode
                          ? "border-[#a5c7d7]/70 focus:border-[#a5c7d7] focus:ring-[#a5c7d7]/30"
                          : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="SW1A 1AA"
                    required
                  />
                  {formData.postcode && !hasError("postcode") && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
                {hasError("postcode") && (
                  <p className="mt-1 text-xs text-red-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Valid postcode is required
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Preferences */}
        <div className="bg-black border border-gray-700/50 rounded-xl p-5 shadow-md">
          <h3 className="text-lg font-medium text-white mb-4 pb-2 border-b border-gray-700/50">
            Marketing Preferences
          </h3>

          <div className="flex items-start sm:items-center space-x-3 p-3 rounded-md bg-gray-900/30 border border-gray-700/50">
            <Switch
              checked={formData.marketingConsent}
              onCheckedChange={handleSwitchChange}
              id="marketing-consent"
              className="flex-shrink-0"
            />
            <label htmlFor="marketing-consent" className="text-sm text-gray-300 cursor-pointer">
              I'd like to receive updates about special offers, product news, and exclusive promotions via email. You
              can unsubscribe at any time.
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
