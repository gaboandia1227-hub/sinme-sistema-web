import React, { useState } from 'react';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../supabase';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

const handleIngresar = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      // 1. Limpiamos espacios fantasmas
      const emailLimpio = email.trim();
      const passwordLimpio = password.trim();

      // 2. Buscamos al usuario ignorando mayúsculas/minúsculas con "ilike"
      const { data, error: errorDB } = await supabase
        .from('usuarios')
        .select('*')
        .ilike('email', emailLimpio);

      // Si hay error técnico, lo mostramos
      if (errorDB) throw new Error(`Error técnico: ${errorDB.message}`);

      // 3. ¿El correo existe?
      if (!data || data.length === 0) {
        throw new Error('❌ El correo no existe en la base de datos.');
      }

      const usuarioEncontrado = data[0];

      // 4. ¿La contraseña cuadra?
      if (usuarioEncontrado.password_hash !== passwordLimpio) {
        throw new Error('❌ La contraseña es incorrecta.');
      }

      // 5. ¿El usuario está activo?
      if (!usuarioEncontrado.activo) {
        throw new Error('❌ El usuario está inactivo.');
      }

      // ¡Pasó todas las pruebas! Pa' adentro.
      onLogin(usuarioEncontrado);

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Cabecera del Login */}
        <div className="bg-sinme-azul p-8 text-center">
          <div className="bg-sinme-dorado text-white w-16 h-16 rounded-xl flex items-center justify-center font-bold text-4xl mx-auto shadow-lg mb-4">
            S
          </div>
          <h2 className="text-2xl font-bold text-white">CONSORCIO SINME</h2>
          <p className="text-blue-200 text-sm mt-1">Sistema de Gestión Logística</p>
        </div>

        {/* Formulario */}
        <div className="p-8">
          <form onSubmit={handleIngresar} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sinme-dorado transition-all"
                  placeholder="admin@sinme.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sinme-dorado transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={cargando}
              className="w-full bg-sinme-dorado hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-70"
            >
              {cargando ? <Loader2 className="animate-spin" size={20} /> : 'Ingresar al Sistema'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}