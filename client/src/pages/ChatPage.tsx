import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Send, Bot } from "lucide-react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement chat functionality
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-light-orange to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-hermes-orange rounded-full flex items-center justify-center mb-6 animate-pulse-gentle">
          <Bot className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">뤼튼</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">무엇을 도와드릴까요?</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            className="w-8 h-8 p-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 border-0 bg-transparent text-sm placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-0"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="w-8 h-8 p-0 bg-hermes-orange hover:bg-hermes-orange/90"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <a href="#" className="hover:text-hermes-orange transition-colors">서비스 이용약관</a>
        <a href="#" className="hover:text-hermes-orange transition-colors">개인정보처리방침</a>
      </div>
    </div>
  );
}
