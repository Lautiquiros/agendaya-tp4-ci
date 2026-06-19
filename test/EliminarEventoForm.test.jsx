import { render, screen, fireEvent } from '@testing-library/react';
import EliminarEventoForm from '../src/components/EliminarEventoForm';

describe('US_016 - Eliminación lógica de tipo de evento', () => {
  // --- PRUEBA 1 ---
  test('Debe solicitar confirmación antes de eliminar el tipo de evento', () => {
    render(<EliminarEventoForm />);

    const botonEliminar = screen.getByRole('button', {
      name: /eliminar/i,
    });

    fireEvent.click(botonEliminar);

    expect(
      screen.getByText(
        '¿Está seguro de que desea eliminar este tipo de evento?'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /confirmar eliminación/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument();
  });

  // --- PRUEBA 2 ---
  test('No debe eliminar el evento si el administrador cancela la confirmación', () => {
    render(<EliminarEventoForm />);

    fireEvent.click(
      screen.getByRole('button', { name: /^eliminar$/i })
    );

    fireEvent.click(
      screen.getByRole('button', { name: /cancelar/i })
    );

    expect(screen.getByTestId('estado-evento')).toHaveTextContent('Activo');

    expect(
      screen.queryByRole('alert')
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        '¿Está seguro de que desea eliminar este tipo de evento?'
      )
    ).not.toBeInTheDocument();
  });

  // --- PRUEBA 3 ---
  test('Debe realizar eliminación lógica al confirmar y conservar los datos del evento', () => {
    render(<EliminarEventoForm />);

    fireEvent.click(
      screen.getByRole('button', { name: /^eliminar$/i })
    );

    fireEvent.click(
      screen.getByRole('button', { name: /confirmar eliminación/i })
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Tipo de evento eliminado correctamente.'
    );

    expect(screen.getByTestId('estado-evento')).toHaveTextContent(
      'Inactivo'
    );

    // Verifica que el evento no fue borrado físicamente:
    // sus datos siguen visibles para mantener trazabilidad.
    expect(screen.getByText('Consulta de seguimiento')).toBeInTheDocument();
    expect(screen.getByText('30 minutos')).toBeInTheDocument();

    // Una vez eliminado, ya no debe mostrarse nuevamente el botón Eliminar.
    expect(
      screen.queryByRole('button', { name: /^eliminar$/i })
    ).not.toBeInTheDocument();
  });
});