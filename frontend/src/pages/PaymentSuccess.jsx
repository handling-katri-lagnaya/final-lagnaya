import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Download, Home, Heart } from "lucide-react";
import React from "react";

const PaymentSuccess = () => {
  const location = useLocation();
  const { paymentId, plan } = location.state || {};

  // Save subscription to localStorage (in production, this would be saved to backend)
  React.useEffect(() => {
    if (plan && paymentId) {
      const subscription = {
        planName: plan.name,
        planPrice: plan.price,
        paymentId: paymentId,
        activatedDate: new Date().toISOString(),
        expiryDate: new Date(
          Date.now() + 90 * 24 * 60 * 60 * 1000
        ).toISOString(), // 90 days
        status: "active",
      };
      localStorage.setItem("userSubscription", JSON.stringify(subscription));
    }
  }, [plan, paymentId]);

  return (
    <div className="min-h-screen py-6 sm:py-12 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>

            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Payment Successful!
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              Thank you for subscribing to {plan?.name || "our service"}. Your
              payment has been processed successfully.
            </p>

            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Payment Details
                </h3>
                <Badge className="bg-accent text-accent-foreground">Paid</Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono text-foreground text-xs sm:text-sm">
                    {paymentId || "PAY_XXXXXXXXXX"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium text-foreground">
                    {plan?.name || "Standard Package"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold text-primary">
                    ₹
                    {plan?.price
                      ? Math.round(parseInt(plan.price) * 1.18)
                      : "1,178"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {new Date().toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 text-left">
                <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    What's Next?
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Your subscription is now active! You can now view additional
                    matches and access premium features from your dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 flex-1"
                asChild
              >
                <Link to="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              A confirmation email has been sent to your registered email
              address.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
