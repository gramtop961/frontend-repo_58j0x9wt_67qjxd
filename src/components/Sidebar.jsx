import { Home, Rocket, Star, Settings } from 'lucide-react';

function NavItem({ icon: Icon, label, active = false }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function Sidebar({ signedIn }) {
  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-white/10 min-h-[calc(100vh-64px)] bg-slate-950/30">
      <div className="p-4 space-y-2">
        <NavItem icon={Home} label="Home" active />
        <NavItem icon={Rocket} label="Launchpad" />
        <NavItem icon={Star} label={signedIn ? 'Favorites' : 'Highlights'} />
        <div className="h-[1px] w-full bg-white/10 my-2" />
        <NavItem icon={Settings} label="Settings" />
      </div>
    </aside>
  );
}

export default Sidebar;
