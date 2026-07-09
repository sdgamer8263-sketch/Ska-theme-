import React, { useState } from 'react';
import { Layers, Server, ShieldCheck, Download, RefreshCw } from 'lucide-react';
import { useToast } from './ToastProvider';

export default function VersionManager() {
  const { showToast } = useToast();
  const [serverType, setServerType] = useState('java');
  const [javaVersion, setJavaVersion] = useState('paper-1.20.4');
  const [bedrockVersion, setBedrockVersion] = useState('latest');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = () => {
    setUpdating(true);
    showToast(`Starting update for ${serverType} server...`, 'success');
    
    setTimeout(() => {
      setUpdating(false);
      showToast('Server version updated successfully!', 'success');
    }, 2500);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Version Manager</h2>
          <p className="text-slate-400">Toggle between Java and Bedrock and select server versions.</p>
        </div>
        <button 
          onClick={handleUpdate}
          disabled={updating}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] ${
            updating ? 'bg-indigo-600/50 text-white/70 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          <RefreshCw className={`w-5 h-5 ${updating ? 'animate-spin' : ''}`} />
          {updating ? 'Updating...' : 'Update Version'}
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {/* Toggle Server Type */}
        <div className="grid grid-cols-2 border-b border-white/10">
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
        </div>

        {/* Options */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Select Software & Version</h3>
          </div>
          
          {serverType === 'java' ? (
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
                  </optgroup>
                  <optgroup label="Vanilla">
                    <option value="vanilla-1.20.4">Vanilla 1.20.4</option>
                    <option value="vanilla-1.19.4">Vanilla 1.19.4</option>
                  </optgroup>
                  <optgroup label="Modded">
                    <option value="forge-1.20.1">Forge 1.20.1</option>
                    <option value="fabric-1.20.4">Fabric 1.20.4</option>
                  </optgroup>
                </select>
              </div>
            </div>
          ) : (
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

          <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-sm text-slate-400">
            <Download className="w-5 h-5" />
            <p>Updating the server version will automatically backup your world data and download the required JAR/binary files.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
