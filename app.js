import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Globe, 
  Volume2, 
  Star, 
  CheckCircle, 
  Maximize, 
  Minimize, 
  X,
  Sparkles,
  Award
} from 'lucide-react';

// --- 1. Global Realms (Countries) with detailed Icons/Facts ---
const realms = [
  { code: 'en', name: 'English World', flag: '🇺🇸', animal: 'Bald Eagle (National Bird)', color: 'bg-blue-600' },
  { code: 'si', name: 'ශ්‍රී ලංකාව', flag: '🇱🇰', animal: 'Wali Kukula (Jungle Fowl)', color: 'bg-orange-600' },
  { code: 'hi', name: 'भारत', flag: '🇮🇳', animal: 'Bengal Tiger (National Animal)', color: 'bg-orange-400' },
  { code: 'es', name: 'España', flag: '🇪🇸', animal: 'Spanish Imperial Eagle', color: 'bg-red-600' },
  { code: 'fr', name: 'France', flag: '🇫🇷', animal: 'Gallic Rooster', color: 'bg-blue-800' },
  { code: 'zh', name: '中国', flag: '🇨🇳', animal: 'Giant Panda', color: 'bg-red-700' }
];

// --- 2. Enhanced Story Database ---
const storyDatabase = [
  {
    id: 'eli-the-honest',
    title: "Eli the Honest Elephant",
    author: "MyShopLK Magic",
    cover: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
    theme: "Honesty",
    moral: "A truthful heart is the most beautiful flower in the jungle.",
    pages: [
      { text: "Eli the little elephant loved peanuts more than anything. Today, he promised Mama not to eat any before dinner.", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
      { text: "But the peanuts smelled so good! Eli ate them all and told Mama, 'A naughty monkey took them!'", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" },
      { text: "Soon, Eli's tummy began to rumble and grumble. He felt very heavy and sad for lying.", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80" },
      { text: "Eli went to Mama and said, 'I am sorry Mama, I ate the peanuts.' Mama gave him a big, warm hug.", image: "https://images.unsplash.com/photo-1564750975191-0fa80d70c443?auto=format&fit=crop&w=800&q=80" },
      { text: "Mama told him that telling the truth is a superpower. Eli felt light as a feather and happy again!", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" }
    ]
  }
];

export default function App() {
  const [currentBook, setCurrentBook] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedRealm, setSelectedRealm] = useState(realms[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [flipDir, setFlipDir] = useState('');
  const bookRef = useRef(null);

  // Handle Full Screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const openBook = (book) => {
    setCurrentBook(book);
    setPageIndex(0);
  };

  const closeBook = () => setCurrentBook(null);

  const turnPage = (dir) => {
    if (flipDir) return; // Prevent double clicking
    setFlipDir(dir === 'next' ? 'animate-page-flip-next' : 'animate-page-flip-prev');
    
    setTimeout(() => {
      if (dir === 'next' && pageIndex < currentBook.pages.length) setPageIndex(pageIndex + 1);
      if (dir === 'prev' && pageIndex > 0) setPageIndex(pageIndex - 1);
      setFlipDir('');
    }, 600);
  };

  const readAloud = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedRealm.code;
    utterance.pitch = 1.1;
    utterance.rate = 0.85; // Slightly slower for kids
    window.speechSynthesis.speak(utterance);
  };

  // --- Home / Library View ---
  if (!currentBook) {
    return (
      <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
        {/* Animated Background Magic */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-900 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        {/* Global Navigation */}
        <nav className="relative z-20 flex flex-col md:flex-row justify-between items-center px-8 py-6 border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0">
          <div className="flex items-center gap-4 mb-6 md:mb-0 group cursor-pointer">
            <div className="p-3 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
                MyShopLK <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 italic">Magic Kids</span>
              </h1>
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Interactive Story Realm</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 bg-white/5 p-1.5 rounded-[2rem] border border-white/10 backdrop-blur-md">
            {realms.map((realm) => (
              <button
                key={realm.code}
                onClick={() => setSelectedRealm(realm)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-500 ${
                  selectedRealm.code === realm.code 
                  ? `${realm.color} shadow-lg shadow-black/40 scale-105` 
                  : 'hover:bg-white/10 text-white/60'
                }`}
              >
                <span className="text-xl drop-shadow-sm">{realm.flag}</span>
                <span className={`text-xs font-black uppercase tracking-wider ${selectedRealm.code === realm.code ? 'block' : 'hidden lg:block'}`}>
                  {realm.name}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Hero Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 rounded-full border border-white/10 text-yellow-400 font-black text-xs mb-8 animate-bounce uppercase tracking-widest">
              <Award size={14} className="animate-spin-slow" /> Current Realm: {selectedRealm.animal}
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              Discover <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">The Magic</span>
            </h2>
            <p className="text-lg text-white/50 font-medium leading-relaxed">
              Step into a world where every page turn is a journey. Localized stories designed to nurture young minds across the globe.
            </p>
          </div>

          {/* Book Shelf */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {storyDatabase.map((book) => (
              <div 
                key={book.id} 
                onClick={() => openBook(book)}
                className="group relative cursor-pointer perspective-1000"
              >
                {/* 3D Card Hover Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-yellow-500 to-pink-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-60 transition duration-700"></div>
                
                <div className="relative bg-[#111827] rounded-[3rem] p-8 h-full flex flex-col border border-white/10 transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-1 shadow-2xl">
                  <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-8 shadow-inner-xl">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute top-6 left-6">
                       <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/20">
                        {book.theme}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-4 text-white group-hover:text-orange-400 transition-colors leading-tight">{book.title}</h3>
                  <p className="text-white/40 text-sm font-semibold mb-8 flex-grow leading-relaxed italic line-clamp-2">"{book.moral}"</p>
                  
                  <button className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black rounded-[1.5rem] shadow-xl shadow-orange-600/20 group-hover:shadow-orange-600/40 transition-all uppercase text-sm tracking-widest">
                    Start Reading <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Space */}
          <div className="mt-32 p-12 rounded-[4rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mb-8">Magical Partners</p>
            <div className="h-32 flex items-center justify-center border-4 border-dashed border-white/5 rounded-3xl text-white/10 font-black italic text-2xl">
              Google AdSense Banner Area
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- Magical Reader View ---
  const isEndPage = pageIndex === currentBook.pages.length;
  const pageData = isEndPage ? null : currentBook.pages[pageIndex];

  return (
    <div className="fixed inset-0 bg-[#010409] flex flex-col items-center justify-center z-[100] p-4 md:p-10 font-sans overflow-hidden">
      
      {/* Immersive Controls */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-8 z-50">
        <button 
          onClick={closeBook}
          className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 transition backdrop-blur-md"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" /> 
          <span className="hidden sm:inline uppercase text-xs tracking-widest">Close Book</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Realm</span>
             <span className="text-sm font-bold text-orange-400">{selectedRealm.flag} {selectedRealm.name}</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <button 
            onClick={toggleFullScreen}
            className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition active:scale-90"
          >
            {isFullScreen ? <Minimize size={22} /> : <Maximize size={22} />}
          </button>
        </div>
      </div>

      {/* The 3D Book Experience */}
      <div className="relative w-full max-w-7xl h-full max-h-[850px] flex items-center justify-center perspective-[3000px]">
        
        {/* Shadow & Depth */}
        <div className="absolute inset-y-10 left-1/2 w-24 bg-black/60 blur-[120px] z-0 -translate-x-1/2 pointer-events-none" />

        <div className={`relative w-full h-full bg-[#fdfaf5] shadow-[0_60px_120px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden flex flex-col md:flex-row border-[12px] border-[#1a1a1a] transition-all duration-700 ${flipDir}`}>
          
          {/* Central Binding Shadow */}
          <div className="absolute inset-y-0 left-1/2 w-1.5 bg-black/10 z-20 -translate-x-1/2 hidden md:block" />
          <div className="absolute inset-y-0 left-1/2 w-12 bg-gradient-to-r from-black/5 via-transparent to-black/5 z-10 -translate-x-1/2 hidden md:block" />

          {isEndPage ? (
            <div className="w-full h-full bg-[#fafafa] flex flex-col items-center justify-center p-16 text-center animate-fade-in">
               <div className="relative mb-12">
                  <div className="absolute inset-0 bg-yellow-400/20 blur-3xl animate-pulse"></div>
                  <Award className="text-yellow-500 w-32 h-32 relative z-10 animate-bounce" />
               </div>
              <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 uppercase tracking-tighter">The End</h2>
              <div className="max-w-2xl bg-white p-12 rounded-[4rem] shadow-2xl border-b-8 border-orange-500 relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                  Golden Moral
                </div>
                <p className="text-4xl font-serif text-gray-800 italic leading-snug">
                  "{currentBook.moral}"
                </p>
              </div>
              <button 
                onClick={closeBook} 
                className="mt-16 px-12 py-5 bg-black text-white font-black rounded-3xl shadow-2xl hover:bg-orange-600 transition-all duration-300 uppercase tracking-[0.2em] active:scale-95"
              >
                Back to Library
              </button>
            </div>
          ) : (
            <>
              {/* Left Page (Story Content) */}
              <div className="w-full md:w-1/2 h-full p-10 md:p-20 flex flex-col justify-center bg-[#fdfbf7] relative border-b md:border-b-0 md:border-r-2 border-black/5">
                <div className="absolute top-10 left-10 flex items-center gap-4">
                  <button 
                    onClick={() => readAloud(pageData.text)}
                    className="p-4 bg-orange-100 text-orange-600 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-lg active:scale-90"
                    title="Read Aloud"
                  >
                    <Volume2 size={28} />
                  </button>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Chapter {pageIndex + 1}</span>
                </div>
                
                {/* Responsive Large Story Text */}
                <div className="max-w-md mx-auto">
                   <p className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.15] md:leading-[1.1] selection:bg-orange-200 select-none">
                    {pageData.text}
                  </p>
                </div>

                <div className="absolute bottom-10 left-10 text-[9px] font-black uppercase tracking-[0.5em] text-gray-400">
                  {currentBook.author} • Realm of {selectedRealm.animal}
                </div>
              </div>

              {/* Right Page (Illustration) */}
              <div className="w-full md:w-1/2 h-full bg-[#eee] relative overflow-hidden group">
                <img 
                  key={pageIndex}
                  src={pageData.image} 
                  alt="Story scene" 
                  className="w-full h-full object-cover animate-fade-in-scale" 
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-10 right-10 text-white font-black text-sm p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20">
                   Page {pageIndex + 1}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Magical Navigation Bar */}
      <div className="mt-12 flex items-center gap-10 z-50">
        <button 
          onClick={() => turnPage('prev')} 
          disabled={pageIndex === 0}
          className={`group flex items-center gap-4 px-10 py-5 rounded-3xl font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl ${
            pageIndex === 0 
            ? 'bg-white/5 text-white/10 cursor-not-allowed opacity-50' 
            : 'bg-white text-black hover:bg-orange-500 hover:text-white active:scale-90'
          }`}
        >
          <ChevronLeft size={28} className="group-hover:-translate-x-2 transition-transform" />
        </button>
        
        {/* Progress Tracker */}
        <div className="hidden lg:flex gap-4">
          {[...Array(currentBook.pages.length + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPageIndex(i);
                window.speechSynthesis.cancel();
              }}
              className={`h-3 rounded-full transition-all duration-700 ${
                i === pageIndex ? 'w-16 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]' : 'w-3 bg-white/20 hover:bg-white/40'
              }`} 
            />
          ))}
        </div>

        <button 
          onClick={() => turnPage('next')} 
          disabled={isEndPage}
          className={`group flex items-center gap-4 px-12 py-5 rounded-3xl font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl ${
            isEndPage 
            ? 'bg-white/5 text-white/10 cursor-not-allowed opacity-50' 
            : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105 hover:shadow-orange-600/50 active:scale-90'
          }`}
        >
          {pageIndex === currentBook.pages.length - 1 ? 'End Tale' : 'Next'} <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <style>{`
        @keyframes page-flip-next {
          0% { transform: perspective(3000px) rotateY(0deg) scale(1); }
          50% { transform: perspective(3000px) rotateY(-8deg) scale(0.96); opacity: 0.8; }
          100% { transform: perspective(3000px) rotateY(0deg) scale(1); }
        }
        @keyframes page-flip-prev {
          0% { transform: perspective(3000px) rotateY(0deg) scale(1); }
          50% { transform: perspective(3000px) rotateY(8deg) scale(0.96); opacity: 0.8; }
          100% { transform: perspective(3000px) rotateY(0deg) scale(1); }
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(1.15); filter: blur(10px); }
          to { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-page-flip-next { animation: page-flip-next 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-page-flip-prev { animation: page-flip-prev 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-fade-in-scale { animation: fade-in-scale 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .shadow-inner-xl {
          box-shadow: inset 0 0 40px rgba(0,0,0,0.5);
        }
        
        /* Perspective utilities */
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}