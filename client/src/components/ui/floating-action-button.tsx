import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Zap, MessageCircle, Settings } from "lucide-react";
import { useState } from "react";

interface FloatingActionButtonProps {
  onAction?: (action: string) => void;
}

export function FloatingActionButton({ onAction }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: "create", label: "딸깍 실행", icon: Zap, color: "bg-hermes-orange hover:bg-hermes-orange/90" },
    { id: "community", label: "커뮤니티", icon: MessageCircle, color: "bg-green-500 hover:bg-green-600" },
    { id: "settings", label: "설정", icon: Settings, color: "bg-gray-500 hover:bg-gray-600" }
  ];

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
      <div className="flex flex-col-reverse items-end space-y-reverse space-y-2">
        {/* Action buttons */}
        {isOpen && (
          <div className="flex flex-col-reverse space-y-reverse space-y-2 mb-2">
            {actions.map((action) => (
              <Button
                key={action.id}
                size="sm"
                className={cn(
                  "rounded-full w-12 h-12 shadow-lg transform transition-all duration-200",
                  "animate-in slide-in-from-bottom-2",
                  action.color
                )}
                onClick={() => {
                  onAction?.(action.id);
                  setIsOpen(false);
                }}
              >
                <action.icon className="h-5 w-5" />
                <span className="sr-only">{action.label}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <Button
          size="lg"
          className={cn(
            "rounded-full w-14 h-14 shadow-lg transition-all duration-200",
            "bg-hermes-orange hover:bg-hermes-orange/90",
            isOpen && "rotate-45"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">빠른 액션</span>
        </Button>
      </div>
    </div>
  );
}