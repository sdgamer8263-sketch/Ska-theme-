import React, { useState } from 'react';
import { Shield, Key, UserCheck, Settings, Server, Database, Save, CheckCircle2 } from 'lucide-react';
import { useToast } from './ToastProvider';
import { motion } from 'motion/react';

export default function PermissionsManager() {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const [roles, setRoles] = useState([
    { id: 'admin', name: 'Administrator', badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'mod', name: 'Moderator', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'support', name: 'Support', badge: 'bg-green-500/20 text-green-400 border-green-500/30' }
  ]);
  
  const [activeRole, setActiveRole] = useState('mod');
  
  const permissionsGroups = [
    {
      category: 'Server Management',
      icon: <Server className="w-5 h-5 text-indigo-400" />,
      perms: [
        { id: 'server.create', name: 'Create Servers', desc: 'Allow user to create new server instances' },
        { id: 'server.delete', name: 'Delete Servers', desc: 'Allow user to permanently delete servers' },
        { id: 'server.edit', name: 'Edit Allocation', desc: 'Modify RAM, CPU, and Disk allocations' },
        { id: 'server.suspend', name: 'Suspend/Unsuspend', desc: 'Suspend active server instances' },
      ]
    },
    {
      category: 'Theme & UI Editor',
      icon: <Settings className="w-5 h-5 text-fuchsia-400" />,
      perms: [
        { id: 'theme.read', name: 'View Theme Settings', desc: 'Access the theme configuration panel' },
        { id: 'theme.write', name: 'Modify Theme', desc: 'Change colors, backgrounds, and layouts' },
        { id: 'theme.css', name: 'Inject Custom CSS', desc: 'Allow writing raw CSS for the panel' },
      ]
    },
    {
      category: 'System & Plugins',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      perms: [
        { id: 'plugins.install', name: 'Install Plugins', desc: 'Access the plugin and addon installers' },
        { id: 'backup.manage', name: 'Manage Backups', desc: 'Create, download, and restore system backups' },
        { id: 'system.logs', name: 'View System Logs', desc: 'Access raw daemon and panel logs' },
      ]
    }
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Permissions updated successfully!', 'success');
    }, 1000);
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
          <h2 className="text-3xl font-bold text-white mb-1">Role Permissions</h2>
          <p className="text-slate-400">Define access control for staff members across the panel.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all font-medium disabled:opacity-50"
        >
          {saving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Settings className="w-4 h-4" /></motion.div> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Permissions'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Roles Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between border ${
                activeRole === role.id 
                  ? 'bg-white/10 border-white/20 shadow-lg' 
                  : 'bg-black/20 border-transparent hover:bg-white/5 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <Shield className={`w-5 h-5 ${activeRole === role.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="font-bold">{role.name}</span>
              </div>
            </button>
          ))}
          <button className="w-full mt-4 px-4 py-3 border border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <UserCheck className="w-4 h-4" /> Create New Role
          </button>
        </div>

        {/* Permissions Editor */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              Editing: {roles.find(r => r.id === activeRole)?.name}
            </h3>
            <p className="text-sm text-slate-400">
              Users assigned this role will inherit all permissions enabled below.
            </p>
          </div>

          {permissionsGroups.map(group => (
            <div key={group.category} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-black/20 px-6 py-4 border-b border-white/10 flex items-center gap-3">
                {group.icon}
                <h4 className="font-bold text-white">{group.category}</h4>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.perms.map(perm => {
                  // Simulate some defaults based on role
                  const isChecked = activeRole === 'admin' || (activeRole === 'mod' && !perm.id.includes('delete') && !perm.id.includes('css'));
                  
                  return (
                    <label key={perm.id} className="flex items-start gap-3 p-4 bg-black/20 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer transition-colors group">
                      <div className="pt-0.5">
                        <input 
                          type="checkbox" 
                          defaultChecked={isChecked}
                          disabled={activeRole === 'admin'} // Admin has all by default
                          className="w-5 h-5 rounded border-white/20 bg-black/40 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-black disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white mb-0.5">{perm.name}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{perm.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
