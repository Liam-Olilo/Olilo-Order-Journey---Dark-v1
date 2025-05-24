"use client"

import { useState } from "react"
import {
  Users,
  Gift,
  Share2,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Star,
  Heart,
  Award,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Plus,
  X,
  UserPlus,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface ReferAFriendProps {
  orderData: any
  updateOrderData: (data: any) => void
}

export default function ReferAFriend({ orderData, updateOrderData }: ReferAFriendProps) {
  const [referralCode, setReferralCode] = useState(orderData.referralCode || "")
  const [referralCodeError, setReferralCodeError] = useState("")
  const [referralCodeSuccess, setReferralCodeSuccess] = useState("")
  const [friendsToRefer, setFriendsToRefer] = useState(orderData.friendsToRefer || [])
  const [showReferralProgram, setShowReferralProgram] = useState(false)
  const [enableReferrals, setEnableReferrals] = useState(orderData.enableReferrals || false)
  const [copiedReferralLink, setCopiedReferralLink] = useState(false)

  // Mock referral codes for demonstration
  const validReferralCodes = ["FRIEND20", "SAVE15", "WELCOME10", "BUDDY25"]

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

  const handleEnableReferrals = (enabled: boolean) => {
    setEnableReferrals(enabled)
    updateOrderData({ enableReferrals: enabled })
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Refer a Friend</h2>
      <p className="text-gray-400 mb-6">
        Share the love and save money! Refer friends to Olilo and you'll both get rewarded.
      </p>

      <div className="space-y-6">
        {/* Referral Benefits Section */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-3 rounded-full mr-4">
              <Gift className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Referral Rewards</h3>
              <p className="text-purple-300 text-sm">Everyone wins when you refer friends!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-red-400 mr-2" />
                <h4 className="font-medium text-white">You Get</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                  £20 credit on your next bill
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                  Priority customer support
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                  Exclusive offers and deals
                </li>
              </ul>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-medium text-white">Your Friend Gets</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                  £10 off their first month
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                  Free installation (worth £49.99)
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                  Welcome gift package
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Have a Referral Code Section */}
        <div className="bg-black border border-gray-700/50 rounded-xl p-5">
          <div className="flex items-center mb-4">
            <div className="bg-[#bddfef]/20 p-2 rounded-full mr-3">
              <Award className="h-5 w-5 text-[#bddfef]" />
            </div>
            <h3 className="font-bold text-white">Have a Referral Code?</h3>
          </div>

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

        {/* Refer Friends Section */}
        <div className="bg-black border border-gray-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-[#bddfef]/20 p-2 rounded-full mr-3">
                <UserPlus className="h-5 w-5 text-[#bddfef]" />
              </div>
              <h3 className="font-bold text-white">Refer Your Friends</h3>
            </div>
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
                <div className="space-y-4">
                  {/* Share Your Link */}
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2 flex items-center">
                      <Share2 className="h-4 w-4 mr-2 text-[#bddfef]" />
                      Share Your Referral Link
                    </h4>
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
                    <p className="text-gray-400 text-xs mt-2">
                      Share this link with friends to give them £10 off and earn £20 credit for yourself!
                    </p>
                  </div>

                  {/* Quick Share Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:border-blue-500 hover:text-blue-400"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:border-green-500 hover:text-green-400"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:border-blue-400 hover:text-blue-400"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:border-blue-300 hover:text-blue-300"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                  </div>

                  {/* Add Friends Manually */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white flex items-center">
                        <Users className="h-4 w-4 mr-2 text-[#bddfef]" />
                        Invite Friends Directly
                      </h4>
                      <Button onClick={addFriend} size="sm" variant="outline" className="border-gray-700">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Friend
                      </Button>
                    </div>

                    {friendsToRefer.length > 0 && (
                      <div className="space-y-3">
                        {friendsToRefer.map((friend: any, index: number) => (
                          <motion.div
                            key={friend.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-300">Friend {index + 1}</span>
                              <button
                                onClick={() => removeFriend(friend.id)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <input
                                type="text"
                                placeholder="Name"
                                value={friend.name}
                                onChange={(e) => updateFriend(friend.id, "name", e.target.value)}
                                className="px-2 py-1.5 bg-black/80 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-[#bddfef]/50"
                              />
                              <input
                                type="email"
                                placeholder="Email"
                                value={friend.email}
                                onChange={(e) => updateFriend(friend.id, "email", e.target.value)}
                                className="px-2 py-1.5 bg-black/80 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-[#bddfef]/50"
                              />
                              <input
                                type="tel"
                                placeholder="Phone (optional)"
                                value={friend.phone}
                                onChange={(e) => updateFriend(friend.id, "phone", e.target.value)}
                                className="px-2 py-1.5 bg-black/80 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-[#bddfef]/50"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {friendsToRefer.length === 0 && (
                      <div className="text-center py-6 text-gray-400">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No friends added yet. Click "Add Friend" to get started!</p>
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

        {/* Referral Program Details */}
        <div className="bg-black border border-gray-700/50 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowReferralProgram(!showReferralProgram)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-900/30 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-[#bddfef]/20 p-2 rounded-full mr-3">
                <Star className="h-5 w-5 text-[#bddfef]" />
              </div>
              <h3 className="font-bold text-white">How Our Referral Program Works</h3>
            </div>
            {showReferralProgram ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {showReferralProgram && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-700/50"
              >
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-400 font-bold">1</span>
                      </div>
                      <h4 className="font-medium text-white mb-2">Share Your Link</h4>
                      <p className="text-gray-400 text-sm">
                        Send your unique referral link to friends via email, social media, or messaging apps.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-400 font-bold">2</span>
                      </div>
                      <h4 className="font-medium text-white mb-2">Friend Signs Up</h4>
                      <p className="text-gray-400 text-sm">
                        Your friend clicks your link and signs up for any Olilo broadband plan.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-purple-400 font-bold">3</span>
                      </div>
                      <h4 className="font-medium text-white mb-2">Both Get Rewarded</h4>
                      <p className="text-gray-400 text-sm">
                        You both receive your rewards once their service is successfully activated.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 rounded-lg p-4 mt-6">
                    <h4 className="font-medium text-white mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-yellow-400" />
                      Terms & Conditions
                    </h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Referral rewards are credited after successful service activation</li>
                      <li>• Maximum of 10 referrals per customer per year</li>
                      <li>• Referred friends must be new Olilo customers</li>
                      <li>• Credits cannot be exchanged for cash</li>
                      <li>• Olilo reserves the right to modify this program at any time</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
