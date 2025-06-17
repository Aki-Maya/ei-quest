// 拡張版メインページ - 全科目対応
'use client';

import React, { useState, useEffect } from 'react';
import { subjects, Subject, UserProgress, initializeUserProgress, getLevelByXP, getNextLevel } from '../data/index';

interface MainPageProps {
  onStartQuiz: (subject: string, category?: string) => void;
}

export default function EnhancedMainPage({ onStartQuiz }: MainPageProps) {
  const [userProgress, setUserProgress] = useState<UserProgress>(initializeUserProgress());
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ローカルストレージから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('shakaquest-progress');
    if (saved) {
      setUserProgress(JSON.parse(saved));
    }
  }, []);

  const currentLevel = getLevelByXP(userProgress.totalXP);
  const nextLevel = getNextLevel(currentLevel.level);
  const progressPercentage = nextLevel 
    ? ((userProgress.totalXP - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
    : 100;

  const handleSubjectSelect = (subjectId: string) => {
    if (selectedSubject === subjectId) {
      setSelectedSubject(null);
      setSelectedCategory(null);
    } else {
      setSelectedSubject(subjectId);
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleStartQuiz = () => {
    if (selectedSubject) {
      onStartQuiz(selectedSubject, selectedCategory || undefined);
    }
  };

  // 今日の学習目標
  const dailyGoalXP = 100;
  const todayXP = userProgress.totalXP % dailyGoalXP; // 簡略化
  const dailyProgress = Math.min((todayXP / dailyGoalXP) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎓 ShakaQuest - 社会科学習アプリ
          </h1>
          <p className="text-gray-600">中学受験の社会科をゲーム感覚で楽しく学習！</p>
        </div>

        {/* ユーザー統計 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="レベル"
            value={currentLevel.level}
            subtitle={currentLevel.name}
            icon="🎯"
            color="bg-blue-500"
          />
          <StatCard
            title="経験値"
            value={userProgress.totalXP}
            subtitle={`次のレベルまで ${nextLevel ? nextLevel.xpRequired - userProgress.totalXP : 0}XP`}
            icon="⭐"
            color="bg-yellow-500"
          />
          <StatCard
            title="コイン"
            value={userProgress.totalCorrect * 10}
            subtitle="正解数 × 10"
            icon="💰"
            color="bg-green-500"
          />
          <StatCard
            title="連続学習"
            value={userProgress.currentStreak}
            subtitle={`最長 ${userProgress.longestStreak}日`}
            icon="🔥"
            color="bg-red-500"
          />
        </div>

        {/* レベル進捗バー */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              レベル {currentLevel.level}: {currentLevel.name}
            </span>
            <span className="text-sm text-gray-500">
              {userProgress.totalXP} / {nextLevel?.xpRequired || userProgress.totalXP} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${currentLevel.color}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 今日の学習目標 */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            📅 今日の学習目標
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">今日の経験値</span>
            <span className="text-sm text-gray-500">{todayXP} / {dailyGoalXP} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${dailyProgress}%` }}
            ></div>
          </div>
        </div>

        {/* 科目選択 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              isSelected={selectedSubject === subject.id}
              onClick={() => handleSubjectSelect(subject.id)}
              userStats={userProgress.subjectStats[subject.id as keyof typeof userProgress.subjectStats]}
            />
          ))}
        </div>

        {/* カテゴリ選択 */}
        {selectedSubject && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {subjects.find(s => s.id === selectedSubject)?.name} - カテゴリを選択
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {subjects.find(s => s.id === selectedSubject)?.categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleStartQuiz()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                🎯 {selectedCategory ? 'カテゴリ別' : '全カテゴリ'}クイズ開始
              </button>
              <button
                onClick={() => onStartQuiz(selectedSubject, 'mixed')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                🎲 ランダムクイズ
              </button>
            </div>
          </div>
        )}

        {/* 学習統計 */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">📊 学習統計</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const stats = userProgress.subjectStats[subject.id as keyof typeof userProgress.subjectStats];
              const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

              return (
                <div key={subject.id} className="text-center">
                  <div className="text-2xl mb-2">{subject.icon}</div>
                  <h4 className="font-semibold text-gray-800">{subject.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    正解: {stats.correct} / {stats.total}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${subject.color}`}
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{accuracy}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// 統計カードコンポーネント
function StatCard({ title, value, subtitle, icon, color }: {
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// 科目カードコンポーネント
function SubjectCard({ subject, isSelected, onClick, userStats }: {
  subject: Subject;
  isSelected: boolean;
  onClick: () => void;
  userStats: { correct: number; total: number };
}) {
  const accuracy = userStats.total > 0 ? Math.round((userStats.correct / userStats.total) * 100) : 0;

  return (
    <div 
      className={`bg-white rounded-lg p-6 shadow-lg cursor-pointer transition-all transform hover:scale-105 ${
        isSelected ? 'ring-4 ring-blue-300 shadow-xl' : ''
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{subject.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{subject.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{subject.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>問題数:</span>
            <span className="font-semibold">{subject.totalQuestions}問</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>正答率:</span>
            <span className="font-semibold">{accuracy}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${subject.color}`}
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>
        {isSelected && (
          <div className="mt-4 text-blue-600 font-semibold">
            ✓ 選択中
          </div>
        )}
      </div>
    </div>
  );
}

// カテゴリカードコンポーネント
function CategoryCard({ category, isSelected, onClick }: {
  category: any;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div 
      className={`bg-gray-50 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-100 ${
        isSelected ? 'ring-2 ring-blue-300 bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <h4 className="font-semibold text-gray-800 mb-1">{category.name}</h4>
      <p className="text-xs text-gray-600 mb-2">{category.description}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{category.questionCount}問</span>
        <span>{category.difficulty.join(', ')}</span>
      </div>
    </div>
  );
}
