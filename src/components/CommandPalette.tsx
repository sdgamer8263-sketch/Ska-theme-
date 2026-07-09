import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  modules: { id: string; label: string; icon: React.ReactNode }[];
}

export default function CommandPalette({ isOpen, onClose, onNavigate, modules }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchQuery('');
    }
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const filteredModules = modules.filter(m => 
    m.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search for a module... (e.g. Servers, Settings)" 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') onClose();
                  if (e.key === 'Enter' && filteredModules.length > 0) handleSelect(filteredModules[0].id);
                }}
              />
              <div className="text-xs text-slate-500 font-mono bg-white/5 px-2 py-1 rounded">ESC</div>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto p-2">
              {filteredModules.length > 0 ? (
                filteredModules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => handleSelect(module.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-500/10 rounded-xl transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3 text-slate-300 group-hover:text-indigo-400">
                      {module.icon}
                      <span className="font-medium">{module.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-slate-500">
                  No modules found matching "{searchQuery}"
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
