import React, { useState } from 'react';
import { Book, Code, Terminal, Server, Link as LinkIcon, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Documentation() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const codeSnippets = {
    auth: `// Laravel Controller (Pterodactyl API)
public function authenticateThemeUser(Request $request) {
    $user = $request->user();
    
    if (!$user->root_admin && !$user->hasPermission('theme.read')) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }
    
    return response()->json([
        'uuid' => $user->uuid,
        'role' => $user->root_admin ? 'admin' : 'user',
        'theme_settings' => $user->theme_preferences
    ]);
}`,
    fetchServers: `// Fetching server list via API
const fetchServers = async () => {
  const res = await fetch('/api/client/servers', {
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Accept': 'application/json'
    }
  });
  return await res.json();
};`
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">API Integration Guide</h2>
        <p className="text-slate-400">Documentation for connecting the React UI to the Pterodactyl Laravel backend.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sections</div>
          <button className="w-full text-left px-4 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
            Authentication
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-white/5 text-slate-400 font-medium transition-colors">
            Server Management
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-white/5 text-slate-400 font-medium transition-colors">
            Theme Sync
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldIcon className="w-6 h-6 text-indigo-400" /> Endpoint Security
            </h3>
            <p className="text-slate-300 leading-relaxed">
              All custom API routes should be registered in <code className="bg-black/30 px-1.5 py-0.5 rounded text-indigo-300">routes/api-client.php</code> to leverage Pterodactyl's built-in Sanctum authentication guard.
            </p>
            
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <div className="bg-black/40 px-4 py-3 border-b border-white/10 flex justify-between items-center">
                <span className="font-mono text-xs text-slate-400">app/Http/Controllers/Api/Client/ThemeController.php</span>
                <button 
                  onClick={() => handleCopy(codeSnippets.auth, 'auth')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {copied === 'auth' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto bg-[#0d1117] text-sm text-slate-300 font-mono">
                <code>{codeSnippets.auth}</code>
              </pre>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Server className="w-6 h-6 text-indigo-400" /> Client API Usage
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When querying the server list from the React frontend, use the standard client API endpoints. Ensure CORS is configured if running the React dev server externally.
            </p>
            
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <div className="bg-black/40 px-4 py-3 border-b border-white/10 flex justify-between items-center">
                <span className="font-mono text-xs text-slate-400">src/api/client.ts</span>
                <button 
                  onClick={() => handleCopy(codeSnippets.fetchServers, 'fetch')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {copied === 'fetch' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto bg-[#0d1117] text-sm text-slate-300 font-mono">
                <code>{codeSnippets.fetchServers}</code>
              </pre>
            </div>
          </section>

        </div>
      </div>
    </motion.div>
  );
}

// Temporary icon component since Shield was already used above but imported differently
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
