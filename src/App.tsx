/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Palette, 
  Plug, 
  Users, 
  Server, 
  HardDrive,
  Copy,
  CheckCircle2,
  Terminal,
  Database,
  FolderTree,
  Activity,
  Layers,
  ArrowUpCircle,
  DatabaseBackup,
  ScrollText,
  PackageOpen,
  SplitSquareHorizontal,
  UserCheck,
  FileText
} from 'lucide-react';
import ServerDashboard from './components/ServerDashboard';
import ThemeSettingsContainer from './components/ThemeSettingsContainer';
import PluginInstallerContainer from './components/PluginInstallerContainer';
import VersionManager from './components/VersionManager';
import ResourceMonitor from './components/ResourceMonitor';
import AutoUpdater from './components/AutoUpdater';
import BackupManager from './components/BackupManager';
import SystemLogs from './components/SystemLogs';
import ModInstaller from './components/ModInstaller';
import BedrockAddonInstaller from './components/BedrockAddonInstaller';
import PlayerManager from './components/PlayerManager';
import ServerSplitter from './components/ServerSplitter';
import PermissionsManager from './components/PermissionsManager';
import Documentation from './components/Documentation';
import NodeOverview from './components/NodeOverview';
import CommandPalette from './components/CommandPalette';
import ConsoleView from './components/ConsoleView';
import UserDashboard from './components/UserDashboard';

import { ErrorBoundary } from './components/ErrorBoundary';

const files = {
  'folder_structure.md': {
    title: 'Folder Structure',
    icon: <FolderTree className="w-5 h-5" />,
    content: `/pterodactyl
├── app/
│   ├── Http/Controllers/Admin/Theme/
│   │   ├── ThemeSettingsController.php
│   │   └── PluginInstallerController.php
│   └── Models/ThemeSetting.php
├── database/migrations/
│   └── 2026_07_09_create_theme_settings.php
├── resources/scripts/
│   ├── components/admin/theme/
│   │   └── ThemeSettingsContainer.tsx
│   └── theme/uis/glass/
└── public/themes/custom/`
  },
  'database_migrations.php': {
    title: 'Database Migrations',
    icon: <Database className="w-5 h-5" />,
    content: `<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class CreateThemeSettingsTable extends Migration {
    public function up() {
        Schema::create('theme_settings', function (Blueprint $table) {
            $table->id();
            $table->string('active_ui')->default('glass');
            $table->string('primary_color')->default('#3b82f6');
            $table->boolean('enable_plugin_installer')->default(true);
            $table->timestamps();
        });
    }
}`
  },
  'install.sh': {
    title: 'Bash Installer',
    icon: <Terminal className="w-5 h-5" />,
    content: `#!/bin/bash
# Pterodactyl Theme & Addon Suite - Installer
set -e

PANEL_DIR="/var/www/pterodactyl"
echo "Putting panel into maintenance mode..."
cd "$PANEL_DIR"
php artisan down

echo "Downloading theme files..."
# curl -s -L "$URL" -o theme.tar.gz

echo "Installing node dependencies..."
yarn install --frozen-lockfile

echo "Building React frontend assets..."
yarn build:production

php artisan up
echo "Installation Complete!"`
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('install.sh');
  const [activeView, setActiveView] = useState('user_dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeTab as keyof typeof files].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a1a] flex overflow-hidden font-sans text-slate-100 selection:bg-indigo-500/30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #1e1b4b 0%, transparent 50%), radial-gradient(circle at 80% 70%, #312e81 0%, transparent 50%), radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)" }}>
      <CommandPalette 
        isOpen={isCmdPaletteOpen} 
        onClose={() => setIsCmdPaletteOpen(false)} 
        onNavigate={setActiveView}
        modules={[
          { id: 'user_dashboard', label: 'My Servers', icon: <Server className="w-5 h-5" /> },
          { id: 'console', label: 'Server Console', icon: <Terminal className="w-5 h-5" /> },
          { id: 'dashboard', label: 'Admin Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: 'servers', label: 'All Servers', icon: <Server className="w-5 h-5" /> },
          { id: 'nodes', label: 'Node Overview', icon: <Activity className="w-5 h-5" /> },
          { id: 'monitor', label: 'Resource Monitor', icon: <Activity className="w-5 h-5" /> },
          { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
          { id: 'versions', label: 'Version Manager', icon: <Layers className="w-5 h-5" /> },
          { id: 'plugin_installer', label: 'Plugin Installer', icon: <Plug className="w-5 h-5" /> },
          { id: 'mod_installer', label: 'Mod Installer', icon: <PackageOpen className="w-5 h-5" /> },
          { id: 'bedrock_installer', label: 'Bedrock Addons', icon: <PackageOpen className="w-5 h-5" /> },
          { id: 'server_splitter', label: 'Server Splitter', icon: <SplitSquareHorizontal className="w-5 h-5" /> },
          { id: 'backup', label: 'Backup Manager', icon: <DatabaseBackup className="w-5 h-5" /> },
          { id: 'logs', label: 'System Logs', icon: <ScrollText className="w-5 h-5" /> },
          { id: 'theme_settings', label: 'Theme Settings', icon: <Palette className="w-5 h-5" /> },
          { id: 'permissions', label: 'Permissions', icon: <UserCheck className="w-5 h-5" /> },
          { id: 'updater', label: 'Auto Updater', icon: <ArrowUpCircle className="w-5 h-5" /> },
          { id: 'docs', label: 'Documentation', icon: <FileText className="w-5 h-5" /> },
          { id: 'foundation', label: 'Foundation Code', icon: <Settings className="w-5 h-5" /> },
        ]}
      />
      {/* Sidebar */}
      <aside className="w-64 h-full bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col overflow-y-auto shrink-0 z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="shrink-0 w-10 h-10 bg-indigo-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center text-white">
              <span className="font-bold text-xl">P</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">PTERO<span className="text-indigo-400">SUITE</span></h1>
          </div>
          
          <nav className="space-y-2">
            <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Client Area</div>
            <NavItem icon={<Server />} label="My Servers" active={activeView === 'user_dashboard'} onClick={() => setActiveView('user_dashboard')} />
            <NavItem icon={<Terminal />} label="Server Console" active={activeView === 'console'} onClick={() => setActiveView('console')} />

            <div className="mt-8 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Admin Area</div>
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
            <NavItem icon={<Server />} label="All Servers" active={activeView === 'servers'} onClick={() => setActiveView('servers')} />
            <NavItem icon={<Activity />} label="Node Overview" active={activeView === 'nodes'} onClick={() => setActiveView('nodes')} />
            <NavItem icon={<Activity />} label="Resource Monitor" active={activeView === 'monitor'} onClick={() => setActiveView('monitor')} />
            <NavItem icon={<Users />} label="Users" active={activeView === 'users'} onClick={() => setActiveView('users')} />
            
            <div className="mt-8 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Server Management</div>
            <NavItem icon={<Layers />} label="Version Manager" active={activeView === 'versions'} onClick={() => setActiveView('versions')} />
            <NavItem icon={<Plug />} label="Plugin Installer" active={activeView === 'plugin_installer'} onClick={() => setActiveView('plugin_installer')} />
            <NavItem icon={<PackageOpen />} label="Mod Installer" active={activeView === 'mod_installer'} onClick={() => setActiveView('mod_installer')} />
            <NavItem icon={<PackageOpen />} label="Bedrock Addons" active={activeView === 'bedrock_installer'} onClick={() => setActiveView('bedrock_installer')} />
            <NavItem icon={<SplitSquareHorizontal />} label="Server Splitter" active={activeView === 'server_splitter'} onClick={() => setActiveView('server_splitter')} />
            <NavItem icon={<DatabaseBackup />} label="Backup Manager" active={activeView === 'backup'} onClick={() => setActiveView('backup')} />
            <NavItem icon={<ScrollText />} label="System Logs" active={activeView === 'logs'} onClick={() => setActiveView('logs')} />
            
            <div className="mt-8 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">System Configurations</div>
            <NavItem icon={<Palette />} label="Theme Settings" active={activeView === 'theme_settings'} onClick={() => setActiveView('theme_settings')} />
            <NavItem icon={<UserCheck />} label="Permissions" active={activeView === 'permissions'} onClick={() => setActiveView('permissions')} />
            <NavItem icon={<ArrowUpCircle />} label="Auto Updater" active={activeView === 'updater'} onClick={() => setActiveView('updater')} />
            <NavItem icon={<FileText />} label="Documentation" active={activeView === 'docs'} onClick={() => setActiveView('docs')} />
            <NavItem icon={<Settings />} label="Foundation Code" active={activeView === 'foundation'} onClick={() => setActiveView('foundation')} />
          </nav>
        </div>
        <div className="mt-auto p-6">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-xs text-slate-500 uppercase font-bold mb-2">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
              <span className="text-sm text-slate-300 font-medium">Systems Operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-20 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-10 w-80 bg-white/5 border border-white/10 rounded-full flex items-center px-4 relative group">
              <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                placeholder="Search servers or nodes..." 
                className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 hidden group-hover:flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                <span>Ctrl</span><span>K</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-white">Alex Rivera</span>
              <span className="text-xs text-indigo-400 uppercase tracking-widest">Admin Account</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white/20"></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <ErrorBoundary>
            {activeView === 'user_dashboard' && <UserDashboard />}
            {activeView === 'dashboard' && <ServerDashboard searchQuery={searchQuery} />}
            {activeView === 'servers' && <ServerDashboard searchQuery={searchQuery} />}
            {activeView === 'console' && <ConsoleView />}
            {activeView === 'nodes' && <NodeOverview />}
            {activeView === 'monitor' && <ResourceMonitor />}
            {activeView === 'users' && <PlayerManager />}
            {activeView === 'versions' && <VersionManager />}
            {activeView === 'plugin_installer' && <PluginInstallerContainer />}
            {activeView === 'mod_installer' && <ModInstaller />}
            {activeView === 'bedrock_installer' && <BedrockAddonInstaller />}
            {activeView === 'server_splitter' && <ServerSplitter />}
            {activeView === 'backup' && <BackupManager />}
            {activeView === 'logs' && <SystemLogs />}
            {activeView === 'theme_settings' && <ThemeSettingsContainer />}
            {activeView === 'permissions' && <PermissionsManager />}
            {activeView === 'docs' && <Documentation />}
            {activeView === 'updater' && <AutoUpdater />}
            {activeView === 'foundation' && (
              <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
                
                {/* Info Card */}
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                  <h2 className="text-2xl font-bold text-white mb-2">Foundation Initialized</h2>
                  <p className="text-slate-400 leading-relaxed max-w-3xl">
                    The AI mega-prompt has successfully generated the foundational files for the Ultimate Pterodactyl Theme. 
                    Below are the generated components required to bootstrap the architecture before building specific React/Laravel modules.
                    The full versions have also been saved to the workspace.
                  </p>
                </div>

                {/* Code Viewer Section */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
                  {/* Tabs */}
                  <div className="flex items-center border-b border-white/10 bg-black/20">
                    {Object.entries(files).map(([key, file]) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                          activeTab === key 
                            ? 'bg-white/5 text-white border-b-2 border-indigo-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        {file.icon}
                        {file.title}
                      </button>
                    ))}
                    <div className="flex-1" />
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 mr-4 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>

                  {/* Editor Surface */}
                  <div className="p-6 overflow-x-auto bg-black/40 font-mono text-sm leading-relaxed text-slate-300">
                    <pre>
                      <code>{files[activeTab as keyof typeof files].content}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
      active 
        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}>
      {React.cloneElement(icon as React.ReactElement<{className?: string}>, { className: 'w-5 h-5' })}
      <span>{label}</span>
    </button>
  );
}


function ProgressItem({ done, label }: { done?: boolean, label: string }) {
  return (
    <li className="flex items-center gap-3">
      {done ? (
        <CheckCircle2 className="w-5 h-5 text-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)] rounded-full" />
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
      )}
      <span className={done ? 'text-slate-300' : 'text-slate-500'}>{label}</span>
    </li>
  );
}
