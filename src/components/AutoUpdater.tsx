import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, RefreshCw, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import { useToast } from './ToastProvider';
import { motion } from 'motion/react';

export default function AutoUpdater() {
  const { showToast } = useToast();
  const [checking, setChecking] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const currentVersion = 'v1.0.2';
  const latestVersion = 'v1.1.0';

  useEffect(() => {
    // Simulate checking for updates on mount
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setUpdateAvailable(true);
    }, 1500);
  }, []);

  const handleUpdate = () => {
    setUpdating(true);
    showToast('Initiating PteroSuite update...', 'success');
    
    setTimeout(() => {
      setUpdating(false);
      setUpdateAvailable(false);
      showToast('Successfully updated to latest version!', 'success');
    }, 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-4xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">System Updater</h2>
          <p className="text-slate-400">Keep your PteroSuite installation up to date.</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-32 h-32 shrink-0 bg-indigo-500/20 border border-indigo-500/40 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <ArrowUpCircle className={`w-16 h-16 ${updateAvailable ? 'text-indigo-400' : 'text-slate-400'} ${updating ? 'animate-bounce' : ''}`} />
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">
                  {checking ? 'Checking for updates...' : updateAvailable ? 'Update Available!' : 'System is up to date'}
                </h3>
              </div>
              <p className="text-slate-400">
                {updateAvailable 
                  ? 'A new version of PteroSuite is available. It is recommended to update to receive the latest features and security patches.' 
                  : 'You are running the latest version of PteroSuite. No action is required.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 w-full">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Current Version</p>
                <p className="text-lg text-white font-mono">{updateAvailable && !updating ? currentVersion : latestVersion}</p>
              </div>
              <div className="flex-1 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 w-full">
                <p className="text-xs text-indigo-300 uppercase tracking-widest font-bold mb-1">Latest Release</p>
                <p className="text-lg text-indigo-100 font-mono">{latestVersion}</p>
              </div>
            </div>

            {updateAvailable && (
              <div className="pt-4">
                <button 
                  onClick={handleUpdate}
                  disabled={updating}
                  className={`flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] ${
                    updating ? 'bg-indigo-600/50 text-white/70 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {updating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Installing Update...
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle className="w-5 h-5" />
                      Install {latestVersion}
                    </>
                  )}
                </button>
              </div>
            )}
            
            {!updateAvailable && !checking && (
              <div className="pt-4">
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/20 w-fit">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">You're all caught up!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {updateAvailable && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl flex items-start gap-4"
        >
          <AlertTriangle className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
          <div>
            <h4 className="text-orange-300 font-bold text-lg mb-1">Important Note Before Updating</h4>
            <p className="text-orange-200/70 text-sm leading-relaxed">
              Updating the theme suite will briefly put the panel into maintenance mode. Ensure that no other critical operations are running. A full backup of your current theme files will be created automatically before the update is applied.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
