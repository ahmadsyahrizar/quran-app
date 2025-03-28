import { quranApi } from "@/lib/api";
import { AyahDetails, QuranRecitation, Surah } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Hooks for React Query   
export const useAllSurahs = () => {
 return useQuery<Surah[], Error>({
  queryKey: ['surahs'],
  queryFn: quranApi.getSurahs,
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
 });
};

export const useSurahById = (surahId: number) => {
 return useQuery<QuranRecitation, Error>({
  queryKey: ['surah', surahId],
  queryFn: () => quranApi.getSurahById(surahId),
  enabled: !!surahId,
 });
}

export const useAyahById = (ayahId: number) => {
 return useQuery<AyahDetails, Error>({
  queryKey: ['ayah', ayahId],
  queryFn: () => quranApi.getAyahById(ayahId),
  enabled: !!ayahId
 })
}