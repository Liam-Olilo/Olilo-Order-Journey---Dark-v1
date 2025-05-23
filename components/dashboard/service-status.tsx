import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

const services = [
  {
    name: "Broadband",
    status: "operational",
    details: "All systems normal",
  },
  {
    name: "Mobile Network",
    status: "operational",
    details: "All systems normal",
  },
  {
    name: "TV Streaming",
    status: "degraded",
    details: "Minor performance issues",
  },
  {
    name: "Voice Services",
    status: "operational",
    details: "All systems normal",
  },
]

export default function ServiceStatus() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-rose-500" />
      default:
        return null
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-emerald-500/20 text-emerald-500"
      case "degraded":
        return "bg-amber-500/20 text-amber-500"
      case "outage":
        return "bg-rose-500/20 text-rose-500"
      default:
        return ""
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational"
      case "degraded":
        return "Degraded"
      case "outage":
        return "Outage"
      default:
        return ""
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Service Status</h3>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800 border border-gray-700"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(service.status)}
              <div>
                <p className="text-sm font-medium text-white">{service.name}</p>
                <p className="text-xs text-gray-400">{service.details}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(service.status)}`}>
              {getStatusText(service.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
