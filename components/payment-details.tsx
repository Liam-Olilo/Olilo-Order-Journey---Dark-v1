const PaymentDetails = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="**** **** **** ****"
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="CVV"
                  className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Submit Payment
            </button>
          </form>
        </div>

        {/* Billing Address */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="123 Main St"
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Anytown"
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="CA"
                  className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="12345"
                  className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
