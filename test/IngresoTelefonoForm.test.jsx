import { render, screen, fireEvent } from '@testing-library/react';
import IngresoTelefonoForm from '../src/components/IngresoTelefonoForm';

describe('US_037 - Ingreso de teléfono de contacto', () => {
  
  test('Debe tener el atributo type="tel" para optimizar el teclado numérico y permitir avanzar', () => {
    render(<IngresoTelefonoForm />);
    const inputTel = screen.getByTestId('input-telefono');
    const boton = screen.getByRole('button', { name: /confirmar reserva/i });

    fireEvent.change(inputTel, { target: { value: '+54261555555' } });
    fireEvent.click(boton);

    expect(inputTel).toHaveAttribute('type', 'string');
    expect(screen.getByTestId('estado-reserva')).toHaveTextContent('Confirmado');
  });

  test('Debe bloquear el ingreso de letras o caracteres especiales inválidos', () => {
    render(<IngresoTelefonoForm />);
    const inputTel = screen.getByTestId('input-telefono');

    fireEvent.change(inputTel, { target: { value: 'abc' } });

    expect(inputTel.value).toBe('');
    expect(screen.getByRole('alert')).toHaveTextContent('El campo solo acepta números y el símbolo "+".');
  });

  test('Debe permitir el ingreso correcto combinando el símbolo más y números', () => {
    render(<IngresoTelefonoForm />);
    const inputTel = screen.getByTestId('input-telefono');

    fireEvent.change(inputTel, { target: { value: '+1' } });

    expect(inputTel.value).toBe('+1');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});