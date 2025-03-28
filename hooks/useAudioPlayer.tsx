import { useState, useRef, useCallback } from 'react';

export const useAudioPlayer = () => {
 const audioRef = useRef<HTMLAudioElement | null>(null);
 const [isPlaying, setIsPlaying] = useState(false);
 const [progress, setProgress] = useState(0);
 const [duration, setDuration] = useState(0);

 const play = useCallback(() => {
  audioRef.current?.play();
  setIsPlaying(true);
 }, []);

 const pause = useCallback(() => {
  audioRef.current?.pause();
  setIsPlaying(false);
 }, []);

 const seek = useCallback((time: number) => {
  if (audioRef.current) {
   audioRef.current.currentTime = time;
  }
 }, []);

 const handleLoadedMetadata = useCallback(() => {
  if (audioRef.current) {
   setDuration(audioRef.current.duration);
  }
 }, []);

 const handleTimeUpdate = useCallback(() => {
  if (audioRef.current) {
   const currentProgress =
    (audioRef.current.currentTime / audioRef.current.duration) * 100;
   setProgress(currentProgress);
  }
 }, []);

 return {
  audioRef,
  isPlaying,
  progress,
  duration,
  play,
  pause,
  seek,
  handleLoadedMetadata,
  handleTimeUpdate,
  setIsPlaying
 };
};