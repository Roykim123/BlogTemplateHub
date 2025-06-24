import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">로그인 상태를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}