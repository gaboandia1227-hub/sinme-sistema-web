// src/utils/stockLogic.js
export const verificarEstadoStock = (stockActual, stockMinimo) => {
  if (stockActual === 0) return 'Agotado';
  if (stockActual <= stockMinimo) return 'Reabastecer';
  return 'Optimo';
};