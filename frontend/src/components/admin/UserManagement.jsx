import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
} from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { dataStore } = useAppContext();
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Load real data
    const allUsers = dataStore.getUsers().filter((u) => u.role === "user");
    const allProfiles = dataStore.getProfiles();

    // Combine user and profile data
    const usersWithProfiles = allUsers.map((user) => {
      const profile = allProfiles.find((p) => p.userId === user.id);
      return {
        ...user,
        gotra: profile?.familyDetails?.gotra || "Not specified",
      };
    });

    setUsers(usersWithProfiles);
    setProfiles(allProfiles);
  }, [dataStore]);

  // Remove the mock data array and replace with real data
  const mockUsers = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      status: "active",
      verified: true,
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      profileComplete: 95,
      matches: 12,
      gotra: "Bharadwaj",
    },
    {
      id: 2,
      name: "Rahul Gupta",
      email: "rahul.gupta@email.com",
      phone: "+91 87654 32109",
      status: "pending",
      verified: false,
      joinDate: "2024-01-18",
      lastActive: "2024-01-19",
      profileComplete: 60,
      matches: 0,
      gotra: "Kashyap",
    },
    {
      id: 3,
      name: "Anjali Agarwal",
      email: "anjali.agarwal@email.com",
      phone: "+91 76543 21098",
      status: "active",
      verified: true,
      joinDate: "2024-01-10",
      lastActive: "2024-01-21",
      profileComplete: 100,
      matches: 8,
      gotra: "Vasishtha",
    },
    {
      id: 4,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 65432 10987",
      status: "suspended",
      verified: true,
      joinDate: "2024-01-05",
      lastActive: "2024-01-12",
      profileComplete: 85,
      matches: 15,
      gotra: "Gautam",
    },
  ]; // This is now replaced by real data from useEffect

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Active",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Pending",
      },
      suspended: {
        color: "bg-red-100 text-red-800 border-red-200",
        label: "Suspended",
      },
      inactive: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        label: "Inactive",
      },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All Users
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("active")}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "suspended" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("suspended")}
              >
                Suspended
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">User</th>
                  <th className="text-left p-3 font-medium">Contact</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Profile</th>
                  <th className="text-left p-3 font-medium">Matches</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-medium text-primary">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Gotra: {user.gotra}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-2">
                        {getStatusBadge(user.status)}
                        <div className="flex items-center gap-1">
                          {user.verified ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-500" />
                          )}
                          <span className="text-xs">
                            {user.verified ? "Verified" : "Unverified"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {user.profileComplete}% Complete
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${user.profileComplete}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {user.matches}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          matches
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Ban className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {users.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter((u) => u.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {users.filter((u) => u.verified).length}
              </div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
