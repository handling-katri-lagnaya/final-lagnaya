import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Shield, Gift, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-wedding.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(124, 28, 28, 0.6), rgba(124, 28, 28, 0.8)), url(${heroImage})`,
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 sm:mb-6 bg-accent text-accent-foreground border-accent/20 text-xs sm:text-sm">
              <Gift className="h-3 w-3 mr-1" />
              Try our service with 2 FREE match suggestions
            </Badge>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
              Where Tradition Meets Technology
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 font-light">
              We don't match profiles. We connect families.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
                asChild
              >
                <Link to="/profile/create">Create Profile</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-card/90 backdrop-blur-sm border-primary-foreground/20 text-foreground hover:bg-card text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
                asChild
              >
                <Link to="/process">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Why Choose Khatri Lagnaya?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Exclusively for Kshetriya Khatri community with values that matter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-all hover:border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-3 text-foreground">
                  Privacy First
                </h3>
                <p className="text-muted-foreground">
                  No direct contact access. All introductions arranged through
                  our team after thorough compatibility check.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all hover:border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-3 text-foreground">
                  Family-Centered
                </h3>
                <p className="text-muted-foreground">
                  Manual family review and in-person introductions. We believe
                  families know best.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all hover:border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-3 text-foreground">
                  Cultural Values
                </h3>
                <p className="text-muted-foreground">
                  Gotra, Nakshatra matching with modern compatibility assessment
                  for lasting bonds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Simple. Traditional. Effective.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: 1,
                title: "Create Profile",
                desc: "Share your details with cultural values in mind",
              },
              {
                step: 2,
                title: "Manual Review",
                desc: "Our team carefully reviews your family background",
              },
              {
                step: 3,
                title: "Get 2 Free Matches",
                desc: "Receive handpicked suggestions based on compatibility",
              },
              {
                step: 4,
                title: "Request Introduction",
                desc: "Express interest and we arrange family meetings",
              },
              {
                step: 5,
                title: "Success Fee Only",
                desc: "Pay only when marriage is finalized",
              },
            ].map((item) => (
              <Card key={item.step} className="border-l-4 border-l-accent">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-full bg-accent w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair font-bold text-accent-foreground text-lg">
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/process">View Detailed Process</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join Khatri Lagnaya today and experience matchmaking rooted in
            tradition, powered by care.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl text-lg px-12"
            asChild
          >
            <Link to="/profile/create">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
