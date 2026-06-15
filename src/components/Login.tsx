import React, { useState } from 'react';
import { FVBankLogo } from './SharedSVGs';
import { AlertCircle, ChevronDown, Check } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRollingModal, setShowRollingModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please provide both your Username/Email and Password.');
      return;
    }

    const lowerUsername = username.toLowerCase().trim();
    if (
      (lowerUsername === 'coradavemiller@gmail.com' || lowerUsername === 'coramiller') &&
      password === 'coramiller'
    ) {
      setIsLoading(true);
      setShowRollingModal(true);

      // Simulate a premium 2-second authentication and ledger synchronization rolling modal
      setTimeout(() => {
        setIsLoading(false);
        setShowRollingModal(false);
        onLoginSuccess();
      }, 2000);
    } else {
      setError('Invalid username or password. Please use sandbox credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans">
      {/* Upper Navigation Row */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <FVBankLogo size={32} className="text-slate-900" />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span>Language</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 py-1.5">
              {['English', 'Spanish', 'French', 'Deutsch'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setShowLanguageDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-between"
                >
                  <span>{lang}</span>
                  {selectedLang === lang && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Center Layout Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-12">
        <div className="w-full max-w-[420px] text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight font-sans">Login</h1>
          
          {/* Form Container Measuring the Clean Utility Grid Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-left transition-all">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Username Input Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 text-slate-950 font-medium border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm placeholder-slate-400"
                  placeholder="Enter username or email"
                  autoComplete="username"
                />
              </div>

              {/* Password Input Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 text-slate-950 font-medium border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm placeholder-••••••••"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>

              {/* Error Box */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Remember & Forgot options */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-slate-950 focus:ring-slate-900"
                  />
                  <span>Remember Me</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please contact customer support to reset your password.");
                  }}
                  className="text-slate-900 hover:underline font-semibold transition-colors"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-black hover:bg-slate-900 text-white font-bold rounded-2xl text-sm tracking-wide transition-all shadow-lg shadow-slate-900/10 focus:outline-none focus:ring-2 focus:ring-slate-500/40 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>



          {/* Registration Notice */}
          <div className="mt-5 text-sm text-slate-550 justify-center flex gap-1">
            <span className="text-slate-500">New to FV Bank?</span>
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                alert('Account registration is locked. Please check with your bank administrator.');
              }}
              className="text-slate-905 font-bold hover:underline transition-colors text-black"
            >
              Register here
            </a>
          </div>
        </div>
      </main>



      {/* Elegant Rolling Modal Overlay */}
      {showRollingModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-slate-200 shadow-2xl flex flex-col items-center text-center space-y-5 animate-fade-in">
            {/* Spinner */}
            <div className="relative flex items-center justify-center">
              <div className="animate-spin rounded-full h-14 w-14 border-[4px] border-slate-100 border-t-black"></div>
              <div className="absolute w-3 h-3 bg-black rounded-full"></div>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Securing Access</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Establishing multi-sig wallet address synchronization with FV Bank gateway...
              </p>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-black h-full rounded-full animate-pulse" style={{ width: '100%', animationDuration: '1s' }}></div>
            </div>

            <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 tracking-widest animate-pulse">
              STATUS: AUTHENTICATING
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
