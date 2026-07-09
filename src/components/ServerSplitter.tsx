import React, { useState } from 'react';
import { SplitSquareHorizontal, Server, Cpu, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import { useToast } from './ToastProvider';
import { motion } from 'motion/react';
import { apiService } from '../services/apiService';

export default function ServerSplitter() {
  const { showToast } = useToast();
  const [splitting, setSplitting] = useState(false);
  const [splitComplete, setSplitComplete] = useState(false);
  
  const [config, setConfig] = useState({
    instances: 2,
    ramPerInstance: 4096,
    cpuPerInstance: 200,
    diskPerInstance: 20000,
  });

  const totalResources = {
    ram: 16384,
    cpu: 800,
    disk: 100000,
  };

  const handleSplit = async () => {
    setSplitting(true);
    showToast('Initiating server split process...', 'success');
    
    try {
      const success = await apiService.splitServer('current-server-id', config);
      if (!success) throw new Error('Split failed');
      
      setSplitComplete(true);
      showToast('Server successfully split into instances!', 'success');
    } catch (error: any) {
      showToast(`Failed to split server. ${error.message || 'Please try again.'}`, 'error');
    } finally {
      setSplitting(false);
    }
  };

  const calculateUsage = (value: number, total: number) => {
    const percent = ((value * config.instances) / total) * 100;
    return percent > 100 ? 100 : percent;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Server Splitter</h2>
        <p className="text-slate-400">Divide your large server allocation into smaller, linked instances (BungeeCord/Velocity ready).</p>
      </div>

      {!splitComplete ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <SplitSquareHorizontal className="w-5 h-5 text-indigo-400" /> Split Configuration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Number of Instances</label>
                <div className="flex gap-4">
                  {[2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => setConfig(prev => ({ ...prev, instances: num }))}
                      className={`flex-1 py-3 rounded-xl border font-bold text-lg transition-colors ${
                        config.instances === num 
                          ? 'bg-indigo-500/20 border-indigo-500 text-white' 
                          : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">RAM per Instance (MB)</label>
                  <input 
                    type="number" 
                    value={config.ramPerInstance}
                    onChange={(e) => setConfig(prev => ({ ...prev, ramPerInstance: Number(e.target.value) }))}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">CPU Limit per Instance (%)</label>
                  <input 
                    type="number" 
                    value={config.cpuPerInstance}
                    onChange={(e) => setConfig(prev => ({ ...prev, cpuPerInstance: Number(e.target.value) }))}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white">Resource Allocation</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1"><Cpu className="w-4 h-4" /> CPU</span>
                  <span className="font-mono text-white">{config.cpuPerInstance * config.instances}% / {totalResources.cpu}%</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all ${calculateUsage(config.cpuPerInstance, totalResources.cpu) > 90 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${calculateUsage(config.cpuPerInstance, totalResources.cpu)}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1"><Zap className="w-4 h-4" /> RAM</span>
                  <span className="font-mono text-white">{(config.ramPerInstance * config.instances) / 1024}GB / {totalResources.ram / 1024}GB</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all ${calculateUsage(config.ramPerInstance, totalResources.ram) > 90 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${calculateUsage(config.ramPerInstance, totalResources.ram)}%` }} />
                </div>
              </div>

              <button 
                onClick={handleSplit}
                disabled={splitting || calculateUsage(config.ramPerInstance, totalResources.ram) > 100}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                {splitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <SplitSquareHorizontal className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <SplitSquareHorizontal className="w-5 h-5" />
                )}
                {splitting ? 'Splitting Server...' : 'Split Server Now'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/10 border border-green-500/20 rounded-3xl p-12 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Split Successful!</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Your server has been successfully split into {config.instances} distinct instances. They are now linked via an internal network.
            </p>
          </div>
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            {Array.from({ length: config.instances }).map((_, i) => (
              <div key={i} className="px-6 py-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center">
                <Server className="w-8 h-8 text-indigo-400 mb-2" />
                <span className="font-bold text-white mb-1">Instance {i + 1}</span>
                <span className="text-xs text-slate-500 font-mono">Port: {25565 + i}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setSplitComplete(false)}
            className="mt-8 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Manage Instances
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
