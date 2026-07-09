import React, { useState, useEffect } from 'react';
import { Layers, Server, ShieldCheck, Download, RefreshCw, Egg, AlertTriangle } from 'lucide-react';
import { useToast } from './ToastProvider';
import { apiService } from '../services/apiService';
import { motion, AnimatePresence } from 'motion/react';

export default function VersionManager() {
  const { showToast } = useToast();
  const [serverType, setServerType] = useState('java');
  const [javaVersion, setJavaVersion] = useState('paper-1.20.4');
  const [bedrockVersion, setBedrockVersion] = useState('latest');
  const [eggVersion, setEggVersion] = useState('');
  const [updating, setUpdating] = useState(false);
  const [eggs, setEggs] = useState<{ id: string; name: string; description: string; category: string }[]>([]);
  const [showEggConfirm, setShowEggConfirm] = useState(false);

  useEffect(() => {
    const fetchEggs = async () => {
      try {
        const fetchedEggs = await apiService.getAvailableEggs();
        setEggs(fetchedEggs);
        if (fetchedEggs.length > 0) {
          setEggVersion(fetchedEggs[0].id);
        }
      } catch (error: any) {
        showToast('Failed to load available eggs.', 'error');
      }
    };
    fetchEggs();
  }, [showToast]);

  const handleUpdate = async () => {
    if (serverType === 'egg') {
      setShowEggConfirm(true);
      return;
    }

    setUpdating(true);
    showToast(`Starting update for ${serverType} server...`, 'success');
    
    try {
      const version = serverType === 'java' ? javaVersion : bedrockVersion;
      const success = await apiService.changeServerVersion('current-server-id', serverType, version);
      if (!success) throw new Error('Update failed');
      
      showToast('Server configuration updated successfully!', 'success');
    } catch (error: any) {
      showToast(`Failed to update server configuration. ${error.message || 'Please try again.'}`, 'error');
    } finally {
      setUpdating(false);
    }
  };

  const confirmEggChange = async () => {
    setShowEggConfirm(false);
    setUpdating(true);
    showToast('Initiating egg migration process...', 'success');
    
    try {
      const success = await apiService.changeServerEgg('current-server-id', eggVersion);
      if (!success) throw new Error('Egg migration failed');
      
      showToast('Server egg successfully migrated!', 'success');
    } catch (error: any) {
      showToast(`Failed to migrate server egg. ${error.message || 'Please try again.'}`, 'error');
    } finally {
      setUpdating(false);
    }
  };

  const groupedEggs = eggs.reduce((acc, egg) => {
    if (!acc[egg.category]) acc[egg.category] = [];
    acc[egg.category].push(egg);
    return acc;
  }, {} as Record<string, typeof eggs>);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Version & Egg Manager</h2>
          <p className="text-slate-400">Toggle between Java, Bedrock, and switch server Eggs.</p>
        </div>
        <button 
          onClick={handleUpdate}
          disabled={updating}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] ${
            updating ? 'bg-indigo-600/50 text-white/70 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          <RefreshCw className={`w-5 h-5 ${updating ? 'animate-spin' : ''}`} />
          {updating ? 'Updating...' : 'Update Server'}
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {/* Toggle Server Type */}
        <div className="grid grid-cols-3 border-b border-white/10">
          <button
            onClick={() => setServerType('java')}
            className={`flex flex-col items-center justify-center p-6 transition-all ${
              serverType === 'java' 
                ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Server className="w-8 h-8 mb-3" />
            <span className="font-bold text-lg">Java Edition</span>
            <span className="text-xs mt-1 opacity-70">Paper, Spigot, Vanilla, Forge</span>
          </button>
          <button
            onClick={() => setServerType('bedrock')}
            className={`flex flex-col items-center justify-center p-6 transition-all ${
              serverType === 'bedrock' 
                ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Layers className="w-8 h-8 mb-3" />
            <span className="font-bold text-lg">Bedrock Edition</span>
            <span className="text-xs mt-1 opacity-70">PocketMine, Nukkit, Geyser</span>
          </button>
          <button
            onClick={() => setServerType('egg')}
            className={`flex flex-col items-center justify-center p-6 transition-all ${
              serverType === 'egg' 
                ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Egg className="w-8 h-8 mb-3" />
            <span className="font-bold text-lg">Egg Changer</span>
            <span className="text-xs mt-1 opacity-70">NodeJS, Python, Discord Bots</span>
          </button>
        </div>

        {/* Options */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Select Software & Version</h3>
          </div>
          
          {serverType === 'java' && (
            <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Version</label>
                <select 
                  value={javaVersion}
                  onChange={(e) => setJavaVersion(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-slate-200 outline-none focus:border-indigo-500 transition-colors appearance-none"
                >
                  <optgroup label="Paper (Recommended)">
                    <option value="paper-1.20.4">Paper 1.20.4 (Latest)</option>
                    <option value="paper-1.20.2">Paper 1.20.2</option>
                    <option value="paper-1.19.4">Paper 1.19.4</option>
                    <option value="paper-1.18.2">Paper 1.18.2</option>
                    <option value="paper-1.17.1">Paper 1.17.1</option>
                    <option value="paper-1.16.5">Paper 1.16.5</option>
                    <option value="paper-1.12.2">Paper 1.12.2</option>
                    <option value="paper-1.8.8">Paper 1.8.8</option>
                  </optgroup>
                  <optgroup label="Vanilla">
                    <option value="vanilla-1.20.4">Vanilla 1.20.4</option>
                    <option value="vanilla-1.19.4">Vanilla 1.19.4</option>
                    <option value="vanilla-1.18.2">Vanilla 1.18.2</option>
                    <option value="vanilla-1.17.1">Vanilla 1.17.1</option>
                    <option value="vanilla-1.16.5">Vanilla 1.16.5</option>
                  </optgroup>
                  <optgroup label="Modded">
                    <option value="forge-1.20.1">Forge 1.20.1</option>
                    <option value="forge-1.19.2">Forge 1.19.2</option>
                    <option value="forge-1.16.5">Forge 1.16.5</option>
                    <option value="fabric-1.20.4">Fabric 1.20.4</option>
                    <option value="fabric-1.19.4">Fabric 1.19.4</option>
                  </optgroup>
                </select>
              </div>
            </div>
          )}
          
          {serverType === 'bedrock' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Version</label>
                <select 
                  value={bedrockVersion}
                  onChange={(e) => setBedrockVersion(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-slate-200 outline-none focus:border-indigo-500 transition-colors appearance-none"
                >
                  <optgroup label="Bedrock Dedicated Server">
                    <option value="latest">Latest Release</option>
                    <option value="preview">Preview Build</option>
                    <option value="1.20.40">1.20.40 Release</option>
                    <option value="1.19.80">1.19.80 Release</option>
                  </optgroup>
                  <optgroup label="PocketMine-MP">
                    <option value="pm-5.0">PocketMine 5.0 (Latest)</option>
                    <option value="pm-4.0">PocketMine 4.0 (Legacy)</option>
                  </optgroup>
                  <optgroup label="Nukkit">
                    <option value="nukkit-latest">NukkitX (Latest)</option>
                  </optgroup>
                </select>
              </div>
            </div>
          )}

          {serverType === 'egg' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Egg (Environment)</label>
                <select 
                  value={eggVersion}
                  onChange={(e) => setEggVersion(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-slate-200 outline-none focus:border-indigo-500 transition-colors appearance-none"
                >
                  {Object.entries(groupedEggs).map(([category, catEggs]) => (
                    <optgroup key={category} label={category}>
                      {catEggs.map(egg => (
                        <option key={egg.id} value={egg.id}>{egg.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-sm text-slate-400">
            <Download className="w-5 h-5" />
            <p>Updating the server version or egg will automatically apply required startup parameters and dependencies.</p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showEggConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f111a] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Change Server Egg?</h3>
                <p className="text-slate-400 mb-6">
                  Changing the server egg is a destructive action. It will replace the current startup parameters, docker image, and may cause data loss or corruption if the new environment is incompatible with existing files.
                </p>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm font-semibold">
                    We highly recommend creating a backup before proceeding with this migration.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowEggConfirm(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl font-semibold bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEggChange}
                    className="flex-1 px-4 py-2.5 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    Yes, Change Egg
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
