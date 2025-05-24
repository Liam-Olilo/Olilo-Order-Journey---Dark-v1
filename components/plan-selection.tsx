const PlanSelection = () => {
  return (
    <div className="container mx-auto my-6 p-5">
      <h1 className="text-2xl font-bold mb-6">Choose Your Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Plan Card 1 */}
        <div className="rounded-xl shadow-md border border-gray-200">
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Basic</h2>
            <p className="text-gray-600 mb-4">Essential features for getting started.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$9</span>
              <span className="text-gray-500">/month</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
              Select Plan
            </button>
          </div>
        </div>

        {/* Plan Card 2 */}
        <div className="rounded-xl shadow-md border border-gray-200">
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Standard</h2>
            <p className="text-gray-600 mb-4">Advanced features for growing businesses.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$19</span>
              <span className="text-gray-500">/month</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
              Select Plan
            </button>
          </div>
        </div>

        {/* Plan Card 3 */}
        <div className="rounded-xl shadow-md border border-gray-200">
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Premium</h2>
            <p className="text-gray-600 mb-4">Everything you need for enterprise-level success.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$29</span>
              <span className="text-gray-500">/month</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
              Select Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanSelection
