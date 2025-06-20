import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart3, Settings } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { title: "총 사용자", value: "12,547", icon: Users, color: "text-blue-600" },
    { title: "작성된 글", value: "89,234", icon: FileText, color: "text-green-600" },
    { title: "일일 활성 사용자", value: "2,456", icon: BarChart3, color: "text-purple-600" },
    { title: "시스템 상태", value: "정상", icon: Settings, color: "text-hermes-orange" }
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">관리자 대시보드</h1>
        <p className="text-gray-600 dark:text-gray-400">시스템 현황과 통계를 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">새로운 사용자 등록: user123</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">블로그 글 작성: "AI의 미래"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">템플릿 사용: Travel Blog</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-hermes-orange rounded-full"></div>
                <span className="text-sm">시스템 업데이트 완료</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>인기 도구</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "AI 블로그작성", usage: "3,456회" },
                { name: "번역 도구", usage: "2,234회" },
                { name: "PPT 초안", usage: "1,876회" },
                { name: "이메일 초안", usage: "1,432회" }
              ].map((tool) => (
                <div key={tool.name} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tool.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tool.usage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
