import { Bell, Search, User } from "lucide-react"
import ThemeToggle from "../theme-toggle"

export default function DashboardHeader() {
  return (
    <header className="bg-black border-b border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:w-72">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bddfef] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <button className="relative p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors">
            <Bell className="h-5 w-5 text-gray-300" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#bddfef]"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Alex Johnson</p>
              <p className="text-xs text-gray-400">Premium Plan</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
              <User className="h-5 w-5 text-[#bddfef]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
