import React, { useState } from 'react';
import { Users, Ban, ShieldAlert, Star, MessageSquare } from 'lucide-react';
import { useToast } from './ToastProvider';
import { motion } from 'motion/react';

interface Player {
  uuid: string;
  username: string;
  ping: number;
  role: 'admin' | 'moderator' | 'default';
}

export default function PlayerManager() {
  const { showToast } = useToast();
  const [players, setPlayers] = useState<Player[]>([
    { uuid: '1', username: 'AlexRivera', ping: 24, role: 'admin' },
    { uuid: '2', username: 'MineBuilder99', ping: 45, role: 'default' },
    { uuid: '3', username: 'DiamondHunter', ping: 120, role: 'default' },
    { uuid: '4', username: 'ServerMod1', ping: 35, role: 'moderator' },
  ]);

  const handleKick = (username: string) => {
    setPlayers(prev => prev.filter(p => p.username !== username));
    showToast(`Kicked ${username} from the server.`, 'success');
  };

  const handleBan = (username: string) => {
    setPlayers(prev => prev.filter(p => p.username !== username));
    showToast(`Banned ${username} from the server.`, 'error');
  };

  const getRoleBadge = (role: Player['role']) => {
    switch(role) {
      case 'admin': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">Admin</span>;
      case 'moderator': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">Mod</span>;
      default: return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-500/20 text-slate-400 border border-slate-500/30">Player</span>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-5xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Player Manager</h2>
          <p className="text-slate-400">View online players, manage roles, kick or ban users.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
          <Users className="w-5 h-5 text-indigo-400" />
          <span className="font-bold">{players.length}</span> <span className="text-slate-400 text-sm">Online</span>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full">
          <thead className="bg-black/20 text-left text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Player</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Ping</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {players.map((player) => (
              <tr key={player.uuid} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${player.username}`} alt={player.username} className="w-8 h-8 rounded bg-white/10" />
                    <span className="font-bold text-white">{player.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getRoleBadge(player.role)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${player.ping < 50 ? 'bg-green-500' : player.ping < 100 ? 'bg-amber-500' : 'bg-red-500'}`} />
                    {player.ping}ms
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm" title="Message">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleKick(player.username)}
                      className="w-8 h-8 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition-all shadow-sm flex items-center justify-center" 
                      title="Kick"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleBan(player.username)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all shadow-sm flex items-center justify-center" 
                      title="Ban"
                    >
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No players are currently online.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
