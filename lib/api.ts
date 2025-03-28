import axios from 'axios';
import { Surah, QuranRecitation } from '@/types';
import { QURAN_API_BASE_URL } from '@/constants';

export const quranApi = {
 getSurahs: async (): Promise<Surah[]> => {
  console.log({ QURAN_API_BASE_URL })
  const response = await axios.get(`${QURAN_API_BASE_URL}/surah`);
  return response.data.data;
 },

 getSurahById: async (surahId: number): Promise<QuranRecitation> => {
  const [surahResponse, translationResponse] = await Promise.all([
   axios.get(`${QURAN_API_BASE_URL}/surah/${surahId}`),
   axios.get(`${QURAN_API_BASE_URL}/surah/${surahId}/id.indonesian`)
  ]);

  const surahData = surahResponse.data.data;
  const translationData = translationResponse.data.data;

  return {
   surah: {
    number: surahData.number,
    name: surahData.name,
    englishName: surahData.englishName,
    englishNameTranslation: surahData.englishNameTranslation,
    revelationType: surahData.revelationType,
    numberOfAyahs: surahData.numberOfAyahs
   },
   ayahs: surahData.ayahs.map((ayah: Record<string, string>, index: number) => ({
    number: ayah.number,
    text: ayah.text,
    translation: translationData.ayahs[index]?.text || '',
    audio: ayah.audio,
    sajdah: ayah.sajdah
   }))
  };
 },

 getAyahById: async (ayahId: number) => {
  const resp = await axios.get(`${QURAN_API_BASE_URL}/ayah/${ayahId}/ar.alafasy`)
  return resp.data.data
 }
}  
