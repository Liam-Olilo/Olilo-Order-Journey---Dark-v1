"use client"

import type React from "react"

import { useState } from "react"
import {
  CreditCard,
  Calendar,
  Lock,
  User,
  AlertCircle,
  Package,
  Tag,
  CheckCircle,
  CreditCardIcon as CardIcon,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface PaymentDetailsProps {
  orderData: any
  updateOrderData: (data: any) => void
  errors?: Record<string, string[]>
}

export default function PaymentDetails({ orderData, updateOrderData, errors = {} }: PaymentDetailsProps) {
  const [paymentData, setPaymentData] = useState({
    cardholderName: orderData.paymentDetails?.cardholderName || "",
    cardNumber: orderData.paymentDetails?.cardNumber || "",
    expiryDate: orderData.paymentDetails?.expiryDate || "",
    cvv: orderData.paymentDetails?.cvv || "",
    saveCard: orderData.paymentDetails?.saveCard || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    let formattedValue = value

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\//g, "")
        .replace(/(.{2})(.+)/, "$1/$2")
        .substring(0, 5)
    }

    setPaymentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formattedValue,
    }))

    updateOrderData({
      paymentDetails: {
        ...orderData.paymentDetails,
        [name]: type === "checkbox" ? checked : formattedValue,
      },
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setPaymentData((prev) => ({
      ...prev,
      saveCard: checked,
    }))

    updateOrderData({
      paymentDetails: {
        ...orderData.paymentDetails,
        saveCard: checked,
      },
    })
  }

  const calculateDiscount = () => {
    if (!orderData.promoDiscount) return 0

    const subtotal = orderData.plan
      ? orderData.plan.price
      : 0 + (orderData.addons ? orderData.addons.reduce((sum: number, addon: any) => sum + addon.price, 0) : 0)

    if (orderData.promoType === "percentage") {
      return (subtotal * orderData.promoDiscount) / 100
    } else {
      return orderData.promoDiscount
    }
  }

  const calculateTotal = () => {
    const planPrice = orderData.plan ? orderData.plan.price : 0
    const addonTotal = orderData.addons ? orderData.addons.reduce((sum: number, addon: any) => sum + addon.price, 0) : 0
    const discount = calculateDiscount()
    return (planPrice + addonTotal - discount).toFixed(2)
  }

  // Check if a field has an error
  const hasError = (fieldName: string) => {
    return errors.paymentDetails && errors.paymentDetails.some((e) => e.toLowerCase().includes(fieldName.toLowerCase()))
  }

  // Get card type based on first digits
  const getCardType = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s+/g, "")

    if (/^4/.test(cleanNumber)) return "Visa"
    if (/^5[1-5]/.test(cleanNumber)) return "Mastercard"
    if (/^3[47]/.test(cleanNumber)) return "American Express"
    if (/^6(?:011|5)/.test(cleanNumber)) return "Discover"

    return null
  }

  const cardType = getCardType(paymentData.cardNumber)

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Payment Details</h2>

      {errors.paymentDetails && errors.paymentDetails.length > 0 && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
          <h3 className="text-red-400 font-medium mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Please correct the following errors:
          </h3>
          <ul className="space-y-1 pl-6 list-disc text-red-300">
            {errors.paymentDetails.map((error, index) => (
              <li key={index} className="text-sm">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        {/* Order Summary Section */}
        <div className="bg-black border border-[#a5c7d7]/30 rounded-xl p-5 shadow-lg">
          <div className="flex items-center mb-4 pb-2 border-b border-[#a5c7d7]/20">
            <div className="bg-[#a5c7d7]/20 p-2 mr-3 rounded-md">
              <Package className="h-5 w-5 text-[#a5c7d7]" />
            </div>
            <h3 className="font-bold text-white">Order Summary</h3>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-4 max-h-[200px] sm:max-h-none overflow-auto sm:overflow-visible">
            {orderData.plan && (
              <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-900/30 transition-colors">
                <span className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-[#a5c7d7] rounded-full mr-2"></span>
                  {orderData.plan.name}
                </span>
                <span className="text-white font-medium">£{orderData.plan.price.toFixed(2)}/mo</span>
              </div>
            )}

            {orderData.addons && orderData.addons.length > 0 && (
              <>
                {orderData.addons.map((addon: any) => (
                  <div
                    key={addon.id}
                    className="flex justify-between items-center p-2 rounded-md hover:bg-gray-900/30 transition-colors"
                  >
                    <span className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-[#a5c7d7]/70 rounded-full mr-2"></span>
                      {addon.name}
                    </span>
                    <span className="text-white font-medium">£{addon.price.toFixed(2)}/mo</span>
                  </div>
                ))}
              </>
            )}

            {orderData.promoDiscount > 0 && (
              <div className="flex justify-between items-center p-2 rounded-md bg-[#bddfef]/10 border border-[#bddfef]/20">
                <span className="text-[#8fb8c9] flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Discount ({orderData.promoCode})
                </span>
                <span className="text-[#8fb8c9] font-medium">-£{calculateDiscount().toFixed(2)}/mo</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#a5c7d7]/30 flex justify-between items-center bg-[#a5c7d7]/5 p-3 rounded-md">
            <span className="font-bold text-white">Monthly Total</span>
            <span className="font-bold text-white text-lg">£{calculateTotal()}/mo</span>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-black border border-gray-700/50 rounded-xl p-5 shadow-md">
          <div className="flex items-center mb-5 pb-2 border-b border-gray-700/50">
            <div className="bg-[#bddfef]/20 p-2 mr-3 rounded-md">
              <CreditCard className="h-5 w-5 text-[#bddfef]" />
            </div>
            <h3 className="font-bold text-white">Card Payment</h3>

            <div className="ml-auto hidden sm:flex items-center space-x-2">
              <div
                className={`w-10 h-6 rounded border ${cardType === "Visa" ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-800"} flex items-center justify-center`}
              >
                <span className={`text-xs font-bold ${cardType === "Visa" ? "text-blue-400" : "text-gray-500"}`}>
                  VISA
                </span>
              </div>
              <div
                className={`w-10 h-6 rounded border ${cardType === "Mastercard" ? "border-orange-500 bg-orange-500/10" : "border-gray-600 bg-gray-800"} flex items-center justify-center`}
              >
                <span
                  className={`text-xs font-bold ${cardType === "Mastercard" ? "text-orange-400" : "text-gray-500"}`}
                >
                  MC
                </span>
              </div>
              <div
                className={`w-10 h-6 rounded border ${cardType === "American Express" ? "border-green-500 bg-green-500/10" : "border-gray-600 bg-gray-800"} flex items-center justify-center`}
              >
                <span
                  className={`text-xs font-bold ${cardType === "American Express" ? "text-green-400" : "text-gray-500"}`}
                >
                  AMEX
                </span>
              </div>
            </div>

            <div className="mt-2 flex sm:hidden items-center space-x-2 justify-center">
              <div
                className={`w-10 h-6 rounded border ${cardType === "Visa" ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-800"} flex items-center justify-center`}
              >
                <span className={`text-xs font-bold ${cardType === "Visa" ? "text-blue-400" : "text-gray-500"}`}>
                  VISA
                </span>
              </div>
              <div
                className={`w-10 h-6 rounded border ${cardType === "Mastercard" ? "border-orange-500 bg-orange-500/10" : "border-gray-600 bg-gray-800"} flex items-center justify-center`}
              >
                <span
                  className={`text-xs font-bold ${cardType === "Mastercard" ? "text-orange-400" : "text-gray-500"}`}
                >
                  MC
                </span>
              </div>
              <div
                className={`w-10 h-6 rounded border ${cardType === "American Express" ? "border-green-500 bg-green-500/10" : "border-gray-600 bg-gray-800"} flex items-center justify-center`}
              >
                <span
                  className={`text-xs font-bold ${cardType === "American Express" ? "text-green-400" : "text-gray-500"}`}
                >
                  AMEX
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="cardholderName" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                Cardholder Name <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className={`h-5 w-5 ${hasError("cardholderName") ? "text-red-400" : paymentData.cardholderName ? "text-[#bddfef]" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="text"
                  id="cardholderName"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                    hasError("cardholderName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : paymentData.cardholderName
                        ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                  } focus:outline-none focus:ring-2`}
                  placeholder="John Smith"
                />
                {paymentData.cardholderName && !hasError("cardholderName") && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {hasError("cardholderName") && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Cardholder name is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cardNumber" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                Card Number <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CardIcon
                    className={`h-5 w-5 ${hasError("cardNumber") ? "text-red-400" : paymentData.cardNumber ? "text-[#bddfef]" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                    hasError("cardNumber")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : paymentData.cardNumber
                        ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                  } focus:outline-none focus:ring-2`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {paymentData.cardNumber && !hasError("cardNumber") && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {hasError("cardNumber") && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Valid card number is required
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label htmlFor="expiryDate" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                  Expiry Date <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar
                      className={`h-5 w-5 ${hasError("expiryDate") ? "text-red-400" : paymentData.expiryDate ? "text-[#bddfef]" : "text-gray-500"}`}
                    />
                  </div>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                      hasError("expiryDate")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                        : paymentData.expiryDate
                          ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                          : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {paymentData.expiryDate && !hasError("expiryDate") && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
                {hasError("expiryDate") && (
                  <p className="mt-1 text-xs text-red-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Valid expiry date is required (MM/YY)
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cvv" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                  CVV <span className="text-red-400 ml-1">*</span>
                  <span className="ml-1 text-xs text-gray-500">(3 or 4 digits)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 ${hasError("cvv") ? "text-red-400" : paymentData.cvv ? "text-[#bddfef]" : "text-gray-500"}`}
                    />
                  </div>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                      hasError("cvv")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                        : paymentData.cvv
                          ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                          : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {paymentData.cvv && !hasError("cvv") && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
                {hasError("cvv") && (
                  <p className="mt-1 text-xs text-red-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Valid CVV is required
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-md bg-gray-900/30 border border-gray-700/50">
              <div className="flex items-start sm:items-center space-x-3">
                <Switch
                  checked={paymentData.saveCard}
                  onCheckedChange={handleSwitchChange}
                  id="save-card"
                  className="flex-shrink-0"
                />
                <label htmlFor="save-card" className="text-sm text-gray-300 cursor-pointer">
                  Save this card for future payments
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <div className="flex items-start p-3 rounded-md bg-[#bddfef]/5 border border-[#bddfef]/20">
              <Lock className="h-5 w-5 text-[#bddfef] mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300 font-medium mb-1">Secure Payment</p>
                <p className="text-xs text-gray-400">
                  Your payment information is secure. We use industry-standard encryption to protect your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
