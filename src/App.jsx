import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthPanel from './components/AuthPanel';
import Dashboard from './components/Dashboard';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({ name: 'Guest', email: '' });

  useEffect(() => {
    const saved = localStorage.getItem('saas_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          setUser(parsed);
          setSignedIn(true);
        }
      } catch {}
    }
  }, []);

  const handleAuth = (payload) => {
    const nextUser = {
      name: payload?.name?.trim() || 'Member',
      email: payload.email,
    };
    setUser(nextUser);
    setSignedIn(true);
    localStorage.setItem('saas_user', JSON.stringify(nextUser));
  };

  const handleSignOut = () => {
    setSignedIn(false);
    setUser({ name: 'Guest', email: '' });
    localStorage.removeItem('saas_user');
  };

  const welcome = useMemo(() => (signedIn ? `Welcome back, ${user.name}` : 'Welcome to Your Identity Hub'), [signedIn, user.name]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar title={welcome} signedIn={signedIn} onSignOut={handleSignOut} />
      <div className="flex">
        <Sidebar signedIn={signedIn} />
        <main className="flex-1 min-h-[calc(100vh-64px)] p-4 md:p-6 lg:p-8 overflow-y-auto">
          {!signedIn ? (
            <AuthPanel onAuth={handleAuth} />
          ) : (
            <Dashboard user={user} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
