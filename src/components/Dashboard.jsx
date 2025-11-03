import { useEffect, useMemo, useState } from 'react';
import { Activity, Bell, Clock, Rocket, Star } from 'lucide-react';

function Section({ title, children, action }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function FeedList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 grid place-items-center shrink-0">
            {item.icon}
          </div>
          <div>
            <p className="text-sm text-slate-200">{item.title}</p>
            <p className="text-xs text-slate-400">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ModuleCard({ mod, onToggleStar }) {
  const starred = !!mod.starred;
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/50 to-slate-950/50 p-4 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="h-6 w-6 rounded-md bg-white/5 border border-white/10 grid place-items-center">
            <Rocket className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <h4 className="text-sm font-medium text-slate-100">{mod.title}</h4>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">{mod.desc}</p>
      </div>
      <button
        onClick={() => onToggleStar(mod.id)}
        aria-label={starred ? 'Remove from favorites' : 'Add to favorites'}
        className={`p-2 rounded-lg border transition-colors ${
          starred
            ? 'bg-yellow-400/10 border-yellow-400/20'
            : 'bg-white/5 border-white/10 hover:bg-white/10'
        }`}
      >
        <Star className={`h-4 w-4 ${starred ? 'text-yellow-300 fill-yellow-300' : 'text-slate-300'}`} />
      </button>
    </div>
  );
}

function Dashboard({ user }) {
  const [modules, setModules] = useState([
    { id: 'tmpl-kit', title: 'Template Kit v2', desc: 'A fresh set of polished templates for rapid launch.', starred: false },
    { id: 'ai-tools', title: 'AI Toolset', desc: 'Smart suggestions and automation for your workspace.', starred: true },
    { id: 'insights', title: 'Insights 1.4', desc: 'New dashboards and charts for better visibility.', starred: false },
  ]);

  const favorites = useMemo(() => modules.filter((m) => m.starred), [modules]);

  const toggleStar = (id) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)));
  };

  useEffect(() => {
    const saved = localStorage.getItem('saas_favorites');
    if (saved) {
      try {
        const favs = JSON.parse(saved);
        setModules((prev) => prev.map((m) => ({ ...m, starred: favs.includes(m.id) })));
      } catch {}
    }
  }, []);

  useEffect(() => {
    const ids = modules.filter((m) => m.starred).map((m) => m.id);
    localStorage.setItem('saas_favorites', JSON.stringify(ids));
  }, [modules]);

  const myFeed = [
    { title: 'You updated your profile', time: '2h ago', icon: <Activity className="h-4 w-4 text-cyan-400" /> },
    { title: 'Starred AI Toolset', time: '1d ago', icon: <Star className="h-4 w-4 text-yellow-300" /> },
    { title: 'Launched Template Kit v2', time: '3d ago', icon: <Rocket className="h-4 w-4 text-blue-400" /> },
  ];

  const systemFeed = [
    { title: 'System maintenance complete', time: '1h ago', icon: <Bell className="h-4 w-4 text-slate-300" /> },
    { title: 'Insights upgraded to 1.4', time: 'Yesterday', icon: <Clock className="h-4 w-4 text-slate-300" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-transparent p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-1">Welcome back, {user.name}</h2>
        <p className="text-sm text-slate-300">Here’s what’s new since your last visit.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Section title="Recent feed — My activities">
          <FeedList items={myFeed} />
        </Section>
        <Section title="Recent feed — System updates">
          <FeedList items={systemFeed} />
        </Section>
        <Section title="My favourites" action={<span className="text-xs text-slate-400">{favorites.length} saved</span>}>
          {favorites.length === 0 ? (
            <p className="text-sm text-slate-400">Star modules to see them here.</p>
          ) : (
            <ul className="space-y-3">
              {favorites.map((m) => (
                <li key={m.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-white/5 border border-white/10 grid place-items-center">
                      <Star className="h-3.5 w-3.5 text-yellow-300" />
                    </div>
                    <span className="text-sm text-slate-200">{m.title}</span>
                  </div>
                  <button onClick={() => toggleStar(m.id)} className="text-xs text-slate-400 hover:text-white">Remove</button>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      <Section title="What’s new">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <ModuleCard key={mod.id} mod={mod} onToggleStar={toggleStar} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export default Dashboard;
