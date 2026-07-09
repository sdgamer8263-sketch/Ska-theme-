import React from 'react';
import { Server, Activity, Users, Settings as SettingsIcon, Database, Cpu, MemoryStick, ArrowRight, Play, Square, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function UserDashboard() {
  const userServers = [
    {
      id: 1,
      name: "My SMP Server",
      node: "us-east-1",
      memory: "2GB / 4GB",
      cpu: "12% / 100%",
      disk: "12GB / 20GB",
      status: "Running",
      color: "blue"
    },
    {
      id: 2,
      name: "Discord Bot (NodeJS)",
      node: "us-west-1",
      memory: "150MB / 512MB",
      cpu: "2% / 50%",
      disk: "500MB / 2GB",
      status: "Running",
      color: "indigo"
    },
    {
      id: 3,
      name: "Test Environment",
      node: "eu-central-2",
      memory: "0MB / 2GB",
      cpu: "0% / 100%",
      disk: "2GB / 10GB",
      status: "Offline",
      color: "slate"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Your Servers</h2>
        <p className="text-slate-400">Manage and monitor your active server allocations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userServers.map(server => (
          <div key={server.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-${server.color}-500/10 border-${server.color}-500/20 text-${server.color}-400`}>
                <Server className="w-6 h-6" />
              </div>
              {server.status === 'Running' ? (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase rounded-full border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                  Online
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-500/10 text-slate-400 text-xs font-bold uppercase rounded-full border border-slate-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  Offline
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-lg text-white mb-1 group-hover:text-indigo-400 transition-colors">{server.name}</h3>
            <p className="text-sm text-slate-500 mb-6 font-mono">{server.node}</p>

            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> CPU Limit</span>
                  <span className="font-mono text-white">{server.cpu}</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${server.status === 'Running' ? 'bg-indigo-500' : 'bg-slate-600'}`} style={{ width: server.status === 'Running' ? '12%' : '0%' }}></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MemoryStick className="w-3.5 h-3.5" /> Memory</span>
                  <span className="font-mono text-white">{server.memory}</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${server.status === 'Running' ? 'bg-indigo-500' : 'bg-slate-600'}`} style={{ width: server.status === 'Running' ? '50%' : '0%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
               <div className="flex gap-2">
                 {server.status === 'Running' ? (
                   <button className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors">
                     <Square className="w-4 h-4 fill-current" />
                   </button>
                 ) : (
                   <button className="w-9 h-9 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 flex items-center justify-center transition-colors">
                     <Play className="w-4 h-4 fill-current" />
                   </button>
                 )}
                 <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors">
                   <SettingsIcon className="w-4 h-4" />
                 </button>
               </div>
               <button className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                 Manage <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
