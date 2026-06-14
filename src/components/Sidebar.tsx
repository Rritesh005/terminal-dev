import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  RefreshCw, 
  MessageSquare, 
  StickyNote as StickyIcon, 
  Coins, 
  Users, 
  Github, 
  Twitter, 
  Mail, 
  CheckSquare 
} from 'lucide-react';
import { 
  StickyNote, 
  GuestbookEntry, 
  CryptoRate, 
  ContributorCard, 
  INITIAL_NOTES, 
  INITIAL_GUESTBOOK, 
  INITIAL_CRYPTO, 
  CONTRIBUTORS 
} from '../types';

interface SidebarProps {
  theme: 'dark' | 'dim' | 'light';
  onToast: (msg: string) => void;
}

export function Sidebar({ theme, onToast }: SidebarProps) {
  // Sticky Notes State
  const [notes, setNotes] = useState<StickyNote[]>(() => {
    const saved = localStorage.getItem('terminal_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteColor, setNewNoteColor] = useState<'yellow' | 'amber' | 'slate'>('yellow');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  // Guestbook State
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(() => {
    const saved = localStorage.getItem('terminal_guestbook');
    return saved ? JSON.parse(saved) : INITIAL_GUESTBOOK;
  });
  const [guestName, setGuestName] = useState('');
  const [guestMsg, setGuestMsg] = useState('');

  // Crypto / Ticker State
  const [cryptoRates, setCryptoRates] = useState<CryptoRate[]>(() => {
    const saved = localStorage.getItem('terminal_crypto');
    return saved ? JSON.parse(saved) : INITIAL_CRYPTO;
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('terminal_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('terminal_guestbook', JSON.stringify(guestbook));
  }, [guestbook]);

  useEffect(() => {
    localStorage.setItem('terminal_crypto', JSON.stringify(cryptoRates));
  }, [cryptoRates]);

  // Handle Note Create
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const newNote: StickyNote = {
      id: `note-${Date.now()}`,
      text: newNoteText.trim(),
      color: newNoteColor,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setNotes([newNote, ...notes]);
    setNewNoteText('');
    onToast('Sticky note created!');
  };

  // Handle Note Delete
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    onToast('Sticky note deleted.');
  };

  // Handle Note Edit Start
  const startEditNote = (note: StickyNote) => {
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
  };

  // Handle Note Edit Save
  const saveEditedNote = (id: string) => {
    if (!editingNoteText.trim()) return;
    setNotes(notes.map(n => n.id === id ? { ...n, text: editingNoteText.trim() } : n));
    setEditingNoteId(null);
    onToast('Sticky note updated.');
  };

  // Handle Guestbook Add
  const handleAddGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMsg.trim()) return;
    const entry: GuestbookEntry = {
      id: `guest-${Date.now()}`,
      name: guestName.trim(),
      message: guestMsg.trim(),
      createdAt: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
    setGuestbook([entry, ...guestbook]);
    setGuestName('');
    setGuestMsg('');
    onToast(`Added entry to public Guestbook by ${entry.name}!`);
  };

  // Refresh Rates Handler (Simulating Real-Time Crypto API lookup)
  const refreshRates = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const updated = cryptoRates.map(rate => {
        // randomly fluctuate price between -3% and +3%
        const fluctuation = 1 + (Math.random() * 0.06 - 0.03);
        const newPrice = Number((rate.price * fluctuation).toFixed(rate.symbol === 'INR' || rate.symbol === 'GAS' ? 2 : 1));
        const diffPercent = Number(((fluctuation - 1) * 100).toFixed(2));
        return {
          ...rate,
          price: newPrice,
          change24h: Number((rate.change24h + diffPercent).toFixed(2))
        };
      });
      setCryptoRates(updated);
      setIsRefreshing(false);
      onToast('Real-time rates refreshed!');
    }, 600);
  };

  // Border and container styles based on Theme
  const isLight = theme === 'light';
  
  const boxBg = isLight ? 'bg-white' : 'bg-[#18181B]';
  const borderStyle = isLight ? 'border border-[#E4E4E7]' : 'border border-[#27272A]';
  const labelColor = isLight ? 'text-gray-500' : 'text-gray-400';
  const titleColor = isLight ? 'text-gray-900 border-gray-200' : 'text-white border-zinc-800';
  const inputBg = isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-[#09090B] border-[#27272A] text-white';

  return (
    <div className="space-y-6">
      
      {/* 1. Crypto & Currency Tracker */}
      <section className={`${boxBg} ${borderStyle} rounded-xl p-5 transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-4 border-b pb-2 ${titleColor}">
          <div className="flex items-center gap-2">
            <Coins className={`w-4 h-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`} />
            <h3 className={`font-mono font-bold text-sm tracking-wider uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Live Tech Market Rates
            </h3>
          </div>
          <button 
            onClick={refreshRates} 
            disabled={isRefreshing}
            className={`p-1.5 rounded-lg border ${isLight ? 'border-zinc-200 hover:bg-zinc-100 text-zinc-600' : 'border-[#27272A] hover:bg-zinc-800 text-zinc-400'} disabled:opacity-50 active:scale-95 transition-all`}
            title="Refresh live rates"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="space-y-3">
          {cryptoRates.map((rate) => (
            <div key={rate.symbol} className="flex justify-between items-center py-1.5 border-b border-dashed border-zinc-800 last:border-0">
              <div>
                <span className={`font-mono text-xs font-bold leading-none ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
                  {rate.symbol}
                </span>
                <p className="text-[10px] text-zinc-500 font-mono leading-tight">{rate.name}</p>
              </div>
              <div className="text-right font-mono">
                <p className={`text-xs font-semibold ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                  {rate.symbol === 'INR' ? '₹' : rate.symbol === 'GAS' ? '' : '$'}
                  {rate.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <span className={`text-[10px] font-medium leading-none ${rate.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-zinc-500 font-mono mt-3 text-center">
          *Rates simulated. Fluctuations log dynamically using local state.
        </p>
      </section>

      {/* 2. Developer Sticky Notes (CRUD) */}
      <section className={`${boxBg} ${borderStyle} rounded-xl p-5 transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-4 border-b pb-2 ${titleColor}">
          <div className="flex items-center gap-2">
            <StickyIcon className={`w-4 h-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`} />
            <h3 className={`font-mono font-bold text-sm tracking-wider uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Dev Scratchpad (CRUD)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 bg-zinc-800/10 px-1.5 py-0.5 rounded">
            {notes.length} Notes
          </span>
        </div>

        {/* Note Creator form */}
        <form onSubmit={handleAddNote} className="mb-4">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Type a developer note..."
            maxLength={180}
            rows={2}
            className={`w-full outline-none border focus:border-zinc-400 rounded-lg p-2 text-xs font-mono resize-none transition-all ${inputBg}`}
          />
          <div className="flex justify-between items-center mt-2">
            {/* Color switcher */}
            <div className="flex items-center gap-1.5">
              {(['yellow', 'amber', 'slate'] as const).map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewNoteColor(color)}
                  className={`w-4 h-4 rounded-full border-2 transition-transform ${
                    color === 'yellow' ? 'bg-amber-300' : 
                    color === 'amber' ? 'bg-orange-400' : 'bg-slate-500'
                  } ${newNoteColor === color ? 'border-zinc-400 scale-110' : 'border-transparent'}`}
                  title={`${color} sticker`}
                />
              ))}
            </div>
            
            <button
              type="submit"
              className={`flex items-center gap-1 font-mono font-bold text-xs bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white rounded-lg px-2.5 py-1.5 active:scale-95 transition-all`}
            >
              <Plus className="w-3.5 h-3.5" />
              Save Note
            </button>
          </div>
        </form>

        {/* Notes list */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {notes.length === 0 ? (
            <div className="text-center py-6 text-zinc-500 font-mono text-xs border border-dashed border-zinc-800 rounded-lg">
              No sticky notes yet. Make some!
            </div>
          ) : (
            notes.map((note) => {
              const bgClass = 
                note.color === 'yellow' ? 'bg-[#FCF6B1] text-zinc-900 border-[#E5DF9E]' :
                note.color === 'amber' ? 'bg-[#FFD97D] text-zinc-900 border-[#E5C370]' :
                'bg-zinc-800 text-zinc-100 border-zinc-700';

              return (
                <div 
                  key={note.id} 
                  className={`p-3 rounded-lg border flex flex-col justify-between group relative transition-all ${bgClass}`}
                >
                  <div className="flex-1">
                    {editingNoteId === note.id ? (
                      <div className="flex gap-1.5 items-start">
                        <textarea
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                          className="w-full text-xs font-mono leading-relaxed bg-white/40 border border-zinc-900/30 rounded p-1 text-zinc-900 focus:outline-none"
                          rows={2}
                          autoFocus
                        />
                        <button 
                          onClick={() => saveEditedNote(note.id)}
                          className="p-1 rounded bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs font-mono font-semibold whitespace-pre-wrap leading-relaxed">
                        {note.text}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center border-t border-zinc-900/10 mt-2.5 pt-1.5">
                    <span className="text-[9px] opacity-70 font-mono font-bold uppercase">{note.createdAt}</span>
                    <div className="flex gap-1">
                      {editingNoteId !== note.id && (
                        <button
                          onClick={() => startEditNote(note)}
                          className="p-1 rounded hover:bg-black/10 text-zinc-900 hover:text-black transition-colors"
                          title="Edit note text"
                        >
                          <Edit2 className="w-3 h-3 text-current" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 rounded hover:bg-black/10 text-zinc-900 hover:text-rose-700 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 3. Developer Guestbook */}
      <section className={`${boxBg} ${borderStyle} rounded-xl p-5 transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-4 border-b pb-2 ${titleColor}">
          <div className="flex items-center gap-2">
            <MessageSquare className={`w-4 h-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`} />
            <h3 className={`font-mono font-bold text-sm tracking-wider uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Guestbook & board
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 bg-zinc-800/10 px-1.5 py-0.5 rounded">
            {guestbook.length} entries
          </span>
        </div>

        {/* Guestbook input form */}
        <form onSubmit={handleAddGuestbook} className="space-y-2.5 mb-4">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Name / Handle"
            maxLength={25}
            required
            className={`w-full outline-none border focus:border-zinc-400 rounded-lg p-2 text-xs font-mono transition-all ${inputBg}`}
          />
          <input
            type="text"
            value={guestMsg}
            onChange={(e) => setGuestMsg(e.target.value)}
            placeholder="Leave a short comment..."
            maxLength={140}
            required
            className={`w-full outline-none border focus:border-zinc-400 rounded-lg p-2 text-xs font-mono transition-all ${inputBg}`}
          />
          <button
            type="submit"
            className="w-full text-center bg-zinc-950 hover:bg-zinc-900 text-white border border-zinc-700 hover:border-zinc-600 font-mono font-semibold text-xs py-1.5 rounded-lg active:scale-[98%] transition-all"
          >
            Post Message
          </button>
        </form>

        {/* Guestbook Board list */}
        <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
          {guestbook.map((entry) => (
            <div key={entry.id} className="text-xs font-mono py-2 border-b border-dashed border-zinc-800 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                  {entry.name}
                </span>
                <span className="text-[9px] text-zinc-500 font-normal">{entry.createdAt}</span>
              </div>
              <p className={`${isLight ? 'text-zinc-600' : 'text-zinc-400'} leading-relaxed`}>
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contributors / Fetch-style Developer Cards */}
      <section className={`${boxBg} ${borderStyle} rounded-xl p-5 transition-colors duration-300`}>
        <div className="flex items-center gap-2 mb-4 border-b pb-2 ${titleColor}">
          <Users className={`w-4 h-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`} />
          <h3 className={`font-mono font-bold text-sm tracking-wider uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Contributors Crew
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CONTRIBUTORS.map((c) => (
            <div 
              key={c.id} 
              className={`p-3 rounded-lg border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'} flex items-center gap-3`}
            >
              <img 
                src={c.avatarUrl} 
                alt={c.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover grayscale border border-zinc-600"
              />
              <div className="flex-1 min-w-0">
                <h4 className={`text-xs font-bold leading-tight font-mono ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {c.name}
                </h4>
                <p className="text-[10px] text-zinc-500 font-mono">{c.role}</p>
                <div className="flex gap-2 mt-1.5 text-zinc-400">
                  <a href={`mailto:${c.email}`} className="hover:text-white transition-colors" title={c.email}>
                    <Mail className="w-3 h-3" />
                  </a>
                  {c.socials.githubUrl && (
                    <a href={c.socials.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                  {c.socials.twitterUrl && (
                    <a href={c.socials.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Twitter className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
