import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Heart, Menu, User, Settings, LogOut, Bell } from "lucide-react";
import { useState } from "react";

const AuthNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          <div className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/matches"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Matches
            </NavLink>
            <NavLink
              to="/favourites"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Favourites
            </NavLink>
            <NavLink
              to="/profile"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              My Profile
            </NavLink>
            <NavLink
              to="/settings"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Settings
            </NavLink>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Profile Picture */}
            <Link to="/profile" className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md hover:shadow-lg transition-shadow border-2 border-background">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-background"></div>
            </Link>

            {/* Hamburger Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30">
                      <p className="font-semibold text-foreground">Your Name</p>
                      <p className="text-xs text-muted-foreground">
                        your.email@example.com
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/notifications"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Bell className="h-4 w-4" />
                        <span>Notifications</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-border py-2">
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
