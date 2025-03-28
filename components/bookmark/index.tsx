import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, BookmarkMinus } from 'lucide-react';
import { BookmarkData } from '@/types';

interface BookmarkManagerProps {
 currentSurah: number;
 currentAyah: number;
 bookmarks: BookmarkData[];
 onAddBookmark: (bookmark: BookmarkData) => void;
 onRemoveBookmark: (bookmark: BookmarkData) => void;
}

export const BookmarkManager: React.FC<BookmarkManagerProps> = ({
 currentSurah,
 currentAyah,
 bookmarks,
 onAddBookmark,
 onRemoveBookmark
}) => {
 const isBookmarked = bookmarks.some(
  b => b.surahNumber === currentSurah && b.ayahNumber === currentAyah
 );

 const toggleBookmark = () => {
  const bookmarkData: BookmarkData = {
   surahNumber: currentSurah,
   ayahNumber: currentAyah,
   timestamp: Date.now()
  };

  if (isBookmarked) {
   onRemoveBookmark(bookmarkData);
  } else {
   onAddBookmark(bookmarkData);
  }
 };

 return (
  <Button
   variant={isBookmarked ? "destructive" : "default"}
   onClick={toggleBookmark}
  >
   {isBookmarked ? (
    <>
     <BookmarkMinus className="mr-2 h-5 w-5" /> Remove Bookmark
    </>
   ) : (
    <>
     <BookmarkPlus className="mr-2 h-5 w-5" /> Add Bookmark
    </>
   )}
  </Button>
 );
};