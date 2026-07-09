import React, { useState } from 'react';
import { Search, Download, Star, Box, Check } from 'lucide-react';
import { useToast } from './ToastProvider';

export default function PluginInstallerContainer() {
  const { showToast } = useToast();
  const [query, setQuery] = useState('');
  const [installing, setInstalling] = useState<number | null>(null);
  const [installed, setInstalled] = useState<number[]>([]);

  // Mock data for display
  const mockPlugins = [
    { id: 1, name: 'EssentialsX', description: 'The essential plugin for Spigot servers.', downloads: '5.2M', rating: 4.8 },
    { id: 2, name: 'WorldEdit', description: 'In-game voxel map editor.', downloads: '4.1M', rating: 4.9 },
    { id: 3, name: 'Vault', description: 'Economy, Permission & Chat API.', downloads: '3.8M', rating: 4.7 },
  ];

  const handleInstall = (id: number, name: string) => {
    setInstalling(id);
    showToast(`Starting installation of ${name}...`, 'success');
    
    setTimeout(() => {
      setInstalling(null);
      setInstalled(prev => [...prev, id]);
      showToast(`${name} installed successfully!`, 'success');
    }, 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Plugin Installer</h2>
          <p className="text-slate-400">Search and install plugins directly to your server.</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for plugins (e.g., Essentials, WorldEdit)..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-slate-200 outline-none focus:border-indigo-500 transition-colors shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlugins.map(plugin => {
            const isInstalling = installing === plugin.id;
            const isInstalled = installed.includes(plugin.id);
            
            return (
              <div key={plugin.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-indigo-500/50 transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Box className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400" /> {plugin.rating}
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{plugin.name}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">{plugin.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="text-xs text-slate-500">{plugin.downloads} downloads</span>
                  <button 
                    onClick={() => !isInstalled && !isInstalling && handleInstall(plugin.id, plugin.name)}
                    disabled={isInstalled || isInstalling}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isInstalled 
                        ? 'bg-green-500/10 text-green-400' 
                        : isInstalling
                        ? 'bg-indigo-500/10 text-indigo-400 opacity-70 cursor-wait'
                        : 'bg-indigo-500/10 hover:bg-indigo-500 text-indigo-300 hover:text-white'
                    }`}
                  >
                    {isInstalled ? <Check className="w-4 h-4" /> : <Download className={`w-4 h-4 ${isInstalling ? 'animate-bounce' : ''}`} />} 
                    {isInstalled ? 'Installed' : isInstalling ? 'Installing...' : 'Install'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
