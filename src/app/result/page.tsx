'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { GlassmorphicContainer } from '@/components/GlassmorphicContainer';

const TOTAL_QUESTIONS = 15;

export default function Result() {
    const router = useRouter();
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [rank, setRank] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRank = async () => {
            const name = localStorage.getItem('name');
            const phoneNumber = localStorage.getItem('phoneNumber');
            const score = Number(localStorage.getItem('score'));
            setCorrectAnswers(score);

            try {
                const response = await fetch('/api/result', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, phoneNumber, score }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setRank(data.rank);
                setTotalResults(data.totalResults);
            } catch (error) {
                console.error('Failed to fetch rank:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRank();
    }, []);

    const getScoreMessage = () => {
        const percentage = (correctAnswers / TOTAL_QUESTIONS) * 100;
        if (percentage >= 90) return "금융 전문가시네요! 👑";
        if (percentage >= 70) return "금융 실력이 대단해요! 🌟";
        if (percentage >= 50) return "좋은 성적이에요! 👍";
        return "다음에는 더 잘할 수 있어요! 💪";
    };

    const getScoreColor = () => {
        const percentage = (correctAnswers / TOTAL_QUESTIONS) * 100;
        if (percentage >= 90) return "text-purple-600";
        if (percentage >= 70) return "text-blue-600";
        if (percentage >= 50) return "text-green-600";
        return "text-gray-600";
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-200 to-blue-300 p-6">
          <div className="max-w-3xl mx-auto">
              <GlassmorphicContainer className="p-8">
                  <div className="flex items-center justify-center gap-4 mb-12">
                      <Image
                        src="/favicon.svg"
                        width={36}
                        height={36}
                        alt="luna"
                        className="animate-pulse"
                      />
                      <h1 className="text-3xl font-bold text-gray-800">
                          2024 LUNA 금융상식 Quiz
                      </h1>
                  </div>

                  <div className="space-y-8 mb-12">
                      <GlassmorphicContainer className="p-8 text-center">
                          <h2 className="text-4xl font-bold mb-4">
                                <span className={getScoreColor()}>
                                    {correctAnswers}
                                </span>
                              <span className="text-gray-800">
                                    /{TOTAL_QUESTIONS}문제
                                </span>
                          </h2>
                          <p className="text-xl font-semibold text-gray-700">
                              {getScoreMessage()}
                          </p>
                      </GlassmorphicContainer>

                      <GlassmorphicContainer className="p-8 text-center">
                          {isLoading ? (
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                            </div>
                          ) : (
                            <>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    현재 {totalResults}명 중
                                </h3>
                                <p className="text-4xl font-bold text-purple-600">
                                    {rank}등
                                </p>
                            </>
                          )}
                      </GlassmorphicContainer>

                      <div className="space-y-4">
                          <button
                            onClick={() => router.push("/")}
                            className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700
                                         text-white font-semibold rounded-xl transition-all 
                                         duration-300 ease-in-out transform hover:scale-105 
                                         backdrop-blur-lg bg-opacity-90 shadow-lg"
                          >
                              다시 도전하기
                          </button>

                          <button
                            onClick={() => window.location.href = "https://www.hanyang.ac.kr/web/www/luna"}
                            className="w-full py-4 px-6 bg-white/30 hover:bg-white/40
                                         text-gray-800 font-semibold rounded-xl transition-all 
                                         duration-300 ease-in-out transform hover:scale-105 
                                         backdrop-blur-lg shadow-lg"
                          >
                              LUNA 홈페이지 방문하기
                          </button>
                      </div>
                  </div>

                  <div className="text-center text-gray-600">
                      <p className="text-sm">
                          © 2024 LUNA. All rights reserved.
                      </p>
                  </div>
              </GlassmorphicContainer>
          </div>
      </div>
    );
}