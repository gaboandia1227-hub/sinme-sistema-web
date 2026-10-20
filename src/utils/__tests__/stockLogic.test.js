// src/utils/stockLogic.test.js
import { describe, it, expect } from 'vitest';
import { verificarEstadoStock, calcularPorcentajeStock } from "../stockLogic";

describe('Lógica de Alertas de Stock de CONSORCIO SINME S.A.C.', () => {
  
  it('Debe retornar "Optimo" si el stock actual es mayor al mínimo', () => {
    const resultado = verificarEstadoStock(50, 10);
    expect(resultado).toBe('Optimo');
  });

  it('Debe retornar "Reabastecer" si el stock actual es igual o menor al mínimo', () => {
    const resultado = verificarEstadoStock(10, 10); // Igual al mínimo
    expect(resultado).toBe('Reabastecer');
    
    const resultado2 = verificarEstadoStock(5, 10); // Menor al mínimo
    expect(resultado2).toBe('Reabastecer');
  });

  it('Debe retornar "Agotado" si el stock actual es 0', () => {
    const resultado = verificarEstadoStock(0, 10);
    expect(resultado).toBe('Agotado');
  });

});

describe('Calculo de porcentaje de stock', () => {

  it('Debe calcular el porcentaje de stock actual sobre el minimo', () => {
    const resultado = calcularPorcentajeStock(50, 10);
    expect(resultado).toBe(500); // 50 es 500% del minimo (10)
  });

  it('Debe retornar 100 cuando el stock actual es igual al minimo', () => {
    const resultado = calcularPorcentajeStock(10, 10);
    expect(resultado).toBe(100);
  });

});