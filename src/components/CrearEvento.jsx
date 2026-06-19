import React, { useState } from 'react';

export function EventManager() {
  const [nombre, setNombre] = useState('');
  const [duracion, setDuracion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(null);
  const [eventos, setEventos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación 1: El nombre es estrictamente obligatorio
    if (!nombre || nombre.trim() === "") {
      setExito(false);
      setMensaje("El nombre del evento es obligatorio.");
      return;
    }

    // Validación 2: La duración es obligatoria y debe ser mayor a 0
    const duracionNum = parseInt(duracion, 10);
    if (!duracion || duracionNum <= 0) {
      setExito(false);
      setMensaje("La duración debe ser mayor a 0 minutos.");
      return;
    }

    // Si pasa todas las validaciones, se crea el evento
    const nuevoEvento = {
      id: Date.now(),
      nombre: nombre.trim(),
      duracion: duracionNum
    };

    setEventos([...eventos, nuevoEvento]);
    setExito(true);
    setMensaje("Evento creado exitosamente.");
    
    // Limpiar campos del formulario
    setNombre('');
    setDuracion('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Crear Tipo de Evento (US_013)</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del evento:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label htmlFor="duracion">Duración (minutos):</label>
          <input
            id="duracion"
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
          />
        </div>

        <br />
        <button type="submit">Crear Evento</button>
      </form>

      {/* Contenedor del mensaje para que Jest pueda leerlo */}
      {mensaje && (
        <p data-testid="mensaje-alerta" style={{ color: exito ? 'green' : 'red' }}>
          {mensaje}
        </p>
      )}

      <h3>Lista de Eventos Creados</h3>
      <ul data-testid="lista-eventos">
        {eventos.map((evt) => (
          <li key={evt.id}>
            {evt.nombre} ({evt.duracion} min)
          </li>
        ))}
      </ul>
    </div>
  );
}