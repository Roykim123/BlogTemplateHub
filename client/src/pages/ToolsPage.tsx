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
    <div className="h-full bg-background text-foreground p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">AI 도구 모음</h1>
        <p className="text-muted-foreground mb-6">
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
            className="bg-card border rounded-xl p-4 hover:shadow-lg hover:scale-102 transition-all cursor-pointer group"
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
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground hover:text-yellow-500"
                  )}
                />
              </Button>
            </div>
            <h3 className="text-sm font-medium text-card-foreground mb-1">{tool.name}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
