"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

interface QuizResult {
  score: number;
  total: number;
  duration: number;
  completedAt: string;
  questions: any[];
}

interface UserStats {
  totalXP: number;
  level: number;
  streak: number;
  coins: number;
  completedQuizzes: number;
  correctAnswers: number;
  totalAnswers: number;
}

const ResultsPage: React.FC = () => {
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Load last quiz result
    const savedResult = localStorage.getItem('shakaquest-last-result');
    if (savedResult) {
      setLastResult(JSON.parse(savedResult));
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    // Load user stats
    const savedStats = localStorage.getItem('shakaquest-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  };

  const getPerformanceMessage = (score: number, total: number): { message: string; emoji: string; color: string } => {
    const percentage = (score / total) * 100;

    if (percentage >= 90) {
      return { message: "素晴らしい！完璧に近い成績です！", emoji: "🏆", color: "text-yellow-600" };
    } else if (percentage >= 80) {
      return { message: "とてもよくできました！", emoji: "🎉", color: "text-green-600" };
    } else if (percentage >= 70) {
      return { message: "良い結果です！", emoji: "👏", color: "text-blue-600" };
    } else if (percentage >= 60) {
      return { message: "もう少し頑張りましょう！", emoji: "💪", color: "text-orange-600" };
    } else {
      return { message: "復習してから再挑戦しましょう！", emoji: "📚", color: "text-red-600" };
    }
  };

  if (!lastResult && !userStats) {
    return (
      <Layout title="学習結果">
        <div className="text-center py-16">
          <div className="text-gray-500 mb-4">まだクイズを受けていません</div>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            最初のクイズを始める
          </Link>
        </div>
      </Layout>
    );
  }

  const performance = lastResult ? getPerformanceMessage(lastResult.score, lastResult.total) : null;

  return (
    <Layout title="学習結果">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Celebration Animation */}
        {showCelebration && lastResult && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 text-center animate-bounce">
              <div className="text-6xl mb-4">{performance?.emoji}</div>
              <div className="text-2xl font-bold text-gray-900">クイズ完了！</div>
              <div className="text-lg text-gray-600 mt-2">
                {lastResult.score} / {lastResult.total} 正解
              </div>
            </div>
          </div>
        )}

        {/* Latest Quiz Result */}
        {lastResult && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              最新のクイズ結果
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {lastResult.score} / {lastResult.total}
                </div>
                <div className="text-sm text-gray-600">正解数</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((lastResult.score / lastResult.total) * 100)}%
                </div>
                <div className="text-sm text-gray-600">正答率</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {formatDuration(lastResult.duration)}
                </div>
                <div className="text-sm text-gray-600">所要時間</div>
              </div>
            </div>

            {performance && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-2">{performance.emoji}</div>
                <div className={`text-lg font-semibold ${performance.color}`}>
                  {performance.message}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Overall Statistics */}
        {userStats && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              総合統計
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Lv.{userStats.level}</div>
                <div className="text-sm text-gray-600">レベル</div>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{userStats.totalXP}</div>
                <div className="text-sm text-gray-600">総経験値</div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
                <div className="text-sm text-gray-600">連続日数</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userStats.coins}</div>
                <div className="text-sm text-gray-600">コイン</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userStats.completedQuizzes}</div>
                <div className="text-sm text-gray-600">完了クイズ数</div>
              </div>

              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {userStats.totalAnswers > 0 ? Math.round((userStats.correctAnswers / userStats.totalAnswers) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">総合正答率</div>
              </div>

              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">{userStats.totalAnswers}</div>
                <div className="text-sm text-gray-600">総回答数</div>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Badges */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            獲得実績
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats && userStats.completedQuizzes >= 1 && (
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-sm font-semibold text-blue-800">初回完走</div>
                <div className="text-xs text-blue-600">初めてのクイズ完了</div>
              </div>
            )}

            {userStats && userStats.completedQuizzes >= 5 && (
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
                <div className="text-2xl mb-2">🌟</div>
                <div className="text-sm font-semibold text-green-800">継続学習</div>
                <div className="text-xs text-green-600">5回のクイズ完了</div>
              </div>
            )}

            {userStats && userStats.level >= 3 && (
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-sm font-semibold text-purple-800">レベルアップ</div>
                <div className="text-xs text-purple-600">レベル3到達</div>
              </div>
            )}

            {lastResult && lastResult.score === lastResult.total && (
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-200">
                <div className="text-2xl mb-2">👑</div>
                <div className="text-sm font-semibold text-yellow-800">パーフェクト</div>
                <div className="text-xs text-yellow-600">全問正解達成</div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            🎯 もう一度挑戦
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            🏠 ホームに戻る
          </Link>
        </div>

        {/* Study Recommendations */}
        {lastResult && lastResult.score < lastResult.total * 0.8 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 学習アドバイス</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>県庁所在地が異なる18都道府県</strong>を集中的に覚えましょう</li>
              <li>• <strong>地域別グループ</strong>で覚えると記憶に残りやすいです</li>
              <li>• <strong>語呂合わせ</strong>や<strong>連想</strong>を使って覚えてみましょう</li>
              <li>• <strong>地図</strong>を見ながら位置関係も確認しましょう</li>
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ResultsPage;
