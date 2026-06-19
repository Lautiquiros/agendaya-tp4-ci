import { useState } from 'react';

export default function EditarEventoForm() {
  // Estados iniciales simulando que estamos editando un evento existente
  const [nombre, setNombre] = useState('Consulta Inicial');
  const [duracion, setDuracion] = useState(30);
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación 1: Nombre obligatorio
    if (!nombre.trim()) {
      setError('El nombre del tipo de evento es obligatorio');
      return;
    }
    
    // Validación 2: Duración mayor a 0
    if (duracion < 0) {
      setError('La duración debe ser mayor a 0');
      return;
    }

    // Validación 3: Descripción máxima de 500 caracteres
    if (descripcion.length > 500) {
      setError('La descripción no puede superar los 500 caracteres');
      return;
    }

    // Si pasa todo, simulamos éxito
    console.log('Guardado exitoso');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input 
          id="nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
      </div>

      <div>
        <label htmlFor="duracion">Duración</label>
        <input 
          id="duracion" 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(Number(e.target.value))} 
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción</label>
        <textarea 
          id="descripcion" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
        />
      </div>

      <button type="submit">Guardar</button>

      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}