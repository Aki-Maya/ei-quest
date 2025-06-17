"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

interface UserStats {
  totalXP: number;
  level: number;
  streak: number;
  coins: number;
  completedQuizzes: number;
  correctAnswers: number;
  totalAnswers: number;
}

const HomePage: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalXP: 0,
    level: 1,
    streak: 0,
    coins: 0,
    completedQuizzes: 0,
    correctAnswers: 0,
    totalAnswers: 0
  });

  useEffect(() => {
    // Load user stats from localStorage
    const savedStats = localStorage.getItem('shakaquest-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const accuracyRate = userStats.totalAnswers > 0 
    ? Math.round((userStats.correctAnswers / userStats.totalAnswers) * 100) 
    : 0;

  const xpToNextLevel = (userStats.level * 100) - (userStats.totalXP % (userStats.level * 100));

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ようこそ、ShakaQuestへ！
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            47都道府県と県庁所在地をマスターして、中学受験に備えよう！
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.level}</div>
            <div className="text-sm text-gray-600">レベル</div>
            <div className="text-xs text-gray-500 mt-1">
              次まで {xpToNextLevel} XP
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">{userStats.totalXP}</div>
            <div className="text-sm text-gray-600">経験値</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
            <div className="text-sm text-gray-600">連続日数</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.coins}</div>
            <div className="text-sm text-gray-600">コイン</div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">学習状況</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.completedQuizzes}</div>
              <div className="text-sm text-gray-600">完了したクイズ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{accuracyRate}%</div>
              <div className="text-sm text-gray-600">正答率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{userStats.totalAnswers}</div>
              <div className="text-sm text-gray-600">総回答数</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            🎯 クイズを開始
          </Link>

          <Link
            href="/results"
            className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            📊 学習結果を見る
          </Link>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 学習のコツ</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>県名と県庁所在地が異なる18都道府県</strong>を重点的に覚えよう</li>
            <li>• <strong>地域別</strong>にまとめて覚えると効率的</li>
            <li>• <strong>毎日少しずつ</strong>継続することで記憶に定着</li>
            <li>• <strong>間違えた問題</strong>は繰り返し復習しよう</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
