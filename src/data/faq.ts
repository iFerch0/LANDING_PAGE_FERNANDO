export const FAQ_ITEMS = [
  {
    question: '¿Cuánto tiempo toma una reparación?',
    answer:
      'Dependiendo del problema, las reparaciones simples pueden tomar de 1-2 horas, mientras que casos más complejos pueden requerir 1-2 días. Siempre te mantengo informado del progreso.'
  },
  {
    question: '¿Ofreces servicio a domicilio?',
    answer:
      'Sí, ofrezco servicio a domicilio en toda Montería sin costo adicional. Para casos que requieren herramientas especializadas, puede ser necesario llevar el equipo al taller.'
  },
  {
    question: '¿Qué garantía ofrecen los servicios?',
    answer:
      'Todos mis servicios incluyen garantía de 30 días. Si el mismo problema vuelve a presentarse dentro de este período, lo corrijo sin costo adicional.'
  },
  {
    question: '¿Trabajan con todas las marcas?',
    answer:
      'Sí, trabajo con todas las marcas: HP, Dell, Lenovo, Asus, Acer, Apple, Sony y muchas más. También con equipos ensamblados y de escritorio.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Acepto efectivo, transferencia bancaria, Nequi, Daviplata y tarjetas de crédito/débito. El pago se realiza una vez completado y aprobado el servicio.'
  },
  {
    question: '¿Qué pasa si el equipo no se puede reparar?',
    answer:
      'Si después del diagnóstico determino que el equipo no es viable de reparar, no cobro nada por la evaluación y te asesoro sobre las mejores opciones disponibles.'
  }
];

export type FaqItem = typeof FAQ_ITEMS[number];
