'use client'

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
 Mic,
 MicOff,
 Check,
 X
} from 'lucide-react';
import { useAyahById } from '@/hooks/useQuranApp';
import { Skeleton } from '../ui/skeleton';

interface PracticeSessionProps {
 ayahNumber: number;
 onCorrectRecitation?: () => void;
 onIncorrectRecitation?: () => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({
 ayahNumber,
 onCorrectRecitation,
 onIncorrectRecitation
}) => {
 const [isListening, setIsListening] = useState(false);
 const [recognitionResult, setRecognitionResult] = useState('');
 const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
 const { data, isLoading } = useAyahById(ayahNumber);

 const startListening = useCallback(() => {
  if ('webkitSpeechRecognition' in window) {
   const recognition = new window.webkitSpeechRecognition();
   recognition.continuous = false;
   recognition.interimResults = false;
   recognition.lang = 'ar-SA'; // Arabic language

   recognition.onstart = () => {
    setIsListening(true);
    setRecognitionResult('');
    setIsCorrect(null);
   };

   recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    setRecognitionResult(transcript);

    // Simple comparison (can be improved with more sophisticated Arabic text matching)
    const cleanAyahText = data?.text.replace(/[\u0600-\u06FF\s]/g, '');
    const cleanTranscript = transcript.replace(/[\u0600-\u06FF\s]/g, '');

    const similarity = cleanTranscript.length / cleanAyahText?.length;
    const isRecitationCorrect = similarity > 0.8;
    console.log({ transcript, cleanTranscript, cleanAyahText, similarity })

    setIsCorrect(isRecitationCorrect);

    if (isRecitationCorrect) {
     onCorrectRecitation?.();
    } else {
     onIncorrectRecitation?.();
    }
   };

   recognition.onerror = (event: any) => {
    console.error('Speech recognition error', event);
    setIsListening(false);
   };

   recognition.onend = () => {
    setIsListening(false);
   };

   recognition.start();
  } else {
   alert('Speech recognition not supported');
  }
 }, [data?.text, onCorrectRecitation, onIncorrectRecitation]);

 if (isLoading) return <div><Skeleton className="w-[100px] h-[20px] rounded-full" /></div>

 return (
  <div className="practice-session p-4 bg-white rounded-lg shadow-md">
   <div className="mb-4">
    <h2 className="text-xl font-bold text-center mb-2">Practice Recitation</h2>
    <p className="text-center text-lg arabic-text">{data?.text}</p>
   </div>

   <div className="flex flex-col items-center space-y-4">
    {isListening ? (
     <Button
      variant="destructive"
      onClick={() => {
       // Stop speech recognition if possible
       (window as any).webkitSpeechRecognition?.stopRecognition?.();
       setIsListening(false);
      }}
     >
      <MicOff className="mr-2 h-5 w-5" /> Stop Listening
     </Button>
    ) : (
     <Button onClick={startListening}>
      <Mic className="mr-2 h-5 w-5" /> Start Recitation
     </Button>
    )}

    {recognitionResult && (
     <div className="mt-4 text-center">
      <p className="mb-2">Your Recitation: {recognitionResult}</p>
      {isCorrect !== null && (
       <div className="flex items-center justify-center space-x-2">
        {isCorrect ? (
         <>
          <Check className="text-green-500 h-6 w-6" />
          <span className="text-green-500">Correct Recitation!</span>
         </>
        ) : (
         <>
          <X className="text-red-500 h-6 w-6" />
          <span className="text-red-500">Please try again</span>
         </>
        )}
       </div>
      )}
     </div>
    )}
   </div>
  </div>
 );
};  