import { TajwidRule } from "@/types";

export const QURAN_API_BASE_URL = 'https://api.alquran.cloud/v1'

// Tajweed color mapping
export const TAJWEED_COLORS: Record<string, string> = {
 // Noon and Meem Rules
 'Noon Sakinah': 'text-blue-600',
 'Meem Sakinah': 'text-green-600',

 // Elongation Rules
 'Madd': 'text-purple-600',
 'Qalqalah': 'text-red-600',

 // Pronunciation Rules
 'Ikhfa': 'text-orange-600',
 'Idgham': 'text-teal-600',
 'Iqlab': 'text-pink-600',

 // Default
 'default': 'text-gray-800'
};

// Tajweed rule definitions 
export const TAJWEED_RULES: TajwidRule[] = [
 {
  id: 'noon-sakinah',
  name: 'Noon Sakinah',
  description: 'Rules for pronouncing noon with a sukoon (vowel-less noon)',
  colors: ['text-blue-600'],
  examples: ['مِن بَعْدِ', 'إِن كُنتُمْ']
 },
 {
  id: 'meem-sakinah',
  name: 'Meem Sakinah',
  description: 'Rules for pronouncing meem with a sukoon (vowel-less meem)',
  colors: ['text-green-600'],
  examples: ['هُم بَعْضٌ', 'كَم مِن']
 },
 {
  id: 'madd',
  name: 'Madd (Elongation)',
  description: 'Prolongation of vowel sounds',
  colors: ['text-purple-600'],
  examples: ['قَالَ', 'نَاسٍ']
 },
 {
  id: 'qalqalah',
  name: 'Qalqalah',
  description: 'Vibration sound for certain letters',
  colors: ['text-red-600'],
  examples: ['قُلْ', 'بَرْزَخ']
 },
 {
  id: 'ikhfa',
  name: 'Ikhfa',
  description: 'Hidden pronunciation of noon or tanween before certain letters',
  colors: ['text-orange-600'],
  examples: ['مِن قَبْلُ', 'تَنزِيل']
 },
 {
  id: 'idgham',
  name: 'Idgham',
  description: 'Merging of similar or close consonant sounds',
  colors: ['text-teal-600'],
  examples: ['وَمَا يَنطِقُ', 'مَن يَشَاء']
 }
];
