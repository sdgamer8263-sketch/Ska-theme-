import React from 'react';
import { Save, Image as ImageIcon, Code, Palette, ToggleLeft, Upload } from 'lucide-react';
import { useToast } from './ToastProvider';
import { useTheme } from './ThemeProvider';

export default function ThemeSettingsContainer() {
  const { showToast } = useToast();
  const { settings, updateSettings } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    updateSettings({ [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'panel_background_url' | 'login_background_url') => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock upload process
      showToast(`Uploading ${file.name}...`, 'success');
      setTimeout(() => {
        const fakeUrl = `https://cdn.example.com/backgrounds/${file.name}`;
        updateSettings({ [field]: fakeUrl });
        showToast('Background uploaded successfully!', 'success');
      }, 1000);
    }
  };

  const handleSave = () => {
    showToast('Theme settings saved successfully.', 'success');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Theme Editor</h2>
          <p className="text-slate-400">Manage panel visuals, layouts, and active modules.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] font-semibold transition-all"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual Settings */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Palette className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Visual Identity</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active UI Theme</label>
                  <select 
                    name="active_ui"
                    value={settings.active_ui}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 transition-colors appearance-none"
                  >
                    <option value="glass">Glassmorphism (Default)</option>
                    <option value="modern">Modern Minimal</option>
                    <option value="classic">Classic Pterodactyl</option>
                    <option value="arix">Arix Inspired</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Color (Hex)</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      name="primary_color"
                      value={settings.primary_color}
                      onChange={handleChange}
                      className="w-12 h-12 rounded bg-transparent cursor-pointer"
                    />
                    <input 
                      type="text" 
                      name="primary_color"
                      value={settings.primary_color}
                      onChange={handleChange}
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 font-mono text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Panel Background
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      name="panel_background_url"
                      value={settings.panel_background_url}
                      onChange={handleChange}
                      placeholder="https://example.com/bg.jpg"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-sm"
                    />
                    <label className="flex items-center justify-center w-12 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                      <Upload className="w-5 h-5" />
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'panel_background_url')} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Login Background
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      name="login_background_url"
                      value={settings.login_background_url}
                      onChange={handleChange}
                      placeholder="https://example.com/login-bg.jpg"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-sm"
                    />
                    <label className="flex items-center justify-center w-12 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                      <Upload className="w-5 h-5" />
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'login_background_url')} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modules & CSS */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                  <ToggleLeft className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Module Toggles</h3>
                </div>
                <label className="flex items-center justify-between cursor-pointer p-3 hover:bg-white/5 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-white">Plugin Installer</p>
                    <p className="text-xs text-slate-500">Allow users to install plugins directly from the panel.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    name="enable_plugin_installer"
                    checked={settings.enable_plugin_installer}
                    onChange={handleChange}
                    className="w-5 h-5 accent-indigo-500 rounded bg-black/40 border-white/10"
                  />
                </label>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex-1 flex flex-col">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                  <Code className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Custom CSS</h3>
                </div>
                <textarea 
                  name="custom_css"
                  value={settings.custom_css}
                  onChange={handleChange}
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-300 outline-none focus:border-indigo-500 font-mono text-sm resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Preview Area */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4">Live Preview</h3>
            <div className="flex-1 bg-black/40 rounded-xl border border-white/10 overflow-hidden relative" style={{ backgroundImage: settings.panel_background_url ? `url(${settings.panel_background_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className={`absolute inset-0 ${settings.active_ui === 'glass' ? 'backdrop-blur-sm bg-black/40' : 'bg-[#0f172a]'}`}>
                {/* Mock UI elements to show the effect */}
                <div className="flex h-full">
                  <div className="w-16 border-r border-white/10 flex flex-col items-center py-4 gap-4" style={{ backgroundColor: settings.active_ui === 'modern' ? '#020617' : 'transparent' }}>
                    <div className="w-8 h-8 rounded-lg shadow-lg" style={{ backgroundColor: settings.primary_color }}></div>
                    <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                    <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="w-1/2 h-4 bg-white/20 rounded mb-4"></div>
                    <div className="w-3/4 h-3 bg-white/10 rounded mb-6"></div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="h-20 border border-white/10 rounded-lg" style={{ backgroundColor: settings.active_ui === 'glass' ? 'rgba(255,255,255,0.05)' : '#1e293b' }}></div>
                      <div className="h-20 border border-white/10 rounded-lg" style={{ backgroundColor: settings.active_ui === 'glass' ? 'rgba(255,255,255,0.05)' : '#1e293b' }}></div>
                    </div>
                    
                    <button className="w-full py-2 rounded-lg font-medium text-xs text-white" style={{ backgroundColor: settings.primary_color }}>
                      Action Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">Preview updates in real-time as you modify settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
