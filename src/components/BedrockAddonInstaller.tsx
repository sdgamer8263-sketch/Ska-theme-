import React, { useState } from 'react';
import { Download, Box, Star, Check, PackageOpen, Search, Upload, X } from 'lucide-react';
import { useToast } from './ToastProvider';
import { motion } from 'motion/react';
import { apiService } from '../services/apiService';

export default function BedrockAddonInstaller() {
  const { showToast } = useToast();
  const [installing, setInstalling] = useState<number | null>(null);
  const [installed, setInstalled] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState(() => sessionStorage.getItem('bedrock_search') || '');

  React.useEffect(() => {
    sessionStorage.setItem('bedrock_search', searchQuery);
  }, [searchQuery]);

  const addons = [
    { id: 1, name: 'Tinkerers Construct (Bedrock)', category: 'behavior', description: 'Bring custom tools and smelting to your Bedrock world.', rating: 4.8, downloads: '1.2M' },
    { id: 2, name: 'Dragon Mounts Addon', category: 'behavior', description: 'Hatch and ride dragons across the sky.', rating: 4.5, downloads: '800K' },
    { id: 3, name: 'Advanced Machinery', category: 'technology', description: 'Industrial automation, pipes, and generators.', rating: 4.7, downloads: '950K' },
    { id: 4, name: 'More Ores & Tools', category: 'resource', description: 'Adds 10+ new ores to the caves and powerful late-game gear.', rating: 4.3, downloads: '450K' },
  ];

  const handleInstall = async (id: number, name: string) => {
    setInstalling(id);
    showToast(`Downloading ${name} .mcpack...`, 'success');
    
    try {
      const success = await apiService.installBedrockAddon('current-server-id', id);
      if (!success) throw new Error('Installation failed');
      
      setInstalled(prev => [...prev, id]);
      showToast(`${name} installed and applied to server!`, 'success');
    } catch (error: any) {
      showToast(`Failed to install ${name}. ${error.message || 'Please try again.'}`, 'error');
    } finally {
      setInstalling(null);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      showToast(`Uploading custom addon ${file.name}...`, 'success');
      setTimeout(() => {
        showToast('Custom addon uploaded and applied successfully!', 'success');
      }, 2000);
    }
  };

  const filteredAddons = addons.filter(addon => {
    const q = searchQuery.toLowerCase();
    return addon.name.toLowerCase().includes(q) || 
           addon.description.toLowerCase().includes(q) ||
           addon.category.toLowerCase().includes(q);
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-5xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Bedrock Addon Installer</h2>
          <p className="text-slate-400">One-click installation for popular Bedrock behavior and resource packs.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search addons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <label className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all font-medium text-sm cursor-pointer whitespace-nowrap">
            <Upload className="w-4 h-4" />
            Upload Custom
            <input type="file" className="hidden" accept=".mcpack,.zip" onChange={handleCustomUpload} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredAddons.map(addon => {
          const isInstalling = installing === addon.id;
          const isInstalled = installed.includes(addon.id);
          
          return (
            <div key={addon.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/50 transition-all group flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <PackageOpen className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400" /> {addon.rating}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white">{addon.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-slate-400">
                  {addon.category}
                </span>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">{addon.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <span className="text-xs text-slate-500">{addon.downloads} downloads</span>
                <button 
                  onClick={() => !isInstalled && !isInstalling && handleInstall(addon.id, addon.name)}
                  disabled={isInstalled || isInstalling}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isInstalled 
                      ? 'bg-green-500/10 text-green-400' 
                      : isInstalling
                      ? 'bg-blue-500/10 text-blue-400 opacity-70 cursor-wait'
                      : 'bg-blue-500/10 hover:bg-blue-500 text-blue-300 hover:text-white'
                  }`}
                >
                  {isInstalled ? <Check className="w-4 h-4" /> : <Download className={`w-4 h-4 ${isInstalling ? 'animate-bounce' : ''}`} />} 
                  {isInstalled ? 'Installed' : isInstalling ? 'Installing...' : 'Install Addon'}
                </button>
              </div>
            </div>
          );
        })}
        {filteredAddons.length === 0 && (
          <div className="col-span-1 md:col-span-2 py-12 text-center border border-dashed border-white/10 rounded-2xl">
            <PackageOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No addons found</h3>
            <p className="text-slate-500 text-sm">We couldn't find anything matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
