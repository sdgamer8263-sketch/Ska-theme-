import React from 'react';
import { Cpu, MemoryStick as Ram, Users, Activity, Play, Square, Settings as SettingsIcon, BarChart2, Shield, History, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function ServerDashboard({ searchQuery = '' }: { searchQuery?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const servers = [
    {
      id: 1,
      name: "Main Survival Hub",
      node: "us-east-1",
      version: "1.20.1 Forge",
      status: "Running",
      cpu: "14%",
      ram: "4.2GB",
      initial: "M",
      color: "blue"
    },
    {
      id: 2,
      name: "Creative PlotWorld",
      node: "eu-central-2",
      version: "1.20.1 Paper",
      status: "Running",
      cpu: "4%",
      ram: "1.8GB",
      initial: "C",
      color: "fuchsia"
    },
    {
      id: 3,
      name: "Bedwars Lobby-1",
      node: "us-west-1",
      version: "1.8.9 Spigot",
      status: "Offline",
      cpu: "0%",
      ram: "0GB",
      initial: "B",
      color: "slate"
    }
  ];

  const filteredServers = servers.filter(server => 
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    server.node.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentActivity = [
    { id: 1, action: "Server Started", server: "Main Survival Hub", user: "Alex Rivera", time: "2 minutes ago", icon: <Play className="w-4 h-4 text-green-400" /> },
    { id: 2, action: "Permissions Updated", server: "Creative PlotWorld", user: "System", time: "1 hour ago", icon: <Shield className="w-4 h-4 text-blue-400" /> },
    { id: 3, action: "Console Command Executed", server: "Bedwars Lobby-1", user: "Alex Rivera", time: "3 hours ago", icon: <Terminal className="w-4 h-4 text-slate-400" /> },
    { id: 4, action: "Server Stopped", server: "Bedwars Lobby-1", user: "Auto-Scheduler", time: "5 hours ago", icon: <Square className="w-4 h-4 text-red-400" /> },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-8 space-y-8 flex-1"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Server Overview</h2>
          <p className="text-slate-400">Managing 12 active instances across 3 global nodes</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] font-semibold transition-all">
          Create New Server
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">CPU Utilization</p>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">42.8<span className="text-sm font-normal text-slate-500 ml-1">%</span></p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-4">
            <div className="h-full bg-indigo-500 rounded-full w-[42%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Memory Usage</p>
            <Ram className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">16.2<span className="text-sm font-normal text-slate-500 ml-1">GB</span></p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-4">
            <div className="h-full bg-purple-500 rounded-full w-[65%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[40px] rounded-full group-hover:bg-green-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Players</p>
            <Users className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">1,402</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-green-400 rounded-full w-[88%] shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full group-hover:bg-orange-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Network Traffic</p>
            <Activity className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white">89.5<span className="text-sm font-normal text-slate-500 ml-1">MB/s</span></p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-4">
            <div className="h-full bg-orange-400 rounded-full w-[35%] shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
          </div>
        </motion.div>
      </div>

      {/* Active Servers Table */}
      <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <h3 className="font-bold text-lg text-white">Primary Instances</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-slate-300">Global</span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-400 hover:bg-white/10 cursor-pointer transition-colors">Local</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20 text-left text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-white/10">
              <tr>
                <th className="px-8 py-4">Server Name</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Resources</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredServers.map(server => (
                <tr key={server.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-${server.color}-500/20 border border-${server.color}-500/40 rounded-xl flex items-center justify-center text-${server.color}-400 font-bold shadow-inner`}>{server.initial}</div>
                      <div>
                        <p className={`text-sm font-bold text-white uppercase tracking-tight group-hover:text-${server.color}-400 transition-colors`}>{server.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{server.node} | {server.version}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {server.status === 'Running' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-black uppercase rounded-full border border-green-500/20 tracking-widest shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                        Running
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-500/10 text-slate-400 text-[10px] font-black uppercase rounded-full border border-slate-500/20 tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        Offline
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-2 text-xs font-medium text-slate-400 w-32">
                      <div className="flex justify-between items-center">
                        <span>CPU</span> <span className="text-white">{server.cpu}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>RAM</span> <span className="text-white">{server.ram}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm">
                        <SettingsIcon className="w-4 h-4" />
                      </button>
                      <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm">
                        <BarChart2 className="w-4 h-4" />
                      </button>
                      {server.status === 'Running' ? (
                        <button className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-transparent hover:border-red-500/20 flex items-center justify-center text-red-400 hover:text-red-300 transition-all shadow-sm">
                          <Square className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="w-9 h-9 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-transparent hover:border-green-500/20 flex items-center justify-center text-green-400 hover:text-green-300 transition-all shadow-sm">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredServers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-8 text-center text-slate-500">
                    No servers matched your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Activity Widget */}
      <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Recent Admin Activity</h2>
        </div>
        
        <div className="space-y-4">
          {recentActivity.map(activity => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  {activity.icon}
                </div>
                <div>
                  <p className="font-medium text-white">{activity.action} <span className="text-slate-500 font-normal">on</span> {activity.server}</p>
                  <p className="text-xs text-slate-400 mt-0.5">by <span className="text-indigo-400">{activity.user}</span></p>
                </div>
              </div>
              <div className="text-xs font-mono text-slate-500">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
