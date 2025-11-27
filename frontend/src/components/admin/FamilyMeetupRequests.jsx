import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const FamilyMeetupRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  // Mock meetup request data
  const meetupRequests = [
    {
      id: 1,
      requestDate: "2024-01-20",
      status: "pending",
      priority: "high",
      families: {
        family1: {
          name: "Sharma Family",
          contact: "Priya Sharma",
          phone: "+91 98765 43210",
          email: "priya.sharma@email.com",
          address: "Bandra, Mumbai",
        },
        family2: {
          name: "Gupta Family",
          contact: "Rahul Gupta",
          phone: "+91 87654 32109",
          email: "rahul.gupta@email.com",
          address: "Andheri, Mumbai",
        },
      },
      proposedMeeting: {
        date: "2024-01-25",
        time: "11:00 AM",
        venue: "Hotel Taj, Mumbai",
        type: "Family Introduction",
      },
      matchDetails: {
        compatibility: 85,
        gunaScore: "28/36",
        matchedBy: "Admin Team",
      },
      notes:
        "Both families are very interested. Priya's family prefers weekend meeting.",
      adminNotes: "",
    },
    {
      id: 2,
      requestDate: "2024-01-19",
      status: "scheduled",
      priority: "medium",
      families: {
        family1: {
          name: "Agarwal Family",
          contact: "Anjali Agarwal",
          phone: "+91 76543 21098",
          email: "anjali.agarwal@email.com",
          address: "CP, Delhi",
        },
        family2: {
          name: "Singh Family",
          contact: "Vikram Singh",
          phone: "+91 65432 10987",
          email: "vikram.singh@email.com",
          address: "Gurgaon, Delhi NCR",
        },
      },
      proposedMeeting: {
        date: "2024-01-22",
        time: "2:00 PM",
        venue: "Cafe Coffee Day, CP Delhi",
        type: "Casual Meeting",
      },
      matchDetails: {
        compatibility: 78,
        gunaScore: "26/36",
        matchedBy: "AI Algorithm",
      },
      notes: "Second meeting request. First meeting went well.",
      adminNotes: "Confirmed with both families. Venue booked.",
    },
    {
      id: 3,
      requestDate: "2024-01-18",
      status: "completed",
      priority: "low",
      families: {
        family1: {
          name: "Kumar Family",
          contact: "Ravi Kumar",
          phone: "+91 54321 09876",
          email: "ravi.kumar@email.com",
          address: "Koramangala, Bangalore",
        },
        family2: {
          name: "Reddy Family",
          contact: "Sita Reddy",
          phone: "+91 43210 98765",
          email: "sita.reddy@email.com",
          address: "Whitefield, Bangalore",
        },
      },
      proposedMeeting: {
        date: "2024-01-20",
        time: "10:00 AM",
        venue: "Traditional Restaurant, Bangalore",
        type: "Formal Family Meeting",
      },
      matchDetails: {
        compatibility: 92,
        gunaScore: "32/36",
        matchedBy: "Senior Matchmaker",
      },
      notes: "Excellent match. Both families very positive.",
      adminNotes:
        "Meeting successful. Families proceeding with engagement discussions.",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      scheduled: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Calendar,
      },
      completed: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800 border-red-200" },
      medium: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      low: { color: "bg-green-100 text-green-800 border-green-200" },
    };

    return (
      <Badge className={priorityConfig[priority].color}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
    );
  };

  const handleStatusUpdate = (requestId, newStatus, notes) => {
    console.log(
      `Updating request ${requestId} to ${newStatus} with notes: ${notes}`
    );
    alert(`Meetup request ${newStatus} successfully!`);
    setSelectedRequest(null);
    setAdminNotes("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Family Meetup Requests
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Coordinate and manage family meeting requests
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Meetup Requests</h3>
            <div className="flex gap-2">
              <Badge variant="outline">
                {meetupRequests.filter((r) => r.status === "pending").length}{" "}
                Pending
              </Badge>
              <Badge variant="outline">
                {meetupRequests.filter((r) => r.status === "scheduled").length}{" "}
                Scheduled
              </Badge>
            </div>
          </div>

          {meetupRequests.map((request) => (
            <Card
              key={request.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedRequest?.id === request.id
                  ? "border-primary shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedRequest(request)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                    {getPriorityBadge(request.priority)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {request.families.family1.name} &{" "}
                      {request.families.family2.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {request.proposedMeeting.date} at{" "}
                      {request.proposedMeeting.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {request.proposedMeeting.venue}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {request.matchDetails.compatibility}% Match
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Guna: {request.matchDetails.gunaScore}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Request Details */}
        <div className="space-y-4">
          {selectedRequest ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Meetup Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Meeting Information */}
                  <div>
                    <h4 className="font-semibold mb-3">Proposed Meeting</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <div className="font-medium">
                          {selectedRequest.proposedMeeting.date}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <div className="font-medium">
                          {selectedRequest.proposedMeeting.time}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Venue:</span>
                        <div className="font-medium">
                          {selectedRequest.proposedMeeting.venue}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Type:</span>
                        <div className="font-medium">
                          {selectedRequest.proposedMeeting.type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Family Details */}
                  <div>
                    <h4 className="font-semibold mb-3">Family Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Family 1 */}
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-2">
                          {selectedRequest.families.family1.name}
                        </h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            {selectedRequest.families.family1.contact}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {selectedRequest.families.family1.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {selectedRequest.families.family1.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {selectedRequest.families.family1.address}
                          </div>
                        </div>
                      </div>

                      {/* Family 2 */}
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-2">
                          {selectedRequest.families.family2.name}
                        </h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            {selectedRequest.families.family2.contact}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {selectedRequest.families.family2.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {selectedRequest.families.family2.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {selectedRequest.families.family2.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div>
                    <h4 className="font-semibold mb-3">Match Information</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {selectedRequest.matchDetails.compatibility}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Compatibility
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {selectedRequest.matchDetails.gunaScore}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Guna Score
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium">
                          {selectedRequest.matchDetails.matchedBy}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Matched By
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h4 className="font-semibold mb-3">Family Notes</h4>
                    <div className="p-3 bg-muted/30 rounded-lg text-sm">
                      {selectedRequest.notes}
                    </div>
                  </div>

                  {/* Admin Notes */}
                  {selectedRequest.adminNotes && (
                    <div>
                      <h4 className="font-semibold mb-3">Admin Notes</h4>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                        {selectedRequest.adminNotes}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              {selectedRequest.status === "pending" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Take Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Admin Notes
                      </label>
                      <Textarea
                        placeholder="Add notes about the meetup coordination..."
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleStatusUpdate(
                            selectedRequest.id,
                            "scheduled",
                            adminNotes
                          )
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() =>
                          handleStatusUpdate(
                            selectedRequest.id,
                            "cancelled",
                            adminNotes
                          )
                        }
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Select a Meetup Request
                </h3>
                <p className="text-muted-foreground">
                  Click on a request from the left panel to view details and
                  take action
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Meetup Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {meetupRequests.filter((r) => r.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Pending Requests
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {meetupRequests.filter((r) => r.status === "scheduled").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Scheduled Meetings
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {meetupRequests.filter((r) => r.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Completed Meetings
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  (meetupRequests.filter((r) => r.status === "completed")
                    .length /
                    meetupRequests.length) *
                    100
                )}
                %
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyMeetupRequests;
