import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-full bg-primary p-2 shadow-md group-hover:shadow-lg transition-shadow">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-base sm:text-xl font-bold text-primary">
                Khatri Lagnaya
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Where Tradition Meets Technology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Home
            </NavLink>
            <NavLink
              to="/process"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              How It Works
            </NavLink>
            <NavLink
              to="/pricing"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Pricing
            </NavLink>
            <NavLink
              to="/contact"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Contact
            </NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
              asChild
            >
              <Link to="/profile/create">Create Profile</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                activeClassName="text-primary font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/process"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                activeClassName="text-primary font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </NavLink>
              <NavLink
                to="/pricing"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                activeClassName="text-primary font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </NavLink>
              <NavLink
                to="/contact"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                activeClassName="text-primary font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md w-full"
                  asChild
                >
                  <Link
                    to="/profile/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
