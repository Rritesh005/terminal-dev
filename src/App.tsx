import { useState, useEffect } from 'react';
import { 
  Terminal, 
  Moon, 
  Sun, 
  Sparkles, 
  Search, 
  FileText, 
  BookOpen, 
  CornerDownRight, 
  Rss, 
  Github, 
  Linkedin, 
  CheckCircle,
  HelpCircle,
  Heart,
  Globe,
  BellRing
} from 'lucide-react';
import { sidebar } from 'motion/react'; // Ensure motion is loaded or imported elegantly if needed
import { MOCK_ARTICLES, Article, StickyNote, MAIN_ARTICLE_ID } from './types';
import { Reader } from './components/Reader';
import { Sidebar } from './components/Sidebar';
import { BetaWizard } from './components/BetaWizard';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'dim' | 'light'>(() => {
    const saved = localStorage.getItem('terminal_theme');
    return (saved as any) || 'dark';
  });

  // Active Reading Article State
  const [activeArticle, setActiveArticle] = useState<Article>(() => {
    const defaultArt = MOCK_ARTICLES.find(a => a.id === MAIN_ARTICLE_ID);
    return defaultArt || MOCK_ARTICLES[0];
  });

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast array for interactive terminal console actions
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  // Filtered articles based on search query
  const filteredArticles = MOCK_ARTICLES.filter(article => {
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.intro.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  });

  // Sync theme changes to storage and classes
  useEffect(() => {
    localStorage.setItem('terminal_theme', theme);
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    if (theme === 'dark' || theme === 'dim') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, [theme]);

  // Handle toast notifications
  const pushToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleToggleTheme = () => {
    if (theme === 'dark') {
      setTheme('dim');
      pushToast('System: Shifted to Surgical Dim visual theme.');
    } else if (theme === 'dim') {
      setTheme('light');
      pushToast('System: Shifted to Surgical Clean White visual theme.');
    } else {
      setTheme('dark');
      pushToast('System: Shifted to Obsidian Base Dark layout (True Black).');
    }
  };

  // Theme-specific container variables
  const isLight = theme === 'light';
  const isDim = theme === 'dim';

  // Body container background and classes
  const mainBgClass = 
    isLight ? 'bg-[#FCFEFF] text-[#0A0D10]' : 
    isDim ? 'bg-[#131315] text-[#E5E1E4]' : 
    'bg-[#09090B] text-[#E5E1E4]';

  const navbarBg = 
    isLight ? 'bg-[#FCFEFF]/95 border-b border-[#E4E4E7]' : 
    'bg-black/85 border-[#27272A]';

  const secondaryText = isLight ? 'text-zinc-500' : 'text-zinc-400';
  const cardBgClass = isLight ? 'bg-zinc-50/50 hover:bg-zinc-100/60' : 'bg-[#18181B]/80 hover:bg-[#1C1C20]';
  const cardBorderClass = isLight ? 'border-[#E4E4E7]' : 'border-[#27272A]';
  const highlightColor = isLight ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-white';

  return (
    <div className={`min-h-screen ${mainBgClass} font-sans selection:bg-white selection:text-black transition-colors duration-500 pb-20`}>
      
      {/* 1. STYLED HEADER (MATCHES DEV.LOG NAVBAR) */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-400 border-b ${navbarBg}`}>
        <div className="flex justify-between items-center h-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
          {/* Logo Terminal Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center border border-zinc-800 shadow-lg">
              <Terminal className="w-4.5 h-4.5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-mono text-xs font-bold leading-none bg-white text-black px-1 rounded uppercase">PRO</span>
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider font-semibold">V1.4.2</span>
              </div>
              <h1 className="text-lg font-bold tracking-tighter uppercase font-sans text-white flex items-center gap-1">
                terminal <span className="text-zinc-400 font-medium font-mono text-base">DEV.LOG</span>
              </h1>
            </div>
          </div>

          {/* Center quick summary parameters indicator */}
          <div className="hidden md:flex items-center gap-4 font-mono text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              NODE: ACTIVE
            </span>
            <span className="text-zinc-600">|</span>
            <span>THEME: <span className="font-bold text-white uppercase">{theme}</span></span>
            <span className="text-zinc-600">|</span>
            <span className="hidden lg:inline text-zinc-500">UTC: {new Date().toISOString().slice(11, 19)}</span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher Button */}
            <button
              id="theme-toggle"
              onClick={handleToggleTheme}
              className={`p-2 rounded-lg border ${isLight ? 'border-zinc-200 bg-zinc-100 text-zinc-900' : 'border-[#27272A] hover:bg-zinc-900'} active:scale-95 transition-all text-xs font-mono font-bold flex items-center gap-1.5`}
              title="Change visual noir presets"
            >
              {isLight ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline font-mono text-[10px] text-zinc-700">WHITE</span>
                </>
              ) : isDim ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-300" />
                  <span className="hidden sm:inline font-mono text-[10px] text-zinc-300">DIM</span>
                </>
              ) : (
                <>
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline font-mono text-[10px] text-emerald-400">NOIR</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. SUB-BAR INFO STATUS INDICATOR */}
      <div className={`border-b ${isLight ? 'border-[#E4E4E7]' : 'border-[#27272A]'} py-2 px-4 md:px-8 text-xs font-mono select-none bg-[#111113]/30`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-500">
            <span className="text-white font-bold">PORTFOLIO LABS:</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
              Guestbook
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
              CRUD sticky-cards
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
              Ticker rates
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
              Valid Wizard
            </span>
          </div>
          <div className="text-zinc-500 text-[10px] sm:text-right">
            Active Workspace Sandbox | User: {navigator.userAgent.slice(0, 16)}...
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        
        {/* Bento Board Stats (Quick Interactive Highlights) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-xl border ${cardBorderClass} ${cardBgClass} transition-colors flex flex-col justify-between`}>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500">CORE LOG</span>
              <p className={`text-base font-bold font-mono mt-1 ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
                1px Hairline Logic
              </p>
            </div>
            <p className="text-zinc-500 text-[11px] leading-snug mt-2">
              Bespoke visual spacing mirrors complex codes predictably.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${cardBorderClass} ${cardBgClass} transition-colors flex flex-col justify-between`}>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500">ACTIVE SESSION</span>
              <p className={`text-base font-bold font-mono mt-1 ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
                True Offline Cache
              </p>
            </div>
            <p className="text-zinc-500 text-[11px] leading-snug mt-2">
              Saves guestbooks and notes instantly to client-side database.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${cardBorderClass} ${cardBgClass} transition-colors flex flex-col justify-between`}>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500">READER PRESET</span>
              <p className={`text-base font-bold font-mono mt-1 ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
                High-Contrast Grayscale
              </p>
            </div>
            <p className="text-zinc-500 text-[11px] leading-snug mt-2">
              Minimizes optical strain using tonal shifting instead of shadows.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-br from-zinc-850 to-zinc-900 rounded-xl border border-zinc-700 flex flex-col justify-between text-white shadow-lg overflow-hidden relative group">
            <span className="absolute -bottom-6 -right-6 text-white opacity-[0.02] transform -rotate-12 select-none font-extrabold text-9xl">DEV</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] font-mono uppercase text-zinc-400">STABILITY BENCHMARK</span>
              </div>
              <p className="text-sm font-bold font-mono mt-2 text-white">
                100% Client-Side Render
              </p>
            </div>
            <p className="text-zinc-400 text-[11px] mt-2.5 relative z-10">
              No slow network queries. Zero-flicker loading speeds.
            </p>
          </div>
        </section>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL / SIDEBAR (lg:col-span-4) - Interactive Lists & Labs widgets */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* "DYNAMIC SEARCH-AS-YOU-TYPE LIST" OF ARTICLES */}
            <div className={`rounded-xl border ${cardBorderClass} p-5 ${isLight ? 'bg-white' : 'bg-[#18181B]'} transition-colors duration-305`}>
              <div className="border-b pb-3 mb-4 flex justify-between items-center bg-transparent">
                <div className="flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-zinc-400" />
                  <h3 className={`font-mono font-bold text-sm tracking-wider uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Developer Log Records
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800/10 px-1.5 py-0.5 rounded">
                  {filteredArticles.length} Loaded
                </span>
              </div>

              {/* Search as you type input */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, categories..."
                  className={`w-full outline-none border focus:border-zinc-500 rounded-lg pl-9 pr-3 py-2 text-xs font-mono transition-all ${
                    isLight ? 'bg-zinc-50 border-zinc-250 text-zinc-900' : 'bg-[#09090B] border-[#27272A] text-white'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2 text-[10px] font-mono text-zinc-500 hover:text-white"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Interactive log nodes */}
              <div className="space-y-2">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 font-mono text-xs border border-dashed border-zinc-800 rounded-lg">
                    No matching logs found.
                  </div>
                ) : (
                  filteredArticles.map((article) => {
                    const isSelected = activeArticle.id === article.id;
                    const logBorder = isSelected 
                      ? 'border-white' 
                      : isLight ? 'border-zinc-200 hover:border-zinc-400' : 'border-zinc-800/50 hover:border-zinc-700';
                    const logBg = isSelected 
                      ? (isLight ? 'bg-zinc-100 text-zinc-950 font-bold' : 'bg-zinc-800/60 text-white font-bold') 
                      : 'bg-transparent';

                    return (
                      <button
                        key={article.id}
                        onClick={() => {
                          setActiveArticle(article);
                          pushToast(`System: Loaded "${article.title}"`);
                        }}
                        className={`w-full text-left p-3 rounded-lg border text-xs font-mono flex items-start gap-2 transition-all ${logBorder} ${logBg}`}
                      >
                        <div className="mt-0.5">
                          {isSelected ? (
                            <CornerDownRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-650 mt-1.5 shrink-0" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">
                              {article.category}
                            </span>
                            <span className="text-[9px] text-zinc-500">{article.date}</span>
                          </div>
                          <h4 className={`font-semibold line-clamp-1 leading-snug transition-colors ${
                            isSelected ? 'text-white' : isLight ? 'text-zinc-800' : 'text-zinc-300'
                          }`}>
                            {article.title}
                          </h4>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* BETA WIZARD DEMO CARD */}
            <BetaWizard theme={theme} onToast={pushToast} />

            {/* GUESTBOOK, RATES, AND DEV CARDS SIDEBAR */}
            <Sidebar theme={theme} onToast={pushToast} />

          </aside>

          {/* RIGHT PANEL / READER CONTENT (lg:col-span-8) */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Interactive Reader View Box */}
            <div className={`rounded-xl border ${cardBorderClass} p-6 sm:p-8 ${isLight ? 'bg-white' : 'bg-[#131315]'} transition-colors duration-400 shadow-2xl`}>
              <Reader article={activeArticle} theme={theme} onToast={pushToast} />
            </div>

            {/* EXTRA EXPLAINER: DEVELOPER PORTFOLIO LAB NOTES */}
            <div className={`p-6 rounded-xl border ${cardBorderClass} ${isLight ? 'bg-zinc-50' : 'bg-zinc-900/40'} font-mono text-xs space-y-3`}>
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <Sparkles className="w-4.5 h-4.5 text-zinc-400 animate-pulse" />
                <h4 className="font-bold text-white uppercase tracking-widest text-[#8e9192]">Architectural blueprint notes</h4>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                This applet encapsulates all requested developer curriculum features inside a pristine, high-contrast digital logging architecture. 
              </p>
              <ul className="space-y-1.5 list-none pl-0 text-zinc-500 text-[11px] leading-snug">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 font-bold shrink-0">✔</span>
                  <span><strong>Tonal Grayscale layering:</strong> Background flows cleanly from base <code className="text-white">#09090B</code> container definitions with sharp contrast offsets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 font-bold shrink-0">✔</span>
                  <span><strong>Full Scratchpad CRUD features:</strong> Create, Read, Update, and Delete notes dynamically cached in client browser cookies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 font-bold shrink-0">✔</span>
                  <span><strong>Validated 3-Step Wizard:</strong> Step 1 form requires accurate email indicators, Step 2 checks matching passwords before authorization keys display.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 font-bold shrink-0">✔</span>
                  <span><strong>Market API rates tracker:</strong> Simulates global cryptos with real fluctuation percentage state logging.</span>
                </li>
              </ul>
            </div>

          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className={`mt-16 border-t ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pt-8 pb-12`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold leading-none bg-white text-black px-1.5 py-0.5 rounded uppercase">CRFT</span>
            <span className="font-bold tracking-tighter uppercase text-white font-sans text-sm">terminal DEV.LOG</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Articles</a>
            <a href="#" className="hover:text-white transition-colors">Projects</a>
            <a href="#" className="hover:text-white transition-colors">Laboratories</a>
            <a href="#" className="hover:text-white transition-colors">RSS</a>
          </div>

          <div className="text-xs font-mono text-zinc-500 text-center md:text-right">
            <p>© 2026 terminal DEV.LOG. Built with absolute precision.</p>
            <p className="text-[10px] text-zinc-640 opacity-70 flex items-center justify-center md:justify-end gap-1 mt-1.5">
              <span>Handcrafted for developers</span>
              <Heart className="w-3 h-3 text-rose-500 fill-current inline" />
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING TOAST TERMINAL CONSOLE CORNER */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className="p-3 bg-zinc-950/95 border border-zinc-700 rounded-lg shadow-2xl flex items-center gap-2 text-[11px] font-mono text-zinc-200 leading-snug animate-slide-up pointer-events-auto"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
