import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import familyMeeting from "@/assets/family-meeting.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            Contact Us
          </Badge>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch With Our Team
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? We're here to help you find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div>
            <Card className="mb-6 border-border/50">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                    />
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">
                        Email
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        contact@khatrilagnaya.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">
                        Phone
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        +91 XXXX XXXXXX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">
                        Working Hours
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Monday - Saturday: 10:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">
                        Location
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Serving Kshetriya Khatri community across India
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="overflow-hidden border-border/50 h-full">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${familyMeeting})`,
                }}
              />
              <CardContent className="pt-6">
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                  We Arrange Family Introductions
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Unlike other matrimonial platforms, we believe in the power of
                  personal connection. Our team personally coordinates family
                  meetings, ensuring both families are comfortable and the
                  process is respectful of your traditions.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-3">
                    Why Contact Us?
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Questions about our matchmaking process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Assistance with profile creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Inquiries about pricing and packages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Schedule a family introduction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Community verification and privacy concerns</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
