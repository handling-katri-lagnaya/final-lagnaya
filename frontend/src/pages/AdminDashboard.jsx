import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Star,
  CheckCircle,
  Heart,
  CreditCard,
  Activity,
  Calendar,
  MessageSquare,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";

// Import admin components
import UserManagement from "@/components/admin/UserManagement";
import GunaMatchingTool from "@/components/admin/GunaMatchingTool";
import ProfileVerification from "@/components/admin/ProfileVerification";
import MatchSuggestionSystem from "@/components/admin/MatchSuggestionSystem";
import PaymentSection from "@/components/admin/PaymentSection";
import AdminActivityLog from "@/components/admin/AdminActivityLog";
import FamilyMeetupRequests from "@/components/admin/FamilyMeetupRequests";
import FeedbackSection from "@/components/admin/FeedbackSection";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { getStatistics, currentUser } = useAppContext();
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Load real statistics from data store
    const realStats = getStatistics();
    setStats(realStats);
  }, [getStatistics]);

  // Redirect if not admin
  useEffect(() => {
    if (currentUser && currentUser.role !== "admin") {
      window.location.href = "/dashboard";
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage Khatri Lagnaya platform operations
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Admin Access
          </Badge>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs">
              Users
            </TabsTrigger>
            <TabsTrigger value="guna" className="text-xs">
              Guna Match
            </TabsTrigger>
            <TabsTrigger value="verification" className="text-xs">
              Verification
            </TabsTrigger>
            <TabsTrigger value="matches" className="text-xs">
              Matches
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs">
              Payments
            </TabsTrigger>
            <TabsTrigger value="meetups" className="text-xs">
              Meetups
            </TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs">
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      import("@/utils/sampleDataGenerator").then(
                        ({ generateSampleData }) => {
                          const result = generateSampleData();
                          alert(result.message);
                          if (result.success) {
                            window.location.reload();
                          }
                        }
                      );
                    }}
                    variant="outline"
                  >
                    Generate Sample Data
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("This will reset all data. Are you sure?")) {
                        import("@/utils/sampleDataGenerator").then(
                          ({ resetAllData }) => {
                            resetAllData();
                          }
                        );
                      }
                    }}
                    variant="destructive"
                  >
                    Reset All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalUsers || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total registered users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Profiles
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.activeProfiles || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats.pendingVerifications || 0} pending verification
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Matches Made
                  </CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.matchesMade || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +8% success rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{(stats.totalRevenue || 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("verification")}
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-xs">Pending Verifications</span>
                    <Badge variant="destructive">
                      {stats.pendingVerifications}
                    </Badge>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("meetups")}
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Meetup Requests</span>
                    <Badge variant="secondary">{stats.meetupRequests}</Badge>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("feedback")}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs">New Feedback</span>
                    <Badge variant="secondary">{stats.feedbackCount}</Badge>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => setActiveTab("matches")}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-xs">Generate Matches</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />2 minutes ago
                    </span>
                    <span>New user registration: Priya Sharma</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      15 minutes ago
                    </span>
                    <span>Profile verified: Rahul Gupta</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />1 hour ago
                    </span>
                    <span>Match suggestion sent: Anjali & Vikram</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />3 hours ago
                    </span>
                    <span>Payment received: ₹15,000 from Kumar family</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feature Tabs */}
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="guna">
            <GunaMatchingTool />
          </TabsContent>

          <TabsContent value="verification">
            <ProfileVerification />
          </TabsContent>

          <TabsContent value="matches">
            <MatchSuggestionSystem />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentSection />
          </TabsContent>

          <TabsContent value="meetups">
            <FamilyMeetupRequests />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackSection />
          </TabsContent>
        </Tabs>

        {/* Activity Log - Always visible at bottom */}
        <div className="mt-8">
          <AdminActivityLog />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
