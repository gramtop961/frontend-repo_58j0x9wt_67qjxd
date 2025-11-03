import { Bell, Search, User, LogOut } from 'lucide-react';

function Navbar({ title, signedIn, onSignOut }) {
  return (
    <header className="sticky top-0 z-40 h-16 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-lg shadow-blue-900/40" />
          <h1 className="text-sm md:text-base lg:text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search"
              className="w-64 rounded-lg bg-white/5 border border-white/10 pl-10 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            />
          </div>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Bell className="h-4 w-4 text-slate-300" />
          </button>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 grid place-items-center">
              <User className="h-4 w-4 text-slate-200" />
            </div>
            {signedIn ? (
              <button
                onClick={onSignOut}
                className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            ) : (
              <span className="text-sm text-slate-400">Guest</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
