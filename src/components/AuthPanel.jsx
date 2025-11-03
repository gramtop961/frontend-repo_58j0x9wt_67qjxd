import { useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Star, User } from 'lucide-react';

function AuthPanel({ onAuth }) {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignup = mode === 'signup';

  const disabled = useMemo(() => {
    if (isSignup) return !name || !email || !password;
    return !email || !password;
  }, [isSignup, name, email, password]);

  const submit = (e) => {
    e.preventDefault();
    if (disabled) return;
    onAuth({ name, email });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-stretch">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950/60">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_500px_at_0%_-10%,rgba(37,99,235,0.25),transparent_60%),radial-gradient(800px_400px_at_100%_110%,rgba(56,189,248,0.18),transparent_60%)]" />
        <div className="aspect-[16/10] w-full">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-100 mb-2">
            Digital Identity, Elevated
          </h2>
          <p className="text-slate-300/90 text-sm md:text-base leading-relaxed">
            A futuristic, iridescent profile experience inspired by boutique SaaS design. Seamless before/after sign-in flow with a consistent chrome.
          </p>
          <div className="mt-4 flex items-center gap-3 text-slate-300/80 text-sm">
            <div className="flex items-center gap-2"><Rocket className="h-4 w-4 text-cyan-400" /> Launch ready</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-300" /> Save favorites</div>
            <div className="flex items-center gap-2"><User className="h-4 w-4 text-blue-400" /> Personalised</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
            <button
              onClick={() => setMode('signin')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${mode === 'signin' ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${mode === 'signup' ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Sign up
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm text-slate-300 mb-1">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
            />
          </div>

          <button
            disabled={disabled}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium shadow-lg shadow-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignup ? 'Create account' : 'Sign in'}
          </button>

          <p className="text-xs text-slate-400/90">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthPanel;
