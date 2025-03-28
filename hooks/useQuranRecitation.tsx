import { useState, useCallback } from 'react';
import { BookmarkData } from '@/types';

export const useQuranRecitation = () => {
 const [currentSurah, setCurrentSurah] = useState<number | null>(null);
 const [currentAyah, setCurrentAyah] = useState<number | null>(null);
 const [bookmarks, setBookmarks] = useState<BookmarkData[]>(() => {
  // Load bookmarks from localStorage
  const savedBookmarks = localStorage.getItem('quran-bookmarks');
  return savedBookmarks ? JSON.parse(savedBookmarks) : [];
 });

 const addBookmark = useCallback((bookmark: BookmarkData) => {
  const updatedBookmarks = [
   ...bookmarks,
   { ...bookmark, timestamp: Date.now() }
  ];
  setBookmarks(updatedBookmarks);
  localStorage.setItem('quran-bookmarks', JSON.stringify(updatedBookmarks));
 }, [bookmarks]);

 const removeBookmark = useCallback((bookmarkToRemove: BookmarkData) => {
  const updatedBookmarks = bookmarks.filter(
   b => !(
    b.surahNumber === bookmarkToRemove.surahNumber &&
    b.ayahNumber === bookmarkToRemove.ayahNumber
   )
  );
  setBookmarks(updatedBookmarks);
  localStorage.setItem('quran-bookmarks', JSON.stringify(updatedBookmarks));
 }, [bookmarks]);

 const navigateToBookmark = useCallback((bookmark: BookmarkData) => {
  setCurrentSurah(bookmark.surahNumber);
  setCurrentAyah(bookmark.ayahNumber);
 }, []);

 return {
  currentSurah,
  currentAyah,
  bookmarks,
  setCurrentSurah,
  setCurrentAyah,
  addBookmark,
  removeBookmark,
  navigateToBookmark
 };
};