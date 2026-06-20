'use client';

import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DatosInvitadoForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('Inicial');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({ nombre: false, email: false });

  const confirmarReserva = () => {
    const nombreVacio = nombre.trim() === '';
    const emailVacio = email.trim() === '';

    // Escenario 1: Validación de campos obligatorios
    if (nombreVacio || emailVacio) {
      setErrores({ nombre: nombreVacio, email: emailVacio });
      setEstado('Inicial');
      setMensaje('Por favor completar los campos obligatorios.'); 
      return;
    }

    // Escenario 2: Formato de correo electrónico
    if (!EMAIL_REGEX.test(email)) {
      setErrores({ nombre: false, email: true });
      setEstado('Inicial');
      setMensaje('Por favor ingresa una dirección de correo electrónico válida.');   
      return;
    }

    // Caso exitoso: el teléfono es opcional, no se valida
    setErrores({ nombre: false, email: false });
    setEstado('Confirmado');
    setMensaje('Reserva confirmada correctamente.');
  };

  return (
    <section>
      <h2>Datos del usuario invitado</h2>

      <label htmlFor="nombre">Nombre completo</label>
      <input
        id="nombre"
        type="text"
        data-testid="input-nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ borderColor: errores.nombre ? 'red' : undefined }}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        inputMode="email"
        data-testid="input-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ borderColor: errores.email ? 'red' : undefined }}
      />

      <label htmlFor="telefono">Teléfono (opcional)</label>
      <input
        id="telefono"
        type="tel"
        inputMode="tel"
        data-testid="input-telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <p data-testid="estado-reserva">Estado: {estado}</p>

      <button type="button" onClick={confirmarReserva}>
        Confirmar reserva
      </button>

      {mensaje && <p role="alert">{mensaje}</p>}
    </section>
  );
}
