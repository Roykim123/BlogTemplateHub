import { TEMPLATES_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function TemplatesPage() {
  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">블로그 템플릿</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full overflow-y-auto pb-6">
        {TEMPLATES_DATA.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="relative">
              <img 
                src={template.image} 
                alt={template.title}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={cn(
                  "text-white text-xs px-2 py-1 rounded-full",
                  template.color === "hermes-orange" && "bg-hermes-orange",
                  template.color === "soft-blue" && "bg-soft-blue",
                  template.color === "soft-mint" && "bg-soft-mint",
                  template.color === "soft-purple" && "bg-soft-purple",
                  template.color === "soft-pink" && "bg-soft-pink"
                )}>
                  {template.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{template.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
