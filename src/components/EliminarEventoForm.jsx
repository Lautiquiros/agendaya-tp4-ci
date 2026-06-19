'use client';

import { useState } from 'react';

export default function EliminarEventoForm() {
  // Evento base simulado para aplicar la eliminación lógica.
  const [evento, setEvento] = useState({
    id: 16,
    nombre: 'Consulta de seguimiento',
    duracion: 30,
    activo: true,
    eliminado: false,
  });

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const solicitarEliminacion = () => {
    setMensaje('');
    setMostrarConfirmacion(true);
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(false);
  };

  const confirmarEliminacion = () => {
    // Eliminación lógica:
    // el evento sigue existiendo, pero queda inactivo y eliminado.
    setEvento({
      ...evento,
      activo: false,
      eliminado: true,
    });

    setMostrarConfirmacion(false);
    setMensaje('Tipo de evento eliminado correctamente.');
  };

  return (
    <section>
      <h2>Eliminar tipo de evento</h2>

      <p>
        Nombre: <strong>{evento.nombre}</strong>
      </p>

      <p>
        Duración: <strong>{evento.duracion} minutos</strong>
      </p>

      <p>
        Estado:{' '}
        <strong data-testid="estado-evento">
          {evento.activo ? 'Activo' : 'Inactivo'}
        </strong>
      </p>

      {!evento.eliminado && (
        <button type="button" onClick={solicitarEliminacion}>
          Eliminar
        </button>
      )}

      {mostrarConfirmacion && (
        <div role="dialog" aria-label="Confirmación de eliminación">
          <p>¿Está seguro de que desea eliminar este tipo de evento?</p>

          <button type="button" onClick={confirmarEliminacion}>
            Confirmar eliminación
          </button>

          <button type="button" onClick={cancelarEliminacion}>
            Cancelar
          </button>
        </div>
      )}

      {mensaje && <p role="alert">{mensaje}</p>}
    </section>
  );
}