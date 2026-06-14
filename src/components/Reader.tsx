import { useState } from 'react';
import { 
  Layers, 
  Code, 
  Cpu, 
  Quote, 
  CheckCircle2, 
  Clock, 
  Send,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Article } from '../types';

interface ReaderProps {
  article: Article;
  theme: 'dark' | 'dim' | 'light';
  onToast: (msg: string) => void;
}

export function Reader({ article, theme, onToast }: ReaderProps) {
  // Newsletter signup state
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isLight = theme === 'light';

  // Handle newsletter submits
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid e-mail format.');
      onToast('Subscription error: invalid email pattern.');
      return;
    }

    setErrorMessage('');
    setIsSubscribed(true);
    onToast(`Successfully subscribed "${email}" to Terminal Weekly!`);
    
    // Save to local subscriber rolls
    const subscribers = JSON.parse(localStorage.getItem('terminal_subscribers') || '[]');
    localStorage.setItem('terminal_subscribers', JSON.stringify([...subscribers, email]));
  };

  return (
    <article className="space-y-8 animate-fade-in">
      {/* 1. Article Meta Header info */}
      <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#8e9192] uppercase">
        <span className="font-bold text-zinc-500">{article.category}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
        <span>{article.date}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {article.readTime}
        </span>
      </div>

      {/* 2. Article Title */}
      <h2 className="text-3xl sm:text-4xl md:text-[40px] leading-[1.1] font-bold text-white tracking-tight uppercase font-sans break-words bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
        {article.title}
      </h2>

      {/* 3. Hero Visual Image with grayscale filters */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-850 bg-[#161618] shadow-2xl group">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full aspect-[16/9] object-cover opacity-85 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300">
          <BookOpen className="w-3 h-3 text-white" />
          <span>Active Reading Mode</span>
        </div>
      </div>

      {/* 4. Article intro with a gorgeous drop cap */}
      <div className="text-base leading-relaxed text-zinc-300 font-sans text-justify">
        <p className="first-letter:text-[54px] first-letter:font-extrabold first-letter:text-white first-letter:mr-2.5 first-letter:float-left first-letter:leading-[0.8] first-letter:h-12 first-letter:align-middle">
          {article.intro}
        </p>
      </div>

      {/* 5. Custom Dynamic section builder */}
      <div className="space-y-6 text-zinc-300 leading-relaxed font-sans text-justify">
        {article.sections.map((sect, idx) => {
          if (sect.type === 'heading') {
            return (
              <h3 
                key={idx} 
                className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-4 pb-1 border-l-2 border-white pl-4 my-2 uppercase font-sans"
              >
                {sect.content}
              </h3>
            );
          }

          if (sect.type === 'paragraph') {
            return (
              <p key={idx} className="text-zinc-300 leading-relaxed">
                {sect.content}
              </p>
            );
          }

          if (sect.type === 'bento' && Array.isArray(sect.subcontent)) {
            return (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {sect.subcontent.map((item: any, sIdx: number) => (
                  <div 
                    key={sIdx} 
                    className="p-5 bg-[#18181B] border border-zinc-800 rounded-xl hover:border-zinc-500/50 transition-all"
                  >
                    {item.icon === 'layers' ? (
                      <Layers className="w-5 h-5 text-white mb-2" />
                    ) : (
                      <Code className="w-5 h-5 text-white mb-2" />
                    )}
                    <h4 className="text-base font-bold text-white mb-1 uppercase font-sans">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            );
          }

          if (sect.type === 'quote') {
            return (
              <blockquote 
                key={idx}
                className="my-8 p-6 bg-[#201f22]/50 border border-zinc-800 italic text-white rounded-xl relative leading-relaxed overflow-hidden"
              >
                <Quote className="absolute -top-3 -left-3 text-white opacity-10 w-16 h-16 pointer-events-none" />
                <p className="relative z-10 text-base font-medium font-serif leading-relaxed italic">
                  "{sect.content}"
                </p>
              </blockquote>
            );
          }

          return null;
        })}
      </div>

      {/* 6. Newsletter Sign-Up Box ("Terminal Weekly") */}
      <section className="mt-8 p-6 sm:p-8 bg-[#18181B] rounded-xl border border-zinc-800 relative overflow-hidden">
        {/* Subtle decorative layout lines */}
        <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-zinc-800/60 pointer-events-none" />
        
        <div className="relative z-10">
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 tracking-wider">
            Surgical UI Insights
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 mt-1 uppercase tracking-tight">
            Terminal Weekly
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mb-5 leading-relaxed max-w-lg">
            Join 12,000+ developers receiving precision-engineered UI tips, styling tricks, and developer setup metrics. No fluff.
          </p>

          {isSubscribed ? (
            <div className="p-4 bg-emerald-900/20 border border-emerald-800/50 text-emerald-300 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs font-mono">
                <p className="font-bold">Subscription Confirmed.</p>
                <p className="opacity-80">You will receive the next terminal dispatch directly in your inbox.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="bg-[#09090B] border border-zinc-800 focus:border-zinc-500 rounded-lg px-3.5 py-2 text-xs font-mono text-white outline-none flex-1 transition-colors"
                  placeholder="dev@terminal.log"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {errorMessage && (
                <p className="text-xs text-rose-400 font-mono italic">{errorMessage}</p>
              )}
            </form>
          )}
        </div>
      </section>

    </article>
  );
}
