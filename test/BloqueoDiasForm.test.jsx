import { render, screen, fireEvent } from '@testing-library/react';
import BloqueoDiasForm from '../src/components/BloqueoDiasForm';

describe('US_039 - Bloqueo de días y horarios pasados', () => {
  
  // --- PRUEBA 1 (Caso Exitoso) ---
  test('Debe realizar correctamente la acción principal al elegir horario futuro', () => {
    // 1. Preparar
    render(<BloqueoDiasForm />);
    
    // 2. Actuar
    fireEvent.click(
      screen.getByRole('button', { name: /seleccionar horario futuro/i })
    );
    
    // 3. Afirmar
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Horario seleccionado correctamente.'
    );
    expect(screen.getByTestId('estado-funcionalidad')).toHaveTextContent('Completado');
  });

  // --- PRUEBA 2 (Caso Negativo / Validación) ---
  test('Debe validar el comportamiento inválido al seleccionar un día pasado (Escenario 1)', () => {
    // 1. Preparar
    render(<BloqueoDiasForm />);
    
    // 2. Actuar
    fireEvent.click(
      screen.getByRole('button', { name: /seleccionar día pasado/i })
    );
    
    // 3. Afirmar
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Este día está bloqueado por ser anterior a la fecha actual.'
    );
    expect(screen.getByTestId('estado-funcionalidad')).toHaveTextContent('Error');
  });

  // --- PRUEBA 3 (Caso Alternativo / Borde) ---
  test('Debe bloquear o filtrar horas pasadas en el día actual (Escenario 2)', () => {
    // 1. Preparar
    render(<BloqueoDiasForm />);
    
    // 2. Actuar
    fireEvent.click(
      screen.getByRole('button', { name: /seleccionar hora pasada hoy/i })
    );
    
    // 3. Afirmar
    expect(screen.getByRole('alert')).toHaveTextContent(
      'El sistema filtró este horario por ser anterior a la hora actual.'
    );
    expect(screen.getByTestId('estado-funcionalidad')).toHaveTextContent('Error');
  });
});