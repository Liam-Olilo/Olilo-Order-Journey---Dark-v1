"use client"

import { useState } from "react"

const PostcodeChecker = () => {
  const [postcode, setPostcode] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const validatePostcode = async () => {
    // Basic UK postcode validation regex
    const postcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2})$/i

    if (!postcodeRegex.test(postcode)) {
      setIsValid(false)
      return
    }

    // Simulate API call (replace with actual API endpoint)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate delay

    // In a real application, you would call an API here to validate the postcode.
    // For this example, we'll just assume it's valid if it matches the regex.
    setIsValid(true)
  }

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5">
          <h2 className="text-2xl font-semibold mb-4">Postcode Checker</h2>
          <div className="mb-4">
            <label htmlFor="postcode" className="block text-gray-700 text-sm font-bold mb-2">
              Enter Postcode:
            </label>
            <input
              type="text"
              id="postcode"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., SW1A 0AA"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={validatePostcode}
            >
              Check Postcode
            </button>
          </div>
          {isValid !== null && (
            <div className="mt-4">
              {isValid ? (
                <p className="text-green-500">Postcode is valid!</p>
              ) : (
                <p className="text-red-500">Postcode is invalid.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostcodeChecker
