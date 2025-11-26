import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

// SVG Icons
const Heart = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const ArrowLeft = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const CheckCircle2 = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Button Component
const Button = React.forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      lg: "h-11 rounded-md px-8",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// Card Component
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const MatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample match data (in real app, fetch from API based on id)
  const allMatches = [
    {
      id: "1",
      name: "Rahul Kumar",
      age: 28,
      height: "5'9\"",
      rashi: "Mesha",
      nakshatra: "Ashwini",
      paadam: "1",
      occupation: "Software Engineer",
      education: "B.Tech in Computer Science",
      location: "Bengaluru, Karnataka",
      gotra: "Kashyap",
      motherTongue: "Hindi",
      maritalStatus: "Never Married",
      familyType: "Joint Family",
      fatherOccupation: "Business",
      motherOccupation: "Homemaker",
      siblings: "1 Brother, 1 Sister",
      income: "₹12-15 Lakhs per annum",
      hobbies: "Reading, Traveling, Photography",
      about:
        "I am a software engineer working in a leading tech company. I value family traditions and am looking for a life partner who shares similar values. I enjoy exploring new places and learning new technologies.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: "2",
      name: "Amit Patel",
      age: 30,
      height: "5'11\"",
      rashi: "Vrishabha",
      nakshatra: "Krittika",
      paadam: "3",
      occupation: "Business Analyst",
      education: "MBA in Finance",
      location: "Mumbai, Maharashtra",
      gotra: "Bharadwaj",
      motherTongue: "Gujarati",
      maritalStatus: "Never Married",
      familyType: "Nuclear Family",
      fatherOccupation: "Retired Bank Manager",
      motherOccupation: "Teacher",
      siblings: "1 Sister",
      income: "₹15-18 Lakhs per annum",
      hobbies: "Cricket, Music, Cooking",
      about:
        "Working as a business analyst in a multinational company. I believe in maintaining a balance between professional and personal life. Looking for a understanding and supportive life partner.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    {
      id: "3",
      name: "Vikram Singh",
      age: 29,
      height: "5'10\"",
      rashi: "Mithuna",
      nakshatra: "Punarvasu",
      paadam: "2",
      occupation: "Doctor",
      education: "MBBS, MD",
      location: "Delhi",
      gotra: "Vatsa",
      motherTongue: "Hindi",
      maritalStatus: "Never Married",
      familyType: "Joint Family",
      fatherOccupation: "Doctor",
      motherOccupation: "Homemaker",
      siblings: "2 Brothers",
      income: "₹18-22 Lakhs per annum",
      hobbies: "Sports, Reading Medical Journals",
      about:
        "Practicing doctor with a passion for helping people. I come from a family of doctors and value education and compassion. Seeking a caring and educated life partner.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
    {
      id: "4",
      name: "Arjun Reddy",
      age: 27,
      height: "5'8\"",
      rashi: "Karka",
      nakshatra: "Pushya",
      paadam: "4",
      occupation: "Architect",
      education: "B.Arch",
      location: "Hyderabad, Telangana",
      gotra: "Kaundinya",
      motherTongue: "Telugu",
      maritalStatus: "Never Married",
      familyType: "Nuclear Family",
      fatherOccupation: "Civil Engineer",
      motherOccupation: "Architect",
      siblings: "1 Sister",
      income: "₹10-12 Lakhs per annum",
      hobbies: "Sketching, Traveling, Photography",
      about:
        "Creative architect with a passion for sustainable design. I enjoy exploring historical architecture and modern design concepts. Looking for a creative and understanding partner.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
    {
      id: "5",
      name: "Karthik Iyer",
      age: 31,
      height: "6'0\"",
      rashi: "Simha",
      nakshatra: "Magha",
      paadam: "1",
      occupation: "Financial Analyst",
      education: "CA, MBA",
      location: "Chennai, Tamil Nadu",
      gotra: "Kashyap",
      motherTongue: "Tamil",
      maritalStatus: "Never Married",
      familyType: "Joint Family",
      fatherOccupation: "Chartered Accountant",
      motherOccupation: "Homemaker",
      siblings: "1 Brother",
      income: "₹20-25 Lakhs per annum",
      hobbies: "Chess, Classical Music, Reading",
      about:
        "Financial analyst with strong analytical skills. I value traditional values and modern thinking. Seeking an educated and family-oriented life partner.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "6",
      name: "Rohan Sharma",
      age: 26,
      height: "5'7\"",
      rashi: "Kanya",
      nakshatra: "Hasta",
      paadam: "3",
      occupation: "Marketing Manager",
      education: "MBA in Marketing",
      location: "Pune, Maharashtra",
      gotra: "Bharadwaj",
      motherTongue: "Hindi",
      maritalStatus: "Never Married",
      familyType: "Nuclear Family",
      fatherOccupation: "Business Owner",
      motherOccupation: "Teacher",
      siblings: "No Siblings",
      income: "₹12-15 Lakhs per annum",
      hobbies: "Traveling, Photography, Blogging",
      about:
        "Marketing professional with a creative mindset. I enjoy meeting new people and exploring different cultures. Looking for an adventurous and supportive life partner.",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
    },
  ];

  const match = allMatches.find((m) => m.id === id);

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-premium-cream to-premium-peach flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Match Not Found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-premium-cream to-premium-peach">
      {/* Decorative mandala pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Matches
        </Button>

        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden border-border/50 shadow-[var(--shadow-card)]">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="w-full md:w-64 h-64 md:h-80 rounded-xl overflow-hidden flex-shrink-0 border-2 border-primary/20">
              <img
                src={match.image}
                alt={match.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    {match.name}
                  </h1>
                  <div className="w-6 h-6 bg-premium-green rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  {match.age} years • {match.height}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Occupation:</span>
                  <p className="font-medium text-foreground">
                    {match.occupation}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-medium text-foreground">
                    {match.location}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Education:</span>
                  <p className="font-medium text-foreground">
                    {match.education}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Income:</span>
                  <p className="font-medium text-foreground">{match.income}</p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Heart className="w-4 h-4 mr-2" />
                I'm Interested
              </Button>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="mb-6 p-6 border-border/50 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold mb-4 text-foreground">About</h2>
          <p className="text-muted-foreground leading-relaxed">{match.about}</p>
        </Card>

        {/* Astrological Details */}
        <Card className="mb-6 p-6 border-border/50 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Astrological Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Rashi:</span>
              <p className="font-medium text-foreground">{match.rashi}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Nakshatra:</span>
              <p className="font-medium text-foreground">{match.nakshatra}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Paadam:</span>
              <p className="font-medium text-foreground">{match.paadam}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Gotra:</span>
              <p className="font-medium text-foreground">{match.gotra}</p>
            </div>
          </div>
        </Card>

        {/* Personal Details */}
        <Card className="mb-6 p-6 border-border/50 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Mother Tongue:</span>
              <p className="font-medium text-foreground">
                {match.motherTongue}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Marital Status:</span>
              <p className="font-medium text-foreground">
                {match.maritalStatus}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Family Type:</span>
              <p className="font-medium text-foreground">{match.familyType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Hobbies:</span>
              <p className="font-medium text-foreground">{match.hobbies}</p>
            </div>
          </div>
        </Card>

        {/* Family Details */}
        <Card className="mb-6 p-6 border-border/50 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Family Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">
                Father's Occupation:
              </span>
              <p className="font-medium text-foreground">
                {match.fatherOccupation}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">
                Mother's Occupation:
              </span>
              <p className="font-medium text-foreground">
                {match.motherOccupation}
              </p>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Siblings:</span>
              <p className="font-medium text-foreground">{match.siblings}</p>
            </div>
          </div>
        </Card>

        {/* Compatibility Section */}
        <Card className="mb-6 p-6 border-primary/30 bg-gradient-to-br from-card to-premium-cream shadow-[var(--shadow-premium)]">
          <h2 className="text-xl font-semibold mb-6 text-center text-foreground">
            Compatibility Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* User Profile */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-premium-peach p-1 mb-3">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                    alt="Your Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">Priya Sharma</h3>
              <p className="text-sm text-muted-foreground">Your Profile</p>
              <div className="mt-3 space-y-1 text-xs">
                <p className="text-muted-foreground">
                  <span className="font-medium">Age:</span> 26
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Rashi:</span> Vrishabha
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Nakshatra:</span> Bharani
                </p>
              </div>
            </div>

            {/* Similarities/Compatibility Score */}
            <div className="flex flex-col items-center justify-center text-center py-6 md:py-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <div className="w-28 h-28 rounded-full bg-card flex flex-col items-center justify-center">
                    <Heart className="w-8 h-8 text-primary mb-2 fill-primary" />
                    <p className="text-3xl font-bold text-primary">
                      8
                      <span className="text-xl text-muted-foreground">/12</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Similarities
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">Same Gotra</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">
                    Compatible Rashi
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">
                    Similar Education
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">Same Location</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border">
                  67% Compatibility
                </p>
              </div>
            </div>

            {/* Match Profile */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-premium-peach p-1 mb-3">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">{match.name}</h3>
              <p className="text-sm text-muted-foreground">Match Profile</p>
              <div className="mt-3 space-y-1 text-xs">
                <p className="text-muted-foreground">
                  <span className="font-medium">Age:</span> {match.age}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Rashi:</span> {match.rashi}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Nakshatra:</span>{" "}
                  {match.nakshatra}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Heart className="w-4 h-4 mr-2" />
            Send Interest
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
