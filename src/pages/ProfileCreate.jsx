import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Gift, Moon, Users } from "lucide-react";

const ProfileCreate = () => {
  return (
    <div className="min-h-screen py-6 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-6 sm:mb-8">
          <Badge className="mb-3 sm:mb-4 bg-accent text-accent-foreground text-xs sm:text-sm">
            <Gift className="h-3 w-3 mr-1" />
            Get 2 Free Match Suggestions
          </Badge>
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Create Your Profile
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Share your details and let us find your perfect match
          </p>
        </div>

        <form className="space-y-4 sm:space-y-6">
          <Card className="border-border/50">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="font-playfair text-lg sm:text-xl">
                Personal Details
              </CardTitle>
              <CardDescription className="text-sm">
                Basic information about yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter last name" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthTime">Birth Day & Time *</Label>
                  <Input id="birthTime" type="time" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select height" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="4-10">4'10"</SelectItem>
                    <SelectItem value="4-11">4'11"</SelectItem>
                    <SelectItem value="5-0">5'0"</SelectItem>
                    <SelectItem value="5-1">5'1"</SelectItem>
                    <SelectItem value="5-2">5'2"</SelectItem>
                    <SelectItem value="5-3">5'3"</SelectItem>
                    <SelectItem value="5-4">5'4"</SelectItem>
                    <SelectItem value="5-5">5'5"</SelectItem>
                    <SelectItem value="5-6">5'6"</SelectItem>
                    <SelectItem value="5-7">5'7"</SelectItem>
                    <SelectItem value="5-8">5'8"</SelectItem>
                    <SelectItem value="5-9">5'9"</SelectItem>
                    <SelectItem value="5-10">5'10"</SelectItem>
                    <SelectItem value="5-11">5'11"</SelectItem>
                    <SelectItem value="6-0">6'0"</SelectItem>
                    <SelectItem value="6-1">6'1"</SelectItem>
                    <SelectItem value="6-2">6'2"</SelectItem>
                    <SelectItem value="6-3">6'3"</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Residential Address *</Label>
                <Input id="address" placeholder="City, State" required />
                <p className="text-xs text-muted-foreground">
                  🔒 Visible only to our team, not to other profiles
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  🔒 For internal use only, kept private
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="font-playfair text-xl">
                  Family Information
                </CardTitle>
              </div>
              <CardDescription>Tell us about your family</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  placeholder="Enter father's name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input
                  id="motherName"
                  placeholder="Enter mother's name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gotra">Gotra *</Label>
                <Input id="gotra" placeholder="Enter your Gotra" required />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-primary" />
                <CardTitle className="font-playfair text-xl">
                  Astrology Details
                </CardTitle>
              </div>
              <CardDescription>
                Used for traditional compatibility matching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="janmanamam">Janma Namam (Birth Name) *</Label>
                <Input
                  id="janmanamam"
                  placeholder="Enter birth name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rashi">Rashi (Zodiac Sign) *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rashi" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      <SelectItem value="mesha">Mesha (Aries)</SelectItem>
                      <SelectItem value="vrishabha">
                        Vrishabha (Taurus)
                      </SelectItem>
                      <SelectItem value="mithuna">Mithuna (Gemini)</SelectItem>
                      <SelectItem value="karka">Karka (Cancer)</SelectItem>
                      <SelectItem value="simha">Simha (Leo)</SelectItem>
                      <SelectItem value="kanya">Kanya (Virgo)</SelectItem>
                      <SelectItem value="tula">Tula (Libra)</SelectItem>
                      <SelectItem value="vrishchika">
                        Vrishchika (Scorpio)
                      </SelectItem>
                      <SelectItem value="dhanu">Dhanu (Sagittarius)</SelectItem>
                      <SelectItem value="makara">Makara (Capricorn)</SelectItem>
                      <SelectItem value="kumbha">Kumbha (Aquarius)</SelectItem>
                      <SelectItem value="meena">Meena (Pisces)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nakshatram">Nakshatram (Star) *</Label>
                  <Input
                    id="nakshatram"
                    placeholder="Enter Nakshatram"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paadam">Paadam (Pada/Quarter) *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Paadam" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="1">1st Pada</SelectItem>
                    <SelectItem value="2">2nd Pada</SelectItem>
                    <SelectItem value="3">3rd Pada</SelectItem>
                    <SelectItem value="4">4th Pada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">
                Education & Employment
              </CardTitle>
              <CardDescription>
                Your educational and professional background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education *</Label>
                <Input
                  id="education"
                  placeholder="e.g., B.Tech, MBA, M.Com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment">Employment *</Label>
                <Input
                  id="employment"
                  placeholder="e.g., Software Engineer, Business Owner"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-muted/20">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">
                Profile Verification & Privacy
              </CardTitle>
              <CardDescription>
                Your consent and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox id="consent" required />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="consent"
                    className="text-sm font-medium cursor-pointer"
                  >
                    I allow Kathri Lagnaya team to review and validate my
                    profile *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Your profile will be manually verified by our team before
                    activation
                  </p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-border/50">
                <p className="text-sm text-foreground font-medium mb-2">
                  🔒 Privacy Assurance
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>
                    Contact number and address will not be visible to matched
                    profiles
                  </li>
                  <li>All meetings are manually coordinated by our team</li>
                  <li>
                    Your personal information is kept secure and confidential
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 w-full"
            >
              Submit Profile
            </Button>
            <Button size="lg" variant="outline" className="flex-1 w-full">
              Save as Draft
            </Button>
          </div>

          <Card className="bg-muted/30 border-border/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Your information will be manually reviewed by our team before
                profile activation. This typically takes 24-48 hours.
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreate;
