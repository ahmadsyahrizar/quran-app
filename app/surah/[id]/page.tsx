'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/mainLayout';
import { AudioPlayer } from '@/components/ui/audioPlayer';
import { BookmarkManager } from '@/components/bookmark';
import { PracticeSession } from '@/components/practiceMode/practiceSession';
import { useBookmarks } from '@/hooks/useBookmark';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSurahById } from '@/hooks/useQuranApp';
import { Bookmark, TextSelect } from 'lucide-react';
import { TajweedToggle, TajwidRenderer } from '@/components/tajweed/tajweedRender';
import TajweedReference from '@/components/tajweedReference';

export default function SurahDetailPage() {
 const { id } = useParams()

 const surahId = parseInt(id as string, 10);
 const { data: surahData, isLoading } = useSurahById(surahId);
 const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
 const [selectedAyah, setSelectedAyah] = useState<number | null>(null);
 const [isTajweedEnabled, setIsTajweedEnabled] = useState(true);

 // Memoize bookmarked ayahs for this specific surah
 const bookmarkedAyahs = useMemo(() => {
  return bookmarks
   .filter(bookmark => bookmark.surahNumber === surahId)
   .map(bookmark => bookmark.ayahNumber);
 }, [bookmarks, surahId]);

 // Check if a specific ayah is bookmarked
 const isAyahBookmarked = (ayahNumber: number) =>
  bookmarkedAyahs.includes(ayahNumber);

 // Auto-select first bookmarked ayah when page loads
 useEffect(() => {
  if (surahData && bookmarkedAyahs.length > 0 && !selectedAyah) {
   // Select the first bookmarked ayah
   setSelectedAyah(bookmarkedAyahs[0]);
  } else if (surahData && !selectedAyah) {
   // If no bookmarks, select first ayah by default
   setSelectedAyah(1);
  }
 }, [surahData, bookmarkedAyahs, selectedAyah]);

 console.log({ selectedAyah })
 if (isLoading) return <p>Loading...</p>;
 if (!surahData) return <p>Surah not found</p>;

 return (
  <MainLayout>
   <div className="container mx-auto">
    <div className="flex justify-between items-center mb-6">
     <h1 className="text-3xl font-bold">
      {surahData.surah.englishName} ({surahData.surah.name})
     </h1>

     <TajweedToggle
      enabled={isTajweedEnabled}
      onToggle={setIsTajweedEnabled}
     />
     <BookmarkManager
      currentSurah={surahId}
      currentAyah={selectedAyah || 1}
      bookmarks={bookmarks}
      onAddBookmark={addBookmark}
      onRemoveBookmark={removeBookmark}
     />
    </div>

    <div className="grid md:grid-cols-2 gap-6">
     <Card>
      <CardHeader>
       <CardTitle>Ayahs</CardTitle>
       <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <TextSelect className="h-4 w-4" />
        <span>Hover for Tajweed details</span>
       </div>
      </CardHeader>

      <CardContent>
       <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {surahData.ayahs.map((ayah) => {
         // Determine if this ayah is the currently selected one
         const isSelected = selectedAyah === ayah.number;
         const isBookmarked = isAyahBookmarked(ayah.number);

         return (
          <div
           key={ayah.number}
           className={`
            p-3 rounded-lg cursor-pointer 
            relative
            transition-all duration-200 ease-in-out
            ${isSelected
             ? 'bg-primary/10 border-primary border'
             : 'bg-gray-100 hover:bg-gray-200'}
            ${isBookmarked
             ? 'border-2 border-yellow-400' : ''}
          `}
           onClick={() => {
            setSelectedAyah(ayah.number)
           }
           }
          >
           {/* Bookmark Indicator */}
           {isBookmarked && (
            <div
             className="absolute top-2 right-2 text-yellow-500"
             title="Bookmarked Ayah"
            >
             <Bookmark className="h-5 w-5 fill-current" />
            </div>
           )}

           {/* Tajweed-Aware Text Rendering */}
           <TajwidRenderer
            text={ayah.text}
            enableHighlighting={isTajweedEnabled}
           />
           <p className="text-sm mt-2"> {ayah.numberInSurah}. {ayah.translation}</p>
          </div>
         )
        }
        )}
       </div>
      </CardContent>
     </Card>

     <Card>
      <CardHeader>
       <CardTitle>Practice & Audio</CardTitle>
      </CardHeader>
      <CardContent>
       {selectedAyah !== null && (
        <>
         <AudioPlayer ayahNumber={selectedAyah} />
         <div className="mt-6">
          <PracticeSession
           ayahNumber={selectedAyah}
          />
         </div>
        </>
       )}
      </CardContent>
     </Card>
    </div>

    {bookmarkedAyahs.length > 0 && (
     <Card className="mt-6">
      <CardHeader>
       <CardTitle>Bookmarked Ayahs</CardTitle>
      </CardHeader>
      <CardContent>
       <div className="flex flex-wrap gap-2">
        {bookmarkedAyahs.map(ayahNumber => (
         <button
          key={ayahNumber}
          onClick={() => setSelectedAyah(ayahNumber)}
          className={`
                      ${selectedAyah === ayahNumber
            ? 'bg-yellow-200 text-yellow-900'
            : 'bg-yellow-100 text-yellow-800'}
                      px-2 py-1 rounded-full 
                      text-xs flex items-center
                      hover:bg-yellow-200
                      transition-colors duration-200
                    `}
         >
          <Bookmark className="h-3 w-3 mr-1 fill-current" />
          Ayah {ayahNumber}
         </button>
        ))}
       </div>
      </CardContent>
     </Card>
    )}

    <TajweedReference />
   </div>
  </MainLayout >
 );
}