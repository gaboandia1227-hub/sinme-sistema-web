import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Printer, X, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../supabase';

export default function OrdenesCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const proveedor = location.state?.proveedor;

  // Estados
  const [materialesDB, setMaterialesDB] = useState([]);
  const [itemsPedido, setItemsPedido] = useState([]);
  
  // Formulario temporal para agregar ítems
  const [matSeleccionado, setMatSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  // Cargar inventario al entrar
  useEffect(() => {
    if (proveedor) obtenerMateriales();
  }, [proveedor]);

  const obtenerMateriales = async () => {
    // AQUÍ: 'materiales' en minúsculas estricto para que Supabase lo reconozca
    const { data, error } = await supabase.from('materiales').select('*');
    
    if (error) {
      console.error("Error cargando el inventario en la OC:", error);
    } else {
      setMaterialesDB(data);
    }
  };

  const agregarItem = () => {
    if (!matSeleccionado || !cantidad || !precio) return;
    
    const mat = materialesDB.find(m => m.id_material.toString() === matSeleccionado);
    const nuevoItem = {
      id: Date.now(),
      sku: mat.codigo_sku,
      nombre: mat.nombre,
      unidad: mat.unidad_medida,
      cantidad: parseFloat(cantidad),
      precioUnitario: parseFloat(precio),
      total: parseFloat(cantidad) * parseFloat(precio)
    };

    setItemsPedido([...itemsPedido, nuevoItem]);
    setMatSeleccionado(''); setCantidad(''); setPrecio('');
  };

  const eliminarItem = (id) => setItemsPedido(itemsPedido.filter(item => item.id !== id));

  // Cálculos financieros
  const subtotal = itemsPedido.reduce((acc, item) => acc + item.total, 0);
  const igv = subtotal * 0.18;
  const totalPagar = subtotal + igv;

  if (!proveedor) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 mt-20">
        <h2 className="text-2xl font-bold text-sinme-azul">Ningún proveedor seleccionado</h2>
        <p className="text-gray-500">Debes elegir un proveedor desde el directorio para generarle una OC.</p>
        <button onClick={() => navigate('/proveedores')} className="bg-sinme-dorado hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 mt-4">
          <ArrowLeft size={20} /> Volver al Directorio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Controles y Panel de Agregar Ítems (Ocultos al imprimir) */}
      <div className="print:hidden space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-sinme-azul">Generación de Orden de Compra</h2>
          <div className="flex gap-3">
            <button onClick={() => navigate('/proveedores')} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-4 rounded-lg flex items-center gap-2">
              <X size={20} /> Cancelar
            </button>
            <button onClick={() => window.print()} className="bg-sinme-azul hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-md">
              <Printer size={20} /> Imprimir OC
            </button>
          </div>
        </div>

        {/* Formulario para agregar materiales */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Material del Inventario</label>
            <select value={matSeleccionado} onChange={(e) => setMatSeleccionado(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sinme-dorado focus:outline-none">
              <option value="">Seleccione un material...</option>
              {materialesDB.map(m => (
                <option key={m.id_material} value={m.id_material}>{m.codigo_sku} - {m.nombre}</option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cantidad</label>
            <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} min="1" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sinme-dorado focus:outline-none" />
          </div>
          <div className="w-32">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio Unit.</label>
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} min="0" step="0.01" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sinme-dorado focus:outline-none" />
          </div>
          <button onClick={agregarItem} className="bg-green-600 hover:bg-green-700 text-white font-bold p-2 rounded-lg flex items-center gap-2 h-[42px]">
            <Plus size={20} /> Agregar
          </button>
        </div>
      </div>

      {/* ÁREA DEL DOCUMENTO FORMAL (PDF) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
        
        {/* Cabecera */}
        <div className="bg-sinme-azul text-white p-8 rounded-t-xl flex justify-between items-start print:rounded-none print:bg-sinme-azul print:text-white">
          <div className="flex items-center gap-4">
            <div className="bg-sinme-dorado text-white w-14 h-14 rounded-lg flex items-center justify-center font-bold text-3xl">S</div>
            <div>
              <h1 className="text-2xl font-bold">Consorcio Sinme S.A.C.</h1>
              <p className="text-sm text-gray-300 mt-1">RUC: 20601234567 · Ayacucho, Perú</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300 uppercase tracking-widest">Orden de Compra</p>
            <p className="text-3xl font-bold text-sinme-dorado mt-1">OC-2026-0951</p>
            <p className="text-sm text-gray-300 mt-2">Fecha: {new Date().toLocaleDateString('es-PE')}</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-gray-100 rounded-lg p-5 bg-gray-50 print:bg-white print:border-gray-300">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Emisor</p>
              <p className="font-bold text-sinme-azul text-lg">Consorcio Sinme S.A.C.</p>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>RUC: 20601234567</p>
                <p>Av. Mariscal Cáceres 1240</p>
                <p>Ayacucho, Huamanga</p>
              </div>
            </div>
            <div className="border border-gray-100 rounded-lg p-5 bg-blue-50/30 print:bg-white print:border-gray-300">
              <p className="text-xs font-bold text-sinme-dorado uppercase tracking-wider mb-2">Proveedor</p>
              <p className="font-bold text-sinme-azul text-lg">{proveedor.razon_social}</p>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>Contacto: {proveedor.persona_contacto}</p>
                <p>Tel/WhatsApp: {proveedor.telefono || proveedor.whatsapp}</p>
                <p>Email: {proveedor.email}</p>
              </div>
            </div>
          </div>

          {/* Tabla de Detalle Dinámica */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalle del Pedido</p>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-y border-gray-200 print:bg-white">
                  <th className="py-3 px-4 font-medium">SKU</th>
                  <th className="py-3 px-4 font-medium">Descripción</th>
                  <th className="py-3 px-4 font-medium text-center">Cant.</th>
                  <th className="py-3 px-4 font-medium text-right">P. Unit.</th>
                  <th className="py-3 px-4 font-medium text-right">Total</th>
                  <th className="py-3 px-4 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {itemsPedido.length === 0 ? (
                  <tr><td colSpan="6" className="py-6 text-center text-gray-400 italic">No hay materiales agregados a esta orden.</td></tr>
                ) : (
                  itemsPedido.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 px-4 text-sm text-gray-500">{item.sku}</td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-sinme-azul">{item.nombre}</p>
                        <p className="text-xs text-gray-400">{item.unidad}</p>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">{item.cantidad}</td>
                      <td className="py-4 px-4 text-right text-gray-700">S/ {item.precioUnitario.toFixed(2)}</td>
                      <td className="py-4 px-4 text-right font-bold text-gray-900">S/ {item.total.toFixed(2)}</td>
                      <td className="py-4 px-4 text-right print:hidden">
                        <button onClick={() => eliminarItem(item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Totales Dinámicos */}
          <div className="flex justify-end border-t border-gray-200 pt-6">
            <div className="w-72 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-3">
                <span>IGV (18%)</span>
                <span>S/ {igv.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sinme-azul text-xl pt-2">
                <span>Total a pagar</span>
                <span>S/ {totalPagar.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Firmas y Condiciones (Mantenemos igual) */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}