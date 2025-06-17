"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  getQuestionsBySubjectAndCategory, 
  getRandomQuestionsMixed,
  calculateXPFromScore,
  type UnifiedQuestion 
} from '@/data/index';
import Link from 'next/link';

interface QuizState {
  questions: UnifiedQuestion[];
  currentIndex: number;
  selectedAnswer: number | null;
  answers: (number | null)[];
  showExplanation: boolean;
  isCompleted: boolean;
  startTime: number;
  timeRemaining: number;
}

const QuizComponent = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const category = searchParams.get('category');

  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    selectedAnswer: null,
    answers: [],
    showExplanation: false,
    isCompleted: false,
    startTime: Date.now(),
    timeRemaining: 30
  });

  // Initialize quiz
  useEffect(() => {
    let questions: UnifiedQuestion[] = [];

    if (subject && category) {
      questions = getQuestionsBySubjectAndCategory(subject as any, category);
    } else {
      questions = getRandomQuestionsMixed(10);
    }

    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 5);

    setQuizState(prev => ({
      ...prev,
      questions: shuffled,
      answers: new Array(shuffled.length).fill(null)
    }));
  }, [subject, category]);

  // Timer effect
  useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.showExplanation && !quizState.isCompleted) {
      const timerId = setTimeout(() => {
        setQuizState(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (quizState.timeRemaining === 0 && !quizState.showExplanation) {
      handleTimeUp();
    }
  }, [quizState.timeRemaining, quizState.showExplanation, quizState.isCompleted]);

  const handleTimeUp = () => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentIndex] = null;

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
      showExplanation: true
    }));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showExplanation) return;
    setQuizState(prev => ({ ...prev, selectedAnswer: answerIndex }));
  };

  const handleSubmitAnswer = () => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentIndex] = quizState.selectedAnswer;

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
      showExplanation: true
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        showExplanation: false,
        timeRemaining: 30
      }));
    } else {
      setQuizState(prev => ({ ...prev, isCompleted: true }));
    }
  };

  const currentQuestion = quizState.questions[quizState.currentIndex];
  const progress = ((quizState.currentIndex + 1) / quizState.questions.length) * 100;

  const correctAnswers = quizState.answers.filter((answer, index) => 
    answer === quizState.questions[index]?.correct
  ).length;

  const totalQuestions = quizState.questions.length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const earnedXP = calculateXPFromScore(correctAnswers, totalQuestions, 'medium', true);

  if (quizState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">問題を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">クイズ完了！</h1>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-green-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-800">{correctAnswers}/{totalQuestions}</div>
                <div className="text-green-600">正解数</div>
              </div>
              <div className="bg-blue-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-800">{accuracy}%</div>
                <div className="text-blue-600">正答率</div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-800">+{earnedXP}</div>
                <div className="text-purple-600">獲得XP</div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-800">
                  {Math.round((Date.now() - quizState.startTime) / 1000)}秒
                </div>
                <div className="text-yellow-600">所要時間</div>
              </div>
            </div>

            <div className="mb-6">
              {accuracy >= 80 && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  素晴らしい！とても良い結果です！🌟
                </div>
              )}
              {accuracy >= 60 && accuracy < 80 && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                  良い結果です！もう少し頑張りましょう！💪
                </div>
              )}
              {accuracy < 60 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  復習が必要かもしれません。頑張って続けましょう！📚
                </div>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                もう一度挑戦
              </button>
              <Link
                href="/"
                className="block w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl">
                {currentQuestion?.subject === 'geography' ? '🗾' : 
                 currentQuestion?.subject === 'history' ? '📜' : '🏛️'}
              </span>
              <span className="ml-2 text-lg font-bold">
                {currentQuestion?.subject === 'geography' ? '地理' : 
                 currentQuestion?.subject === 'history' ? '歴史' : '公民'}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-500">{quizState.timeRemaining}秒</div>
              <div className="text-sm text-gray-600">残り時間</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-blue-500 rounded-full h-3 transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            問題 {quizState.currentIndex + 1} / {quizState.questions.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold text-white ${
                currentQuestion?.difficulty === 'easy' ? 'bg-green-500' :
                currentQuestion?.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                {currentQuestion?.difficulty === 'easy' ? '初級' :
                 currentQuestion?.difficulty === 'medium' ? '中級' : '上級'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {currentQuestion?.question}
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion?.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";

              if (quizState.showExplanation) {
                if (index === currentQuestion.correct) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800";
                } else if (index === quizState.selectedAnswer && index !== currentQuestion.correct) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                }
              } else if (quizState.selectedAnswer === index) {
                buttonClass += "bg-blue-100 border-blue-500 text-blue-800";
              } else {
                buttonClass += "bg-white border-gray-300 text-gray-800 hover:bg-gray-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={quizState.showExplanation}
                  className={buttonClass}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {quizState.showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-blue-800 mb-2">解説</h3>
              <p className="text-blue-700">{currentQuestion?.explanation}</p>
            </div>
          )}

          <div className="text-center">
            {!quizState.showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={quizState.selectedAnswer === null}
                className={`px-8 py-3 rounded-lg font-bold transition-colors ${
                  quizState.selectedAnswer !== null
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                回答する
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
              >
                {quizState.currentIndex < quizState.questions.length - 1 ? '次の問題' : '結果を見る'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <QuizComponent />
    </Suspense>
  );
};

export default QuizPage;
