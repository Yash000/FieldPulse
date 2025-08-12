"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Filter, Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Clock, Calendar, User, Edit } from 'lucide-react'
import { CallResponseDialog } from "@/components/call-response-dialog"

// Mock calls data
const mockCalls: TypeCall[] = [
  {
    id: 1,
    phone: "+1 536383",
    contact: "Sarah Johnson",
    company: "TechCorp",
    type: "Outbound",
    status: "Completed",
    duration: "12:34",
    date: "2024-01-15",
    time: "10:30 AM",
    notes: "Discussed enterprise solution requirements. Very interested, scheduling follow-up demo.",
    outcome: "Positive"
  },
  {
    id: 2,
    phone: "+1 536383",
    contact: "Mike Chen",
    company: "StartupXYZ",
    type: "Inbound",
    status: "Missed",
    duration: "0:00",
    date: "2024-01-15",
    time: "9:45 AM",
    notes: "Missed call - need to follow up",
    outcome: "Neutral"
  },
  {
    id: 3,
    phone: "+1 536383",
    contact: "Emily Davis",
    company: "Enterprise Inc",
    type: "Outbound",
    status: "Completed",
    duration: "15:22",
    date: "2024-01-15",
    time: "9:15 AM",
    notes: "Initial discovery call. Large enterprise with complex needs. Sent proposal.",
    outcome: "Positive"
  },
  {
    id: 4,
    phone: "+1 536383",
    contact: "John Smith",
    company: "Local Business",
    type: "Outbound",
    status: "Completed",
    duration: "8:45",
    date: "2024-01-14",
    time: "2:30 PM",
    notes: "Budget concerns discussed. Provided alternative pricing options.",
    outcome: "Neutral"
  },
  {
    id: 5,
    phone: "+1 536383",
    contact: "Lisa Wang",
    company: "Innovate Solutions",
    type: "Inbound",
    status: "Completed",
    duration: "18:12",
    date: "2024-01-14",
    time: "11:00 AM",
    notes: "Ready to proceed with implementation. Discussed timeline and next steps.",
    outcome: "Positive"
  }
]

type CallStatus = "Completed" | "Missed";
type CallType = "Inbound" | "Outbound";
type CallOutcome = "Positive" | "Neutral" | "Negative";

export type TypeCall = {
  id: number,
  phone: string,
  contact: string,
  company: string,
  type: CallType,
  status: CallStatus,
  duration: string,
  date: string,
  time: string,
  notes: string,
  outcome: CallOutcome
}

export default function CallsPage() {
  const [calls, setCalls] = useState<TypeCall[]>(mockCalls)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'missed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'ongoing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      case 'neutral': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || call.type === typeFilter
    const matchesStatus = statusFilter === "all" || call.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddCall = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newCall: TypeCall = {
      id: calls.length + 1,
      phone: formData.get('phone') as string,
      contact: formData.get('contact') as string,
      company: formData.get('company') as string,
      type: formData.get('type') as CallType,
      status: formData.get('status') as CallStatus,
      duration: formData.get('duration') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      notes: formData.get('notes') as string,
      outcome: formData.get('outcome') as CallOutcome
    }
    setCalls([...calls, newCall])
    setIsAddDialogOpen(false)
  }

  const handleCallClick = (call: typeof calls[0]) => {
  }

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Call Management</h1>
          <p className="text-muted-foreground">
            Track and manage all your customer calls and interactions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Call
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Log New Call</DialogTitle>
              <DialogDescription>
                Record details of your call for future reference.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCall} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Name</Label>
                  <Input id="contact" name="contact" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Call Type</Label>
                  <Select name="type" defaultValue="Outbound">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Outbound">Outbound</SelectItem>
                      <SelectItem value="Inbound">Inbound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="Completed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Missed">Missed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" type="time" placeholder="mm:ss" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome</Label>
                <Select name="outcome" defaultValue="Neutral">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Positive">Positive</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                    <SelectItem value="Negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Call Notes</Label>
                <Textarea id="notes" name="notes" placeholder="What was discussed during the call?" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Log Call</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search calls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredCalls.map((call) => (
          <Card key={call.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${call.type === "Inbound" ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
                    {call.type === "Inbound" ? (
                      <PhoneIncoming className={`h-5 w-5 ${call.type === "Inbound" ? 'text-green-600 dark:text-green-300' : 'text-blue-600 dark:text-blue-300'}`} />
                    ) : (
                      <PhoneOutgoing className={`h-5 w-5 ${call.type === "Outbound" ? 'text-green-600 dark:text-green-300' : 'text-blue-600 dark:text-blue-300'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{call.contact}</h3>
                      <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{call.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(call.date).toLocaleDateString()} at {call.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {call.duration}</span>
                        <span className={`ml-2 font-medium ${getOutcomeColor(call.outcome)}`}>
                          • {call.outcome}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <CallResponseDialog callDetails={call} />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
              {call.notes && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Call Notes</h4>
                  <p className="text-sm text-muted-foreground">{call.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCalls.length === 0 && (
        <div className="text-center py-12">
          <PhoneCall className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No calls found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
