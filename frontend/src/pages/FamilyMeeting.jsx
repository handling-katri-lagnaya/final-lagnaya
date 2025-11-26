import { Calendar, Clock, MapPin, User, Phone, Mail, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FamilyMeeting = () => {
  // Sample data - would come from backend in real implementation
  const meetingData = {
    user: {
      name: "Ramesh Kumar",
      photo: "/placeholder.svg",
      age: 28,
      rashi: "Mesha",
      nakshatra: "Ashwini",
      paadam: "1",
      gotra: "Kashyapa",
    },
    match: {
      name: "Priya Sharma",
      photo: "/placeholder.svg",
      age: 26,
      rashi: "Simha",
      nakshatra: "Magha",
      paadam: "2",
      gotra: "Bharadwaja",
    },
    meeting: {
      date: "15/12/2024",
      time: "10:30 AM",
      location: "Family Home, Bangalore",
      type: "Home Visit",
      address: "123, MG Road, Koramangala, Bangalore - 560034",
    },
    coordinator: {
      name: "Y. Srinivasa Rao",
      role: "Senior Matchmaker",
      phone: "+91 98765 43210",
      email: "srinivasa@khatrilagnaya.com",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Mandala Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Family Meeting Confirmation
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Meeting arranged by KhatriLagnaya Team
          </p>
        </div>

        {/* Profile Comparison Section */}
        <Card className="mb-8 overflow-hidden border-border/50 bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16">
              {/* User Profile */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-primary/20 shadow-lg">
                  <User className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold text-foreground">
                  {meetingData.user.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {meetingData.user.age} years
                </p>
              </div>

              {/* Connector */}
              <div className="flex items-center rotate-90 sm:rotate-0">
                <div className="w-12 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              </div>

              {/* Match Profile */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-primary/20 shadow-lg">
                  <User className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold text-foreground">
                  {meetingData.match.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {meetingData.match.age} years
                </p>
              </div>
            </div>

            {/* Basic Info Row */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-background/60 rounded-full">
                  <span className="font-medium text-foreground">
                    {meetingData.user.rashi}
                  </span>
                  <span className="text-muted-foreground">-</span>
                  <span className="font-medium text-foreground">
                    {meetingData.match.rashi}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-background/60 rounded-full">
                  <span className="font-medium text-foreground">
                    {meetingData.user.nakshatra}
                  </span>
                  <span className="text-muted-foreground">-</span>
                  <span className="font-medium text-foreground">
                    {meetingData.match.nakshatra}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-background/60 rounded-full">
                  <span className="font-medium text-foreground">
                    Paadam: {meetingData.user.paadam},{" "}
                    {meetingData.match.paadam}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-background/60 rounded-full">
                  <span className="font-medium text-foreground">
                    {meetingData.user.gotra}
                  </span>
                  <span className="text-muted-foreground">-</span>
                  <span className="font-medium text-foreground">
                    {meetingData.match.gotra}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Details Card */}
        <Card className="mb-8 border-border/50 bg-card">
          <CardHeader className="border-b border-border/30 bg-gradient-to-r from-primary/5 to-accent/10 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              Meeting Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Date */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/30 border border-border/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Meeting Date
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {meetingData.meeting.date}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/30 border border-border/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Meeting Time
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {meetingData.meeting.time}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/30 border border-border/20 md:col-span-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Meeting Location
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    {meetingData.meeting.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {meetingData.meeting.address}
                  </p>
                </div>
              </div>

              {/* Meeting Type */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-accent/20 to-green-50 border border-primary/20 md:col-span-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Meeting Type
                  </p>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-base px-4 py-1">
                    {meetingData.meeting.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coordinator Details Box */}
        <Card className="mb-8 border-border/50 bg-card">
          <CardHeader className="border-b border-border/30 bg-gradient-to-r from-primary/5 to-accent/10 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Your Coordinator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-primary/20">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                  {meetingData.coordinator.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {meetingData.coordinator.role}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <a
                      href={`tel:${meetingData.coordinator.phone}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {meetingData.coordinator.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <a
                      href={`mailto:${meetingData.coordinator.email}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {meetingData.coordinator.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-accent/30 rounded-lg border border-border/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Your
                coordinator will be available to assist you before, during, and
                after the meeting. Feel free to reach out for any questions or
                concerns.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            className="px-6 sm:px-8 py-6 text-base w-full sm:w-auto"
          >
            Confirm Attendance
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-6 sm:px-8 py-6 text-base w-full sm:w-auto"
          >
            Request Reschedule
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Traditional Matchmaking. Modern Presentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyMeeting;
