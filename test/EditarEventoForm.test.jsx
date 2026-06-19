import { render, screen, fireEvent } from '@testing-library/react';
import EditarEventoForm from '../src/components/EditarEventoForm';

describe('US_010 - Edición de información general del tipo de evento', () => {
  
  // Prueba 1 [cite: 83]
  it('Debe mostrar error si se deja vacío el campo Nombre al guardar', () => {
    render(<EditarEventoForm />);
    const inputNombre = screen.getByLabelText(/Nombre/i);
    const botonGuardar = screen.getByRole('button', { name: /Guardar/i });

    // Simulamos borrar el nombre y guardar
    fireEvent.change(inputNombre, { target: { value: '' } });
    fireEvent.click(botonGuardar);

    // Verificamos el mensaje de error exacto
    expect(screen.getByRole('alert')).toHaveTextContent('El nombre del tipo de evento es obligatorio');
  });

  // Prueba 2 [cite: 83]
  it('Debe mostrar error si se intenta ingresar una duración de 0 o negativa', () => {
    render(<EditarEventoForm />);
    const inputDuracion = screen.getByLabelText(/Duración/i);
    const botonGuardar = screen.getByRole('button', { name: /Guardar/i });

    // Simulamos poner 0 en la duración
    fireEvent.change(inputDuracion, { target: { value: '0' } });
    fireEvent.click(botonGuardar);

    // Verificamos el mensaje de error exacto
    expect(screen.getByRole('alert')).toHaveTextContent('La duración debe ser mayor a 0');
  });

  // Prueba 3 [cite: 84]
  it('Debe mostrar error si se ingresa una descripción de más de 500 caracteres', () => {
    render(<EditarEventoForm />);
    const inputDescripcion = screen.getByLabelText(/Descripción/i);
    const botonGuardar = screen.getByRole('button', { name: /Guardar/i });

    // Generamos un string de 501 caracteres
    const textoLargo = 'a'.repeat(501);
    
    // Simulamos escribir ese texto y guardar
    fireEvent.change(inputDescripcion, { target: { value: textoLargo } });
    fireEvent.click(botonGuardar);

    // Verificamos el mensaje de error exacto
    expect(screen.getByRole('alert')).toHaveTextContent('La descripción no puede superar los 500 caracteres');
  });

});