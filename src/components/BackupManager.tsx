import React, { useState } from 'react';
import { DatabaseBackup, HardDrive, Download, RotateCcw, Clock, ShieldCheck, Play, CheckCircle2 } from 'lucide-react';
import { useToast } from './ToastProvider';
import { motion } from 'motion/react';

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  status: 'completed' | 'failed' | 'in_progress';
  type: 'manual' | 'automated';
}

export default function BackupManager() {
  const { showToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [backups, setBackups] = useState<Backup[]>([
    { id: '1', name: 'Pre-update Snapshot', date: '2026-07-09 07:00:00', size: '2.4 GB', status: 'completed', type: 'manual' },
    { id: '2', name: 'Nightly Auto-Backup', date: '2026-07-09 00:00:00', size: '2.3 GB', status: 'completed', type: 'automated' },
    { id: '3', name: 'Database Migration Temp', date: '2026-07-08 14:30:22', size: '1.8 GB', status: 'completed', type: 'manual' },
    { id: '4', name: 'Weekly Auto-Backup', date: '2026-07-02 00:00:00', size: '2.1 GB', status: 'failed', type: 'automated' },
  ]);

  const handleCreateBackup = () => {
    setIsCreating(true);
    showToast('Starting manual backup process...', 'success');
    
    // Simulate backup process
    setTimeout(() => {
      setIsCreating(false);
      const newBackup: Backup = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Manual Snapshot',
        date: new Date().toLocaleString('sv').replace(',', ''),
        size: '2.4 GB',
        status: 'completed',
        type: 'manual'
      };
      setBackups([newBackup, ...backups]);
      showToast('Backup completed successfully!', 'success');
    }, 3000);
  };

  const handleRestore = (name: string) => {
    showToast(`Initiating restoration from ${name}...`, 'success');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Backup Manager</h2>
          <p className="text-slate-400">Create, manage, and restore system snapshots.</p>
        </div>
        <button 
          onClick={handleCreateBackup}
          disabled={isCreating}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] font-semibold transition-all ${
            isCreating ? 'bg-indigo-600/50 text-white/70 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {isCreating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <DatabaseBackup className="w-5 h-5" />
          )}
          {isCreating ? 'Creating Snapshot...' : 'Create Backup'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white">Storage Usage</h3>
          </div>
          <p className="text-3xl font-bold text-white tracking-tight">
            18.4<span className="text-lg font-medium text-slate-400 ml-1">GB</span>
          </p>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-4">
            <div className="h-full bg-blue-500 rounded-full w-[35%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-right">35% of 50GB Limit</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[40px] rounded-full group-hover:bg-green-500/20 transition-colors" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white">Backup Health</h3>
          </div>
          <p className="text-3xl font-bold text-white tracking-tight">Optimal</p>
          <p className="text-sm text-slate-400 mt-2">Last successful backup: Today, 07:00 AM</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white">Schedule</h3>
          </div>
          <p className="text-3xl font-bold text-white tracking-tight">Nightly</p>
          <p className="text-sm text-slate-400 mt-2">Next automated backup in 16 hours</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <h3 className="font-bold text-lg text-white">Recent Snapshots</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20 text-left text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {backups.map((backup, index) => (
                <motion.tr 
                  key={backup.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner border ${
                        backup.type === 'automated' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}>
                        <DatabaseBackup className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{backup.name}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{backup.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 font-mono">{backup.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-300 font-mono">{backup.size}</td>
                  <td className="px-6 py-4">
                    {backup.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-black uppercase rounded-full border border-green-500/20 tracking-widest">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : backup.status === 'failed' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-400 text-[10px] font-black uppercase rounded-full border border-red-500/20 tracking-widest">
                        Failed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase rounded-full border border-amber-500/20 tracking-widest">
                        <div className="w-3 h-3 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                        In Progress
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleRestore(backup.name)}
                        disabled={backup.status !== 'completed'}
                        title="Restore"
                        className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button 
                        disabled={backup.status !== 'completed'}
                        title="Download"
                        className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
