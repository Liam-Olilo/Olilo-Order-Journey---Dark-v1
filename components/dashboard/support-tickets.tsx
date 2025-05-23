import { ArrowRight, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const tickets = [
  {
    id: "T-1234",
    subject: "Connection dropping intermittently",
    status: "in-progress",
    lastUpdate: "2 hours ago",
  },
  {
    id: "T-1233",
    subject: "Billing inquiry about last month's charges",
    status: "waiting",
    lastUpdate: "1 day ago",
  },
]

export default function SupportTickets() {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-500"
      case "in-progress":
        return "bg-amber-500/20 text-amber-500"
      case "waiting":
        return "bg-violet-500/20 text-violet-500"
      case "resolved":
        return "bg-emerald-500/20 text-emerald-500"
      default:
        return ""
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open"
      case "in-progress":
        return "In Progress"
      case "waiting":
        return "Awaiting Response"
      case "resolved":
        return "Resolved"
      default:
        return ""
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Support Tickets</h3>
        <button className="text-[#bddfef] text-sm flex items-center hover:underline">
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      {tickets.length > 0 ? (
        <div className="space-y-4 mb-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-white">{ticket.subject}</h4>
                <span className="text-xs text-gray-400">{ticket.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(ticket.status)}`}>
                  {getStatusText(ticket.status)}
                </span>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {ticket.lastUpdate}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">No active support tickets</p>
        </div>
      )}

      <Button className="w-full bg-[#bddfef] hover:bg-[#a5c7d7] text-black">
        <MessageSquare className="mr-2 h-4 w-4" />
        Create New Ticket
      </Button>
    </div>
  )
}
