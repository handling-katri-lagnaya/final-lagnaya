import { Link } from "react-router-dom";
import { Heart, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-1.5 sm:p-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground fill-current" />
              </div>
              <span className="font-playfair text-lg sm:text-xl font-bold text-primary">
                Khatri Lagnaya
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              More than a match — We bring families together.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/process"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
              Legal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
              Contact
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@khatrilagnaya.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 XXXX XXXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
          <p className="px-4">
            © 2024 Khatri Lagnaya. All rights reserved. Exclusively for
            Kshetriya Khatri community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
