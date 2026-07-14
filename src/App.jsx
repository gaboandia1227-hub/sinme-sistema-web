import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, FileText, Settings, LogOut } from 'lucide-react';

import Proveedores from './pages/Proveedores';
import OrdenesCompra from './pages/OrdenesCompra';
import Inventario from './pages/Inventario';
import Login from './pages/Login';

export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-sinme-dorado text-sinme-azul shadow-md'
      : 'hover:bg-blue-900/50 text-gray-300 hover:text-white';

  if (!usuarioActivo) {
    return <Login onLogin={setUsuarioActivo} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-sinme-azul text-white flex flex-col shadow-xl z-10">
        <div className="p-6 text-center border-b border-blue-900/50">
          <h1 className="text-2xl font-bold text-sinme-dorado tracking-wide">SINME</h1>
          <p className="text-xs mt-1 text-gray-300 font-light">CONSORCIO S.A.C.</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${isActive('/')}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/inventario" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${isActive('/inventario')}`}>
            <Package size={20} />
            Inventario
          </Link>
          <Link to="/proveedores" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${isActive('/proveedores')}`}>
            <Users size={20} />
            Proveedores
          </Link>
          <Link to="/ordenes" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${isActive('/ordenes')}`}>
            <FileText size={20} />
            Órdenes de Compra
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-900/50">
          <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:text-sinme-dorado transition-colors">
            <Settings size={20} />
            Configuración
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Sistema de Gestión Logística</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-sm font-bold text-sinme-azul">{usuarioActivo.nombre_completo}</p>
              <p className="text-xs text-gray-500">{usuarioActivo.rol || 'Administrador'}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-sinme-dorado text-white flex items-center justify-center font-bold">
              {usuarioActivo.nombre_completo?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button
              onClick={() => setUsuarioActivo(null)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors border-l pl-4 ml-2"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto mt-10">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LayoutDashboard size={32} className="text-sinme-azul" />
                  </div>
                  <h3 className="text-2xl font-bold text-sinme-azul mb-2">
                    Bienvenido, {usuarioActivo.nombre_completo}
                  </h3>
                  <p className="text-gray-500">
                    Haz clic en "Proveedores", "Inventario" u "Órdenes de Compra" para empezar.
                  </p>
                </div>
              }
            />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/ordenes" element={<OrdenesCompra />} />
            <Route path="/inventario" element={<Inventario />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}