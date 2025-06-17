// 拡張版クイズコンポーネント - 全科目対応
'use client';

import React, { useState, useEffect } from 'react';
import { 
  getAllQuestions, 
  getQuestionsBySubject, 
  getRandomMixedQuestions,
  UnifiedQuestion,
  calculateXPForCorrectAnswer,
  UserProgress,
  initializeUserProgress
} from '../data/index';

interface EnhancedQuizProps {
  subject: string;
  category?: string;
  onFinish: (results: QuizResults) => void;
  onBack: () => void;
}

interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  earnedXP: number;
  answers: QuizAnswer[];
}

interface QuizAnswer {
  question: UnifiedQuestion;
  userAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export default function EnhancedQuiz({ subject, category, onFinish, onBack }: EnhancedQuizProps) {
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStartTime] = useState(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);

  // 問題を取得
  useEffect(() => {
    let fetchedQuestions: UnifiedQuestion[] = [];

    if (category === 'mixed') {
      // ランダムミックス
      fetchedQuestions = getRandomMixedQuestions(10);
    } else if (subject === 'all') {
      // 全科目ミックス
      fetchedQuestions = getRandomMixedQuestions(15);
    } else {
      // 特定科目
      const subjectQuestions = getQuestionsBySubject(subject as any);
      if (category && category !== 'all') {
        fetchedQuestions = subjectQuestions.filter(q => q.category === category);
      } else {
        fetchedQuestions = subjectQuestions;
      }

      // シャッフルして最大10問
      fetchedQuestions = fetchedQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
    }

    setQuestions(fetchedQuestions);
    setQuestionStartTime(Date.now());
  }, [subject, category]);

  // タイマー
  useEffect(() => {
    if (timeRemaining > 0 && !showExplanation && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isAnswered) {
      // 時間切れ
      handleAnswer(-1);
    }
  }, [timeRemaining, showExplanation, isAnswered]);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = answerIndex === currentQuestion.correct;

    const newAnswer: QuizAnswer = {
      question: currentQuestion,
      userAnswer: answerIndex,
      isCorrect,
      timeSpent
    };

    setSelectedAnswer(answerIndex);
    setAnswers([...answers, newAnswer]);
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswered(false);
      setTimeRemaining(30);
      setQuestionStartTime(Date.now());
    } else {
      // クイズ終了
      const totalTime = Date.now() - quizStartTime;
      const correctCount = answers.filter(a => a.isCorrect).length + (answers[answers.length - 1]?.isCorrect ? 0 : 0);
      const earnedXP = answers.reduce((total, answer) => {
        if (answer.isCorrect) {
          const timeBonus = answer.timeSpent < 3000; // 3秒以内でボーナス
          return total + calculateXPForCorrectAnswer(answer.question.difficulty, timeBonus);
        }
        return total;
      }, 0);

      const results: QuizResults = {
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        totalTime,
        earnedXP,
        answers: [...answers]
      };

      onFinish(results);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">問題を読み込み中...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">

        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← 戻る
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentQuestion.subject === 'geography' && '🗾 地理'}
              {currentQuestion.subject === 'history' && '📜 歴史'}
              {currentQuestion.subject === 'civics' && '🏛️ 公民'}
              クイズ
            </h1>
            <p className="text-gray-600">
              問題 {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${timeRemaining <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
              ⏰ {timeRemaining}s
            </div>
          </div>
        </div>

        {/* 進捗バー */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* 問題エリア */}
        <div className="bg-white rounded-lg p-8 shadow-lg">

          {/* 問題文 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                currentQuestion.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty === 'basic' ? '基本' :
                 currentQuestion.difficulty === 'intermediate' ? '標準' : '応用'}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {currentQuestion.subject === 'geography' ? '地理' :
                 currentQuestion.subject === 'history' ? '歴史' : '公民'}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 選択肢 */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all hover:shadow-md ";

              if (showExplanation) {
                if (index === currentQuestion.correct) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-300 bg-gray-50 text-gray-600";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
                } else {
                  buttonClass += "border-gray-300 hover:border-blue-300 text-gray-700";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
                    {showExplanation && index === currentQuestion.correct && (
                      <span className="ml-auto text-green-600">✓ 正解</span>
                    )}
                    {showExplanation && index === selectedAnswer && index !== currentQuestion.correct && (
                      <span className="ml-auto text-red-600">✗ 不正解</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 解説 */}
          {showExplanation && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">📝 解説</h3>
              <p className="text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* 次へボタン */}
          {showExplanation && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {currentQuestionIndex + 1 < questions.length ? '次の問題 →' : '結果を見る 🎯'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
