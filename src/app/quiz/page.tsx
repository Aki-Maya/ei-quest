"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { prefectures, Prefecture, getRandomPrefectures } from '@/data/geography';

interface QuizQuestion {
  prefecture: Prefecture;
  type: 'capital' | 'prefecture';
  options: string[];
  correctAnswer: string;
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  showResult: boolean;
  score: number;
  isComplete: boolean;
  startTime: number;
}

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    isComplete: false,
    startTime: Date.now()
  });

  const generateQuestions = (): QuizQuestion[] => {
    const selectedPrefectures = getRandomPrefectures(10);

    return selectedPrefectures.map(prefecture => {
      const questionType = Math.random() > 0.5 ? 'capital' : 'prefecture';

      if (questionType === 'capital') {
        // Ask for capital given prefecture
        const otherCapitals = prefectures
          .filter(p => p.id !== prefecture.id)
          .map(p => p.capital)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [prefecture.capital, ...otherCapitals].sort(() => 0.5 - Math.random());

        return {
          prefecture,
          type: 'capital',
          options,
          correctAnswer: prefecture.capital
        };
      } else {
        // Ask for prefecture given capital
        const otherPrefectures = prefectures
          .filter(p => p.id !== prefecture.id)
          .map(p => p.name)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [prefecture.name, ...otherPrefectures].sort(() => 0.5 - Math.random());

        return {
          prefecture,
          type: 'prefecture',
          options,
          correctAnswer: prefecture.name
        };
      }
    });
  };

  useEffect(() => {
    setQuizState(prev => ({
      ...prev,
      questions: generateQuestions(),
      startTime: Date.now()
    }));
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showResult: true
    }));
  };

  const handleNextQuestion = () => {
    if (!quizState.selectedAnswer) return;

    const isCorrect = quizState.selectedAnswer === quizState.questions[quizState.currentQuestionIndex].correctAnswer;
    const newScore = quizState.score + (isCorrect ? 1 : 0);

    if (quizState.currentQuestionIndex + 1 >= quizState.questions.length) {
      // Quiz complete
      const endTime = Date.now();
      const duration = Math.round((endTime - quizState.startTime) / 1000);

      // Save results to localStorage
      const results = {
        score: newScore,
        total: quizState.questions.length,
        duration,
        completedAt: new Date().toISOString(),
        questions: quizState.questions.map((q, index) => ({
          question: q,
          userAnswer: index === quizState.currentQuestionIndex ? quizState.selectedAnswer : null,
          isCorrect: index === quizState.currentQuestionIndex ? isCorrect : null
        }))
      };

      // Update user stats
      const savedStats = localStorage.getItem('shakaquest-stats');
      const stats = savedStats ? JSON.parse(savedStats) : {
        totalXP: 0,
        level: 1,
        streak: 0,
        coins: 0,
        completedQuizzes: 0,
        correctAnswers: 0,
        totalAnswers: 0
      };

      const xpGained = newScore * 10;
      const coinsGained = newScore * 5;

      stats.totalXP += xpGained;
      stats.coins += coinsGained;
      stats.completedQuizzes += 1;
      stats.correctAnswers += newScore;
      stats.totalAnswers += quizState.questions.length;
      stats.level = Math.floor(stats.totalXP / 100) + 1;

      localStorage.setItem('shakaquest-stats', JSON.stringify(stats));
      localStorage.setItem('shakaquest-last-result', JSON.stringify(results));

      router.push('/results');
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false,
        score: newScore
      }));
    }
  };

  if (quizState.questions.length === 0) {
    return (
      <Layout title="クイズ">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">クイズを準備中...</div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;

  return (
    <Layout title="クイズ">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>問題 {quizState.currentQuestionIndex + 1} / {quizState.questions.length}</span>
            <span>正解: {quizState.score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">
              {currentQuestion.prefecture.region}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentQuestion.type === 'capital' 
                ? `「${currentQuestion.prefecture.name}」の県庁所在地は？`
                : `県庁所在地が「${currentQuestion.prefecture.capital}」の都道府県は？`
              }
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200";

              if (quizState.showResult && quizState.selectedAnswer === option) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass = "w-full p-4 text-left border-2 border-green-500 bg-green-50 rounded-lg";
                } else {
                  buttonClass = "w-full p-4 text-left border-2 border-red-500 bg-red-50 rounded-lg";
                }
              } else if (quizState.showResult && option === currentQuestion.correctAnswer) {
                buttonClass = "w-full p-4 text-left border-2 border-green-500 bg-green-50 rounded-lg";
              }

              return (
                <button
                  key={index}
                  onClick={() => !quizState.showResult && handleAnswerSelect(option)}
                  disabled={quizState.showResult}
                  className={buttonClass}
                >
                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Result Feedback */}
          {quizState.showResult && (
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <div className="text-center">
                {quizState.selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="text-green-600 font-semibold">🎉 正解！</div>
                ) : (
                  <div>
                    <div className="text-red-600 font-semibold">❌ 不正解</div>
                    <div className="text-sm text-gray-600 mt-1">
                      正解: {currentQuestion.correctAnswer}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          {quizState.showResult ? (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {quizState.currentQuestionIndex + 1 >= quizState.questions.length ? '結果を見る' : '次の問題'}
            </button>
          ) : (
            <div className="text-gray-500">選択肢をクリックしてください</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
