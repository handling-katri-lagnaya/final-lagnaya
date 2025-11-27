import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart,
  Users,
  Search,
  Send,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Filter,
  RefreshCw,
} from "lucide-react";

const MatchSuggestionSystem = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [matchCriteria, setMatchCriteria] = useState({
    ageRange: { min: 25, max: 35 },
    location: "",
    education: "",
    occupation: "",
    gotra: "",
  });
  const [generatedMatches, setGeneratedMatches] = useState([]);

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 26,
      location: "Mumbai, Maharashtra",
      education: "MBA Finance",
      occupation: "Financial Analyst",
      gotra: "Bharadwaj",
      rashi: "Kanya",
      nakshatram: "Hasta",
      preferences: {
        ageRange: { min: 28, max: 35 },
        location: "Mumbai, Delhi, Bangalore",
        education: "Graduate, Post Graduate",
        occupation: "Professional",
      },
      matchCount: 12,
      lastMatchSent: "2024-01-15",
    },
    {
      id: 2,
      name: "Anjali Agarwal",
      age: 24,
      location: "Delhi, NCR",
      education: "B.Tech Computer Science",
      occupation: "Software Engineer",
      gotra: "Vasishtha",
      rashi: "Meena",
      nakshatram: "Revati",
      preferences: {
        ageRange: { min: 26, max: 32 },
        location: "Delhi, Gurgaon, Noida",
        education: "B.Tech, M.Tech, MBA",
        occupation: "Engineer, Manager",
      },
      matchCount: 8,
      lastMatchSent: "2024-01-18",
    },
  ];

  // Mock potential matches
  const potentialMatches = [
    {
      id: 101,
      name: "Rahul Gupta",
      age: 29,
      location: "Mumbai, Maharashtra",
      education: "MBA Marketing",
      occupation: "Marketing Manager",
      gotra: "Kashyap",
      rashi: "Simha",
      nakshatram: "Magha",
      compatibility: 85,
      gunaScore: "28/36",
      reasons: [
        "Age compatible",
        "Same city",
        "Similar education level",
        "Good guna match",
      ],
    },
    {
      id: 102,
      name: "Vikram Singh",
      age: 31,
      location: "Mumbai, Maharashtra",
      education: "B.Tech + MBA",
      occupation: "Senior Consultant",
      gotra: "Gautam",
      rashi: "Vrishchika",
      nakshatram: "Anuradha",
      compatibility: 78,
      gunaScore: "26/36",
      reasons: [
        "Professional background",
        "Same city",
        "Age appropriate",
        "Family values match",
      ],
    },
    {
      id: 103,
      name: "Arjun Mehta",
      age: 27,
      location: "Delhi, NCR",
      education: "CA",
      occupation: "Chartered Accountant",
      gotra: "Bharadwaj",
      rashi: "Kumbha",
      nakshatram: "Shatabhisha",
      compatibility: 72,
      gunaScore: "24/36",
      reasons: [
        "Professional qualification",
        "Good family background",
        "Similar interests",
      ],
    },
  ];

  const generateMatches = (user) => {
    // Mock match generation logic
    const matches = potentialMatches.filter((match) => {
      const ageMatch =
        match.age >= user.preferences.ageRange.min &&
        match.age <= user.preferences.ageRange.max;
      const locationMatch = user.preferences.location.includes(
        match.location.split(",")[0]
      );
      return ageMatch || locationMatch;
    });

    setGeneratedMatches(matches);
  };

  const sendMatchSuggestion = (userId, matchId) => {
    console.log(`Sending match suggestion: User ${userId} -> Match ${matchId}`);
    alert("Match suggestion sent successfully!");
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-blue-600 bg-blue-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Match Suggestion System
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Generate and send personalized match suggestions to users
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.id === user.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {user.age} years
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {user.occupation}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.matchCount} matches
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Match Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Generate Matches</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <div className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Selected User</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <strong>{selectedUser.name}</strong>
                    </div>
                    <div>Age: {selectedUser.age}</div>
                    <div>Location: {selectedUser.location}</div>
                    <div>Gotra: {selectedUser.gotra}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">User Preferences</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <Label>Age Range</Label>
                      <div className="text-muted-foreground">
                        {selectedUser.preferences.ageRange.min} -{" "}
                        {selectedUser.preferences.ageRange.max} years
                      </div>
                    </div>
                    <div>
                      <Label>Preferred Locations</Label>
                      <div className="text-muted-foreground">
                        {selectedUser.preferences.location}
                      </div>
                    </div>
                    <div>
                      <Label>Education Preference</Label>
                      <div className="text-muted-foreground">
                        {selectedUser.preferences.education}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => generateMatches(selectedUser)}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Matches
                </Button>

                {generatedMatches.length > 0 && (
                  <div className="text-center text-sm text-muted-foreground">
                    Found {generatedMatches.length} potential matches
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a user to generate matches
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Potential Matches</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedMatches.length > 0 ? (
              <div className="space-y-4">
                {generatedMatches.map((match) => (
                  <div key={match.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{match.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {match.age} years • {match.location}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {match.occupation}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`text-xs ${getCompatibilityColor(
                            match.compatibility
                          )}`}
                        >
                          {match.compatibility}% Match
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Guna: {match.gunaScore}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <strong>Why this match:</strong>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {match.reasons.map((reason, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full mt-3"
                      onClick={() =>
                        sendMatchSuggestion(selectedUser.id, match.id)
                      }
                    >
                      <Send className="h-3 w-3 mr-2" />
                      Send Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Generate matches to see potential suggestions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Match Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Match Generation Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">
                Total Matches Sent
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-muted-foreground">
                Positive Responses
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-muted-foreground">
                Meetings Arranged
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-muted-foreground">
                Successful Matches
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchSuggestionSystem;
