'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/mainLayout';
import { Input } from '@/components/ui/input';
import { useAllSurahs } from '@/hooks/useQuranApp';

export default function SurahListPage() {
  const { data: surahs, isLoading } = useAllSurahs();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = surahs?.filter(
    surah =>
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.name.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Surahs</h1>

        <Input
          placeholder="Search Surahs"
          className="mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <p>Loading surahs...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {filteredSurahs?.map(surah => (
              <Link
                key={surah.number}
                href={`/surah/${surah.number}`}
                className="block"
              >
                <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold">{surah.englishName}</h2>
                      <p className="text-sm text-gray-500">{surah.name}</p>
                    </div>
                    <span className="text-gray-400">{surah.number}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}