import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

export default function TutorialPage() {
  const handleStartTutorial = () => {
    // TODO: Implement tutorial navigation
    console.log("Starting tutorial");
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">📘 걱정마AI 사용 가이드</h1>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-hermes-orange to-soft-pink text-white p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">환영합니다!</h2>
            <p className="text-sm opacity-90">걱정마AI와 함께 AI를 활용한 글쓰기의 새로운 경험을 시작해보세요.</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">1. 채팅으로 시작하기</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">왼쪽 사이드바의 채팅 아이콘을 클릭하여 AI와 대화를 시작할 수 있습니다.</p>
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-700 dark:text-gray-300">"블로그 글을 써줘"라고 말해보세요!</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">2. 도구 활용하기</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">다양한 AI 도구를 활용하여 글쓰기, 번역, 코딩 등의 작업을 수행할 수 있습니다.</p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• AI 블로그 작성</li>
              <li>• PPT 초안 생성</li>
              <li>• 번역 도구</li>
              <li>• 코드 리뷰</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">3. 리워드 적립하기</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">매일 출석 체크와 다양한 미션을 통해 크레딧을 적립할 수 있습니다.</p>
            <div className="space-y-2">
              {[
                { step: "1", text: "리워드 페이지 방문" },
                { step: "2", text: "미션 완료하기" },
                { step: "3", text: "크레딧 적립 완료" }
              ].map((item) => (
                <div key={item.step} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-hermes-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">{item.step}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">4. 템플릿 사용하기</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">다양한 블로그 템플릿을 활용하여 빠르게 글을 작성할 수 있습니다.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">템플릿을 선택하고 내용을 입력하면 AI가 자동으로 완성해드립니다.</p>
          </div>

          <div className="text-center pt-6">
            <Button
              onClick={handleStartTutorial}
              className="bg-hermes-orange hover:bg-hermes-orange/90 px-6 py-3 rounded-xl"
            >
              튜토리얼 시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
