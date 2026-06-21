'use client';
import { useState } from 'react';

export default function IngresoTelefonoForm() {
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState('Inicial');

  const handleInputChange = (e) => {
    const valor = e.target.value;
    const regexValida = /^[0-9+]*$/;
    
    if (regexValida.test(valor)) {
      setTelefono(valor);
      setMensaje('');
    } else {
      setMensaje('El campo solo acepta números y el símbolo "+".');
    }
  };

  const confirmarReserva = (e) => {
    e.preventDefault();
    setEstado('Confirmado');
    setMensaje('Reserva procesada correctamente con su teléfono.');
  };

  return (
    <section>
      <h2>Datos de Contacto - Reserva</h2>
      <p data-testid="estado-reserva">Estado: {estado}</p>
      
      <form onSubmit={confirmarReserva}>
        <label htmlFor="input-telefono">Teléfono:</label>
        <input
          id="input-telefono"
          data-testid="input-telefono"
          type="tel"
          value={telefono}
          onChange={handleInputChange}
          placeholder="+54261000000"
        />
        <button type="submit">Confirmar Reserva</button>
      </form>

      {mensaje && <p role="alert">{mensaje}</p>}
    </section>
  );
}