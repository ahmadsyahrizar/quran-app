import { useState, useEffect } from 'react';
import { BookmarkData } from '@/types';

export const useBookmarks = () => {
 const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);

 useEffect(() => {
  // Load bookmarks from localStorage on mount
  const savedBookmarks = localStorage.getItem('quran-bookmarks');
  if (savedBookmarks) {
   setBookmarks(JSON.parse(savedBookmarks));
  }
 }, []);

 const addBookmark = (bookmark: BookmarkData) => {
  const updatedBookmarks = [
   ...bookmarks,
   { ...bookmark, timestamp: Date.now() }
  ];
  setBookmarks(updatedBookmarks);
  localStorage.setItem('quran-bookmarks', JSON.stringify(updatedBookmarks));
 };

 const removeBookmark = (bookmarkToRemove: BookmarkData) => {
  const updatedBookmarks = bookmarks.filter(
   b => !(
    b.surahNumber === bookmarkToRemove.surahNumber &&
    b.ayahNumber === bookmarkToRemove.ayahNumber
   )
  );
  setBookmarks(updatedBookmarks);
  localStorage.setItem('quran-bookmarks', JSON.stringify(updatedBookmarks));
 };

 const clearBookmarks = () => {
  setBookmarks([]);
  localStorage.removeItem('quran-bookmarks');
 };

 return {
  bookmarks,
  addBookmark,
  removeBookmark,
  clearBookmarks
 };
};