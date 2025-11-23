import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Demo credentials
  const DEMO_EMAIL = "demo@kathrilagnaya.com";
  const DEMO_PASSWORD = "demo123";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Successful login
      navigate("/dashboard");
    } else {
      // Failed login
      setError("Invalid email or password. Please try again.");
    }
  };
  return (
    <div className="min-h-screen py-6 sm:py-12 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="rounded-full bg-primary p-2.5 sm:p-3 shadow-md">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground fill-current" />
            </div>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Sign in to your Kathri Lagnaya account
          </p>
        </div>

        <Card className="border-border/50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-playfair text-xl sm:text-2xl">
              Login
            </CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {/* Demo Credentials Info */}
            <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-xs sm:text-sm font-semibold text-accent mb-1">
                Demo Credentials:
              </p>
              <p className="text-xs text-muted-foreground">
                Email: demo@kathrilagnaya.com
              </p>
              <p className="text-xs text-muted-foreground">Password: demo123</p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@kathrilagnaya.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/profile/create"
                  className="text-primary hover:underline font-medium"
                >
                  Create Profile
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-muted/30 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Badge className="bg-accent text-accent-foreground">Note</Badge>
              <p className="text-sm text-muted-foreground">
                Your privacy is our priority. All your information is kept
                secure and confidential.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
