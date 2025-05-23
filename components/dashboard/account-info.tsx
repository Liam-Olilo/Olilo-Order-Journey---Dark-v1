import { User, Mail, Phone, MapPin, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AccountInfo() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Account Information</h3>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
        >
          <Edit className="mr-1 h-4 w-4" />
          Edit
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 mr-4">
          <User className="h-8 w-8 text-[#bddfef]" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-white">Alex Johnson</h4>
          <p className="text-sm text-gray-400">Customer since June 2023</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-300">alex.johnson@example.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-300">+44 7700 900123</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-300">123 Broadband Street, London, UK</span>
        </div>
      </div>
    </div>
  )
}
