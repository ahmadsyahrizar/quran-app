'use client'

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
 Play,
 Pause,
 SkipForward,
 SkipBack,
 RefreshCw
} from 'lucide-react';
import { useAyahById } from '@/hooks/useQuranApp';

interface AudioPlayerProps {
 ayahNumber: number
 onProgress?: (progress: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
 ayahNumber,
 onProgress
}) => {
 const audioRef = useRef<HTMLAudioElement>(null);
 const [isPlaying, setIsPlaying] = useState(false);
 const [progress, setProgress] = useState(0);
 const { data, isLoading } = useAyahById(ayahNumber);

 const togglePlay = () => {
  if (audioRef.current) {
   if (isPlaying) {
    audioRef.current.pause();
   } else {
    audioRef.current.play();
   }
   setIsPlaying(!isPlaying);
  };
 }

 const handleTimeUpdate = () => {
  if (audioRef.current) {
   const progressPercent =
    (audioRef.current.currentTime / audioRef.current.duration) * 100;
   setProgress(progressPercent);
   onProgress?.(progressPercent);
  }
 };

 const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (audioRef.current) {
   const seekTime =
    (parseFloat(e.target.value) / 100) * audioRef.current.duration;
   audioRef.current.currentTime = seekTime;
   setProgress(parseFloat(e.target.value));
  }
 };

 if (isLoading) return <div>Loading audio</div>

 return (
  <div className="audio-player flex flex-col items-center w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
   <audio
    ref={audioRef}
    src={data?.audio}
    onTimeUpdate={handleTimeUpdate}
    onEnded={() => setIsPlaying(false)}
   />

   <div className="w-full mb-4">
    <input
     type="range"
     min="0"
     max="100"
     value={progress.toString()}
     onChange={handleSeek}
     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
   </div>

   <div className="flex items-center space-x-4">
    <Button
     variant="ghost"
     size="icon"
     onClick={() => {
      if (audioRef.current) {
       audioRef.current.currentTime = 0;
       audioRef.current.play();
       setIsPlaying(true);
      }
     }}
    >
     <RefreshCw className="h-5 w-5" />
    </Button>

    <Button
     variant="ghost"
     size="icon"
     onClick={() => {
      if (audioRef.current) {
       audioRef.current.currentTime =
        Math.max(0, audioRef.current.currentTime - 10);
      }
     }}
    >
     <SkipBack className="h-5 w-5" />
    </Button>

    <Button
     onClick={togglePlay}
     variant="default"
     size="lg"
     className="rounded-full"
    >
     {isPlaying ? (
      <Pause className="h-6 w-6" />
     ) : (
      <Play className="h-6 w-6" />
     )}
    </Button>

    <Button
     variant="ghost"
     size="icon"
     onClick={() => {
      if (audioRef.current) {
       audioRef.current.currentTime =
        Math.min(
         audioRef.current.duration,
         audioRef.current.currentTime + 10
        );
      }
     }}
    >
     <SkipForward className="h-5 w-5" />
    </Button>
   </div>
  </div>
 );
};