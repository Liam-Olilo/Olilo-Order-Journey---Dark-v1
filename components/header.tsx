"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Building2, Check, ChevronDown, Globe, Home, Mail, Menu, User, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [country, setCountry] = useState("United Kingdom")
  const [pathname, setPathname] = useState<string | null>(null)
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false)
        setActiveMenu(null)
        if (isMenuOpen) {
          setIsMenuOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isMenuOpen])

  // Simplified toggle function for desktop menu
  const handleMenuClick = (menu: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    if (window.innerWidth < 1024) {
      if (activeMenu === menu && megaMenuOpen) {
        // If the same menu is clicked and it's open, close it
        setMegaMenuOpen(false)
        setActiveMenu(null)
      } else {
        // Otherwise, open the clicked menu
        setMegaMenuOpen(true)
        setActiveMenu(menu)
      }
    }
  }

  // Simplified toggle function for mobile menu items
  const handleMenuMouseEnter = (menu: string) => {
    // Clear any existing timeout to prevent menu from closing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    // Only handle hover on desktop
    if (window.innerWidth >= 1024) {
      setMegaMenuOpen(true)
      setActiveMenu(menu)
    }
  }

  const handleMenuMouseLeave = () => {
    // Only handle hover on desktop
    if (window.innerWidth >= 1024) {
      // Add a small delay before closing to prevent accidental closures
      timeoutRef.current = setTimeout(() => {
        setMegaMenuOpen(false)
        setActiveMenu(null)
      }, 300)
    }
  }

  // Add this new function to handle mouse enter on the megamenu
  const handleMegaMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }
  // Helper component for menu links that closes the menu when clicked
  const MenuLink = ({
    href,
    className,
    children,
    onClick,
  }: {
    href: string
    className: string
    children: React.ReactNode
    onClick?: () => void
  }) => (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        e.stopPropagation() // Prevent event bubbling
        setMegaMenuOpen(false)
        setActiveMenu(null)
        if (onClick) onClick()
      }}
    >
      {children}
    </Link>
  )

  const countryOptions = [
    {
      name: "United Kingdom",
      url: "https://olilo.co.uk",
      flag: (
        <svg className="h-4 w-6" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="a">
              <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z" />
            </clipPath>
          </defs>
          <g clipPath="url(#a)" transform="translate(80) scale(.94)">
            <g strokeWidth="1pt">
              <path fill="#012169" d="M-256 0H768v512H-256z" />
              <path
                fill="#fff"
                d="M-256 0v57.2L653.5 512H768v-57.2L-141.5 0H-256zM768 0v57.2L-141.5 512H-256v-57.2L653.5 0H768z"
              />
              <path fill="#fff" d="M170.7 0v512h170.6V0H170.7zM-256 170.7v170.6H768V170.7H-256z" />
              <path
                fill="#c8102e"
                d="M-256 204.8v102.4H768V204.8H-256zM204.8 0v512h102.4V0H204.8zM-256 512L85.3 341.3h76.4L-179.7 512H-256zm0-512L85.3 170.7H9L-256 38.2V0zm606.4 170.7L691.7 0H768L426.7 170.7h-76.3zM768 512L426.7 341.3H503l265 132.5V512z"
              />
            </g>
          </g>
        </svg>
      ),
    },
    {
      name: "Ireland",
      url: "https://olilo.ie",
      flag: (
        <svg className="h-4 w-6" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#009A49" d="M0 0h213.3v480H0z" />
            <path fill="#FF7900" d="M426.7 0H640v480H426.7z" />
          </g>
        </svg>
      ),
    },
  ]

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  }

  const handleMobileMenuClick = (menu: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (activeMenu === menu) {
      setActiveMenu(null)
    } else {
      setActiveMenu(menu)
    }
  }

  // Inside the Header component
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      style={{ top: 0 }}
      ref={headerRef}
    >
      {/* Site Type Bar */}
      <div className="hidden md:block bg-gray-200 w-full border-b-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            {/* Site Type Selector */}
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className={`flex items-center justify-center text-xs px-3 h-8 mt-2 min-w-[140px] ${
                  !pathname?.startsWith("/business")
                    ? "bg-black text-white font-medium rounded-t-md"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <Home className="h-3 w-3 mr-1.5" />
                <span>For The Home</span>
              </Link>
              <Link
                href="/business"
                className={`flex items-center justify-center text-xs px-3 h-8 mt-2 min-w-[140px] ${
                  pathname?.startsWith("/business")
                    ? "bg-black text-white font-medium rounded-t-md"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <Building2 className="h-3 w-3 mr-1.5" />
                <span>Business/SME</span>
              </Link>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-6">
              {/* Country selector - replace the DropdownMenu with a static display */}
              <div className="flex items-center text-xs text-gray-700">
                <Globe className="h-3 w-3 mr-1.5" />
                <span>{country}</span>
              </div>

              {/* Contact links */}
              <a
                href="mailto:support@olilo.co.uk"
                className="hidden md:flex items-center text-xs text-gray-700 hover:text-black"
              >
                <Mail className="h-3 w-3 mr-1.5" />
                <span>support@olilo.co.uk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`${isScrolled ? "bg-black py-3" : "bg-black py-5"} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Link href="/" className="flex items-center gap-2 mr-8">
                  <div className="h-10 w-auto font-bold text-2xl text-white">Olilo</div>
                </Link>
              </motion.div>

              <nav className="hidden lg:flex items-center gap-6">
                {["internet", "mobile", "for-you", "why-olilo", "service"].map((menu, index) => (
                  <motion.button
                    key={menu}
                    className={`flex items-center text-gray-300 hover:text-white transition-colors ${activeMenu === menu ? "text-white" : ""}`}
                    onClick={(e) => handleMenuClick(menu, e)}
                    onMouseEnter={() => handleMenuMouseEnter(menu)}
                    onMouseLeave={handleMenuMouseLeave}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                    whileHover={{ y: -2 }}
                  >
                    {menu.charAt(0).toUpperCase() + menu.slice(1).replace(/-/g, " ")}
                    <motion.div
                      animate={{ rotate: activeMenu === menu && megaMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </motion.div>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  onClick={() => (window.location.href = "https://my.olilo.co.uk")}
                  variant="ghost"
                  className="hidden md:flex items-center gap-2 text-white"
                  whileHover={{ y: -2 }}
                >
                  <User className="h-5 w-5" />
                  <span>myOlilo</span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="hidden md:flex items-center gap-2 border-gray-700 text-white hover:bg-gray-800"
                      whileHover={{ y: -2 }}
                    >
                      {countryOptions.find((option) => option.name === country)?.flag}
                      <span>{country}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                    <DropdownMenuItem
                      key="uk"
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                      onClick={() => {
                        if (country !== "United Kingdom") {
                          window.location.href = "https://olilo.co.uk"
                        }
                      }}
                    >
                      🇬🇧
                      <span>United Kingdom</span>
                      {country === "United Kingdom" && <Check className="h-4 w-4 ml-2 text-white" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      key="ireland"
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                      onClick={() => {
                        if (country !== "Ireland") {
                          window.location.href = "https://olilo.ie"
                        }
                      }}
                    >
                      🇮🇪
                      <span>Ireland</span>
                      {country === "Ireland" && <Check className="h-4 w-4 ml-2 text-white" />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>

              <motion.button
                className="lg:hidden text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen(!isMenuOpen)
                  setActiveMenu(null)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <div
        className={`absolute left-0 right-0 bg-black border-t border-gray-800 z-40 overflow-hidden w-full transition-all duration-300 ease-in-out ${
          megaMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ top: "100%" }}
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        {activeMenu === "mobile" && (
          <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Mobile</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/sim-only"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  SIM-Only Plans
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/5g-home"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  5G Home Internet
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/bundles/internet-mobile"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Internet + Mobile
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/offers"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Offers
                </MenuLink>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Info</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/unlimited"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Unlimited Plan
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/extras"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Extras
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/esim"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  eSIM
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/abroad"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Internet abroad
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/trade-in"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Device Trade-in
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/accessories"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Accessories
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/mobile/coverage"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Coverage
                </MenuLink>
              </motion.div>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">Unlimited 5G Data</h3>
                <p className="text-gray-300 mb-4">Experience lightning-fast speeds with no data caps</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMegaMenuOpen(false)
                    setActiveMenu(null)
                  }}
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">Latest Smartphones</h3>
                <p className="text-gray-300 mb-4">Get the newest devices with flexible payment options</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMegaMenuOpen(false)
                    setActiveMenu(null)
                  }}
                >
                  Browse devices
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                variants={staggerItem}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.3 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <MenuLink
                  href="/mobile"
                  className="inline-flex items-center text-white hover:text-white transition-colors duration-200"
                >
                  To Mobile
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                </MenuLink>
              </motion.div>
            </div>
          </div>
        )}

        {activeMenu === "internet" && (
          <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Plans</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/900mbps"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  900Mbps
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/1gig-plus"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  1.2Gbps
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/2gig"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  2Gbps
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/2-3gig"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  2.3Gbps
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/student"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Student Broadband
                </MenuLink>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Info</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/byor"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Bring your own router (BYOR)
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/routers"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Our Routers
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/mesh"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Our Meshes
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/installation"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Installation
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/speedtest"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Speedtest
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/internet/onetouch"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  OneTouch Switching
                </MenuLink>
              </motion.div>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">Ultra-Fast Fiber</h3>
                <p className="text-gray-300 mb-4">Symmetrical speeds up to 2.3 Gbps with no data caps</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMegaMenuOpen(false)
                    setActiveMenu(null)
                  }}
                >
                  View plans
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">No Contracts</h3>
                <p className="text-gray-300 mb-4">Flexible internet plans with no long-term commitments</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMegaMenuOpen(false)
                    setActiveMenu(null)
                  }}
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                variants={staggerItem}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.3 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <MenuLink
                  href="/internet"
                  className="inline-flex items-center text-white hover:text-white transition-colors duration-200"
                >
                  To Internet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                </MenuLink>
              </motion.div>
            </div>
          </div>
        )}

        {activeMenu === "for-you" && (
          <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">For You</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/for-you/loyalty-program"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Loyalty Program
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/for-you/referrals"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Referrals
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/for-you/all-in-1-app"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  All in 1 App
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/for-you/extras"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Extras
                </MenuLink>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-4 md:col-span-2" variants={staggerContainer} initial="hidden" animate="show">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                  <h3 className="text-lg font-medium mb-2">Loyalty Rewards</h3>
                  <p className="text-gray-300 mb-4">
                    Earn points with every bill and redeem for exclusive rewards and discounts
                  </p>
                  <Button
                    variant="ghost"
                    className="group text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMegaMenuOpen(false)
                      setActiveMenu(null)
                    }}
                  >
                    Join now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                  </Button>
                </motion.div>

                <motion.div
                  className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                  <h3 className="text-lg font-medium mb-2">Refer a Friend</h3>
                  <p className="text-gray-300 mb-4">Get £50 credit when you refer friends to Olilo</p>
                  <Button
                    variant="ghost"
                    className="group text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMegaMenuOpen(false)
                      setActiveMenu(null)
                    }}
                  >
                    Start referring
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">Download the Olilo App</h3>
                <p className="text-gray-300 mb-4">
                  Manage your account, track usage, pay bills, and access exclusive app-only offers
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMegaMenuOpen(false)
                      setActiveMenu(null)
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.84 1.5.09 2.63.64 3.38 1.64-3.03 1.72-2.39 5.5.69 6.43-.8 1.71-1.83 3.36-2.72 4.94zm-3.15-17.6c.11 2.07-1.47 3.7-3.27 3.94-.12-1.88 1.38-3.72 3.27-3.94z" />
                    </svg>
                    App Store
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMegaMenuOpen(false)
                      setActiveMenu(null)
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.293-.707V2.521c0-.265.106-.52.293-.707zM14.5 12.707l2.302 2.302-8.557 4.883c-.34.194-.77.104-.984-.11L14.5 12.707zm0-1.414L7.261 4.218a.69.69 0 0 1 .984-.11l8.557 4.883-2.302 2.302zm3.595-2.345l-2.844-1.624-2.33 2.33 2.33 2.33 2.844-1.624c.74-.422.74-1.49 0-1.912z" />
                    </svg>
                    Google Play
                  </Button>
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.3 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className="text-right"
              >
                <MenuLink
                  href="/for-you"
                  className="inline-flex items-center text-white hover:text-white transition-colors duration-200"
                >
                  Explore all offers
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                </MenuLink>
              </motion.div>
            </motion.div>
          </div>
        )}

        {activeMenu === "why-olilo" && (
          <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Our Story</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/mission"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Mission & Values
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/technology"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Technology
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/coverage"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Network Coverage
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/sustainability"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Sustainability
                </MenuLink>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Customer Stories</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/testimonials"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Testimonials
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/reviews"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Reviews
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/case-studies"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Case Studies
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/why-olilo/community"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Community
                </MenuLink>
              </motion.div>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">Our Technology</h3>
                <p className="text-gray-300 mb-4">Learn how we deliver ultra-fast, reliable internet</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMegaMenuOpen(false)
                    setActiveMenu(null)
                  }}
                >
                  Discover more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">Customer Stories</h3>
                <p className="text-gray-300 mb-4">See why customers choose Olilo for their connectivity</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMegaMenuOpen(false)
                    setActiveMenu(null)
                  }}
                >
                  Read stories
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                variants={staggerItem}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.3 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <MenuLink
                  href="/why-olilo"
                  className="inline-flex items-center text-white hover:text-white transition-colors duration-200"
                >
                  About Olilo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                </MenuLink>
              </motion.div>
            </div>
          </div>
        )}

        {activeMenu === "service" && (
          <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Support</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/help-center"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Help Center
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/contact"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Contact Us
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/live-chat"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Live Chat
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/status"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Service Status
                </MenuLink>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={staggerItem}>
                <span className="block text-white font-medium transition-colors duration-200">Account Help</span>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/billing"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Billing
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/technical"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Technical Support
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/installation"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Installation
                </MenuLink>
              </motion.div>
              <motion.div variants={staggerItem}>
                <MenuLink
                  href="/service/moving"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  Moving Home
                </MenuLink>
              </motion.div>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">24/7 Support</h3>
                <p className="text-gray-300 mb-4">Our UK-based team is always here to help</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMegaMenuOpen(false)
                    setActiveMenu(null)
                  }}
                >
                  Contact support
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 rounded-lg p-6 relative overflow-hidden group hover:bg-gray-800/70 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gray-700/20 rounded-full filter blur-2xl group-hover:bg-gray-700/30 transition-all duration-500"></div>
                <h3 className="text-lg font-medium mb-2">Self-Service</h3>
                <p className="text-gray-300 mb-4">Manage your account, bills and services online</p>
                <Button
                  variant="ghost"
                  className="group text-white"
                  onClick={() => (window.location.href = "https://my.olilo.co.uk")}
                >
                  myOlilo login
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
              </motion.div>

              <motion.div
                variants={staggerItem}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.3 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <MenuLink
                  href="/service"
                  className="inline-flex items-center text-white hover:text-white transition-colors duration-200"
                >
                  All support options
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                </MenuLink>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-black z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <motion.button
                className="text-white"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <nav className="flex flex-col space-y-4">
              {["internet", "mobile", "for-you", "why-olilo", "service"].map((menu) => (
                <div key={menu}>
                  <button
                    className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors"
                    onClick={(e) => handleMobileMenuClick(menu, e)}
                  >
                    {menu.charAt(0).toUpperCase() + menu.slice(1).replace(/-/g, " ")}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${activeMenu === menu ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeMenu === menu && (
                      <motion.div
                        className="ml-4 mt-2 flex flex-col space-y-2 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {menu === "internet" && (
                          <>
                            <MenuLink
                              href="/internet/900mbps"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              900Mbps
                            </MenuLink>
                            <MenuLink
                              href="/internet/1gig-plus"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              1.2Gbps
                            </MenuLink>
                            <MenuLink
                              href="/internet/2gig"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              2Gbps
                            </MenuLink>
                            <MenuLink
                              href="/internet/2-3gig"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              2.3Gbps
                            </MenuLink>
                            <MenuLink
                              href="/internet/student"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Student Broadband
                            </MenuLink>
                            <MenuLink
                              href="/internet/byor"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Bring your own router (BYOR)
                            </MenuLink>
                            <MenuLink
                              href="/internet/routers"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Our Routers
                            </MenuLink>
                            <MenuLink
                              href="/internet/mesh"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Our Meshes
                            </MenuLink>
                            <MenuLink
                              href="/internet/installation"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Installation
                            </MenuLink>
                            <MenuLink
                              href="/internet/speedtest"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Speedtest
                            </MenuLink>
                            <MenuLink
                              href="/internet/onetouch"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              OneTouch Switching
                            </MenuLink>
                          </>
                        )}
                        {menu === "mobile" && (
                          <>
                            <MenuLink
                              href="/mobile/sim-only"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              SIM-Only Plans
                            </MenuLink>
                            <MenuLink
                              href="/mobile/5g-home"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              5G Home Internet
                            </MenuLink>
                            <MenuLink
                              href="/bundles/internet-mobile"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Internet + Mobile
                            </MenuLink>
                            <MenuLink
                              href="/mobile/offers"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Offers
                            </MenuLink>
                            <MenuLink
                              href="/mobile/unlimited"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Unlimited Plan
                            </MenuLink>
                            <MenuLink
                              href="/mobile/extras"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Extras
                            </MenuLink>
                            <MenuLink
                              href="/mobile/esim"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              eSIM
                            </MenuLink>
                            <MenuLink
                              href="/mobile/abroad"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Internet abroad
                            </MenuLink>
                            <MenuLink
                              href="/mobile/trade-in"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Device Trade-in
                            </MenuLink>
                            <MenuLink
                              href="/mobile/accessories"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Accessories
                            </MenuLink>
                            <MenuLink
                              href="/mobile/coverage"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Coverage
                            </MenuLink>
                          </>
                        )}
                        {menu === "for-you" && (
                          <>
                            <MenuLink
                              href="/for-you/loyalty-program"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Loyalty Program
                            </MenuLink>
                            <MenuLink
                              href="/for-you/referrals"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Referrals
                            </MenuLink>
                            <MenuLink
                              href="/for-you/all-in-1-app"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              All in 1 App
                            </MenuLink>
                            <MenuLink
                              href="/for-you/extras"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Extras
                            </MenuLink>
                          </>
                        )}
                        {menu === "why-olilo" && (
                          <>
                            <MenuLink
                              href="/why-olilo/mission"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Mission & Values
                            </MenuLink>
                            <MenuLink
                              href="/why-olilo/technology"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Technology
                            </MenuLink>
                            <MenuLink
                              href="/why-olilo/coverage"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Network Coverage
                            </MenuLink>
                            <MenuLink
                              href="/why-olilo/sustainability"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Sustainability
                            </MenuLink>
                            <MenuLink
                              href="/why-olilo/testimonials"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Testimonials
                            </MenuLink>
                            <MenuLink
                              href="/why-olilo/reviews"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Reviews
                            </MenuLink>
                            <MenuLink
                              href="/why-olilo/case-studies"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Case Studies
                            </MenuLink>
                            <MenuLink
                              href="/why-olilo/community"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Community
                            </MenuLink>
                          </>
                        )}
                        {menu === "service" && (
                          <>
                            <MenuLink
                              href="/service/help-center"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Help Center
                            </MenuLink>
                            <MenuLink
                              href="/service/contact"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Contact Us
                            </MenuLink>
                            <MenuLink
                              href="/service/live-chat"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Live Chat
                            </MenuLink>
                            <MenuLink
                              href="/service/status"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Service Status
                            </MenuLink>
                            <MenuLink
                              href="/service/billing"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Billing
                            </MenuLink>
                            <MenuLink
                              href="/service/technical"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Technical Support
                            </MenuLink>
                            <MenuLink
                              href="/service/installation"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Installation
                            </MenuLink>
                            <MenuLink
                              href="/service/moving"
                              className="block text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Moving Home
                            </MenuLink>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Button
                onClick={() => (window.location.href = "https://my.olilo.co.uk")}
                variant="ghost"
                className="flex items-center gap-2 text-white"
              >
                <User className="h-5 w-5" />
                <span>myOlilo</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-700 text-white hover:bg-gray-800"
                  >
                    {countryOptions.find((option) => option.name === country)?.flag}
                    <span>{country}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                  <DropdownMenuItem
                    key="uk"
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                    onClick={() => {
                      if (country !== "United Kingdom") {
                        window.location.href = "https://olilo.co.uk"
                      }
                      setIsMenuOpen(false)
                    }}
                  >
                    🇬🇧
                    <span>United Kingdom</span>
                    {country === "United Kingdom" && <Check className="h-4 w-4 ml-2 text-white" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    key="ireland"
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                    onClick={() => {
                      if (country !== "Ireland") {
                        window.location.href = "https://olilo.ie"
                      }
                      setIsMenuOpen(false)
                    }}
                  >
                    🇮🇪
                    <span>Ireland</span>
                    {country === "Ireland" && <Check className="h-4 w-4 ml-2 text-white" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
