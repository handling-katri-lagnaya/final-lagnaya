import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Clock,
  User,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Mail,
  Calendar,
  CreditCard,
  MessageSquare,
} from "lucide-react";

const AdminActivityLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock activity log data
  const activities = [
    {
      id: 1,
      adminName: "Admin User",
      action: "Profile Verified",
      target: "Priya Sharma",
      type: "verification",
      timestamp: "2024-01-20 14:30:25",
      details: "Profile verification completed successfully",
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      adminName: "Admin User",
      action: "Match Suggestion Sent",
      target: "Rahul Gupta & Anjali Agarwal",
      type: "matching",
      timestamp: "2024-01-20 13:45:12",
      details: "Compatibility: 85%, Guna Score: 28/36",
      ipAddress: "192.168.1.100",
    },
    {
      id: 3,
      adminName: "Super Admin",
      action: "User Account Suspended",
      target: "Vikram Singh",
      type: "user_management",
      timestamp: "2024-01-20 12:15:30",
      details: "Reason: Inappropriate behavior reported",
      ipAddress: "192.168.1.101",
    },
    {
      id: 4,
      adminName: "Admin User",
      action: "Payment Verified",
      target: "Kumar Family - ₹15,000",
      type: "payment",
      timestamp: "2024-01-20 11:20:45",
      details: "Success fee payment for marriage completion",
      ipAddress: "192.168.1.100",
    },
    {
      id: 5,
      adminName: "Admin User",
      action: "Meetup Scheduled",
      target: "Sharma Family & Gupta Family",
      type: "meetup",
      timestamp: "2024-01-20 10:30:15",
      details: "Meeting scheduled for 2024-01-25 at Hotel Taj, Mumbai",
      ipAddress: "192.168.1.100",
    },
    {
      id: 6,
      adminName: "Admin User",
      action: "Feedback Replied",
      target: "Meera Patel",
      type: "feedback",
      timestamp: "2024-01-20 09:45:20",
      details: "Replied to pricing inquiry feedback",
      ipAddress: "192.168.1.100",
    },
    {
      id: 7,
      adminName: "Super Admin",
      action: "System Settings Updated",
      target: "Guna Matching Algorithm",
      type: "system",
      timestamp: "2024-01-19 16:20:10",
      details: "Updated compatibility scoring parameters",
      ipAddress: "192.168.1.101",
    },
    {
      id: 8,
      adminName: "Admin User",
      action: "Profile Rejected",
      target: "Test User",
      type: "verification",
      timestamp: "2024-01-19 15:10:35",
      details: "Reason: Incomplete documentation",
      ipAddress: "192.168.1.100",
    },
    {
      id: 9,
      adminName: "Admin User",
      action: "Bulk Email Sent",
      target: "50 Active Users",
      type: "communication",
      timestamp: "2024-01-19 14:00:00",
      details: "Monthly newsletter and match updates",
      ipAddress: "192.168.1.100",
    },
    {
      id: 10,
      adminName: "Super Admin",
      action: "Admin User Created",
      target: "New Admin",
      type: "admin_management",
      timestamp: "2024-01-19 10:30:45",
      details: "New admin user account created with limited permissions",
      ipAddress: "192.168.1.101",
    },
  ];

  const getActionIcon = (type) => {
    const iconMap = {
      verification: CheckCircle,
      matching: User,
      user_management: Edit,
      payment: CreditCard,
      meetup: Calendar,
      feedback: MessageSquare,
      system: Activity,
      communication: Mail,
      admin_management: User,
    };

    const Icon = iconMap[type] || Activity;
    return <Icon className="h-4 w-4" />;
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      verification: { color: "bg-green-100 text-green-800 border-green-200" },
      matching: { color: "bg-purple-100 text-purple-800 border-purple-200" },
      user_management: { color: "bg-blue-100 text-blue-800 border-blue-200" },
      payment: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      meetup: { color: "bg-pink-100 text-pink-800 border-pink-200" },
      feedback: { color: "bg-orange-100 text-orange-800 border-orange-200" },
      system: { color: "bg-red-100 text-red-800 border-red-200" },
      communication: { color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
      admin_management: { color: "bg-gray-100 text-gray-800 border-gray-200" },
    };

    const config = typeConfig[type] || typeConfig.system;
    return (
      <Badge className={config.color}>
        {type.replace("_", " ").charAt(0).toUpperCase() +
          type.replace("_", " ").slice(1)}
      </Badge>
    );
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || activity.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Admin Activity Log
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "verification" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("verification")}
            >
              Verification
            </Button>
            <Button
              variant={filterType === "matching" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("matching")}
            >
              Matching
            </Button>
            <Button
              variant={filterType === "payment" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("payment")}
            >
              Payment
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredActivities.map((activity) => {
            const { date, time } = formatTimestamp(activity.timestamp);

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  {getActionIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">
                        {activity.action}
                      </span>
                      {getTypeBadge(activity.type)}
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {time}
                      </div>
                      <div>{date}</div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Target:</span>{" "}
                    {activity.target}
                  </div>

                  <div className="text-sm text-muted-foreground mb-2">
                    {activity.details}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {activity.adminName}
                    </div>
                    <div>IP: {activity.ipAddress}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No activities found matching your criteria
            </p>
          </div>
        )}

        {/* Activity Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {activities.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Activities
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {activities.filter((a) => a.type === "verification").length}
              </div>
              <div className="text-sm text-muted-foreground">Verifications</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {activities.filter((a) => a.type === "matching").length}
              </div>
              <div className="text-sm text-muted-foreground">Matches</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {activities.filter((a) => a.type === "payment").length}
              </div>
              <div className="text-sm text-muted-foreground">Payments</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActivityLog;
