// src/types/quran.ts
export interface Surah {
 number: number;
 name: string;
 englishName: string;
 englishNameTranslation: string;
 revelationType: 'Meccan' | 'Medinan';
 numberOfAyahs: number;
}

export interface Ayah {
 number: number;
 numberInSurah: number;
 text: string;
 translation?: string;
 audio?: string;
 sajdah?: boolean;
}

export interface QuranRecitation {
 surah: Surah;
 ayahs: Ayah[];
}

export interface BookmarkData {
 surahNumber: number;
 ayahNumber: number;
 timestamp?: number;
}

// Tajwid Rules Type
export interface TajwidRule {
 id: string;
 name: string;
 description: string;
 colors: string[];
 examples: string[];
}

export interface Edition {
 identifier: string;
 language: string;
 name: string;
 englishName: string;
 format: string;
 type: string;
 direction: string | null;
}


export interface AyahDetails {
 number: number;
 audio: string;
 audioSecondary: string[];
 text: string;
 edition: Edition;
 surah: Surah;
 numberInSurah: number;
 juz: number;
 manzil: number;
 page: number;
 ruku: number;
 hizbQuarter: number;
 sajda: boolean;
}

