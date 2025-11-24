import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, Gift, Sparkles, Heart } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "₹0",
      description: "Experience our service with no commitment",
      features: [
        "2 Free Match Suggestions",
        "Basic Profile Creation",
        "Gotra & Nakshatra Matching",
        "Family Background Summary",
        "Request Introduction Option",
      ],
      icon: Gift,
      buttonText: "Get Started Free",
      buttonVariant: "outline",
      highlight: false,
    },
    {
      name: "Standard Package",
      price: "₹999",
      description: "For those ready to explore more options",
      features: [
        "3 Additional Match Suggestions",
        "Detailed Compatibility Reports",
        "Priority Family Introductions",
        "Dedicated Support Team",
        "Valid for 3 Months",
      ],
      icon: Sparkles,
      buttonText: "Choose Standard",
      buttonVariant: "default",
      highlight: true,
    },
    {
      name: "Premium package",
      price: "2999",
      description: "Pay only when you find your perfect match",
      features: [
        "valid for 3 months",
        "Charged ONLY After Marriage",
        "No Success = No Fee",
        "Complete Family Coordination",
        "Wedding Planning Assistance",
        "Lifetime Community Support",
      ],
      icon: Heart,
      buttonText: "Learn More",
      buttonVariant: "outline",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            Pricing
          </Badge>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free, pay only when you're satisfied. No hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-10 sm:mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  plan.highlight
                    ? "border-primary shadow-lg scale-105 md:scale-110"
                    : "border-border/50"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-playfair text-2xl mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-2">
                    <span className="font-playfair text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.buttonVariant}
                    size="lg"
                    asChild
                  >
                    <Link to={plan.highlight ? "/profile/create" : "/contact"}>
                      {plan.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-3xl mx-auto bg-muted/30 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-2">
                  Our Promise: No Success, No Fee
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The success fee is only charged after your marriage is
                  officially finalized. If the match doesn't work out at any
                  stage, you owe us nothing. We succeed only when you find
                  happiness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have questions about our pricing?
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
