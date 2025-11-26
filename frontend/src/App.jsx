import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Process from "./pages/Process";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ProfileCreate from "./pages/ProfileCreate";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import MatchDetails from "./pages/MatchDetails";
import Favourites from "./pages/Favourites";
import Settings from "./pages/Settings";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/create" element={<ProfileCreate />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/match/:id" element={<MatchDetails />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
