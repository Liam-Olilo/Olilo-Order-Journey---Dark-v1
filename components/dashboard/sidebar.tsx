"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Package2, Network, LifeBuoy, User, Settings, LogOut, ChevronRight } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Billing", icon: CreditCard, path: "/dashboard/billing" },
    { name: "Services", icon: Package2, path: "/dashboard/services" },
    { name: "Network", icon: Network, path: "/dashboard/network" },
    { name: "Support", icon: LifeBuoy, path: "/dashboard/support" },
    { name: "Account", icon: User, path: "/dashboard/account" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ]

  return (
    <div className="h-full w-64 bg-black border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <img src="/images/olilo-logo.webp" alt="Olilo Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-white">Olilo</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-gray-800 text-[#bddfef]" : "text-gray-300 hover:bg-gray-800 hover:text-[#bddfef]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 ${isActive ? "text-[#bddfef]" : "text-gray-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-[#bddfef]" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-4 pb-6">
        <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-800 hover:text-[#bddfef] transition-colors">
          <LogOut className="h-5 w-5 text-gray-400" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}
