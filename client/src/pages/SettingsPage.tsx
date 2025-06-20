import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Bell, 
  Shield, 
  Monitor, 
  Globe, 
  Palette, 
  Database,
  Key,
  Mail
} from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
    security: true
  });

  const [preferences, setPreferences] = useState({
    language: "ko",
    timezone: "Asia/Seoul",
    theme: "system",
    autoSave: true
  });

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">환경설정</h1>
          <p className="text-gray-600 dark:text-gray-400">계정 및 시스템 설정을 관리하세요</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">일반</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
            <TabsTrigger value="advanced">고급</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5" />
                  <span>화면 설정</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>테마</Label>
                  <Select value={preferences.theme} onValueChange={(value) => setPreferences({...preferences, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">라이트</SelectItem>
                      <SelectItem value="dark">다크</SelectItem>
                      <SelectItem value="system">시스템 설정 따름</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>언어 및 지역</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>언어</Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>시간대</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Seoul">서울 (GMT+9)</SelectItem>
                      <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>자동 저장</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">자동 저장 활성화</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      작업 내용을 자동으로 저장합니다
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => setPreferences({...preferences, autoSave: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>알림 설정</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">이메일 알림</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      중요한 업데이트를 이메일로 받습니다
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">푸시 알림</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      브라우저 푸시 알림을 받습니다
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">마케팅 알림</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      새로운 기능 및 이벤트 정보를 받습니다
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">보안 알림</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      계정 보안 관련 알림을 받습니다
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.security}
                    onCheckedChange={(checked) => setNotifications({...notifications, security: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>계정 보안</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>현재 비밀번호</Label>
                  <Input type="password" placeholder="현재 비밀번호를 입력하세요" />
                </div>
                
                <div className="space-y-2">
                  <Label>새 비밀번호</Label>
                  <Input type="password" placeholder="새 비밀번호를 입력하세요" />
                </div>
                
                <div className="space-y-2">
                  <Label>비밀번호 확인</Label>
                  <Input type="password" placeholder="새 비밀번호를 다시 입력하세요" />
                </div>
                
                <Button className="bg-hermes-orange hover:bg-hermes-orange/90">
                  비밀번호 변경
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>세션 관리</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">현재 세션</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Chrome - 서울, 대한민국</p>
                    </div>
                    <Button variant="outline" size="sm">
                      현재 세션
                    </Button>
                  </div>
                  
                  <Button variant="destructive" className="w-full">
                    모든 다른 세션 로그아웃
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>데이터 관리</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  내 데이터 다운로드
                </Button>
                
                <Button variant="outline" className="w-full">
                  캐시 및 임시 파일 삭제
                </Button>
                
                <Button variant="destructive" className="w-full">
                  계정 삭제
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-hermes-orange hover:bg-hermes-orange/90">
            설정 저장
          </Button>
        </div>
      </div>
    </div>
  );
}