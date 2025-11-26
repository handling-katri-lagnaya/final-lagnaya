import React from "react";
import { useNavigate } from "react-router-dom";

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

// SVG Icons (replacing lucide-react)
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

const Lock = ({ className }) => (
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
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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

const Bell = ({ className }) => (
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
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const Crown = ({ className }) => (
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
      d="M5 3l7 7 7-7M5 21h14M5 21l7-7 7 7"
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
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
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

// Badge Component
const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

// Progress Component
const Progress = React.forwardRef(({ className, value = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </div>
));
Progress.displayName = "Progress";

// Main UserDashboard Component
const UserDashboard = () => {
  const navigate = useNavigate();
  const userName = "Priya Sharma";
  const profileCompletion = 85;
  const freeMatchesLeft = 2;
  const unlockedMatches = 3;
  const blurredMatches = 12;

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

  // Sample match data
  const freeMatches = [
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
  ];

  const timelineSteps = [
    { label: "Profile Submitted", status: "completed" },
    { label: "Verification Completed", status: "completed" },
    { label: "Free Matches Given", status: "completed" },
    { label: "Interest Sent/Received", status: "active" },
    { label: "Family Meeting Arranged", status: "pending" },
    { label: "Success Fee Upon Marriage", status: "pending" },
  ];

  const notifications = [
    { text: "Your match request is under review", time: "2 hours ago" },
    { text: "New profile unlocked", time: "1 day ago" },
    { text: "Profile verification completed", time: "2 days ago" },
  ];

  const packages = [
    {
      name: "Free",
      price: "₹0",
      matches: "2 matches",
      features: ["Basic profile view", "Limited contact info"],
    },
    {
      name: "Basic",
      price: "₹2,500",
      matches: "5 profiles",
      features: ["Full profile access", "Contact details", "Chat feature"],
      popular: false,
    },
    {
      name: "Premium",
      price: "₹4,500",
      matches: "12 profiles",
      features: [
        "Priority matching",
        "Advanced filters",
        "Dedicated support",
        "Profile boost",
      ],
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-premium-cream to-premium-peach">
      {/* Decorative mandala pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-premium-peach p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-premium-green rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Welcome, {userName}
              </h1>
              <p className="text-muted-foreground">
                Manage your profile, matches, and requests
              </p>
            </div>
          </div>
        </header>

        {/* Profile Overview Card */}
        <Card className="mb-6 p-6 shadow-[var(--shadow-card)] border-border/50 bg-card">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">
                  Profile Overview
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Age:</span>
                    <p className="font-medium">26</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gotra:</span>
                    <p className="font-medium">Kashyap</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Nakshatra:</span>
                    <p className="font-medium">Bharani</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Paadam:</span>
                    <p className="font-medium">2</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Profile Completion
                  </span>
                  <span className="font-medium text-foreground">
                    {profileCompletion}%
                  </span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>

              <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                ℹ️ Your contact details remain private and secure.
              </p>
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-soft)]">
              View / Edit Profile
            </Button>
          </div>
        </Card>

        {/* Match Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-card to-premium-cream shadow-[var(--shadow-card)]">
            <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">
              {freeMatchesLeft}
            </p>
            <p className="text-sm text-muted-foreground">Free Matches Left</p>
          </Card>

          <Card className="p-4 text-center border-premium-green/20 bg-gradient-to-br from-card to-premium-green shadow-[var(--shadow-card)]">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-foreground">
              {unlockedMatches}
            </p>
            <p className="text-sm text-muted-foreground">Unlocked Matches</p>
          </Card>

          <Card className="p-4 text-center border-border/50 bg-gradient-to-br from-card to-secondary shadow-[var(--shadow-card)]">
            <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold text-foreground">
              {blurredMatches}
            </p>
            <p className="text-sm text-muted-foreground">Blurred Matches</p>
          </Card>

          <Card className="p-4 flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 to-premium-peach border-primary/30 shadow-[var(--shadow-premium)]">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
              Unlock 5 Matches
              <br />
              <span className="text-lg">₹2,500</span>
            </Button>
          </Card>
        </div>

        {/* Your Matches Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Your Matches
          </h2>

          {/* Free Matches */}
          <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Free Matches (Fully Visible)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {freeMatches.map((match) => (
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
                        <span className="text-muted-foreground">
                          Nakshatra:
                        </span>
                        <p className="font-medium">{match.nakshatra}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Paadam:</span>
                        <p className="font-medium">{match.paadam}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">
                          Occupation:
                        </span>
                        <p className="font-medium">{match.occupation}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <Button
                        size="sm"
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

          {/* Blurred Matches */}
          <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Blurred Matches (Locked)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-border/50 shadow-[var(--shadow-card)] hover:border-primary/30 transition-colors"
              >
                <div className="relative">
                  <div className="aspect-[3/4] bg-muted flex items-center justify-center backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary opacity-90 blur-sm" />
                    <Lock className="w-12 h-12 text-muted-foreground relative z-10" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Unlock Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Match Status Timeline */}
        <Card className="mb-6 p-6 shadow-[var(--shadow-card)] border-border/50 bg-card">
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Match Status Timeline
          </h2>
          <div className="relative">
            <div className="absolute top-5 left-5 h-[calc(100%-2.5rem)] w-0.5 bg-border" />
            <div className="space-y-6">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 relative">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2",
                      step.status === "completed" &&
                        "bg-premium-green border-green-600",
                      step.status === "active" && "bg-primary border-primary",
                      step.status === "pending" && "bg-muted border-border"
                    )}
                  >
                    {step.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {step.status === "active" && (
                      <div className="w-3 h-3 bg-primary-foreground rounded-full animate-pulse" />
                    )}
                    {step.status === "pending" && (
                      <div className="w-3 h-3 bg-muted-foreground/30 rounded-full" />
                    )}
                  </div>
                  <div className="pt-2">
                    <p
                      className={cn(
                        "font-medium",
                        step.status === "pending"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Notifications Section */}
        <Card className="mb-6 p-6 shadow-[var(--shadow-card)] border-border/50 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {notifications.length} new
            </Badge>
          </div>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <p className="text-sm text-foreground">{notification.text}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Packages Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-foreground">
            Choose Your Package
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={cn(
                  "p-6 text-center relative overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-all duration-300",
                  pkg.popular
                    ? "border-primary border-2 bg-gradient-to-br from-card to-premium-cream"
                    : "border-border/50"
                )}
              >
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    <Crown className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {pkg.name}
                </h3>
                <p className="text-4xl font-bold text-primary mb-1">
                  {pkg.price}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {pkg.matches}
                </p>
                <ul className="space-y-2 mb-6 text-left">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full",
                    pkg.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                >
                  {pkg.name === "Free" ? "Current Plan" : "Choose Plan"}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-border/50">
          <div className="flex justify-center gap-6 mb-3 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
            <span className="text-border">|</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <span className="text-border">|</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Traditional Matchmaking. Modern Presentation.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;
