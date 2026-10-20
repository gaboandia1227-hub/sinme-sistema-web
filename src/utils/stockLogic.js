// src/utils/stockLogic.js
export const verificarEstadoStock = (stockActual, stockMinimo) => {
  if (stockActual === 0) return 'Agotado';
  if (stockActual <= stockMinimo) return 'Reabastecer';
  return 'Optimo';
};

export const calcularPorcentajeStock = (stockActual, stockMinimo) => {
  if (stockMinimo === 0) return 0;
  return Math.round(stockActual / stockMinimo);
};