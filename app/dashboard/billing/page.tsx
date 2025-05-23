import { CreditCard, Download, Receipt } from "lucide-react"
import DashboardHeader from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import BillingSummary from "@/components/dashboard/billing-summary"

export default function BillingPage() {
  // Sample billing history data
  const billingHistory = [
    {
      id: "INV-2025-05",
      date: "May 15, 2025",
      amount: "£49.99",
      status: "paid",
    },
    {
      id: "INV-2025-04",
      date: "April 15, 2025",
      amount: "£49.99",
      status: "paid",
    },
    {
      id: "INV-2025-03",
      date: "March 15, 2025",
      amount: "£49.99",
      status: "paid",
    },
    {
      id: "INV-2025-02",
      date: "February 15, 2025",
      amount: "£49.99",
      status: "paid",
    },
    {
      id: "INV-2025-01",
      date: "January 15, 2025",
      amount: "£49.99",
      status: "paid",
    },
  ]

  // Sample payment methods
  const paymentMethods = [
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "05/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "mastercard",
      last4: "8888",
      expiry: "12/27",
      isDefault: false,
    },
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/20 text-emerald-500"
      case "pending":
        return "bg-amber-500/20 text-amber-500"
      case "failed":
        return "bg-rose-500/20 text-rose-500"
      default:
        return ""
    }
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "/visa-logo-generic.png"
      case "mastercard":
        return "/mastercard-logo.png"
      case "amex":
        return "/amex-logo.png"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Billing</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Billing History</h2>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b border-gray-800">
                            <th className="pb-3 text-sm font-medium text-gray-400">Invoice</th>
                            <th className="pb-3 text-sm font-medium text-gray-400">Date</th>
                            <th className="pb-3 text-sm font-medium text-gray-400">Amount</th>
                            <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                            <th className="pb-3 text-sm font-medium text-gray-400"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {billingHistory.map((invoice) => (
                            <tr key={invoice.id} className="border-b border-gray-800">
                              <td className="py-4 text-sm text-white">{invoice.id}</td>
                              <td className="py-4 text-sm text-white">{invoice.date}</td>
                              <td className="py-4 text-sm text-white">{invoice.amount}</td>
                              <td className="py-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(invoice.status)}`}>
                                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <button className="text-[#bddfef] hover:text-[#a5c7d7] text-sm flex items-center">
                                  <Download className="h-4 w-4 mr-1" />
                                  PDF
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Payment Methods</h2>

                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-16 bg-gray-700 rounded flex items-center justify-center">
                              <img
                                src={getCardIcon(method.type) || "/placeholder.svg"}
                                alt={method.type}
                                className="h-6 w-auto"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">•••• •••• •••• {method.last4}</p>
                              <p className="text-xs text-gray-400">Expires {method.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {method.isDefault && (
                              <span className="text-xs px-2 py-1 rounded-full bg-[#bddfef]/20 text-[#bddfef]">
                                Default
                              </span>
                            )}
                            <button className="text-gray-400 hover:text-white">
                              <CreditCard className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button className="w-full p-4 rounded-lg border border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors flex items-center justify-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <BillingSummary />

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      If you have any questions about your bill or need to make changes to your payment information, our
                      support team is here to help.
                    </p>
                    <div className="space-y-3">
                      <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors flex items-center justify-center">
                        <Receipt className="h-5 w-5 mr-2 text-[#bddfef]" />
                        <span className="text-sm text-white">Billing Support</span>
                      </button>
                      <button className="w-full p-3 rounded-lg bg-[#bddfef] hover:bg-[#a5c7d7] transition-colors flex items-center justify-center">
                        <Download className="h-5 w-5 mr-2 text-black" />
                        <span className="text-sm text-black">Download All Invoices</span>
                      </button>
                    </div>
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
