import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  UserPlus,
  SearchCheck,
  Gift,
  HandshakeIcon,
  Home,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Profile",
      description:
        "Fill in your personal details, family background, Gotra, Nakshatra, education, and preferences. Your privacy is our priority.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: SearchCheck,
      title: "Manual Family Review",
      description:
        "Our experienced team manually reviews each profile to ensure authenticity and cultural compatibility within the Kshetriya Khatri community.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Gift,
      title: "Receive 2 Free Match Suggestions",
      description:
        "Get two carefully curated match suggestions absolutely free. No strings attached. View basic compatibility and family details.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: HandshakeIcon,
      title: "Request More Matches OR Arrange Introduction",
      description:
        "Interested in someone? Request us to arrange a family introduction. Want more options? Choose from our affordable packages.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Home,
      title: "Family Visit & Compatibility Check",
      description:
        "We coordinate in-person family meetings at a mutually convenient location. No direct contact details shared until both families agree.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: PartyPopper,
      title: "Marriage Finalization → Success Fee Only",
      description:
        "Once the marriage is finalized, we charge our success fee. No success? No fee. Your happiness is our success metric.",
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            How It Works
          </Badge>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Journey to the Perfect Match
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A transparent, trust-based process that respects tradition while
            embracing modern efficiency
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-24 w-0.5 h-full bg-border -z-10" />
                  )}
                  <Card className="overflow-hidden hover:shadow-lg transition-all border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 ${step.color}`}
                        >
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="outline"
                              className="font-playfair text-sm"
                            >
                              Step {index + 1}
                            </Badge>
                            {index === 2 && (
                              <Badge className="bg-accent text-accent-foreground">
                                FREE
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="font-playfair text-2xl text-foreground">
                            {step.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground border-primary">
            <CardContent className="pt-6">
              <h3 className="font-playfair text-2xl font-bold mb-4">
                Ready to Begin Your Journey?
              </h3>
              <p className="mb-6 text-primary-foreground/90">
                Start with 2 free matches and experience the Khatri Lagnaya
                difference
              </p>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl"
                asChild
              >
                <Link to="/profile/create">
                  Create Your Profile <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Process;
