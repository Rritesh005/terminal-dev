import { useState } from 'react';
import { 
  Key, 
  User, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

interface BetaWizardProps {
  onToast: (msg: string) => void;
  theme: 'dark' | 'dim' | 'light';
}

export function BetaWizard({ onToast, theme }: BetaWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isLight = theme === 'light';

  // Handle step 1 to 2 transition
  const handleNextStep1 = () => {
    if (!name.trim()) {
      setErrorMsg('Name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('A valid email containing "@" is required.');
      return;
    }
    setErrorMsg('');
    setStep(2);
    onToast('Step 1 complete. Enter security credentials.');
  };

  // Handle step 2 to 3 transition with validation
  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      onToast('Validation error: Passwords do not match.');
      return;
    }
    setErrorMsg('');
    setStep(3);
    onToast(`Beta Registration successful for ${name}!`);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setStep(1);
  };

  return (
    <div className="bg-[#18181B] border border-zinc-800 rounded-xl p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-800">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
          <Key className="w-4 h-4 text-zinc-400" />
          Beta Terminal access Setup
        </h4>
        <div className="flex items-center gap-1">
          <span className={`w-4 h-4 rounded-full font-mono text-[10px] flex items-center justify-center font-bold ${step >= 1 ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-500'}`}>1</span>
          <span className="w-4 h-0.5 bg-zinc-800"></span>
          <span className={`w-4 h-4 rounded-full font-mono text-[10px] flex items-center justify-center font-bold ${step >= 2 ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-500'}`}>2</span>
          <span className="w-4 h-0.5 bg-zinc-800"></span>
          <span className={`w-4 h-4 rounded-full font-mono text-[10px] flex items-center justify-center font-bold ${step === 3 ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-500'}`}>3</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Step 01: Profile credentials</span>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Register for beta developer logs access keys. Let us configure your local instance details.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full bg-[#09090B] border border-zinc-800 focus:border-zinc-500 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white outline-none"
                placeholder="Developer Alias"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full bg-[#09090B] border border-zinc-800 focus:border-zinc-500 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white outline-none"
                placeholder="dev-email@terminal.log"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 font-mono italic leading-snug flex items-center gap-1">
              <Info className="w-3.5 h-3.5 inline shrink-0" />
              {errorMsg}
            </p>
          )}

          <button
            onClick={handleNextStep1}
            className="w-full bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-transform"
          >
            <span>Configure Security Keys</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleNextStep2} className="space-y-4 animate-fade-in">
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Step 02: Access codes configuration</span>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Create a password to encrypt credentials in local cookies & storage.
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full bg-[#09090B] border border-zinc-800 focus:border-zinc-500 rounded-lg p-2 text-xs font-mono text-white outline-none"
              placeholder="Developer Secret Password (Min 6 chars)"
              required
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full bg-[#09090B] border border-zinc-800 focus:border-zinc-500 rounded-lg p-2 text-xs font-mono text-white outline-none"
              placeholder="Confirm Secret Password"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 font-mono italic leading-snug flex items-center gap-1">
              <Info className="w-3.5 h-3.5 inline shrink-0" />
              {errorMsg}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setStep(1);
              }}
              className="flex-1 bg-transparent hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-mono font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <span>Validate Keys</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="text-center py-4 space-y-4 animate-fade-in">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h5 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              Registration authorized
            </h5>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
              Welcome aboard, developer <span className="text-emerald-400">{name}</span>. Your unique dev key payload has been generated and cached locally.
            </p>
          </div>

          {/* Display client config details mock */}
          <div className="bg-[#09090B] border border-zinc-800 rounded p-2.5 text-left font-mono text-[9px] text-zinc-500 space-y-1">
            <div className="text-emerald-500 text-[10px] font-bold uppercase mb-1">=== DECODED JWT INSTANCE ===</div>
            <div>ALGORITHM: HS256</div>
            <div>SUBSCRIBER: {email}</div>
            <div>SERVER: cloud-run-v3</div>
            <div>STATUS: SECURE_MD5_HASHED</div>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-mono font-bold text-zinc-400 hover:text-white underline transition-colors"
          >
            Reset Form Wizard Setup
          </button>
        </div>
      )}
    </div>
  );
}
