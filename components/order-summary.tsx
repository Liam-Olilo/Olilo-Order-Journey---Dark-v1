import type React from "react"

interface OrderSummaryProps {
  subtotal: number
  shippingCost: number
  tax: number
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shippingCost, tax }) => {
  const total = subtotal + shippingCost + tax

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6 border-t pt-5">
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Checkout</button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl">
          Update Cart
        </button>
      </div>
    </div>
  )
}

export default OrderSummary
