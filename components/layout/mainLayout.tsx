import {
 Home,
 Book,
 Bookmark,
 Play,
 Menu
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavLink from '../navLink';

interface MainLayoutProps {
 children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
 return (
  <div className="min-h-screen flex flex-col">
   {/* Mobile Navigation */}
   <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
    <div className="flex justify-between items-center p-4">
     <Sheet>
      <SheetTrigger asChild>
       <Button variant="outline" size="icon">
        <Menu className="h-6 w-6" />
       </Button>
      </SheetTrigger>
      <SheetContent side="left">
       <nav className="flex flex-col space-y-4 pt-8">
        <NavLink href="/" icon={<Home />} label="Home" />
        <NavLink href="/surah" icon={<Book />} label="Surahs" />
        <NavLink href="/practice" icon={<Play />} label="Practice" />
        <NavLink href="/bookmark" icon={<Bookmark />} label="Bookmarks" />
       </nav>
      </SheetContent>
     </Sheet>
     <h1 className="text-xl font-bold">Quran Learning App</h1>
    </div>
   </header>

   {/* Desktop Navigation */}
   <div className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-gray-100 p-6 shadow-md">
    <nav className="flex flex-col space-y-4">
     <h1 className="text-2xl font-bold mb-6 text-center">Quran App</h1>
     <NavLink href="/" icon={<Home />} label="Home" />
     <NavLink href="/surah" icon={<Book />} label="Surahs" />
     <NavLink href="/practice" icon={<Play />} label="Practice" />
     <NavLink href="/bookmarks" icon={<Bookmark />} label="Bookmarks" />
    </nav>
   </div>

   {/* Main Content Area */}
   <main className="flex-grow md:ml-64 mt-16 md:mt-0 p-4">
    {children}
   </main>

   {/* Bottom Navigation for Mobile */}
   <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t">
    <div className="flex justify-around py-3">
     <NavLink href="/" icon={<Home />} label="Home" mobile />
     <NavLink href="/surah" icon={<Book />} label="Surahs" mobile />
     <NavLink href="/practice" icon={<Play />} label="Practice" mobile />
     <NavLink href="/bookmark" icon={<Bookmark />} label="Bookmarks" mobile />
    </div>
   </nav>
  </div>
 );
};