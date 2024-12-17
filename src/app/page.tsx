'use client'

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { GlassmorphicContainer } from '@/components/GlassmorphicContainer';

export default function Home() {
    const router = useRouter();
    const [contact, setContact] = useState<[string, boolean]>(["", false]);

    const formatPhoneNumber = (number: string): [string, boolean] => {
        const cleaned = ("" + number).replace(/\D/g, "");
        const match1 = cleaned.match(/^(\d{3})(\d)$/) || cleaned.match(/^(\d{3})(\d{2})$/) || cleaned.match(/^(\d{3})(\d{3})$/) || cleaned.match(/^(\d{3})(\d{4})$/);
        if (match1) {
            return [match1[1] + "-" + match1[2], false];
        }
        const match2 = cleaned.match(/^(\d{3})(\d{4})(\d)$/) || cleaned.match(/^(\d{3})(\d{4})(\d{2})$/) || cleaned.match(/^(\d{3})(\d{4})(\d{3})$/);
        if (match2) {
            return [match2[1] + "-" + match2[2] + "-" + match2[3], false];
        }
        const match3 = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match3) {
            return [match3[1] + "-" + match3[2] + "-" + match3[3], true];
        }
        const newCleaned = cleaned.slice(0, 11);
        const match4 = newCleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (!match4) {
            return [cleaned, false];
        }
        return [match4[1] + "-" + match4[2] + "-" + match4[3], true];
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const nameInput = form.elements.namedItem("name") as HTMLInputElement;
        const studentNumberInput = form.elements.namedItem("studentNumber") as HTMLInputElement;
        //const phoneNumberInput = form.elements.namedItem("phoneNumber") as HTMLInputElement;

        const randomNum = Math.floor(Math.random() * 10000);
        const paddedNum = String(randomNum).padStart(4, '0');
        const nameWithNum = `${nameInput.value}${paddedNum}`;

        const name = nameInput ? nameWithNum : "null";
        const studentNumber = studentNumberInput ? studentNumberInput.value : "null";
        //const phoneNumber = phoneNumberInput ? phoneNumberInput.value : "null";

        /*if (!phoneNumber) {
            const yes = confirm("전화번호를 입력하지 않으면 상품 수령을 할 수 없어요. 🫨\n계속 진행하시겠어요?");
            if (!yes) return;
        }*/

        localStorage.setItem('name', name);
        localStorage.setItem('studentNumber', studentNumber);
        localStorage.setItem('score', '0');

        router.push('/quiz');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-200 to-blue-300 p-6">
          <div className="max-w-3xl mx-auto">
              <GlassmorphicContainer className="p-8">
                  <div className="flex items-center justify-center gap-4 mb-8">
                      <Image src="/favicon.svg" width={36} height={36} alt="luna" className="animate-pulse" />
                      <h1 className="text-3xl font-bold text-gray-800">2024 LUNA 금융상식 Quiz</h1>
                  </div>

                  <div className="relative mb-8 overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-black/10 rounded-lg z-10"></div>
                      <iframe
                        width="100%"
                        height="395"
                        src="https://www.youtube.com/embed/I3ayrjL-lPg?autoplay=1&loop=1&controls=0&modestbranding=0&playlist=I3ayrjL-lPg"
                        title="2022 LUNA🌙 홍보영상"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="relative z-0"
                      />
                  </div>

                  <div className="text-center mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          여러분의 금융상식을 퀴즈로 알아봐요!
                      </h2>
                      <p className="text-gray-600">
                          상품 증정을 위하여 이름과 전화번호를 입력해 주세요!
                      </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                  <GlassmorphicContainer className="overflow-hidden">
                          <input
                            placeholder="학번"
                            className="w-full p-4 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            /*type="tel"
                            value={contact[0]}
                            onChange={(e) => setContact(formatPhoneNumber(e.target.value))}
                            name="phoneNumber"
                            */
                            name="studentNumber"
                            type="text"
                            required
                          />
                      </GlassmorphicContainer>
                      <GlassmorphicContainer className="overflow-hidden">
                          <input
                            placeholder="이름"
                            className="w-full p-4 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            type="text"
                            name="name"
                            required
                          />
                      </GlassmorphicContainer>

                      <button
                        type="submit"
                        className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl
                                   transition-all duration-300 ease-in-out transform hover:scale-105
                                   backdrop-blur-lg bg-opacity-90 shadow-lg"
                      >
                          시작하기
                      </button>
                  </form>
              </GlassmorphicContainer>
          </div>
      </div>
    );
}