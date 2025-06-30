import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useMobile } from "@/hooks/use-mobile";


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
import MyPage from "@/pages/MyPage";
import CommunityPage from "@/pages/CommunityPage";
import GamesPage from "@/pages/GamesPage";
import BlogAutoPage from "@/pages/BlogAutoPage";
import SnsAutoPage from "@/pages/SnsAutoPage";
import InstaThreadsPage from "@/pages/InstaThreadsPage";
import BlogTemplatesPage from "@/pages/BlogTemplatesPage";
import ChallengerPage from "@/pages/ChallengerPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";

function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <TopBar />
      <Sidebar />
      <main className={`flex-1 mt-8 overflow-hidden transition-all duration-300 ${isMobile ? "mb-16" : "ml-16"}`}>
        {children}
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      
      {/* Public routes */}
      <Route path="/" component={() => <Layout><HomePage /></Layout>} />
      <Route path="/community" component={() => <Layout><CommunityPage /></Layout>} />
      
      {/* Protected routes */}
      <Route path="/chatbot" component={() => <Layout><ProtectedRoute><ChatPage /></ProtectedRoute></Layout>} />
      <Route path="/tools" component={() => <Layout><ProtectedRoute><ToolsPage /></ProtectedRoute></Layout>} />
      <Route path="/rewards" component={() => <Layout><ProtectedRoute><RewardsPage /></ProtectedRoute></Layout>} />
      <Route path="/referral" component={() => <Layout><ProtectedRoute><ReferralPage /></ProtectedRoute></Layout>} />
      <Route path="/mypage" component={() => <Layout><ProtectedRoute><MyPage /></ProtectedRoute></Layout>} />
      <Route path="/games" component={() => <Layout><ProtectedRoute><GamesPage /></ProtectedRoute></Layout>} />
      <Route path="/sns-auto" component={() => <Layout><ProtectedRoute><SnsAutoPage /></ProtectedRoute></Layout>} />
      <Route path="/blog-templates" component={() => <Layout><ProtectedRoute><BlogTemplatesPage /></ProtectedRoute></Layout>} />
      <Route path="/insta-threads" component={() => <Layout><ProtectedRoute><InstaThreadsPage /></ProtectedRoute></Layout>} />
      <Route path="/challenger" component={() => <Layout><ProtectedRoute><ChallengerPage /></ProtectedRoute></Layout>} />
      <Route path="/premium-courses" component={() => <Layout><ProtectedRoute><TutorialPage /></ProtectedRoute></Layout>} />
      <Route path="/youtube-auto" component={() => <Layout><ProtectedRoute><ToolsPage /></ProtectedRoute></Layout>} />
      <Route path="/admin" component={() => <Layout><ProtectedRoute><AdminDashboard /></ProtectedRoute></Layout>} />
      <Route path="/blog-auto" component={() => <Layout><ProtectedRoute><BlogAutoPage /></ProtectedRoute></Layout>} />
      <Route path="/settings" component={() => <Layout><ProtectedRoute><SettingsPage /></ProtectedRoute></Layout>} />
      <Route path="/templates" component={() => <Layout><ProtectedRoute><TemplatesPage /></ProtectedRoute></Layout>} />
      <Route path="/naver/reviews" component={() => <Layout><ProtectedRoute><TemplatesPage /></ProtectedRoute></Layout>} />
      <Route path="/youtube/a1" component={() => <Layout><ProtectedRoute><TemplatesPage /></ProtectedRoute></Layout>} />
      <Route path="/tutorial" component={() => <Layout><ProtectedRoute><TutorialPage /></ProtectedRoute></Layout>} />
      <Route path="/payment" component={() => <Layout><ProtectedRoute><PaymentPage /></ProtectedRoute></Layout>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
