import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventManager } from '../src/components/CrearEvento';

describe('US_013 - Creación básica de tipo de evento (Componente JSX)', () => {

  // --- PRUEBA 1 (Escenario Principal: Todo correcto) ---
  test('Debe crear el evento exitosamente y agregarlo a la lista (sin descripción)', () => {
    render(<EventManager />);

    // PREPARAR: Capturar elementos del formulario
    const inputNombre = screen.getByLabelText(/Nombre del evento:/i);
    const inputDuracion = screen.getByLabelText(/Duración \(minutos\):/i);
    const botonEnviar = screen.getByRole('button', { name: /Crear Evento/i });

    // ACTUAR: Simular que el usuario escribe datos válidos y envía el formulario
    fireEvent.change(inputNombre, { target: { value: 'Consulta de Rutina' } });
    fireEvent.change(inputDuracion, { target: { value: '30' } });
    fireEvent.click(botonEnviar);

    // AFIRMAR: Verificar que aparezca el mensaje de éxito en pantalla
    const mensajeAlerta = screen.getByTestId('mensaje-alerta');
    expect(mensajeAlerta).toHaveTextContent('Evento creado exitosamente.');
    
    // AFIRMAR: Verificar que el elemento se renderizó en la lista visual
    const listaEventos = screen.getByTestId('lista-eventos');
    expect(listaEventos).toHaveTextContent('Consulta de Rutina (30 min)');
  });

  // --- PRUEBA 2 (Caso Negativo: Falta el nombre) ---
  test('Debe fallar si se intenta crear el evento con el nombre vacío', () => {
    render(<EventManager />);

    const inputDuracion = screen.getByLabelText(/Duración \(minutos\):/i);
    const botonEnviar = screen.getByRole('button', { name: /Crear Evento/i });

    // ACTUAR: Se deja el nombre vacío, se asigna duración y se envía
    fireEvent.change(inputDuracion, { target: { value: '45' } });
    fireEvent.click(botonEnviar);

    // AFIRMAR: El componente debe mostrar el error correspondiente en pantalla
    const mensajeAlerta = screen.getByTestId('mensaje-alerta');
    expect(mensajeAlerta).toHaveTextContent('El nombre del evento es obligatorio.');
  });

  // --- PRUEBA 3 (Caso Negativo: Duración inválida) ---
  test('Debe fallar si la duración es cero, negativa o no se envía', () => {
    render(<EventManager />);

    const inputNombre = screen.getByLabelText(/Nombre del evento:/i);
    const inputDuracion = screen.getByLabelText(/Duración \(minutos\):/i);
    const botonEnviar = screen.getByRole('button', { name: /Crear Evento/i });

    // ACTUAR: Se escribe un nombre válido pero duración en cero
    fireEvent.change(inputNombre, { target: { value: 'Consulta Rápida' } });
    fireEvent.change(inputDuracion, { target: { value: '1' } });
    fireEvent.click(botonEnviar);

    // AFIRMAR: El componente debe bloquear el registro e indicar la falla
    const mensajeAlerta = screen.getByTestId('mensaje-alerta');
    expect(mensajeAlerta).toHaveTextContent('La duración debe ser mayor a 0 minutos.');
  });

});