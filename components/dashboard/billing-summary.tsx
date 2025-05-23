import { ArrowRight, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BillingSummary() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Billing Summary</h3>
        <button className="text-[#bddfef] text-sm flex items-center hover:underline">
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-white">Next Bill</p>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
              <p className="text-sm text-gray-400">June 15, 2025</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Amount</p>
            <p className="text-xl font-bold text-white">£49.99</p>
          </div>
        </div>

        <div className="h-px bg-gray-800 w-full"></div>

        <div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-400">Broadband (1 Gbps)</p>
            <p className="text-sm text-white">£39.99</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-400">Mobile SIM (Unlimited)</p>
            <p className="text-sm text-white">£15.00</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-400">Bundle Discount</p>
            <p className="text-sm text-emerald-500">-£5.00</p>
          </div>
        </div>

        <div className="h-px bg-gray-800 w-full"></div>

        <div className="flex justify-between">
          <p className="text-sm font-medium text-white">Last Bill</p>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
          >
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
