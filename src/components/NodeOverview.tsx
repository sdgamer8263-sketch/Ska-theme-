import React from 'react';
import { Server, Activity, Clock, Cpu, ServerCrash, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function NodeOverview() {
  const nodes = [
    { id: 1, name: "US-East-01", location: "New York, USA", ping: 12, uptime: "99.99%", load: 45, status: "online", activeServers: 42 },
    { id: 2, name: "EU-Central-02", location: "Frankfurt, DE", ping: 85, uptime: "99.95%", load: 78, status: "online", activeServers: 115 },
    { id: 3, name: "US-West-01", location: "Los Angeles, USA", ping: 45, uptime: "99.8%", load: 92, status: "warning", activeServers: 89 },
    { id: 4, name: "AP-South-01", location: "Singapore", ping: 210, uptime: "98.5%", load: 100, status: "offline", activeServers: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-400/10 border-green-500/20';
      case 'warning': return 'text-amber-400 bg-amber-400/10 border-amber-500/20';
      case 'offline': return 'text-red-400 bg-red-400/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'warning': return <Activity className="w-4 h-4 text-amber-400" />;
      case 'offline': return <ServerCrash className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Node Overview</h2>
        <p className="text-slate-400">Monitor health, uptime, and load statistics across all connected Pterodactyl daemon nodes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nodes.map(node => (
          <div key={node.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getStatusColor(node.status)}`}>
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{node.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">{node.location}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${getStatusColor(node.status)}`}>
                {getStatusIcon(node.status)} {node.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Ping</div>
                <div className="text-xl font-mono text-white flex items-end gap-1">
                  {node.status === 'offline' ? '--' : node.ping} <span className="text-sm text-slate-500 mb-0.5">ms</span>
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Uptime</div>
                <div className="text-xl font-mono text-white flex items-end gap-1">
                  {node.uptime}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 flex items-center gap-1.5"><Cpu className="w-4 h-4" /> Node Load</span>
                <span className="font-mono text-white">{node.load}%</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    node.load > 90 ? 'bg-red-500' : node.load > 70 ? 'bg-amber-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${node.load}%` }} 
                />
              </div>
              <div className="text-right text-xs text-slate-500 mt-2">
                Active Servers: <span className="text-slate-300 font-medium">{node.activeServers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
