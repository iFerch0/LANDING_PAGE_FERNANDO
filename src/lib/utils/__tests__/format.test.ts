import {
  formatPrice,
  generateSlug,
  truncate,
  capitalize,
  formatDate,
  formatBytes,
} from '../format';

describe('formatPrice', () => {
  it('formatea precio en pesos colombianos', () => {
    const result = formatPrice(1_500_000);
    expect(result).toMatch(/1\.500\.000/);
  });

  it('formatea 0 correctamente', () => {
    const result = formatPrice(0);
    expect(result).toMatch(/0/);
  });

  it('no incluye decimales', () => {
    const result = formatPrice(1_850_000);
    expect(result).not.toMatch(/,\d{2}/);
    expect(result).toMatch(/1\.850\.000/);
  });

  it('formatea cantidades grandes', () => {
    const result = formatPrice(10_000_000);
    expect(result).toMatch(/10\.000\.000/);
  });
});

describe('generateSlug', () => {
  it('convierte texto a slug', () => {
    expect(generateSlug('Laptop HP Pavilion 15')).toBe('laptop-hp-pavilion-15');
  });

  it('elimina acentos', () => {
    expect(generateSlug('Reparación de PC')).toBe('reparacion-de-pc');
  });

  it('reemplaza espacios múltiples con un guión', () => {
    expect(generateSlug('Mouse  Logitech')).toBe('mouse-logitech');
  });

  it('elimina caracteres especiales', () => {
    expect(generateSlug('Teclado (Mecánico) ¡Nuevo!')).toBe('teclado-mecanico-nuevo');
  });

  it('convierte a minúsculas', () => {
    expect(generateSlug('LAPTOP HP')).toBe('laptop-hp');
  });
});

describe('truncate', () => {
  it('retorna el texto sin cambios si es menor al máximo', () => {
    expect(truncate('Hola', 10)).toBe('Hola');
  });

  it('retorna el texto sin cambios si es igual al máximo', () => {
    expect(truncate('1234567890', 10)).toBe('1234567890');
  });

  it('trunca y agrega elipsis si supera el máximo', () => {
    const result = truncate('Texto muy largo que debe ser truncado', 20);
    expect(result).toHaveLength(20);
    expect(result.endsWith('...')).toBe(true);
  });
});

describe('capitalize', () => {
  it('capitaliza la primera letra', () => {
    expect(capitalize('hola mundo')).toBe('Hola mundo');
  });

  it('retorna cadena vacía si la entrada es vacía', () => {
    expect(capitalize('')).toBe('');
  });

  it('no cambia el resto del texto', () => {
    expect(capitalize('hOLA')).toBe('HOLA');
  });
});

describe('formatDate', () => {
  it('formatea una fecha ISO en español', () => {
    const result = formatDate('2024-03-15T10:00:00Z');
    // Verifica que la fecha contiene el año
    expect(result).toMatch(/2024/);
  });

  it('incluye el día y el mes en el resultado', () => {
    const result = formatDate('2024-01-01T00:00:00Z');
    expect(result).toMatch(/ene|enero|1/i);
  });
});

describe('formatBytes', () => {
  it('formatea 0 bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
  });

  it('formatea kilobytes', () => {
    expect(formatBytes(1024)).toMatch(/KB/);
    expect(formatBytes(1024)).toMatch(/1/);
  });

  it('formatea megabytes', () => {
    const result = formatBytes(1_500_000);
    expect(result).toMatch(/MB/);
  });

  it('formatea gigabytes', () => {
    const result = formatBytes(1_073_741_824);
    expect(result).toMatch(/GB/);
  });
});
