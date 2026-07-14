import React, { useState, useEffect } from 'react';
import { Search, Plus, X, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { supabase } from '../supabase';

export default function Inventario() {
  const [materiales, setMateriales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  
  // Estados para el Modal de Nuevo Material
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [formulario, setFormulario] = useState({
    codigo_sku: '',
    nombre: '',
    unidad_medida: 'UND',
    stock_minimo: '',
    stock_actual: ''
  });

  useEffect(() => {
    obtenerMateriales();
  }, []);

  // 1. FUNCIÓN PARA LEER MATERIALES (En minúsculas)
  const obtenerMateriales = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('materiales')
        .select('*')
        .order('id_material', { ascending: true });

      if (error) throw error;
      setMateriales(data);
    } catch (error) {
      console.error("Error al cargar inventario:", error.message);
    } finally {
      setCargando(false);
    }
  };

  // 2. FUNCIÓN PARA CREAR NUEVO MATERIAL
  const handleCrearMaterial = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const nuevoMaterial = {
        codigo_sku: formulario.codigo_sku,
        nombre: formulario.nombre,
        unidad_medida: formulario.unidad_medida,
        stock_minimo: parseFloat(formulario.stock_minimo),
        stock_actual: parseFloat(formulario.stock_actual)
      };

      const { error } = await supabase
        .from('materiales')
        .insert([nuevoMaterial]);

      if (error) throw error;

      // Si todo sale bien, cerramos el modal, limpiamos y recargamos la tabla
      setMostrarModal(false);
      setFormulario({ codigo_sku: '', nombre: '', unidad_medida: 'UND', stock_minimo: '', stock_actual: '' });
      obtenerMateriales();

    } catch (error) {
      console.error("Error al crear material:", error.message);
      alert("Hubo un error al guardar. Verifica la consola.");
    } finally {
      setGuardando(false);
    }
  };

  // Filtrador para la barra de búsqueda
  const materialesFiltrados = materiales.filter(m => 
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    m.codigo_sku.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-sinme-azul flex items-center gap-2">
            <Package size={24} className="text-sinme-dorado" /> Control de Inventario
          </h2>
          <p className="text-gray-500 mt-1">Gestión de materiales, stock y alertas de reabastecimiento.</p>
        </div>
        {/* BOTÓN CONECTADO AL ESTADO DEL MODAL */}
        <button 
          onClick={() => setMostrarModal(true)}
          className="bg-sinme-dorado hover:bg-yellow-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 shadow-md transition-colors"
        >
          <Plus size={20} /> Nuevo Material
        </button>
      </div>

      {/* Barra de Búsqueda */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por código SKU o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sinme-dorado"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sinme-azul text-white text-sm">
                <th className="py-4 px-6 font-semibold">SKU / MATERIAL</th>
                <th className="py-4 px-6 font-semibold text-center">U.M.</th>
                <th className="py-4 px-6 font-semibold text-center">STOCK MÍNIMO</th>
                <th className="py-4 px-6 font-semibold text-center">STOCK ACTUAL</th>
                <th className="py-4 px-6 font-semibold text-center">ESTADO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cargando ? (
                <tr><td colSpan="5" className="py-8 text-center text-gray-500">Cargando inventario...</td></tr>
              ) : materialesFiltrados.length === 0 ? (
                <tr><td colSpan="5" className="py-8 text-center text-gray-500">No se encontraron materiales.</td></tr>
              ) : (
                materialesFiltrados.map((item) => (
                  <tr key={item.id_material} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-800 text-sm">{item.codigo_sku}</p>
                      <p className="text-sinme-azul font-medium">{item.nombre}</p>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600 text-sm font-medium">{item.unidad_medida}</td>
                    <td className="py-4 px-6 text-center text-gray-600 font-medium">{item.stock_minimo}</td>
                    <td className="py-4 px-6 text-center font-bold text-lg text-gray-800">{item.stock_actual}</td>
                    <td className="py-4 px-6 text-center">
                      {item.stock_actual <= item.stock_minimo ? (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                          <AlertTriangle size={14} /> Reabastecer
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                          <CheckCircle size={14} /> Óptimo
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE NUEVO MATERIAL */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            
            {/* Cabecera del Modal */}
            <div className="bg-sinme-azul p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Registrar Nuevo Material</h3>
              <button onClick={() => setMostrarModal(false)} className="text-blue-200 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleCrearMaterial} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Código SKU</label>
                <input 
                  type="text" 
                  required
                  value={formulario.codigo_sku}
                  onChange={(e) => setFormulario({...formulario, codigo_sku: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-sinme-dorado focus:outline-none"
                  placeholder="Ej: MAT-001"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del Material</label>
                <input 
                  type="text" 
                  required
                  value={formulario.nombre}
                  onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-sinme-dorado focus:outline-none"
                  placeholder="Ej: Tubo de Acero 2 pulgadas"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Unidad (U.M.)</label>
                  <select 
                    value={formulario.unidad_medida}
                    onChange={(e) => setFormulario({...formulario, unidad_medida: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-sinme-dorado focus:outline-none"
                  >
                    <option value="UND">Unidad (UND)</option>
                    <option value="MTR">Metro (MTR)</option>
                    <option value="KG">Kilogramo (KG)</option>
                    <option value="GAL">Galón (GAL)</option>
                    <option value="CJA">Caja (CJA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Stock Inicial</label>
                  <input 
                    type="number" 
                    required min="0" step="0.01"
                    value={formulario.stock_actual}
                    onChange={(e) => setFormulario({...formulario, stock_actual: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-sinme-dorado focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Alerta de Stock Mínimo</label>
                <input 
                  type="number" 
                  required min="0" step="0.01"
                  value={formulario.stock_minimo}
                  onChange={(e) => setFormulario({...formulario, stock_minimo: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-sinme-dorado focus:outline-none bg-red-50"
                  placeholder="Cantidad para avisar"
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2.5 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={guardando}
                  className="flex-1 bg-sinme-dorado hover:bg-yellow-600 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-70"
                >
                  {guardando ? 'Guardando...' : 'Guardar Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}