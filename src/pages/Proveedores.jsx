import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MessageCircle, Mail, Edit, Trash2, FileText } from 'lucide-react';

export default function Proveedores() {
  const navigate = useNavigate();

  // Datos de prueba
  const proveedores = [
    { id: 1, razon: 'Aceros Industriales del Centro S.A.C.', contacto: 'Carlos Mendoza', tel: '+51987654321', estado: 'Activo' },
    { id: 2, razon: 'Ferretería Industrial El Tornillo', contacto: 'Ana Silva', tel: '+51912345678', estado: 'Activo' },
    { id: 3, razon: 'Distribuidora MetalMecánica SAC', contacto: 'Luis Rojas', tel: '+51999888777', estado: 'Inactivo' },
  ];

  // Función clave: Viajamos a /ordenes y le mandamos los datos del proveedor en la "maleta" (state)
  const handleGenerarOC = (prov) => {
    navigate('/ordenes', { state: { proveedor: prov } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-sinme-azul">Directorio de Proveedores</h2>
          <p className="text-gray-500 text-sm mt-1">Gestiona los contactos para cotizaciones y abastecimiento.</p>
        </div>
        <button className="bg-sinme-dorado hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-md transition-colors">
          <Plus size={20} />
          Nuevo Proveedor
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Buscar por razón social o contacto..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sinme-dorado" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sinme-azul text-white text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Razón Social</th>
              <th className="px-6 py-4 font-medium">Contacto</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {proveedores.map((prov) => (
              <tr key={prov.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{prov.razon}</td>
                <td className="px-6 py-4">
                  <p>{prov.contacto}</p>
                  <p className="text-xs text-gray-500">{prov.tel}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${prov.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {prov.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-3">
  {/* NUEVO BOTÓN PARA GENERAR OC */}
  <button onClick={() => handleGenerarOC(prov)} className="text-sinme-dorado hover:text-yellow-700 transition-colors">
    <FileText size={20} />
  </button>

  {/* BOTÓN DE WHATSAPP REAL */}
  <a 
    href={`https://wa.me/51${991878831}`}
    target="_blank" 
    rel="noopener noreferrer"
    className="text-green-600 hover:text-green-800 transition-colors" 
    title="WhatsApp"
  >
    <MessageCircle size={20} />
  </a>
  
  {/* BOTÓN DE CORREO REAL */}
  <a 
    href={`mailto:${prov.email}`}
    className="text-blue-500 hover:text-blue-700 transition-colors" 
    title="Correo"
  >
    <Mail size={20} />
  </a>
</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}