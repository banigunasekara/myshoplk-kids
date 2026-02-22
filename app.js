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
  Sparkles
} from 'lucide-react';

// --- 1. Global Realms (Countries) with detailed Icons/Facts ---
const realms = [
  { code: 'en', name: 'English World', flag: '🇺🇸', animal: 'Bald Eagle', color: 'bg-blue-600' },
  { code: 'si', name: 'ශ්‍රී ලංකාව', flag: '🇱🇰', animal: 'Jungle Fowl', color: 'bg-orange-600' },
  { code: 'hi', name: 'भारत', flag: '🇮🇳', animal: 'Bengal Tiger', color: 'bg-orange-400' },
  { code: 'es', name: 'España', flag: '🇪🇸', animal: 'Bull', color: 'bg-red-600' },
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
      document.documentElement.requestFullscreen();
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
    setFlipDir(dir === 'next' ? 'animate-page-flip-next' : 'animate-page-flip-prev');
    setTimeout(() => {
      if (dir === 'next' && pageIndex < currentBook.pages.length) setPageIndex(pageIndex + 1);
      if (dir === 'prev' && pageIndex > 0) setPageIndex(pageIndex - 1);
      setFlipDir('');
    }, 400);
  };

  const readAloud = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedRealm.code;
    utterance.pitch = 1.1;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // --- Home / Library View ---
  if (!currentBook) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-gold selection:text-black overflow-x-hidden">
        {/* Animated Background Magic */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        {/* Global Navigation */}
        <nav className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 py-6 border-b border-white/10 backdrop-blur-md bg-black/20">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
              <BookOpen className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              MyShopLK <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Magical Kids</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
            {realms.map((realm) => (
              <button
                key={realm.code}
                onClick={() => setSelectedRealm(realm)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  selectedRealm.code === realm.code 
                  ? `${realm.color} shadow-lg scale-105` 
                  : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{realm.flag}</span>
                <span className={`text-xs font-bold uppercase ${selectedRealm.code === realm.code ? 'block' : 'hidden md:block'}`}>
                  {realm.name}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Hero Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-orange-400 font-bold text-sm mb-6 animate-bounce">
              <Sparkles size={16} /> Exploring with the {selectedRealm.animal}
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Stories that Spark <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Imagination</span>
            </h2>
          </div>

          {/* Book Shelf */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {storyDatabase.map((book) => (
              <div 
                key={book.id} 
                onClick={() => openBook(book)}
                className="group relative cursor-pointer"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-[#1e293b] rounded-[2.5rem] p-6 h-full flex flex-col border border-white/10">
                  <div className="relative h-72 rounded-3xl overflow-hidden mb-6 shadow-2xl">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-black rounded-lg uppercase tracking-widest">
                        {book.theme}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-white">{book.title}</h3>
                  <p className="text-gray-400 text-sm font-medium mb-6 flex-grow italic">"{book.moral}"</p>
                  <button className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-colors duration-300 uppercase tracking-tighter">
                    Open Magic Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Passive Income Footer Space */}
          <div className="mt-20 p-8 rounded-[3rem] bg-white/5 border border-white/10 text-center">
            <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-4">Space for Parents & Partners</p>
            <div className="h-24 flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl text-white/20 font-black italic">
              Google AdSense Display Banner
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
    <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-50 p-4 md:p-8 font-sans overflow-hidden">
      {/* Reader Nav */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-6 z-10">
        <button 
          onClick={closeBook}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition"
        >
          <X size={20} /> <span className="hidden md:inline">Exit Library</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-black text-gray-400">
            {selectedRealm.flag} {selectedRealm.name} Realm
          </div>
          <button 
            onClick={toggleFullScreen}
            className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"
          >
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>

      {/* The 3D Book Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[750px] flex items-center justify-center">
        
        {/* Book Spine Shadow Effect */}
        <div className="absolute inset-y-0 left-1/2 w-16 bg-black/20 blur-2xl z-20 -translate-x-1/2 hidden md:block" />

        <div className={`relative w-full h-full bg-[#f8f5f0] shadow-[0_50px_100px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden flex flex-col md:flex-row border-4 border-[#333] ${flipDir}`}>
          
          {isEndPage ? (
            <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-8 animate-bounce">
                <CheckCircle className="text-green-500 w-16 h-16" />
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">The End!</h2>
              <div className="max-w-xl bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-orange-200">
                <h3 className="text-orange-600 font-black uppercase text-sm tracking-widest mb-4 flex items-center justify-center gap-2">
                  <Star className="fill-orange-600" /> Wisdom Gained <Star className="fill-orange-600" />
                </h3>
                <p className="text-3xl font-serif text-gray-800 italic leading-relaxed">
                  "{currentBook.moral}"
                </p>
              </div>
              <button onClick={closeBook} className="mt-12 px-10 py-4 bg-orange-600 text-white font-black rounded-2xl shadow-lg hover:bg-orange-700 transition uppercase tracking-widest">
                Browse More Magic
              </button>
            </div>
          ) : (
            <>
              {/* Left Page (Text) */}
              <div className="w-full md:w-1/2 h-full p-8 md:p-16 flex flex-col justify-center bg-[#fdfbf7] relative border-b md:border-b-0 md:border-r border-black/5">
                <button 
                  onClick={() => readAloud(pageData.text)}
                  className="absolute top-8 left-8 p-3 bg-orange-100 text-orange-600 rounded-2xl hover:bg-orange-200 transition"
                  title="Listen to the magic"
                >
                  <Volume2 size={24} />
                </button>
                <div className="absolute bottom-8 left-8 text-[10px] font-black uppercase tracking-widest text-gray-300">
                  {currentBook.title} • Page {pageIndex + 1}
                </div>
                {/* Large Responsive Text */}
                <p className="text-3xl md:text-5xl font-serif text-gray-800 leading-tight md:leading-snug select-none">
                  {pageData.text}
                </p>
              </div>

              {/* Right Page (Image) */}
              <div className="w-full md:w-1/2 h-full bg-gray-100 relative overflow-hidden group">
                <img 
                  key={pageIndex}
                  src={pageData.image} 
                  alt="Story scene" 
                  className="w-full h-full object-cover animate-fade-in" 
                />
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] pointer-events-none" />
                <div className="absolute bottom-8 right-8 text-[10px] font-black uppercase tracking-widest text-white/50">
                   Page {pageIndex + 1} • {selectedRealm.animal} Territory
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Magical Navigation Bar */}
      <div className="mt-10 flex items-center gap-8 z-10">
        <button 
          onClick={() => turnPage('prev')} 
          disabled={pageIndex === 0}
          className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 ${
            pageIndex === 0 
            ? 'bg-white/5 text-white/10 cursor-not-allowed' 
            : 'bg-white text-black hover:bg-orange-500 hover:text-white shadow-xl hover:shadow-orange-500/40'
          }`}
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        
        {/* Page Dots */}
        <div className="hidden md:flex gap-3">
          {[...Array(currentBook.pages.length + 1)].map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ${
                i === pageIndex ? 'w-12 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'w-2 bg-white/20'
              }`} 
            />
          ))}
        </div>

        <button 
          onClick={() => turnPage('next')} 
          disabled={isEndPage}
          className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 ${
            isEndPage 
            ? 'bg-white/5 text-white/10 cursor-not-allowed' 
            : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95'
          }`}
        >
          {pageIndex === currentBook.pages.length - 1 ? 'Finish Tale' : 'Next Page'} <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes page-flip-next {
          0% { transform: perspective(2000px) rotateY(0deg); }
          50% { transform: perspective(2000px) rotateY(-5deg) scale(0.98); }
          100% { transform: perspective(2000px) rotateY(0deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-page-flip-next { animation: page-flip-next 0.4s ease-in-out; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}