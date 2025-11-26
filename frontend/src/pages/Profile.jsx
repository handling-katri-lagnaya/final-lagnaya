import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Edit,
  Crown,
  Calendar,
} from "lucide-react";
import React from "react";

const Profile = () => {
  const [subscription, setSubscription] = React.useState(null);

  React.useEffect(() => {
    // Get subscription from localStorage
    const savedSubscription = localStorage.getItem("userSubscription");
    if (savedSubscription) {
      setSubscription(JSON.parse(savedSubscription));
    }
  }, []);

  return (
    <div className="min-h-screen py-6 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              View and manage your profile information
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/profile/edit">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="border-border/50 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg border-4 border-background">
                <User className="h-16 w-16 text-primary-foreground" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">
                  Your Name
                </h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  <Badge className="bg-accent text-accent-foreground">
                    Active Profile
                  </Badge>
                  <Badge variant="outline">Verified</Badge>
                </div>
                <p className="text-muted-foreground">
                  Member since January 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-foreground">Your Full Name</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">
                    your.email@example.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">+91 XXXXX XXXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">City, State</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="font-medium text-foreground">B.Tech, MBA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Profession</p>
                  <p className="font-medium text-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">
                Family Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Father's Name</p>
                <p className="font-medium text-foreground">Father Name</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mother's Name</p>
                <p className="font-medium text-foreground">Mother Name</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gotra</p>
                <p className="font-medium text-foreground">Your Gotra</p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          {subscription && subscription.status === "active" ? (
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-playfair text-xl flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Active Subscription
                  </CardTitle>
                  <Badge className="bg-accent text-accent-foreground">
                    Premium
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-medium text-foreground">
                    {subscription.planName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activated On</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(subscription.activatedDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valid Until</p>
                  <p className="font-medium text-foreground">
                    {new Date(subscription.expiryDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/pricing">Upgrade Plan</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-playfair text-xl">
                  No Active Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upgrade to premium to unlock more matches and features
                </p>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link to="/pricing">
                    <Crown className="h-4 w-4 mr-2" />
                    View Plans
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Astrology Details */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">
                Astrology Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Rashi</p>
                <p className="font-medium text-foreground">Your Rashi</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nakshatram</p>
                <p className="font-medium text-foreground">Your Nakshatram</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paadam</p>
                <p className="font-medium text-foreground">1st Pada</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
