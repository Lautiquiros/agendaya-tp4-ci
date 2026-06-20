'use client';
import { useState } from 'react';

export default function BloqueoDiasForm() {
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState('Inicial');

  // Simulación de las acciones del usuario
  const simularSeleccionDiaPasado = () => {
    setEstado('Error');
    setMensaje('Este día está bloqueado por ser anterior a la fecha actual.');
  };

  const simularSeleccionHoraPasada = () => {
    setEstado('Error');
    setMensaje('El sistema filtró este horario por ser anterior a la hora actual.');
  };

  const simularSeleccionExitosa = () => {
    setEstado('Completado');
    setMensaje('Horario seleccionado correctamente.');
  };

  return (
    <section>
      <h2>US_039 - Bloqueo de días y horarios pasados</h2>
      <p data-testid="estado-funcionalidad">
        Estado: {estado}
      </p>
      
      {/* Botones que simulan la interacción en la interfaz */}
      <button type="button" onClick={simularSeleccionExitosa}>
        Seleccionar horario futuro
      </button>
      <button type="button" onClick={simularSeleccionDiaPasado}>
        Seleccionar día pasado
      </button>
      <button type="button" onClick={simularSeleccionHoraPasada}>
        Seleccionar hora pasada hoy
      </button>

      {mensaje && <p role="alert">{mensaje}</p>}
    </section>
  );
}