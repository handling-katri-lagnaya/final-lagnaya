import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

const ProfileVerification = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState("");

  // Mock pending verification data
  const pendingProfiles = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      age: 26,
      location: "Mumbai, Maharashtra",
      education: "MBA Finance",
      occupation: "Financial Analyst",
      submittedDate: "2024-01-20",
      profilePhoto: "/api/placeholder/150/150",
      documents: {
        idProof: "Aadhaar Card",
        educationCert: "MBA Certificate",
        employmentProof: "Salary Slip",
      },
      familyDetails: {
        fatherName: "Rajesh Sharma",
        motherName: "Sunita Sharma",
        gotra: "Bharadwaj",
      },
      astrologyDetails: {
        janmanamam: "Priyanka",
        rashi: "Kanya",
        nakshatram: "Hasta",
        paadam: "2",
      },
      flags: [
        "Photo quality needs improvement",
        "Employment verification pending",
      ],
    },
    {
      id: 2,
      name: "Rahul Gupta",
      email: "rahul.gupta@email.com",
      phone: "+91 87654 32109",
      age: 29,
      location: "Delhi, NCR",
      education: "B.Tech Computer Science",
      occupation: "Software Engineer",
      submittedDate: "2024-01-19",
      profilePhoto: "/api/placeholder/150/150",
      documents: {
        idProof: "Passport",
        educationCert: "B.Tech Degree",
        employmentProof: "Employment Letter",
      },
      familyDetails: {
        fatherName: "Suresh Gupta",
        motherName: "Meera Gupta",
        gotra: "Kashyap",
      },
      astrologyDetails: {
        janmanamam: "Rahul",
        rashi: "Simha",
        nakshatram: "Magha",
        paadam: "1",
      },
      flags: [],
    },
  ];

  const handleVerify = (profileId, status, notes) => {
    console.log(`Profile ${profileId} ${status} with notes: ${notes}`);
    // In real app, this would make an API call
    alert(`Profile ${status} successfully!`);
    setSelectedProfile(null);
    setVerificationNotes("");
  };

  const ProfileCard = ({ profile, onClick }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(profile)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{profile.name}</h3>
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {profile.submittedDate}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                {profile.age} years, {profile.occupation}
              </div>
            </div>
            {profile.flags.length > 0 && (
              <div className="mt-2">
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {profile.flags.length} issue
                  {profile.flags.length > 1 ? "s" : ""}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Profile Verification
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Review and verify user profiles before activation
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Profiles List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Pending Verifications ({pendingProfiles.length})
          </h3>
          {pendingProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onClick={setSelectedProfile}
            />
          ))}
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          {selectedProfile ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Profile Review: {selectedProfile.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="font-semibold mb-3">Basic Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <div className="font-medium">
                          {selectedProfile.name}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Age:</span>
                        <div className="font-medium">
                          {selectedProfile.age} years
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <div className="font-medium">
                          {selectedProfile.email}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <div className="font-medium">
                          {selectedProfile.phone}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <div className="font-medium">
                          {selectedProfile.location}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Education:
                        </span>
                        <div className="font-medium">
                          {selectedProfile.education}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Family Details */}
                  <div>
                    <h4 className="font-semibold mb-3">Family Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Father's Name:
                        </span>
                        <div className="font-medium">
                          {selectedProfile.familyDetails.fatherName}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Mother's Name:
                        </span>
                        <div className="font-medium">
                          {selectedProfile.familyDetails.motherName}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gotra:</span>
                        <div className="font-medium">
                          {selectedProfile.familyDetails.gotra}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Astrology Details */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Astrology Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Janma Namam:
                        </span>
                        <div className="font-medium">
                          {selectedProfile.astrologyDetails.janmanamam}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rashi:</span>
                        <div className="font-medium">
                          {selectedProfile.astrologyDetails.rashi}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Nakshatram:
                        </span>
                        <div className="font-medium">
                          {selectedProfile.astrologyDetails.nakshatram}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Paadam:</span>
                        <div className="font-medium">
                          {selectedProfile.astrologyDetails.paadam}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="font-semibold mb-3">Documents Submitted</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedProfile.documents).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <span className="text-sm capitalize">
                              {key.replace(/([A-Z])/g, " $1")}: {value}
                            </span>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Flags */}
                  {selectedProfile.flags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Issues Found
                      </h4>
                      <div className="space-y-2">
                        {selectedProfile.flags.map((flag, index) => (
                          <div
                            key={index}
                            className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800"
                          >
                            {flag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verification Notes */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Verification Notes
                    </h4>
                    <Textarea
                      placeholder="Add notes about the verification process..."
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        handleVerify(
                          selectedProfile.id,
                          "approved",
                          verificationNotes
                        )
                      }
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Profile
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() =>
                        handleVerify(
                          selectedProfile.id,
                          "rejected",
                          verificationNotes
                        )
                      }
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Select a Profile to Review
                </h3>
                <p className="text-muted-foreground">
                  Click on a profile from the left panel to start the
                  verification process
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileVerification;
