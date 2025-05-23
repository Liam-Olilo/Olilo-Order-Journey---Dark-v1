"use client"

import { useState } from "react"
import {
  Package,
  Wifi,
  Smartphone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Tag,
  X,
  Clock,
  Info,
  CreditCard,
  Shield,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface OrderSummaryProps {
  orderData: any
  updateOrderData: (data: any) => void
}

export default function OrderSummary({ orderData, updateOrderData }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("")
  const [promoError, setPromoError] = useState("")
  const [promoSuccess, setPromoSuccess] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showContractDetails, setShowContractDetails] = useState(false)
  const [showPriceGuarantee, setShowPriceGuarantee] = useState(false)

  // Mock promo codes for demonstration
  const validPromoCodes = [
    { code: "WELCOME10", discount: 10, type: "percentage" },
    { code: "SAVE20", discount: 20, type: "percentage" },
    { code: "FIVER", discount: 5, type: "fixed" },
  ]

  const applyPromoCode = () => {
    if (!promoCode) {
      setPromoError("Please enter a promo code")
      return
    }

    const foundPromo = validPromoCodes.find((promo) => promo.code === promoCode.toUpperCase())
    if (foundPromo) {
      setPromoSuccess(
        `Promo code applied: ${foundPromo.type === "percentage" ? foundPromo.discount + "% off" : "£" + foundPromo.discount + " off"}`,
      )
      setPromoError("")
      updateOrderData({
        promoCode: foundPromo.code,
        promoDiscount: foundPromo.discount,
        promoType: foundPromo.type,
      })
    } else {
      setPromoError("Invalid promo code")
      setPromoSuccess("")
    }
  }

  const removePromoCode = () => {
    setPromoCode("")
    setPromoSuccess("")
    setPromoError("")
    updateOrderData({
      promoCode: null,
      promoDiscount: 0,
      promoType: null,
    })
  }

  const calculateSubtotal = () => {
    const planPrice = orderData.plan ? orderData.plan.price : 0
    const addonTotal = orderData.addons ? orderData.addons.reduce((sum: number, addon: any) => sum + addon.price, 0) : 0
    const mobilePlanPrice = orderData.mobilePlan
      ? orderData.mobilePlan.bundleDiscount
        ? orderData.mobilePlan.discountedPrice
        : orderData.mobilePlan.price
      : 0
    return planPrice + addonTotal + mobilePlanPrice
  }

  const calculateDiscount = () => {
    if (!orderData.promoDiscount) return 0

    const subtotal = calculateSubtotal()

    if (orderData.promoType === "percentage") {
      return (subtotal * orderData.promoDiscount) / 100
    } else {
      return orderData.promoDiscount
    }
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    return subtotal - discount
  }

  // Calculate one-time costs
  const calculateOneTimeCosts = () => {
    let oneTimeCosts = 0

    // Add activation fee if broadband plan is selected
    if (orderData.plan) {
      oneTimeCosts += 19.99 // Activation fee
    }

    // Add SIM card fee if mobile plan is selected and it's not an eSIM
    if (orderData.mobilePlan && orderData.simType !== "eSIM") {
      oneTimeCosts += 4.99 // Physical SIM card fee
    }

    // Add router delivery fee if not self-installation
    if (orderData.installOption && orderData.installOption.type !== "self") {
      oneTimeCosts += 5.99 // Delivery and professional installation fee
    }

    return oneTimeCosts
  }

  // Get contract length based on selected plan
  const getContractLength = () => {
    return "Monthly" // All plans are now monthly contracts
  }

  return (
    <div className="bg-black rounded-lg border border-gray-700/50 overflow-hidden">
      <div className="bg-gray-900/30 border-b border-gray-800/60 px-4 py-3 flex justify-between items-center">
        <h3 className="text-white font-medium flex items-center">
          <Package className="h-4 w-4 mr-2 text-[#bddfef]" />
          Order Summary
        </h3>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={isCollapsed ? "Expand order summary" : "Collapse order summary"}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Broadband Plan */}
              {orderData.plan ? (
                <div className="pb-3 border-b border-gray-700/30">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start">
                      <Wifi className="h-4 w-4 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white text-sm font-medium">{orderData.plan.name}</h4>
                        <div className="space-y-1 mt-1">
                          <p className="text-gray-400 text-xs flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                            {orderData.plan.speed} download / {Number.parseInt(orderData.plan.speed) / 5} upload
                          </p>
                          <p className="text-gray-400 text-xs flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                            Unlimited data
                          </p>
                          <p className="text-gray-400 text-xs flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                            Monthly rolling contract
                          </p>
                          {orderData.plan.name.includes("Premium") || orderData.plan.name.includes("Ultra") ? (
                            <p className="text-gray-400 text-xs flex items-center">
                              <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                              Priority customer support
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-sm font-medium">£{orderData.plan.price.toFixed(2)}/mo</span>
                      <p className="text-gray-400 text-xs mt-0.5">+ £19.99 activation</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-2 px-3 bg-black rounded-md border border-[#474c54]/30">
                  <p className="text-gray-400 text-sm">No broadband plan selected</p>
                </div>
              )}

              {/* Addons */}
              {orderData.addons && orderData.addons.length > 0 && (
                <div className="pb-3 border-b border-gray-700/30">
                  <h4 className="text-gray-300 text-xs font-medium mb-2 flex items-center">
                    <Package className="h-3.5 w-3.5 text-[#bddfef] mr-1.5" />
                    Add-ons
                  </h4>
                  {orderData.addons.map((addon: any, index: number) => (
                    <div key={index} className="flex justify-between items-start mb-2 ml-6">
                      <div>
                        <p className="text-gray-300 text-xs font-medium">{addon.name}</p>
                        {addon.description && <p className="text-gray-400 text-xs mt-0.5">{addon.description}</p>}
                      </div>
                      <span className="text-gray-300 text-xs">£{addon.price.toFixed(2)}/mo</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Plan */}
              {orderData.mobilePlan && (
                <div className="pb-3 border-b border-gray-700/30">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start">
                      <Smartphone className="h-4 w-4 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white text-sm font-medium">{orderData.mobilePlan.name} Plan</h4>
                        <div className="space-y-1 mt-1">
                          <p className="text-gray-400 text-xs flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                            {orderData.mobilePlan.data} data
                          </p>
                          <p className="text-gray-400 text-xs flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                            {orderData.mobilePlan.minutes} minutes
                          </p>
                          <p className="text-gray-400 text-xs flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                            {orderData.mobilePlan.texts} texts
                          </p>
                          <p className="text-gray-400 text-xs flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                            {orderData.simType || "Physical SIM"}
                          </p>
                          {orderData.mobilePlan.bundleDiscount && (
                            <div className="flex items-center mt-1">
                              <Tag className="h-3 w-3 text-[#bddfef] mr-1.5" />
                              <span className="text-[#bddfef] text-xs">Bundle discount applied</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-sm font-medium">
                        £
                        {orderData.mobilePlan.bundleDiscount
                          ? orderData.mobilePlan.discountedPrice.toFixed(2)
                          : orderData.mobilePlan.price.toFixed(2)}
                        /mo
                      </span>
                      {orderData.mobilePlan.bundleDiscount && (
                        <p className="text-[#bddfef] text-xs mt-0.5">
                          Save £{(orderData.mobilePlan.price - orderData.mobilePlan.discountedPrice).toFixed(2)}/mo
                        </p>
                      )}
                      {orderData.simType !== "eSIM" && <p className="text-gray-400 text-xs mt-0.5">+ £4.99 SIM card</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Installation */}
              {orderData.installOption && (
                <div className="pb-3 border-b border-gray-700/30">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-[#bddfef] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white text-sm font-medium">Installation</h4>
                        <div className="space-y-1 mt-1">
                          <p className="text-gray-400 text-xs">
                            {orderData.installOption.date}, {orderData.installOption.timeSlot}
                          </p>
                          <p className="text-gray-400 text-xs flex items-center">
                            <Clock className="h-3 w-3 text-gray-400 mr-1.5" />
                            {orderData.installOption.type === "professional"
                              ? "Professional installation (2-3 hours)"
                              : "Self-installation kit"}
                          </p>
                          {orderData.installOption.type === "professional" && (
                            <p className="text-gray-400 text-xs flex items-center">
                              <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5" />
                              Engineer setup & optimization
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-sm font-medium">
                        {orderData.installOption.type === "professional" ? "£49.99" : "Free"}
                      </span>
                      {orderData.installOption.type === "professional" && (
                        <p className="text-[#bddfef] text-xs mt-0.5">Currently waived</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Contract Details */}
              {orderData.plan && (
                <div className="pb-3 border-b border-gray-700/30">
                  <button
                    onClick={() => setShowContractDetails(!showContractDetails)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-[#bddfef] mr-2 flex-shrink-0" />
                      <h4 className="text-white text-sm font-medium">Contract Details</h4>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${showContractDetails ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {showContractDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-2 ml-6 space-y-2"
                      >
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-xs">Contract length:</span>
                          <span className="text-gray-300 text-xs">Monthly rolling</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-xs">Minimum term:</span>
                          <span className="text-gray-300 text-xs">1 month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-xs">Early termination fee:</span>
                          <span className="text-gray-300 text-xs">£0.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-xs">Price after first month:</span>
                          <span className="text-gray-300 text-xs">
                            £{calculateTotal().toFixed(2)}/month (no change)
                          </span>
                        </div>
                        <div className="flex items-start mt-2">
                          <Info className="h-3 w-3 text-gray-400 mr-1.5 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-400 text-xs">
                            You can cancel anytime with 30 days notice. No long-term commitment required.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Price Guarantee */}
              {orderData.plan && (
                <div className="pb-3 border-b border-gray-700/30">
                  <button
                    onClick={() => setShowPriceGuarantee(!showPriceGuarantee)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center">
                      <ShieldCheck className="h-4 w-4 text-[#bddfef] mr-2 flex-shrink-0" />
                      <h4 className="text-white text-sm font-medium">Price Guarantee</h4>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${showPriceGuarantee ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {showPriceGuarantee && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-2 ml-6 space-y-2"
                      >
                        <div className="p-3 bg-[#bddfef]/10 border border-[#bddfef]/20 rounded-md">
                          <div className="flex items-start mb-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                            <p className="text-[#bddfef] text-xs font-medium">12-Month Price Lock Guarantee</p>
                          </div>
                          <p className="text-gray-300 text-xs ml-5 mb-2">
                            We guarantee your monthly price of{" "}
                            <span className="font-medium">£{calculateTotal().toFixed(2)}</span> won't change for 12
                            months.
                          </p>
                          <div className="space-y-1.5 ml-5">
                            <p className="text-gray-400 text-xs flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>No mid-contract price increases</span>
                            </p>
                            <p className="text-gray-400 text-xs flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>No hidden fees or charges</span>
                            </p>
                            <p className="text-gray-400 text-xs flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>Cancel anytime with 30 days notice</span>
                            </p>
                          </div>

                          {/* Inflation Protection Section */}
                          <div className="mt-3 pt-3 border-t border-[#bddfef]/20 ml-5">
                            <div className="flex items-start mb-1.5">
                              <TrendingUp className="h-3.5 w-3.5 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                              <p className="text-[#bddfef] text-xs font-medium">Inflation Protection</p>
                            </div>
                            <p className="text-gray-300 text-xs ml-5 mb-2">
                              While inflation affects prices across the economy, your broadband price stays fixed.
                            </p>
                            <div className="space-y-1.5 ml-5">
                              <p className="text-gray-400 text-xs flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Protected from industry price rises (avg. 5-10% annually)</span>
                              </p>
                              <p className="text-gray-400 text-xs flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>No inflation-linked or CPI/RPI + percentage increases</span>
                              </p>
                              <p className="text-gray-400 text-xs flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Potential savings of £30-£60 over 12 months</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start mt-2 ml-5">
                            <Info className="h-3 w-3 text-gray-400 mr-1.5 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-400 text-xs">
                              After 12 months, we'll notify you before any price changes. You'll always have the option
                              to cancel or switch plans.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Promo Code */}
              <div className="pt-2">
                {orderData.promoCode ? (
                  <div className="flex justify-between items-center mb-3 p-2 bg-black rounded-md border border-[#474c54]/30">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-[#bddfef] mr-2" />
                      <div>
                        <p className="text-gray-300 text-xs font-medium">{orderData.promoCode}</p>
                        <p className="text-[#bddfef] text-xs">
                          {orderData.promoType === "percentage"
                            ? `${orderData.promoDiscount}% off`
                            : `£${orderData.promoDiscount.toFixed(2)} off`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-gray-400 hover:text-gray-300 transition-colors"
                      aria-label="Remove promo code"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="mb-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 px-3 py-1.5 text-sm bg-black border border-[#474c54]/50 rounded-md text-white focus:outline-none focus:border-[#bddfef]/50"
                      />
                      <Button
                        onClick={applyPromoCode}
                        className="px-3 py-1.5 bg-[#bddfef] hover:bg-[#a5c7d7] text-black text-sm rounded-md transition-all"
                      >
                        Apply
                      </Button>
                    </div>
                    {promoError && <p className="text-red-400 text-xs mt-1">{promoError}</p>}
                    {promoSuccess && <p className="text-gray-400 text-xs mt-1">{promoSuccess}</p>}
                  </div>
                )}
              </div>

              {/* One-time Costs */}
              {calculateOneTimeCosts() > 0 && (
                <div className="pt-3 pb-3 border-t border-b border-gray-700/30">
                  <h4 className="text-gray-300 text-xs font-medium mb-2 flex items-center">
                    <CreditCard className="h-3.5 w-3.5 text-[#bddfef] mr-1.5" />
                    One-time Costs
                  </h4>

                  {orderData.plan && (
                    <div className="flex justify-between items-center mb-1.5 ml-6">
                      <span className="text-gray-400 text-xs">Activation fee</span>
                      <span className="text-gray-300 text-xs">£19.99</span>
                    </div>
                  )}

                  {orderData.mobilePlan && orderData.simType !== "eSIM" && (
                    <div className="flex justify-between items-center mb-1.5 ml-6">
                      <span className="text-gray-400 text-xs">SIM card</span>
                      <span className="text-gray-300 text-xs">£4.99</span>
                    </div>
                  )}

                  {orderData.installOption && orderData.installOption.type !== "self" && (
                    <div className="flex justify-between items-center mb-1.5 ml-6">
                      <span className="text-gray-400 text-xs">Delivery & installation</span>
                      <div className="text-right">
                        <span className="text-gray-300 text-xs">£49.99</span>
                        <p className="text-[#bddfef] text-xs">Currently waived</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-1.5 mt-1.5 border-t border-gray-700/30 ml-6">
                    <span className="text-gray-300 text-xs font-medium">Total one-time costs</span>
                    <span className="text-gray-300 text-xs font-medium">£{calculateOneTimeCosts().toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Monthly Totals */}
              <div className="pt-3 border-t border-gray-700/30">
                <h4 className="text-gray-300 text-xs font-medium mb-2 flex items-center">
                  <Shield className="h-3.5 w-3.5 text-[#bddfef] mr-1.5" />
                  Monthly Costs
                </h4>

                <div className="flex justify-between items-center mb-1.5 ml-6">
                  <span className="text-gray-400 text-xs">Subtotal</span>
                  <span className="text-gray-300 text-xs">£{calculateSubtotal().toFixed(2)}/mo</span>
                </div>

                {orderData.promoDiscount > 0 && (
                  <div className="flex justify-between items-center mb-1.5 ml-6">
                    <span className="text-gray-400 text-xs">Discount</span>
                    <span className="text-[#bddfef] text-xs">-£{calculateDiscount().toFixed(2)}/mo</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1.5 mt-1.5 border-t border-gray-700/30">
                  <span className="text-white font-medium">Total monthly</span>
                  <span className="text-white font-bold">£{calculateTotal().toFixed(2)}/mo</span>
                </div>

                {orderData.plan && (
                  <div className="mt-2 pt-2 border-t border-gray-700/30">
                    <div className="flex items-start">
                      <AlertCircle className="h-3.5 w-3.5 text-[#bddfef] mr-1.5 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-400 text-xs">
                        First payment includes one-time costs (£{calculateOneTimeCosts().toFixed(2)}) plus your first
                        month (£{calculateTotal().toFixed(2)}) for a total of{" "}
                        <span className="text-white font-medium">
                          £{(calculateOneTimeCosts() + calculateTotal()).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
