import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Filter, Copy, CheckCircle2, Play, Square, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast } from './ToastProvider';
import { motion, AnimatePresence } from 'motion/react';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  source: string;
}

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: new Date(), level: 'INFO', message: 'Daemon started successfully on port 8080.', source: 'Wings' },
  { id: '2', timestamp: new Date(Date.now() - 5000), level: 'INFO', message: 'Server [b9a2c1] state changed to running.', source: 'Panel' },
  { id: '3', timestamp: new Date(Date.now() - 15000), level: 'WARN', message: 'High CPU usage detected on node eu-central-1.', source: 'Monitor' },
  { id: '4', timestamp: new Date(Date.now() - 45000), level: 'ERROR', message: 'Failed to connect to database at 10.0.0.5: Connection refused.', source: 'Database' },
  { id: '5', timestamp: new Date(Date.now() - 60000), level: 'INFO', message: 'User admin@example.com logged in.', source: 'Auth' },
];

export default function SystemLogs() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'ALL'>('ALL');
  const [isFollowing, setIsFollowing] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFollowing) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isFollowing, filterLevel]);

  // Simulate incoming logs
  useEffect(() => {
    const interval = setInterval(() => {
      const levels: LogLevel[] = ['INFO', 'INFO', 'INFO', 'WARN', 'ERROR'];
      const sources = ['Wings', 'Panel', 'Database', 'Cache', 'Auth'];
      const messages = [
        'Routine health check passed.',
        'Purged 142 expired sessions.',
        'Syncing server states...',
        'Cache hit ratio is below 60%.',
        'Unable to allocate requested memory chunk.'
      ];

      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        level: levels[Math.floor(Math.random() * levels.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      };

      setLogs(prev => [...prev.slice(-99), newLog]); // Keep last 100
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    const logText = filteredLogs.map(l => `[${l.timestamp.toISOString()}] [${l.level}] [${l.source}]: ${l.message}`).join('\n');
    navigator.clipboard.writeText(logText);
    showToast('Logs copied to clipboard', 'success');
  };

  const filteredLogs = logs.filter(log => filterLevel === 'ALL' || log.level === filterLevel);

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'INFO': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'WARN': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'ERROR': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400';
    }
  };

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case 'INFO': return <Info className="w-3 h-3" />;
      case 'WARN': return <AlertTriangle className="w-3 h-3" />;
      case 'ERROR': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto space-y-6 h-full flex flex-col"
    >
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">System Logs</h2>
          <p className="text-slate-400">Real-time aggregate logs from all panel components.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              isFollowing 
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isFollowing ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            {isFollowing ? 'Pause Stream' : 'Follow Logs'}
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg border border-white/10 transition-colors text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            Copy All
          </button>
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col flex-1 min-h-0 overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg border border-white/5">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Level Filter</span>
          </div>
          <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
            {(['ALL', 'INFO', 'WARN', 'ERROR'] as const).map(level => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-1 rounded text-xs font-bold transition-all ${
                  filterLevel === level 
                    ? 'bg-indigo-500/20 text-indigo-300 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
            <div className={`w-2 h-2 rounded-full ${isFollowing ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-600'}`}></div>
            {isFollowing ? 'Live Stream Active' : 'Stream Paused'}
          </div>
        </div>

        {/* Log Viewer */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed space-y-1.5">
          <AnimatePresence initial={false}>
            {filteredLogs.map(log => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 hover:bg-white/5 px-2 py-1.5 rounded transition-colors group"
              >
                <span className="text-slate-500 shrink-0 select-none">
                  [{log.timestamp.toLocaleTimeString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
                </span>
                
                <span className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${getLevelColor(log.level)} select-none w-20 justify-center`}>
                  {getLevelIcon(log.level)}
                  {log.level}
                </span>

                <span className="text-slate-400 shrink-0 w-24 select-none">
                  [{log.source}]
                </span>

                <span className="text-slate-300 break-words flex-1 group-hover:text-white transition-colors">
                  {log.message}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={logsEndRef} className="h-4" />
        </div>
      </div>
    </motion.div>
  );
}
