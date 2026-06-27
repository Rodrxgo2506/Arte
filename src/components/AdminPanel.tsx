/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Subscriber, ContactMessage } from '../types';
import { X, Mail, MessageSquare, Trash2, Download, Eye, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'subscribers' | 'messages'>('subscribers');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Load data from local storage
  const loadData = () => {
    try {
      const storedSubs = localStorage.getItem('luistamani_subscribers');
      const storedMsgs = localStorage.getItem('luistamani_messages');
      
      if (storedSubs) setSubscribers(JSON.parse(storedSubs));
      if (storedMsgs) setMessages(JSON.parse(storedMsgs));
    } catch (e) {
      console.error('Error reading local storage data', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const deleteSubscriber = (id: string) => {
    const updated = subscribers.filter(s => s.id !== id);
    setSubscribers(updated);
    localStorage.setItem('luistamani_subscribers', JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('luistamani_messages', JSON.stringify(updated));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const exportData = () => {
    const dataStr = activeTab === 'subscribers' 
      ? JSON.stringify(subscribers, null, 2)
      : JSON.stringify(messages, null, 2);
      
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = activeTab === 'subscribers' ? 'subscriptores.json' : 'mensajes.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="admin-panel-overlay">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
        id="admin-panel-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-slate-800">Panel de Control Local</h3>
              <p className="text-xs text-slate-500 font-mono">Modo de pruebas y persistencia local</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-white">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'subscribers' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Mail size={16} />
              <span>Suscriptores ({subscribers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'messages' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <MessageSquare size={16} />
              <span>Mensajes de Contacto ({messages.length})</span>
            </button>
          </div>

          <button
            onClick={exportData}
            disabled={activeTab === 'subscribers' ? subscribers.length === 0 : messages.length === 0}
            className="flex items-center space-x-2 px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          >
            <Download size={14} />
            <span>Exportar JSON</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab === 'subscribers' ? (
            /* Subscribers List */
            subscribers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                <Mail size={48} className="stroke-[1.2] mb-3" />
                <p className="text-sm font-medium">No hay suscripciones registradas aún.</p>
                <p className="text-xs mt-1">Usa el formulario del boletín para agregar correos de prueba.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs font-mono text-slate-500 uppercase">
                      <th className="py-3 px-4 font-semibold">Correo Electrónico</th>
                      <th className="py-3 px-4 font-semibold">Fecha de Registro</th>
                      <th className="py-3 px-4 text-right font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-800">{sub.email}</td>
                        <td className="py-3.5 px-4 text-slate-500 text-xs">
                          {new Date(sub.subscribedAt).toLocaleString('es-ES')}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => deleteSubscriber(sub.id)}
                            className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                            title="Eliminar suscriptor"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            /* Messages List */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {/* Message Master List */}
              <div className="md:col-span-1 flex flex-col space-y-3 overflow-y-auto max-h-[55vh]">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Bandeja de Entrada
                </h4>
                {messages.length === 0 ? (
                  <div className="bg-white rounded-xl border border-dashed border-slate-200 p-6 text-center text-slate-400">
                    <MessageSquare size={32} className="mx-auto mb-2 stroke-[1.2]" />
                    <p className="text-xs font-medium">Bandeja vacía</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selectedMessage?.id === msg.id
                          ? 'bg-indigo-50/80 border-indigo-200 shadow-sm'
                          : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-slate-800 truncate max-w-[120px]">
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(msg.sentAt).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-700 truncate mb-1">
                        {msg.subject}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{msg.message}</p>
                    </button>
                  ))
                )}
              </div>

              {/* Message Detail Viewer */}
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col shadow-sm">
                {selectedMessage ? (
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
                        <div>
                          <h4 className="font-serif text-base font-semibold text-slate-800">
                            {selectedMessage.subject}
                          </h4>
                          <div className="flex flex-col text-xs text-slate-500 mt-1.5 space-y-0.5">
                            <p>
                              <strong className="font-mono text-slate-600">De:</strong>{' '}
                              {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                            </p>
                            <p>
                              <strong className="font-mono text-slate-600">Fecha:</strong>{' '}
                              {new Date(selectedMessage.sentAt).toLocaleString('es-ES')}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteMessage(selectedMessage.id)}
                          className="p-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
                          title="Eliminar mensaje"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed max-h-[30vh] overflow-y-auto">
                        {selectedMessage.message}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 mt-4 text-right">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                      >
                        <Mail size={14} />
                        <span>Responder vía Correo</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12 text-center">
                    <Eye size={40} className="stroke-[1.2] mb-2 text-slate-300" />
                    <p className="text-sm font-medium">Selecciona un mensaje</p>
                    <p className="text-xs mt-1 max-w-xs mx-auto">
                      Haz clic en cualquiera de los mensajes de la bandeja de entrada para leer el contenido detallado.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
