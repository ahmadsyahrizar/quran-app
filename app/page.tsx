// src/pages/index.tsx
'use client'

import React from 'react';
import { MainLayout } from '@/components/layout/mainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAllSurahs } from '@/hooks/useQuranApp';

export default function HomePage() {
  const { data: surahs, isLoading } = useAllSurahs();

  return (
    <MainLayout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to Quran Learning</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Begin your Quranic journey with our interactive learning tools.</p>
              <div className="mt-4 space-x-2">
                <Link href={"/surah"}>
                  <Button variant="default">Start Reading</Button>
                </Link>
                {/* <Button variant="outline">Practice Mode</Button> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Surahs Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading surahs...</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {surahs?.slice(0, 9).map(surah => (
                    <Button
                      key={surah.number}
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/surah/${surah.number}`}>
                        {surah.englishName}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}