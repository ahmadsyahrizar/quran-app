'use client'

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/mainLayout';
import { useBookmarks } from '@/hooks/useBookmark';
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from '@/components/ui/card';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
 Trash2,
 BookOpen,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAllSurahs } from '@/hooks/useQuranApp';

export default function BookmarksPage() {
 const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
 const { data: surahs } = useAllSurahs();

 // Filtering and sorting states
 const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
 const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
 const [searchTerm, setSearchTerm] = useState('');

 // Process bookmarks
 const processedBookmarks = useMemo(() => {
  // First, filter by surah if selected
  let filteredBookmarks = selectedSurah
   ? bookmarks.filter(b => b.surahNumber === selectedSurah)
   : bookmarks;

  // Then filter by search term (if surahs are loaded)
  if (surahs && searchTerm) {
   filteredBookmarks = filteredBookmarks.filter(bookmark => {
    const surah = surahs.find(s => s.number === bookmark.surahNumber);
    return surah?.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     surah?.name.includes(searchTerm);
   });
  }

  // Sort bookmarks
  return filteredBookmarks.sort((a, b) =>
   sortBy === 'newest'
    ? (b.timestamp || 0) - (a.timestamp || 0)
    : (a.timestamp || 0) - (b.timestamp || 0)
  );
 }, [bookmarks, selectedSurah, sortBy, searchTerm, surahs]);

 return (
  <MainLayout>
   <div className="container mx-auto">
    <div className="flex justify-between items-center mb-6">
     <h1 className="text-3xl font-bold">My Bookmarks</h1>
     {bookmarks.length > 0 && (
      <Button
       variant="destructive"
       onClick={() => {
        if (confirm('Are you sure you want to clear all bookmarks?')) {
         clearBookmarks();
        }
       }}
      >
       <Trash2 className="mr-2 h-5 w-5" /> Clear All
      </Button>
     )}
    </div>

    {/* Filtering and Sorting Controls */}
    <div className="mb-6 grid md:grid-cols-3 gap-4">
     <div>
      <label className="block mb-2 text-sm font-medium">
       Filter by Surah
      </label>
      <Select
       value={selectedSurah?.toString() || ''}
       onValueChange={(value) =>
        setSelectedSurah(value ? parseInt(value) : null)
       }
      >
       <SelectTrigger>
        <SelectValue placeholder="All Surahs">
         {selectedSurah && surahs
          ? surahs.find(s => s.number === selectedSurah)?.englishName
          : 'All Surahs'}
        </SelectValue>
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="default">All Surahs</SelectItem>
        {surahs?.map(surah => (
         <SelectItem
          key={surah.number}
          value={surah.number.toString()}
         >
          {surah.englishName}
         </SelectItem>
        ))}
       </SelectContent>
      </Select>
     </div>

     <div>
      <label className="block mb-2 text-sm font-medium">
       Sort By
      </label>
      <Select
       value={sortBy}
       onValueChange={(value: 'newest' | 'oldest') => setSortBy(value)}
      >
       <SelectTrigger>
        <SelectValue placeholder="Sort By">
         {sortBy === 'newest' ? 'Newest First' : 'Oldest First'}
        </SelectValue>
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
       </SelectContent>
      </Select>
     </div>

     <div>
      <label className="block mb-2 text-sm font-medium">
       Search Bookmarks
      </label>
      <Input
       placeholder="Search by Surah name"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="w-full"
      />
     </div>
    </div>

    {/* Bookmarks List */}
    {processedBookmarks.length === 0 ? (
     <Card>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
       <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
       <h2 className="text-xl font-semibold mb-2">
        No Bookmarks Yet
       </h2>
       <p className="text-gray-500 mb-4">
        Start exploring the Quran and add bookmarks to save your progress.
       </p>
       <Button asChild>
        <Link href="/surahs">
         Browse Surahs
        </Link>
       </Button>
      </CardContent>
     </Card>
    ) : (
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {processedBookmarks.map((bookmark) => {
       // Find the corresponding surah
       const surah = surahs?.find(s => s.number === bookmark.surahNumber);

       return (
        <Card key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
           {surah?.englishName || 'Unknown Surah'}
          </CardTitle>
          <Button
           variant="ghost"
           size="icon"
           onClick={() => removeBookmark(bookmark)}
          >
           <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
         </CardHeader>
         <CardContent>
          <div className="flex items-center justify-between">
           <div>
            <p className="text-xs text-muted-foreground">
             Ayah {bookmark.ayahNumber}
            </p>
            <p className="text-xs text-muted-foreground">
             Bookmarked on {new Date(bookmark.timestamp || 0).toLocaleDateString()}
            </p>
           </div>
           <Button
            variant="outline"
            size="sm"
            asChild
           >
            <Link href={`/surah/${bookmark.surahNumber}`}>
             View
            </Link>
           </Button>
          </div>
         </CardContent>
        </Card>
       );
      })}
     </div>
    )}
   </div>
  </MainLayout>
 );
}