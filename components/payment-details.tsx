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
  BanknoteIcon,
  Bitcoin,
  Gift,
  Users,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Award,
  X,
  Plus,
  CheckCircle2,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface PaymentDetailsProps {
  orderData: any
  updateOrderData: (data: any) => void
  errors?: Record<string, string[]>
}

export default function PaymentDetails({ orderData, updateOrderData, errors = {} }: PaymentDetailsProps) {
  const [paymentMethod, setPaymentMethod] = useState(orderData.paymentMethod || "card")
  const [showReferralSection, setShowReferralSection] = useState(false)
  const [referralCode, setReferralCode] = useState(orderData.referralCode || "")
  const [referralCodeError, setReferralCodeError] = useState("")
  const [referralCodeSuccess, setReferralCodeSuccess] = useState("")
  const [enableReferrals, setEnableReferrals] = useState(orderData.enableReferrals || false)
  const [copiedReferralLink, setCopiedReferralLink] = useState(false)
  const [friendsToRefer, setFriendsToRefer] = useState(orderData.friendsToRefer || [])

  const [paymentData, setPaymentData] = useState({
    // Card payment fields
    cardholderName: orderData.paymentDetails?.cardholderName || "",
    cardNumber: orderData.paymentDetails?.cardNumber || "",
    expiryDate: orderData.paymentDetails?.expiryDate || "",
    cvv: orderData.paymentDetails?.cvv || "",
    saveCard: orderData.paymentDetails?.saveCard || false,

    // Direct Debit fields
    accountName: orderData.paymentDetails?.accountName || "",
    accountNumber: orderData.paymentDetails?.accountNumber || "",
    sortCode: orderData.paymentDetails?.sortCode || "",

    // Crypto fields
    cryptoType: orderData.paymentDetails?.cryptoType || "bitcoin",
    walletAddress: orderData.paymentDetails?.walletAddress || "",
  })

  // Mock referral codes for demonstration
  const validReferralCodes = ["FRIEND20", "SAVE15", "WELCOME10", "BUDDY25"]

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

    // Format sort code with dashes
    if (name === "sortCode") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(.{2})(.{2})(.+)/, "$1-$2-$3")
        .substring(0, 8)
    }

    setPaymentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formattedValue,
    }))

    updateOrderData({
      paymentMethod,
      paymentDetails: {
        ...orderData.paymentDetails,
        [name]: type === "checkbox" ? checked : formattedValue,
      },
    })
  }

  const handleCryptoTypeChange = (type: string) => {
    setPaymentData((prev) => ({
      ...prev,
      cryptoType: type,
    }))

    updateOrderData({
      paymentMethod,
      paymentDetails: {
        ...orderData.paymentDetails,
        cryptoType: type,
      },
    })
  }

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)

    updateOrderData({
      paymentMethod: method,
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
    let discount = 0

    // Promo discount
    if (orderData.promoDiscount) {
      const subtotal = orderData.plan
        ? orderData.plan.price
        : 0 + (orderData.addons ? orderData.addons.reduce((sum: number, addon: any) => sum + addon.price, 0) : 0)

      if (orderData.promoType === "percentage") {
        discount += (subtotal * orderData.promoDiscount) / 100
      } else {
        discount += orderData.promoDiscount
      }
    }

    // Referral discount
    if (orderData.referralDiscount) {
      discount += orderData.referralDiscount
    }

    return discount
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

  // Referral functions
  const applyReferralCode = () => {
    if (!referralCode) {
      setReferralCodeError("Please enter a referral code")
      return
    }

    if (validReferralCodes.includes(referralCode.toUpperCase())) {
      setReferralCodeSuccess(`Referral code applied! You'll receive a £10 credit on your first bill.`)
      setReferralCodeError("")
      updateOrderData({
        referralCode: referralCode.toUpperCase(),
        referralDiscount: 10,
      })
    } else {
      setReferralCodeError("Invalid referral code")
      setReferralCodeSuccess("")
    }
  }

  const removeReferralCode = () => {
    setReferralCode("")
    setReferralCodeSuccess("")
    setReferralCodeError("")
    updateOrderData({
      referralCode: null,
      referralDiscount: 0,
    })
  }

  const handleEnableReferrals = (enabled: boolean) => {
    setEnableReferrals(enabled)
    updateOrderData({ enableReferrals: enabled })
  }

  const generateReferralLink = () => {
    // In a real app, this would be generated based on the user's account
    return `https://olilo.com/join?ref=${orderData.personalDetails?.email?.split("@")[0] || "user"}123`
  }

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(generateReferralLink())
      setCopiedReferralLink(true)
      setTimeout(() => setCopiedReferralLink(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const addFriend = () => {
    const newFriend = {
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
    }
    const updatedFriends = [...friendsToRefer, newFriend]
    setFriendsToRefer(updatedFriends)
    updateOrderData({ friendsToRefer: updatedFriends })
  }

  const removeFriend = (id: number) => {
    const updatedFriends = friendsToRefer.filter((friend: any) => friend.id !== id)
    setFriendsToRefer(updatedFriends)
    updateOrderData({ friendsToRefer: updatedFriends })
  }

  const updateFriend = (id: number, field: string, value: string) => {
    const updatedFriends = friendsToRefer.map((friend: any) =>
      friend.id === id ? { ...friend, [field]: value } : friend,
    )
    setFriendsToRefer(updatedFriends)
    updateOrderData({ friendsToRefer: updatedFriends })
  }

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
                <span className="text-[#8fb8c9] font-medium">-£{orderData.promoDiscount.toFixed(2)}/mo</span>
              </div>
            )}

            {orderData.referralDiscount > 0 && (
              <div className="flex justify-between items-center p-2 rounded-md bg-purple-900/10 border border-purple-500/20">
                <span className="text-purple-300 flex items-center">
                  <Gift className="h-4 w-4 mr-2" />
                  Referral Discount ({orderData.referralCode})
                </span>
                <span className="text-purple-300 font-medium">-£{orderData.referralDiscount.toFixed(2)}/mo</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#a5c7d7]/30 flex justify-between items-center bg-[#a5c7d7]/5 p-3 rounded-md">
            <span className="font-bold text-white">Monthly Total</span>
            <span className="font-bold text-white text-lg">£{calculateTotal()}/mo</span>
          </div>
        </div>

        {/* Refer a Friend Section */}
        <div className="bg-gradient-to-b from-black to-gray-900/90 border border-purple-500/30 rounded-xl overflow-hidden shadow-lg shadow-purple-900/10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#bddfef]/10 via-transparent to-transparent rounded-full blur-xl opacity-30 pointer-events-none"></div>

          <button
            onClick={() => setShowReferralSection(!showReferralSection)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-900/30 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-purple-500/20 p-2 mr-3 rounded-full">
                <Gift className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="font-bold text-white">Refer a Friend & Save</h3>
            </div>
            {showReferralSection ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {showReferralSection && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-700/50"
              >
                <div className="p-5 space-y-5">
                  {/* Referral Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex items-center mb-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-400 mr-2" />
                        <h4 className="font-medium text-white">You Get</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          £20 credit on your next bill
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Priority customer support
                        </li>
                      </ul>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4 border border-blue-500/20">
                      <div className="flex items-center mb-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 mr-2" />
                        <h4 className="font-medium text-white">Your Friend Gets</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          £10 off their first month
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          Free installation (worth £49.99)
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Have a Referral Code */}
                  <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="font-medium text-white mb-3 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-[#bddfef]" />
                      Have a Referral Code?
                    </h4>

                    {orderData.referralCode ? (
                      <div className="flex justify-between items-center p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-400 mr-3" />
                          <div>
                            <p className="text-green-300 font-medium">{orderData.referralCode}</p>
                            <p className="text-green-400 text-sm">£10 credit applied to your first bill</p>
                          </div>
                        </div>
                        <button
                          onClick={removeReferralCode}
                          className="text-gray-400 hover:text-gray-300 transition-colors"
                          aria-label="Remove referral code"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                            placeholder="Enter referral code"
                            className="flex-1 px-3 py-2 bg-black/80 border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#bddfef]/50"
                          />
                          <Button
                            onClick={applyReferralCode}
                            className="px-4 py-2 bg-[#bddfef] hover:bg-[#a5c7d7] text-black rounded-md transition-all"
                          >
                            Apply
                          </Button>
                        </div>
                        {referralCodeError && (
                          <p className="text-red-400 text-sm flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {referralCodeError}
                          </p>
                        )}
                        {referralCodeSuccess && (
                          <p className="text-green-400 text-sm flex items-center mt-1">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {referralCodeSuccess}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Refer Your Friends */}
                  <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white flex items-center">
                        <UserPlus className="h-4 w-4 mr-2 text-[#bddfef]" />
                        Refer Your Friends
                      </h4>
                      <Switch checked={enableReferrals} onCheckedChange={handleEnableReferrals} id="enable-referrals" />
                    </div>

                    <AnimatePresence>
                      {enableReferrals && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 mt-3">
                            {/* Share Your Link */}
                            <div className="bg-black/30 rounded-lg p-3 border border-gray-700/30">
                              <h5 className="text-sm font-medium text-gray-300 mb-2">Share Your Referral Link</h5>
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  value={generateReferralLink()}
                                  readOnly
                                  className="flex-1 px-3 py-2 bg-black/80 border border-gray-700 rounded-md text-gray-300 text-sm"
                                />
                                <Button
                                  onClick={copyReferralLink}
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 hover:border-[#bddfef]"
                                >
                                  {copiedReferralLink ? (
                                    <Check className="h-4 w-4 text-green-400" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            {/* Add Friends */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-medium text-gray-300">Invite Friends Directly</h5>
                                <Button
                                  onClick={addFriend}
                                  size="sm"
                                  variant="outline"
                                  className="border-gray-700 h-7 px-2"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>

                              {friendsToRefer.length > 0 && (
                                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                  {friendsToRefer.map((friend: any, index: number) => (
                                    <motion.div
                                      key={friend.id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="bg-black/30 rounded-lg p-2 border border-gray-700/30"
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-400">Friend {index + 1}</span>
                                        <button
                                          onClick={() => removeFriend(friend.id)}
                                          className="text-gray-500 hover:text-red-400 transition-colors"
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <input
                                          type="text"
                                          placeholder="Name"
                                          value={friend.name}
                                          onChange={(e) => updateFriend(friend.id, "name", e.target.value)}
                                          className="px-2 py-1 bg-black/80 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-[#bddfef]/50"
                                        />
                                        <input
                                          type="email"
                                          placeholder="Email"
                                          value={friend.email}
                                          onChange={(e) => updateFriend(friend.id, "email", e.target.value)}
                                          className="px-2 py-1 bg-black/80 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-[#bddfef]/50"
                                        />
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              )}

                              {friendsToRefer.length === 0 && (
                                <div className="text-center py-3 text-gray-500 bg-black/20 rounded-lg border border-gray-700/30">
                                  <Users className="h-5 w-5 mx-auto mb-1 opacity-50" />
                                  <p className="text-xs">Click "Add" to invite friends</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!enableReferrals && (
                      <p className="text-gray-400 text-sm">
                        Enable referrals to share your link with friends and earn rewards together!
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Payment Method Section */}
        <div className="bg-black border border-gray-700/50 rounded-xl p-5 shadow-md">
          <Tabs defaultValue="card" value={paymentMethod} onValueChange={handlePaymentMethodChange} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-gray-900/50">
              <TabsTrigger value="card" className="flex items-center gap-2 data-[state=active]:bg-[#bddfef]/20">
                <CreditCard className="h-4 w-4" />
                <span>Card</span>
              </TabsTrigger>
              <TabsTrigger value="directdebit" className="flex items-center gap-2 data-[state=active]:bg-[#bddfef]/20">
                <BanknoteIcon className="h-4 w-4" />
                <span>Direct Debit</span>
              </TabsTrigger>
              <TabsTrigger value="crypto" className="flex items-center gap-2 data-[state=active]:bg-[#bddfef]/20">
                <Bitcoin className="h-4 w-4" />
                <span>Cryptocurrency</span>
              </TabsTrigger>
            </TabsList>

            {/* Card Payment Tab */}
            <TabsContent value="card">
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
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="cardholderName"
                    className="flex items-center text-sm font-medium text-gray-200 mb-1.5"
                  >
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
            </TabsContent>

            {/* Direct Debit Tab */}
            <TabsContent value="directdebit">
              <div className="flex items-center mb-5 pb-2 border-b border-gray-700/50">
                <div className="bg-[#bddfef]/20 p-2 mr-3 rounded-md">
                  <BanknoteIcon className="h-5 w-5 text-[#bddfef]" />
                </div>
                <h3 className="font-bold text-white">Direct Debit</h3>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-blue-300 font-medium mb-1">Direct Debit Information</p>
                    <p className="text-sm text-blue-400/80">
                      By providing your bank details, you authorize Olilo to send instructions to your bank to debit
                      your account. Direct Debit payments are protected by the Direct Debit Guarantee.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="accountName" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                    Account Holder Name <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User
                        className={`h-5 w-5 ${hasError("accountName") ? "text-red-400" : paymentData.accountName ? "text-[#bddfef]" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="text"
                      id="accountName"
                      name="accountName"
                      value={paymentData.accountName}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                        hasError("accountName")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : paymentData.accountName
                            ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                            : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                      } focus:outline-none focus:ring-2`}
                      placeholder="John Smith"
                    />
                    {paymentData.accountName && !hasError("accountName") && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="sortCode" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                    Sort Code <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BanknoteIcon
                        className={`h-5 w-5 ${hasError("sortCode") ? "text-red-400" : paymentData.sortCode ? "text-[#bddfef]" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="text"
                      id="sortCode"
                      name="sortCode"
                      value={paymentData.sortCode}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                        hasError("sortCode")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : paymentData.sortCode
                            ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                            : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                      } focus:outline-none focus:ring-2`}
                      placeholder="12-34-56"
                      maxLength={8}
                    />
                    {paymentData.sortCode && !hasError("sortCode") && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="accountNumber" className="flex items-center text-sm font-medium text-gray-200 mb-1.5">
                    Account Number <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CardIcon
                        className={`h-5 w-5 ${hasError("accountNumber") ? "text-red-400" : paymentData.accountNumber ? "text-[#bddfef]" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={paymentData.accountNumber}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                        hasError("accountNumber")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : paymentData.accountNumber
                            ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                            : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                      } focus:outline-none focus:ring-2`}
                      placeholder="12345678"
                      maxLength={8}
                    />
                    {paymentData.accountNumber && !hasError("accountNumber") && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-md bg-blue-900/10 border border-blue-500/20 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <p className="text-sm text-blue-300">Your payments are protected by the Direct Debit Guarantee</p>
                </div>
              </div>
            </TabsContent>

            {/* Cryptocurrency Tab */}
            <TabsContent value="crypto">
              <div className="flex items-center mb-5 pb-2 border-b border-gray-700/50">
                <div className="bg-[#bddfef]/20 p-2 mr-3 rounded-md">
                  <Bitcoin className="h-5 w-5 text-[#bddfef]" />
                </div>
                <h3 className="font-bold text-white">Cryptocurrency Payment</h3>
              </div>

              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-purple-300 font-medium mb-1">Pay with Cryptocurrency</p>
                    <p className="text-sm text-purple-400/80">
                      Select your preferred cryptocurrency below. You'll receive payment instructions after checkout.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Crypto Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Choose Cryptocurrency <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      type="button"
                      onClick={() => handleCryptoTypeChange("bitcoin")}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-md border transition-all ${
                        paymentData.cryptoType === "bitcoin"
                          ? "bg-gradient-to-b from-orange-900/30 to-orange-900/10 border-orange-500/50 text-orange-300"
                          : "bg-gray-900/30 border-gray-700/50 text-gray-400 hover:bg-gray-900/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                          paymentData.cryptoType === "bitcoin" ? "bg-orange-500/20" : "bg-gray-800/50"
                        }`}
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.17-1.064-.25l.53-2.12-1.32-.33-.54 2.153c-.285-.065-.565-.13-.84-.2l-1.815-.45-.35 1.4s.975.225.955.238c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.415-.614.32.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.54 2.154 1.32.33.54-2.18c2.24.427 3.93.255 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.22 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Bitcoin</span>
                      <span className="text-xs mt-1 opacity-70">BTC</span>
                      {paymentData.cryptoType === "bitcoin" && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <Check className="h-3 w-3 text-black" />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCryptoTypeChange("ethereum")}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-md border transition-all ${
                        paymentData.cryptoType === "ethereum"
                          ? "bg-gradient-to-b from-blue-900/30 to-blue-900/10 border-blue-500/50 text-blue-300"
                          : "bg-gray-900/30 border-gray-700/50 text-gray-400 hover:bg-gray-900/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                          paymentData.cryptoType === "ethereum" ? "bg-blue-500/20" : "bg-gray-800/50"
                        }`}
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Ethereum</span>
                      <span className="text-xs mt-1 opacity-70">ETH</span>
                      {paymentData.cryptoType === "ethereum" && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <Check className="h-3 w-3 text-black" />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCryptoTypeChange("litecoin")}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-md border transition-all ${
                        paymentData.cryptoType === "litecoin"
                          ? "bg-gradient-to-b from-gray-500/30 to-gray-500/10 border-gray-400/50 text-gray-300"
                          : "bg-gray-900/30 border-gray-700/50 text-gray-400 hover:bg-gray-900/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                          paymentData.cryptoType === "litecoin" ? "bg-gray-500/20" : "bg-gray-800/50"
                        }`}
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-.262 3.678h2.584a.343.343 0 0 1 .33.435l-2.03 6.918 1.905-.582.408-1.386a.343.343 0 0 1 .33-.252h1.83a.343.343 0 0 1 .33.435l-.636 2.175 2.156-.66a.343.343 0 0 1 .435.331v1.131a.343.343 0 0 1-.234.33l-2.743.835-.999 3.38a.343.343 0 0 1-.33.252H12.23a.343.343 0 0 1-.33-.435l.852-2.886-1.905.582-.852 2.886a.343.343 0 0 1-.33.252H7.485a.343.343 0 0 1-.33-.435l.852-2.886-3.041.93a.343.343 0 0 1-.435-.331v-1.131a.343.343 0 0 1 .234-.33l3.628-1.105 1.327-4.512-3.041.93a.343.343 0 0 1-.435-.331V7.485a.343.343 0 0 1 .234-.33l3.628-1.105.999-3.38a.343.343 0 0 1 .33-.252h2.152z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Litecoin</span>
                      <span className="text-xs mt-1 opacity-70">LTC</span>
                      {paymentData.cryptoType === "litecoin" && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <Check className="h-3 w-3 text-black" />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCryptoTypeChange("ripple")}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-md border transition-all ${
                        paymentData.cryptoType === "ripple"
                          ? "bg-gradient-to-b from-blue-900/30 to-blue-900/10 border-blue-400/50 text-blue-300"
                          : "bg-gray-900/30 border-gray-700/50 text-gray-400 hover:bg-gray-900/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                          paymentData.cryptoType === "ripple" ? "bg-blue-400/20" : "bg-gray-800/50"
                        }`}
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M19.77 10.32c-.52 0-1.03.25-1.34.67a1.97 1.97 0 0 0 .01 2.4c.3.42.82.67 1.33.67a1.95 1.95 0 0 0 1.93-1.97c0-1.04-.87-1.77-1.93-1.77zm-15.54 0c-1.06 0-1.93.73-1.93 1.77 0 1.08.83 1.97 1.93 1.97.51 0 1.03-.25 1.33-.67a1.97 1.97 0 0 0 .01-2.4c-.31-.42-.82-.67-1.34-.67zm11.91-7.96c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm-8.28 0c-1.06 0-1.93.73-1.93 1.77 0 1.08.83 1.97 1.93 1.97.51 0 1.03-.25 1.33-.67a1.97 1.97 0 0 0 .01-2.4c-.3-.42-.82-.67-1.34-.67zm4.14 3.98c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm0 7.96c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm-4.14 3.98c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm8.28 0c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Ripple</span>
                      <span className="text-xs mt-1 opacity-70">XRP</span>
                      {paymentData.cryptoType === "ripple" && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <Check className="h-3 w-3 text-black" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
                  <h4 className="text-sm font-medium text-white mb-3">Transaction Details</h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Amount</span>
                      <span className="text-white font-medium">£{calculateTotal()}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">
                        Estimated{" "}
                        {paymentData.cryptoType === "bitcoin"
                          ? "BTC"
                          : paymentData.cryptoType === "ethereum"
                            ? "ETH"
                            : paymentData.cryptoType === "litecoin"
                              ? "LTC"
                              : "XRP"}
                      </span>
                      <span className="text-white font-medium">
                        {paymentData.cryptoType === "bitcoin"
                          ? "0.00045"
                          : paymentData.cryptoType === "ethereum"
                            ? "0.0082"
                            : paymentData.cryptoType === "litecoin"
                              ? "0.15"
                              : "25.4"}
                        <span className="text-gray-500 text-xs ml-1">(estimated)</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Network Fee</span>
                      <span className="text-white font-medium">
                        <span className="text-green-400">Low</span>
                        <span className="text-gray-500 text-xs ml-1">(~10 min)</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transaction Preview */}
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50 overflow-hidden">
                  <h4 className="text-sm font-medium text-white mb-3">Transaction Preview</h4>

                  <div className="relative bg-black/50 rounded-lg p-4 border border-gray-800">
                    {/* Transaction Flow Visualization */}
                    <div className="flex items-end justify-between mb-8 relative">
                      {/* From Wallet */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Your Wallet</span>
                      </div>

                      {/* Transaction Arrow and Details */}
                      <div className="flex-1 flex flex-col items-center px-4 py-2">
                        <div className="relative w-full">
                          <div className="h-0.5 bg-gradient-to-r from-gray-700 via-[#bddfef]/30 to-gray-700 w-full"></div>

                          {/* Amount Badge */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 px-3 py-1 rounded-full">
                            <span className="text-xs font-medium text-white">
                              {paymentData.cryptoType === "bitcoin"
                                ? "0.00045 BTC"
                                : paymentData.cryptoType === "ethereum"
                                  ? "0.0082 ETH"
                                  : paymentData.cryptoType === "litecoin"
                                    ? "0.15 LTC"
                                    : "25.4 XRP"}
                            </span>
                          </div>

                          {/* Arrow */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-6 h-6 bg-[#bddfef]/20 rounded-full flex items-center justify-center">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12H19M19 12L13 6M19 12L13 18"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-[#bddfef]"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Fiat Amount */}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                            <span className="text-xs text-gray-500">≈ £{calculateTotal()}</span>
                          </div>
                        </div>
                      </div>

                      {/* To Wallet */}
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                            paymentData.cryptoType === "bitcoin"
                              ? "bg-orange-900/20 border-orange-500/30"
                              : paymentData.cryptoType === "ethereum"
                                ? "bg-blue-900/20 border-blue-500/30"
                                : paymentData.cryptoType === "litecoin"
                                  ? "bg-gray-700/20 border-gray-500/30"
                                  : "bg-blue-900/20 border-blue-400/30"
                          }`}
                        >
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {paymentData.cryptoType === "bitcoin" && (
                              <path
                                d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.17-1.064-.25l.53-2.12-1.32-.33-.54 2.153c-.285-.065-.565-.13-.84-.2l-1.815-.45-.35 1.4s.975.225.955.238c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.415-.614.32.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.54 2.154 1.32.33.54-2.18c2.24.427 3.93.255 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.22 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z"
                                fill="currentColor"
                                className="text-orange-400"
                              />
                            )}
                            {paymentData.cryptoType === "ethereum" && (
                              <path
                                d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
                                fill="currentColor"
                                className="text-blue-400"
                              />
                            )}
                            {paymentData.cryptoType === "litecoin" && (
                              <path
                                d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-.262 3.678h2.584a.343.343 0 0 1 .33.435l-2.03 6.918 1.905-.582.408-1.386a.343.343 0 0 1 .33-.252h1.83a.343.343 0 0 1 .33.435l-.636 2.175 2.156-.66a.343.343 0 0 1 .435.331v1.131a.343.343 0 0 1-.234.33l-2.743.835-.999 3.38a.343.343 0 0 1-.33.252H12.23a.343.343 0 0 1-.33-.435l.852-2.886-1.905.582-.852 2.886a.343.343 0 0 1-.33.252H7.485a.343.343 0 0 1-.33-.435l.852-2.886-3.041.93a.343.343 0 0 1-.435-.331v-1.131a.343.343 0 0 1 .234-.33l3.628-1.105 1.327-4.512-3.041.93a.343.343 0 0 1-.435-.331V7.485a.343.343 0 0 1 .234-.33l3.628-1.105.999-3.38a.343.343 0 0 1 .33-.252h2.152z"
                                fill="currentColor"
                                className="text-gray-400"
                              />
                            )}
                            {paymentData.cryptoType === "ripple" && (
                              <path
                                d="M19.77 10.32c-.52 0-1.03.25-1.34.67a1.97 1.97 0 0 0 .01 2.4c.3.42.82.67 1.33.67a1.95 1.95 0 0 0 1.93-1.97c0-1.04-.87-1.77-1.93-1.77zm-15.54 0c-1.06 0-1.93.73-1.93 1.77 0 1.08.83 1.97 1.93 1.97.51 0 1.03-.25 1.33-.67a1.97 1.97 0 0 0 .01-2.4c-.31-.42-.82-.67-1.34-.67zm11.91-7.96c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm-8.28 0c-1.06 0-1.93.73-1.93 1.77 0 1.08.83 1.97 1.93 1.97.51 0 1.03-.25 1.33-.67a1.97 1.97 0 0 0 .01-2.4c-.3-.42-.82-.67-1.34-.67zm4.14 3.98c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm0 7.96c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm-4.14 3.98c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97zm8.28 0c-.51 0-1.03.25-1.33.67a1.97 1.97 0 0 0-.01 2.4c.3.42.82.67 1.34.67 1.06 0 1.93-.73 1.93-1.77.04-1.04-.83-1.97-1.93-1.97z"
                                fill="currentColor"
                                className="text-blue-400"
                              />
                            )}
                          </svg>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Olilo</span>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-black/50 rounded p-2 border border-gray-800">
                        <span className="text-gray-500 block mb-1">Estimated Time</span>
                        <span className="text-white font-medium flex items-center">
                          <svg
                            className="h-3 w-3 mr-1 text-green-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path
                              d="M12 8V12L15 15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          ~10 minutes
                        </span>
                      </div>
                      <div className="bg-black/50 rounded p-2 border border-gray-800">
                        <span className="text-gray-500 block mb-1">Network Fee</span>
                        <span className="text-white font-medium flex items-center">
                          <svg
                            className="h-3 w-3 mr-1 text-green-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L9 16L19 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Low Priority
                        </span>
                      </div>
                      <div className="bg-black/50 rounded p-2 border border-gray-800">
                        <span className="text-gray-500 block mb-1">Confirmations</span>
                        <span className="text-white font-medium">1 required</span>
                      </div>
                      <div className="bg-black/50 rounded p-2 border border-gray-800">
                        <span className="text-gray-500 block mb-1">Status</span>
                        <span className="text-yellow-400 font-medium flex items-center">
                          <svg
                            className="h-3 w-3 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Pending Payment
                        </span>
                      </div>
                    </div>

                    {/* Transaction ID Preview */}
                    <div className="mt-3 bg-black/50 rounded p-2 border border-gray-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-500 text-xs">Transaction ID</span>
                        <span className="text-xs text-gray-500">After payment</span>
                      </div>
                      <div className="bg-gray-900 rounded p-1.5 flex items-center justify-between">
                        <div className="flex-1 overflow-hidden">
                          <div className="h-2.5 bg-gray-800 rounded-full w-4/5 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center">
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      This is a preview. Actual transaction details will be provided after checkout.
                    </span>
                  </div>
                </div>

                {/* Wallet Address */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="walletAddress" className="text-sm font-medium text-gray-200">
                      Your {paymentData.cryptoType.charAt(0).toUpperCase() + paymentData.cryptoType.slice(1)} Wallet
                      Address <span className="text-red-400">*</span>
                    </label>
                    <span className="text-xs text-gray-500">For refunds if needed</span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Bitcoin
                        className={`h-5 w-5 ${hasError("walletAddress") ? "text-red-400" : paymentData.walletAddress ? "text-[#bddfef]" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="text"
                      id="walletAddress"
                      name="walletAddress"
                      value={paymentData.walletAddress}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 border bg-black/80 text-white rounded-md transition-all duration-200 ${
                        hasError("walletAddress")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : paymentData.walletAddress
                            ? "border-[#bddfef]/70 focus:border-[#bddfef] focus:ring-[#bddfef]/30"
                            : "border-gray-700 focus:border-gray-500 focus:ring-gray-500/30"
                      } focus:outline-none focus:ring-2`}
                      placeholder={`Enter your ${paymentData.cryptoType} wallet address`}
                    />
                    {paymentData.walletAddress && !hasError("walletAddress") && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  {hasError("walletAddress") && (
                    <p className="mt-1 text-xs text-red-400 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Please enter a valid wallet address
                    </p>
                  )}
                </div>

                {/* Information Box */}
                <div className="mt-4 p-4 rounded-md bg-purple-900/10 border border-purple-500/20">
                  <h4 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    How it works
                  </h4>
                  <ol className="space-y-2 text-sm text-purple-300/80 list-decimal pl-5">
                    <li>After checkout, you'll receive payment instructions via email</li>
                    <li>Send the exact amount to the provided address within 30 minutes</li>
                    <li>Once confirmed (typically 10-30 minutes), your order will be processed</li>
                  </ol>
                  <p className="text-xs text-purple-300/70 mt-3">
                    <span className="font-medium">Important:</span> Cryptocurrency transactions cannot be reversed once
                    completed. Please ensure you have entered the correct wallet address.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
