import { render, screen, fireEvent } from '@testing-library/react';
import DatosInvitadoForm from '../src/components/DatosInvitadoForm';

describe('US_029 - Ingreso de datos del Usuario Invitado en Mobile', () => {
  // --- PRUEBA 1: Caso exitoso ---
  test('Debe confirmar la reserva cuando el nombre y el email son válidos', () => {
    // PREPARAR
    render(<DatosInvitadoForm />);

    // ACTUAR
    fireEvent.change(screen.getByTestId('input-nombre'), {
      target: { value: 'Juan Pérez' },
    });
    fireEvent.change(screen.getByTestId('input-email'), {
      target: { value: 'juan.perez@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /confirmar reserva/i }));

    // AFIRMAR
    expect(screen.getByTestId('estado-reserva')).toHaveTextContent('Confirmado');
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Reserva confirmada correctamente.'
    );
  });

  // --- PRUEBA 2: Caso negativo - validación de campos obligatorios ---
  test('Debe resaltar los campos obligatorios y mostrar un mensaje de error si el nombre o el email están vacíos', () => {
    // PREPARAR
    render(<DatosInvitadoForm />);

    // ACTUAR
    fireEvent.click(screen.getByRole('button', { name: /confirmar reserva/i }));

    // AFIRMAR
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Por favor completar los campos obligatorios.'
    );
    expect(screen.getByTestId('input-nombre')).toHaveStyle('border-color: red');
    expect(screen.getByTestId('input-email')).toHaveStyle('border-color: red');
    expect(screen.getByTestId('estado-reserva')).toHaveTextContent('Inicial');
  });

  // --- PRUEBA 3: Caso alternativo - regla especial (teléfono opcional) ---
  test('Debe confirmar la reserva aunque el teléfono no se complete, ya que es un campo opcional', () => {
    // PREPARAR
    render(<DatosInvitadoForm />);

    // ACTUAR
    fireEvent.change(screen.getByTestId('input-nombre'), {
      target: { value: 'Ana López' },
    });
    fireEvent.change(screen.getByTestId('input-email'), {
      target: { value: 'ana.lopez@example.com' },
    });
    // El campo teléfono se deja vacío intencionalmente
    fireEvent.click(screen.getByRole('button', { name: /confirmar reserva/i }));

    // AFIRMAR
    expect(screen.getByTestId('input-telefono')).toHaveValue('');
    expect(screen.getByTestId('estado-reserva')).toHaveTextContent('Confirmado');
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Reserva confirmada correctamente.'
    );
  });
});
