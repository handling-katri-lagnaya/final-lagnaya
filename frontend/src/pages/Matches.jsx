import React from "react";
import { useNavigate } from "react-router-dom";

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
    };

    const sizes = {
      default: "h-10 px-4 py-2",
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

const Matches = () => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = React.useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavourite = (matchId) => {
    setFavourites((prev) => {
      const newFavourites = prev.includes(matchId)
        ? prev.filter((id) => id !== matchId)
        : [...prev, matchId];
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
      return newFavourites;
    });
  };

  const matches = [
    {
      id: 1,
      name: "Rahul Kumar",
      age: 28,
      height: "5'9\"",
      rashi: "Mesha",
      nakshatra: "Ashwini",
      paadam: "1",
      occupation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: 2,
      name: "Amit Patel",
      age: 30,
      height: "5'11\"",
      rashi: "Vrishabha",
      nakshatra: "Krittika",
      paadam: "3",
      occupation: "Business Analyst",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    {
      id: 3,
      name: "Vikram Singh",
      age: 29,
      height: "5'10\"",
      rashi: "Mithuna",
      nakshatra: "Punarvasu",
      paadam: "2",
      occupation: "Doctor",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
    {
      id: 4,
      name: "Arjun Reddy",
      age: 27,
      height: "5'8\"",
      rashi: "Karka",
      nakshatra: "Pushya",
      paadam: "4",
      occupation: "Architect",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
    {
      id: 5,
      name: "Karthik Iyer",
      age: 31,
      height: "6'0\"",
      rashi: "Simha",
      nakshatra: "Magha",
      paadam: "1",
      occupation: "Financial Analyst",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: 6,
      name: "Rohan Sharma",
      age: 26,
      height: "5'7\"",
      rashi: "Kanya",
      nakshatra: "Hasta",
      paadam: "3",
      occupation: "Marketing Manager",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-premium-cream to-premium-peach">
      {/* Decorative mandala pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Matches
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Carefully curated matches based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {matches.map((match) => (
            <Card
              key={match.id}
              className="overflow-hidden border-border/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-shadow duration-300 relative"
            >
              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(match.id);
                }}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all",
                    favourites.includes(match.id)
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground hover:text-red-500"
                  )}
                />
              </button>

              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 mx-auto sm:mx-0 border-2 border-primary/20">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-lg text-foreground">
                    {match.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Age:</span>
                      <p className="font-medium">{match.age}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Height:</span>
                      <p className="font-medium">{match.height}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rashi:</span>
                      <p className="font-medium">{match.rashi}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nakshatra:</span>
                      <p className="font-medium">{match.nakshatra}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Paadam:</span>
                      <p className="font-medium">{match.paadam}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Occupation:</span>
                      <p className="font-medium">{match.occupation}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => navigate(`/match/${match.id}`)}
                    >
                      Full Details
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      I'm Interested
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-card border-border/50 shadow-[var(--shadow-card)]">
          <div className="pt-6 p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Want to see more matches? Upgrade to our Standard Package
              </p>
              <Button>
                <a href="/pricing">View Pricing Plans</a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Matches;
