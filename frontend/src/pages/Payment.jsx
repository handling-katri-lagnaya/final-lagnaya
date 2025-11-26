import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Shield, Lock, CreditCard } from "lucide-react";
import { useState } from "react";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get plan details from navigation state
  const plan = location.state?.plan || {
    name: "Standard Package",
    price: "999",
    features: [
      "3 Additional Match Suggestions",
      "Detailed Compatibility Reports",
    ],
  };

  const handlePayment = () => {
    setIsProcessing(true);

    // Razorpay payment options
    const options = {
      key: "rzp_test_1234567890", // Replace with your Razorpay Key ID
      amount: parseInt(plan.price) * 100, // Amount in paise (₹999 = 99900 paise)
      currency: "INR",
      name: "Khatri Lagnaya",
      description: plan.name,
      image: "/favicon.ico",
      handler: function (response) {
        // Payment successful
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);

        // Redirect to success page
        navigate("/payment-success", {
          state: {
            paymentId: response.razorpay_payment_id,
            plan: plan,
          },
        });
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: {
        plan: plan.name,
      },
      theme: {
        color: "#7c1c1c",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    // Create Razorpay instance and open
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Complete Your Payment
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Secure payment powered by Razorpay
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-playfair text-xl sm:text-2xl">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">
                      Selected
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">
                        ₹{plan.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="font-medium text-foreground">
                        ₹{Math.round(parseInt(plan.price) * 0.18)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-semibold text-foreground">
                        Total Amount
                      </span>
                      <span className="font-playfair text-2xl font-bold text-primary">
                        ₹{Math.round(parseInt(plan.price) * 1.18)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-4 sm:p-6">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {isProcessing ? "Processing..." : "Proceed to Payment"}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  You will be redirected to Razorpay secure payment gateway
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Security Info */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-playfair text-lg sm:text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>PCI DSS compliant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Powered by Razorpay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>100% secure transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-muted/30">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">
                  Accepted Payment Methods
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-card border border-border rounded p-2 text-center text-xs font-medium">
                    Cards
                  </div>
                  <div className="bg-card border border-border rounded p-2 text-center text-xs font-medium">
                    UPI
                  </div>
                  <div className="bg-card border border-border rounded p-2 text-center text-xs font-medium">
                    Netbanking
                  </div>
                  <div className="bg-card border border-border rounded p-2 text-center text-xs font-medium">
                    Wallets
                  </div>
                  <div className="bg-card border border-border rounded p-2 text-center text-xs font-medium">
                    EMI
                  </div>
                  <div className="bg-card border border-border rounded p-2 text-center text-xs font-medium">
                    PayLater
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => navigate("/pricing")}
                className="w-full sm:w-auto"
              >
                Change Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
