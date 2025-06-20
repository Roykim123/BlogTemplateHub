import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dice1, 
  Dice2, 
  Dice3, 
  Dice4, 
  Dice5, 
  Dice6,
  Target,
  TrendingUp,
  Clock,
  Coins
} from "lucide-react";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState(1);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [userCash, setUserCash] = useState(2450);

  const games = [
    {
      id: "ladder",
      name: "사다리 게임",
      description: "사다리를 타고 내려가 당첨 확률 50%",
      minBet: 1,
      maxBet: 100,
      multiplier: 2,
      icon: Target
    },
    {
      id: "oddeven",
      name: "홀짝 게임",
      description: "주사위 숫자의 홀짝을 맞추는 게임",
      minBet: 1,
      maxBet: 100,
      multiplier: 2,
      icon: Dice1
    }
  ];

  const playGame = (gameId: string, choice: string) => {
    if (userCash < betAmount) {
      alert("AI캐쉬가 부족합니다!");
      return;
    }

    setUserCash(prev => prev - betAmount);
    
    // 50% 확률로 승부 결정
    const win = Math.random() < 0.5;
    
    if (win) {
      const winAmount = betAmount * 2;
      setUserCash(prev => prev + winAmount);
      setGameResult(`승리! +${winAmount} AI캐쉬`);
    } else {
      setGameResult(`패배! -${betAmount} AI캐쉬`);
    }

    setTimeout(() => {
      setGameResult(null);
      setSelectedGame(null);
    }, 3000);
  };

  const renderLadderGame = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>사다리 게임</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-2xl mb-2">🎁</div>
            <p className="text-sm">당첨</p>
            <p className="text-lg font-bold text-green-600">+{betAmount * 2} AI캐쉬</p>
          </div>
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-2xl mb-2">💸</div>
            <p className="text-sm">꽝</p>
            <p className="text-lg font-bold text-red-600">-{betAmount} AI캐쉬</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => playGame("ladder", "left")}
            className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90"
          >
            왼쪽 선택
          </Button>
          <Button 
            onClick={() => playGame("ladder", "right")}
            className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90"
          >
            오른쪽 선택
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderOddEvenGame = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>홀짝 게임</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <div className="text-6xl mb-4">🎲</div>
          <p className="text-gray-600">주사위의 홀짝을 맞춰보세요!</p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => playGame("oddeven", "odd")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            홀 (1, 3, 5)
          </Button>
          <Button 
            onClick={() => playGame("oddeven", "even")}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            짝 (2, 4, 6)
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">미니게임</h1>
          <p className="text-gray-600 dark:text-gray-400">AI캐쉬로 즐기는 미니게임 (합법적, 도박성 최소화)</p>
        </div>

        {/* 현재 보유 캐쉬 */}
        <Card className="mb-6 bg-gradient-to-r from-hermes-orange to-soft-pink text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">보유 AI캐쉬</h3>
                <p className="text-3xl font-bold">{userCash.toLocaleString()}</p>
              </div>
              <Coins className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        {/* 베팅 금액 설정 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>베팅 금액 설정</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">베팅 금액:</span>
              <div className="flex space-x-2">
                {[1, 5, 10, 50].map((amount) => (
                  <Button
                    key={amount}
                    variant={betAmount === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBetAmount(amount)}
                    className={betAmount === amount ? "bg-hermes-orange hover:bg-hermes-orange/90" : ""}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              <span className="text-lg font-bold text-hermes-orange">{betAmount} AI캐쉬</span>
            </div>
          </CardContent>
        </Card>

        {/* 게임 결과 */}
        {gameResult && (
          <Card className="mb-6 border-2 border-hermes-orange">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">{gameResult}</h3>
              <p className="text-gray-600">현재 보유: {userCash.toLocaleString()} AI캐쉬</p>
            </CardContent>
          </Card>
        )}

        {/* 게임 선택 */}
        {!selectedGame && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <Card 
                key={game.id} 
                className="relative opacity-60"
              >
                <div className="absolute inset-0 bg-gray-500/20 rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-600">추후 업데이트 예정</p>
                    <p className="text-sm text-gray-500">곧 만나보실 수 있습니다</p>
                  </div>
                </div>
                <CardHeader className="text-center">
                  <game.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <CardTitle className="text-gray-500">{game.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-400 mb-4">{game.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>최소 베팅:</span>
                      <span>{game.minBet} AI캐쉬</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>최대 베팅:</span>
                      <span>{game.maxBet} AI캐쉬</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>배당률:</span>
                      <span className="font-bold">{game.multiplier}배</span>
                    </div>
                  </div>
                  <Button disabled className="w-full mt-4 bg-gray-400">
                    준비중
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 선택된 게임 */}
        {selectedGame === "ladder" && renderLadderGame()}
        {selectedGame === "oddeven" && renderOddEvenGame()}

        {selectedGame && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedGame(null)}
            >
              게임 선택으로 돌아가기
            </Button>
          </div>
        )}

        {/* 주의사항 */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ 주의사항</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• 미니게임은 오락 목적으로 제공되는 서비스입니다</li>
              <li>• 기본 베팅 금액은 1 AI캐쉬이며, 당첨 시 2배 지급됩니다</li>
              <li>• 과도한 게임 이용은 자제해 주세요</li>
              <li>• AI캐쉬는 충전을 통해 구매할 수 있습니다</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}