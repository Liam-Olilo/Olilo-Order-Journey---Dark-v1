import { MessageSquare, FileText, Search, Phone, Mail, Clock, ChevronRight, LifeBuoy, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import SupportTickets from "@/components/dashboard/support-tickets"

export default function SupportPage() {
  // Sample FAQ data
  const faqs = [
    {
      question: "How do I reset my router?",
      answer:
        "To reset your router, locate the small reset button on the back of the device. Use a paperclip to press and hold the button for 10 seconds until the lights on the router flash. This will restore factory settings.",
    },
    {
      question: "Why is my internet speed slower than expected?",
      answer:
        "Slow internet speeds can be caused by several factors including Wi-Fi interference, router placement, network congestion, or device limitations. Try running a speed test at different times and locations.",
    },
    {
      question: "How do I change my Wi-Fi password?",
      answer:
        "Log in to your router's admin panel by typing 192.168.1.1 in your browser. Navigate to the wireless settings section, look for security options, and update your password there.",
    },
    {
      question: "What should I do if my service is down?",
      answer:
        "First, check if all cables are properly connected and try restarting your router. If the issue persists, check our service status page or contact our support team.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Support</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">How can we help you today?</h2>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search for help articles..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-[#bddfef] mb-2" />
                        <span className="text-sm font-medium text-white">Live Chat</span>
                        <span className="text-xs text-gray-400 mt-1">Available 24/7</span>
                      </button>
                      <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                        <Phone className="h-6 w-6 text-[#bddfef] mb-2" />
                        <span className="text-sm font-medium text-white">Call Us</span>
                        <span className="text-xs text-gray-400 mt-1">0800 123 4567</span>
                      </button>
                      <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors flex flex-col items-center justify-center">
                        <FileText className="h-6 w-6 text-[#bddfef] mb-2" />
                        <span className="text-sm font-medium text-white">Email Support</span>
                        <span className="text-xs text-gray-400 mt-1">Response in 24h</span>
                      </button>
                    </div>

                    <SupportTickets />
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
                      <button className="text-[#bddfef] text-sm flex items-center hover:underline">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div key={index} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                          <h3 className="text-sm font-medium text-white mb-2">{faq.question}</h3>
                          <p className="text-xs text-gray-400">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-[#bddfef] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-white">Phone Support</p>
                          <p className="text-sm text-gray-400">0800 123 4567</p>
                          <p className="text-xs text-gray-400 mt-1">Available 24/7 for technical issues</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-[#bddfef] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-white">Email Support</p>
                          <p className="text-sm text-gray-400">support@olilo.com</p>
                          <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-[#bddfef] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-white">Support Hours</p>
                          <p className="text-sm text-gray-400">Technical: 24/7</p>
                          <p className="text-sm text-gray-400">Billing: 8am-8pm Mon-Sat</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Help</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                      >
                        <LifeBuoy className="mr-2 h-4 w-4 text-[#bddfef]" />
                        Report an Outage
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                      >
                        <MessageSquare className="mr-2 h-4 w-4 text-[#bddfef]" />
                        Request a Callback
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                      >
                        <HelpCircle className="mr-2 h-4 w-4 text-[#bddfef]" />
                        Troubleshooting Guide
                      </Button>
                    </div>
                  </div>

                  <div className="bg-[#bddfef]/10 border border-[#bddfef]/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-[#bddfef]/20 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-[#bddfef]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Live Chat</h3>
                        <p className="text-sm text-gray-400">Available 24/7</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Get instant help from our support team through live chat. No waiting on hold!
                    </p>
                    <Button className="w-full bg-[#bddfef] hover:bg-[#a5c7d7] text-black">Start Chat Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
