import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Calculator,
  Users,
  Heart,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

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

  // Mock calculation function
  const calculateGunaMatch = () => {
    if (
      !profile1.name ||
      !profile1.nakshatram ||
      !profile2.name ||
      !profile2.nakshatram
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Mock calculation - in real app, this would use actual astrological calculations
    const mockResults = gunaCategories.map((category) => ({
      ...category,
      scored: Math.floor(Math.random() * (category.points + 1)),
      compatible: Math.random() > 0.3,
    }));

    const totalScored = mockResults.reduce(
      (sum, result) => sum + result.scored,
      0
    );
    const totalPossible = gunaCategories.reduce(
      (sum, category) => sum + category.points,
      0
    );
    const percentage = Math.round((totalScored / totalPossible) * 100);

    let compatibility = "Poor";
    let color = "text-red-600";
    if (percentage >= 80) {
      compatibility = "Excellent";
      color = "text-green-600";
    } else if (percentage >= 60) {
      compatibility = "Good";
      color = "text-blue-600";
    } else if (percentage >= 40) {
      compatibility = "Average";
      color = "text-yellow-600";
    }

    setMatchResult({
      results: mockResults,
      totalScored,
      totalPossible,
      percentage,
      compatibility,
      color,
      recommendation:
        percentage >= 60
          ? "Recommended for marriage"
          : "Requires careful consideration",
    });
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
                  <Input
                    id="nakshatram1"
                    value={profile1.nakshatram}
                    onChange={(e) =>
                      setProfile1({ ...profile1, nakshatram: e.target.value })
                    }
                    placeholder="e.g., Ashwini, Bharani"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rashi1">Rashi</Label>
                  <Input
                    id="rashi1"
                    value={profile1.rashi}
                    onChange={(e) =>
                      setProfile1({ ...profile1, rashi: e.target.value })
                    }
                    placeholder="e.g., Mesha, Vrishabha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paadam1">Paadam</Label>
                  <Input
                    id="paadam1"
                    value={profile1.paadam}
                    onChange={(e) =>
                      setProfile1({ ...profile1, paadam: e.target.value })
                    }
                    placeholder="1, 2, 3, or 4"
                  />
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
                  <Input
                    id="nakshatram2"
                    value={profile2.nakshatram}
                    onChange={(e) =>
                      setProfile2({ ...profile2, nakshatram: e.target.value })
                    }
                    placeholder="e.g., Ashwini, Bharani"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rashi2">Rashi</Label>
                  <Input
                    id="rashi2"
                    value={profile2.rashi}
                    onChange={(e) =>
                      setProfile2({ ...profile2, rashi: e.target.value })
                    }
                    placeholder="e.g., Mesha, Vrishabha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paadam2">Paadam</Label>
                  <Input
                    id="paadam2"
                    value={profile2.paadam}
                    onChange={(e) =>
                      setProfile2({ ...profile2, paadam: e.target.value })
                    }
                    placeholder="1, 2, 3, or 4"
                  />
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
              <div className="text-4xl font-bold mb-2">
                {matchResult.totalScored}/{matchResult.totalPossible}
              </div>
              <div className="text-2xl font-semibold mb-2">
                {matchResult.percentage}% Match
              </div>
              <Badge className={`text-lg px-4 py-2 ${matchResult.color}`}>
                {matchResult.compatibility}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
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
