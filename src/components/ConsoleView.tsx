import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Square, RotateCcw, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function ConsoleView() {
  const [logs, setLogs] = useState<string[]>([
    '[12:00:00] [Server thread/INFO]: Starting minecraft server version 1.20.1',
    '[12:00:00] [Server thread/INFO]: Loading properties',
    '[12:00:00] [Server thread/INFO]: Default game type: SURVIVAL',
    '[12:00:00] [Server thread/INFO]: Generating keypair',
    '[12:00:01] [Server thread/INFO]: Starting Minecraft server on *:25565',
    '[12:00:01] [Server thread/INFO]: Using default channel type',
    '[12:00:02] [Server thread/INFO]: Preparing level "world"',
    '[12:00:03] [Server thread/INFO]: Preparing start region for dimension minecraft:overworld',
    '[12:00:05] [Server thread/INFO]: Time elapsed: 2450 ms',
    '[12:00:05] [Server thread/INFO]: Done (4.521s)! For help, type "help"',
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Running');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, `[${time}] [User/Command]: /${input}`]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, `[${time}] [Server thread/INFO]: Unknown command or insufficient permissions`]);
    }, 500);
    
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-indigo-400" /> Server Console
          </h2>
          <p className="text-slate-400">Main Survival Hub • us-east-1</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-bold text-sm uppercase tracking-wider">{status}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#0c0c14] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-2xl">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-mono text-slate-500">daemon@node-1:~</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes('INFO') ? 'text-slate-300' : log.includes('Command') ? 'text-indigo-300' : 'text-slate-400'}`}>
                  {log}
                </div>
              ))}
              <div ref={endRef} />
            </div>
            
            <form onSubmit={handleCommand} className="bg-black/40 border-t border-white/10 p-2 flex">
              <span className="text-indigo-400 font-bold px-3 py-2">&gt;</span>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-600"
              />
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 py-2.5 rounded-xl transition-colors font-medium">
                <Play className="w-4 h-4" /> Start
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 py-2.5 rounded-xl transition-colors font-medium">
                <RotateCcw className="w-4 h-4" /> Restart
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2.5 rounded-xl transition-colors font-medium">
                <Square className="w-4 h-4" /> Stop
              </button>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
             <h3 className="font-bold text-white mb-4">Resource Usage</h3>
             <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span className="uppercase tracking-wider font-bold">CPU Load</span>
                  <span className="font-mono text-white">14%</span>
                </div>
                <div className="w-full bg-black/40 border border-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 w-[14%] h-full rounded-full" />
                </div>
             </div>
             <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2 mt-4">
                  <span className="uppercase tracking-wider font-bold">Memory</span>
                  <span className="font-mono text-white">4.2 / 8 GB</span>
                </div>
                <div className="w-full bg-black/40 border border-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 w-[52%] h-full rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
