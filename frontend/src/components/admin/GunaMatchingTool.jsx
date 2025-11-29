import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Calculator,
  Users,
  Heart,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";
import { NAKSHATRA_LIST, RASHI_LIST, PAADAM_LIST } from "@/data/nakshatraList";

const GunaMatchingTool = () => {
  const [profile1, setProfile1] = useState({
    name: "",
    nakshatram: "",
    rashi: "",
    paadam: "",
  });

  const [profile2, setProfile2] = useState({
    name: "",
    nakshatram: "",
    rashi: "",
    paadam: "",
  });

  const [matchResult, setMatchResult] = useState(null);

  // Guna matching categories
  const gunaCategories = [
    { name: "Varna", points: 1, description: "Caste compatibility" },
    { name: "Vashya", points: 2, description: "Dominance compatibility" },
    { name: "Tara", points: 3, description: "Birth star compatibility" },
    { name: "Yoni", points: 4, description: "Sexual compatibility" },
    { name: "Graha Maitri", points: 5, description: "Mental compatibility" },
    { name: "Gana", points: 6, description: "Temperament compatibility" },
    { name: "Bhakoot", points: 7, description: "Love and affection" },
    { name: "Nadi", points: 8, description: "Health and genes" },
  ];

  // Real Guna calculation function using proper formula: matched gunas / 36
  const calculateGunaMatch = async () => {
    if (
      !profile1.name ||
      !profile1.nakshatram ||
      !profile2.name ||
      !profile2.nakshatram
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Import the Guna matching utility
      const { calculateGunaMatching } = await import("@/utils/gunaMatching");

      // Create profile objects for calculation
      const profileObj1 = {
        astrologyDetails: {
          nakshatram: profile1.nakshatram,
          rashi: profile1.rashi || "Mesha", // Default if not provided
        },
      };

      const profileObj2 = {
        astrologyDetails: {
          nakshatram: profile2.nakshatram,
          rashi: profile2.rashi || "Mesha", // Default if not provided
        },
      };

      const result = calculateGunaMatching(profileObj1, profileObj2);

      let color = "text-red-600";
      if (result.compatibilityPercentage >= 80) {
        color = "text-green-600";
      } else if (result.compatibilityPercentage >= 60) {
        color = "text-blue-600";
      } else if (result.compatibilityPercentage >= 40) {
        color = "text-yellow-600";
      }

      setMatchResult({
        results: result.results,
        totalScored: result.totalMatchedGunas,
        totalPossible: result.totalPossibleGunas, // Always 36
        percentage: result.compatibilityPercentage,
        compatibility: result.compatibilityLevel,
        color,
        recommendation: result.recommendation,
        gunaScore: result.gunaScore,
      });
    } catch (error) {
      console.error("Error calculating Guna match:", error);
      alert(
        "Error calculating compatibility. Please check the nakshatra names and try again."
      );
    }
  };

  const clearResults = () => {
    setProfile1({ name: "", nakshatram: "", rashi: "", paadam: "" });
    setProfile2({ name: "", nakshatram: "", rashi: "", paadam: "" });
    setMatchResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Guna Matching Tool
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Calculate astrological compatibility between two profiles using
            traditional Guna matching
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile 1 */}
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-600">
                  Profile 1 (Bride)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name1">Name *</Label>
                  <Input
                    id="name1"
                    value={profile1.name}
                    onChange={(e) =>
                      setProfile1({ ...profile1, name: e.target.value })
                    }
                    placeholder="Enter bride's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nakshatram1">Nakshatram *</Label>
                  <Select
                    value={profile1.nakshatram}
                    onValueChange={(value) =>
                      setProfile1({ ...profile1, nakshatram: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Nakshatra" />
                    </SelectTrigger>
                    <SelectContent>
                      {NAKSHATRA_LIST.map((nakshatra) => (
                        <SelectItem key={nakshatra} value={nakshatra}>
                          {nakshatra}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rashi1">Rashi</Label>
                  <Select
                    value={profile1.rashi}
                    onValueChange={(value) =>
                      setProfile1({ ...profile1, rashi: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rashi" />
                    </SelectTrigger>
                    <SelectContent>
                      {RASHI_LIST.map((rashi) => (
                        <SelectItem key={rashi} value={rashi}>
                          {rashi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paadam1">Paadam</Label>
                  <Select
                    value={profile1.paadam}
                    onValueChange={(value) =>
                      setProfile1({ ...profile1, paadam: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Paadam" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAADAM_LIST.map((paadam) => (
                        <SelectItem key={paadam} value={paadam}>
                          {paadam}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Profile 2 */}
            <Card className="border-pink-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-pink-600">
                  Profile 2 (Groom)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name2">Name *</Label>
                  <Input
                    id="name2"
                    value={profile2.name}
                    onChange={(e) =>
                      setProfile2({ ...profile2, name: e.target.value })
                    }
                    placeholder="Enter groom's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nakshatram2">Nakshatram *</Label>
                  <Select
                    value={profile2.nakshatram}
                    onValueChange={(value) =>
                      setProfile2({ ...profile2, nakshatram: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Nakshatra" />
                    </SelectTrigger>
                    <SelectContent>
                      {NAKSHATRA_LIST.map((nakshatra) => (
                        <SelectItem key={nakshatra} value={nakshatra}>
                          {nakshatra}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rashi2">Rashi</Label>
                  <Select
                    value={profile2.rashi}
                    onValueChange={(value) =>
                      setProfile2({ ...profile2, rashi: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rashi" />
                    </SelectTrigger>
                    <SelectContent>
                      {RASHI_LIST.map((rashi) => (
                        <SelectItem key={rashi} value={rashi}>
                          {rashi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paadam2">Paadam</Label>
                  <Select
                    value={profile2.paadam}
                    onValueChange={(value) =>
                      setProfile2({ ...profile2, paadam: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Paadam" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAADAM_LIST.map((paadam) => (
                        <SelectItem key={paadam} value={paadam}>
                          {paadam}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={calculateGunaMatch}
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Calculate Guna Match
            </Button>
            <Button variant="outline" onClick={clearResults}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {matchResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Guna Matching Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Overall Score */}
            <div className="text-center mb-6 p-6 bg-muted/30 rounded-lg">
              <div className="text-5xl font-bold mb-3 text-primary">
                {matchResult.totalScored} out of 36
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                Gunas Matched
              </div>
              <div className="text-3xl font-semibold mb-3 text-foreground">
                {matchResult.percentage}% Compatible
              </div>
              <Badge
                className={`text-lg px-4 py-2 ${matchResult.color} bg-transparent border-2`}
              >
                {matchResult.compatibility}
              </Badge>
              <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
                {matchResult.recommendation}
              </p>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detailed Analysis</h3>
              <div className="grid gap-3">
                {matchResult.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {result.compatible ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {result.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {result.scored}/{result.points}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">
                    Interpretation Guide
                  </h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• 80-100%: Excellent match - Highly recommended</li>
                    <li>
                      • 60-79%: Good match - Recommended with minor
                      considerations
                    </li>
                    <li>
                      • 40-59%: Average match - Requires careful evaluation
                    </li>
                    <li>• Below 40%: Poor match - Not recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guna Categories Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Guna Categories Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gunaCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {category.description}
                  </div>
                </div>
                <Badge variant="outline">
                  {category.points} {category.points === 1 ? "point" : "points"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GunaMatchingTool;
