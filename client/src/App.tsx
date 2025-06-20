import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { UpgradeModal } from "@/components/modals/UpgradeModal";
import { useMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

// Pages
import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import ToolsPage from "@/pages/ToolsPage";
import RewardsPage from "@/pages/RewardsPage";
import ReferralPage from "@/pages/ReferralPage";
import TemplatesPage from "@/pages/TemplatesPage";
import TutorialPage from "@/pages/TutorialPage";
import AdminDashboard from "@/pages/AdminDashboard";
import PaymentPage from "@/pages/PaymentPage";
import NotFound from "@/pages/not-found";

function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <TopBar />
      <Sidebar />
      <main className={`flex-1 mt-8 overflow-hidden ${isMobile ? "mb-16" : "ml-12"}`}>
        {children}
      </main>
    </div>
  );
}

function Router() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    // Show upgrade modal if not hidden today
    const shouldShow = localStorage.getItem("hideUpgradeModal") !== new Date().toDateString();
    if (shouldShow) {
      const timer = setTimeout(() => {
        setShowUpgradeModal(true);
      }, 2000); // Show after 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Switch>
        <Route path="/" component={() => <Layout><HomePage /></Layout>} />
        <Route path="/chatbot" component={() => <Layout><ChatPage /></Layout>} />
        <Route path="/tools" component={() => <Layout><ToolsPage /></Layout>} />
        <Route path="/rewards" component={() => <Layout><RewardsPage /></Layout>} />
        <Route path="/referral" component={() => <Layout><ReferralPage /></Layout>} />
        <Route path="/templates" component={() => <Layout><TemplatesPage /></Layout>} />
        <Route path="/naver/reviews" component={() => <Layout><TemplatesPage /></Layout>} />
        <Route path="/youtube/a1" component={() => <Layout><TemplatesPage /></Layout>} />
        <Route path="/tutorial" component={() => <Layout><TutorialPage /></Layout>} />
        <Route path="/admin" component={() => <Layout><AdminDashboard /></Layout>} />
        <Route path="/payment" component={() => <Layout><PaymentPage /></Layout>} />
        <Route component={NotFound} />
      </Switch>
      
      <UpgradeModal 
        open={showUpgradeModal} 
        onOpenChange={setShowUpgradeModal} 
      />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
