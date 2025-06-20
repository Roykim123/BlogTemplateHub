import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    const shouldShow = localStorage.getItem("hideUpgradeModal") !== new Date().toDateString();
    if (!shouldShow) {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  const handleClose = () => {
    if (dontShowToday) {
      localStorage.setItem("hideUpgradeModal", new Date().toDateString());
    }
    onOpenChange(false);
  };

  const handleSeeDetails = () => {
    // Navigate to upgrade details or payment page
    handleClose();
  };

  const features = [
    "더 정확한 정보 제공과 최신 트렌드 반영",
    "SEO 최적화된 글 구조로 검색 노출 향상",
    "다양한 템플릿과 스타일 옵션 추가",
    "빠른 생성 속도와 향상된 품질"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md mx-4 animate-slide-up">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-hermes-orange to-soft-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold">정보성 블로그 v2 Upgrade!</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-hermes-orange rounded-full flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 mb-6">
          <Checkbox
            id="dontShowToday"
            checked={dontShowToday}
            onCheckedChange={setDontShowToday}
          />
          <label htmlFor="dontShowToday" className="text-sm text-gray-600 dark:text-gray-400">
            오늘 하루 보지 않기
          </label>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            닫기
          </Button>
          <Button
            onClick={handleSeeDetails}
            className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90"
          >
            자세히 보기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
