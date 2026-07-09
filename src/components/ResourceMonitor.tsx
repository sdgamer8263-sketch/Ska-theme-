import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ResourceMonitor() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Generate initial mock data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: i,
      cpu: Math.floor(Math.random() * 40) + 10,
      ram: Math.floor(Math.random() * 30) + 40,
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          cpu: Math.floor(Math.random() * 40) + 10 + (Math.random() > 0.8 ? 30 : 0),
          ram: Math.min(100, Math.max(0, prev[prev.length - 1].ram + (Math.floor(Math.random() * 10) - 5))),
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const latestData = data[data.length - 1] || { cpu: 0, ram: 0 };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Resource Monitor</h2>
          <p className="text-slate-400">Real-time CPU and Memory usage statistics.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 font-medium">
          <Activity className="w-4 h-4 animate-pulse" />
          Live Metrics
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CPU Monitor */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">CPU Usage</h3>
                <p className="text-xs text-slate-400">AMD Ryzen 9 5950X (4 Cores)</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {latestData.cpu}%
            </div>
          </div>
          
          <div className="h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff10', borderRadius: '0.5rem', color: '#fff' }}
                  itemStyle={{ color: '#6366f1' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAM Monitor */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <MemoryStick className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Memory Usage</h3>
                <p className="text-xs text-slate-400">DDR4 3200MHz</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {((latestData.ram / 100) * 16).toFixed(1)} <span className="text-sm text-slate-400 font-medium">/ 16 GB</span>
            </div>
          </div>
          
          <div className="h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff10', borderRadius: '0.5rem', color: '#fff' }}
                  itemStyle={{ color: '#a855f7' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area type="monotone" dataKey="ram" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorRam)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
