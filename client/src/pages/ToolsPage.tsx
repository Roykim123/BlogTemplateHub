import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TOOLS_DATA, TOOL_CATEGORIES } from "@/lib/constants";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredTools = TOOLS_DATA.filter(tool => {
    if (activeCategory === "all") return true;
    if (activeCategory === "즐겨찾기") return favorites.has(tool.id);
    return tool.category === activeCategory;
  });

  const toggleFavorite = (toolId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(toolId)) {
      newFavorites.delete(toolId);
    } else {
      newFavorites.add(toolId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">AI 도구 모음</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          다양한 AI 도구를 활용해 작업 효율을 높여보세요
        </p>
        
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
          {TOOL_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 text-sm rounded-full whitespace-nowrap",
                activeCategory === category.id
                  ? "bg-gray-800 dark:bg-gray-700 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-full overflow-y-auto pb-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg hover:scale-102 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                "w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center text-white",
                tool.gradient
              )}>
                <span className="text-xs font-bold">{tool.icon}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(tool.id);
                }}
                className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Star 
                  className={cn(
                    "h-4 w-4 transition-all",
                    favorites.has(tool.id)
                      ? "fill-hermes-orange text-hermes-orange"
                      : "text-gray-400 hover:text-hermes-orange"
                  )}
                />
              </Button>
            </div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{tool.name}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
