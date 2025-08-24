import React from 'react';

const Neighborhoods = () => {
  const areas = ['Los Colores', 'Alameda', 'La Castellana', 'Centro', 'La Granja', 'San Jerónimo', 'Poblado'];

  return (
    <section id="barrios" className="neighborhoods">
      <div className="container">
        <h2 className="section-title">Barrios que atendemos en Montería</h2>
        <ul className="neighborhoods__list">
          {areas.map((a) => (
            <li key={a} className="neighborhoods__item">{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Neighborhoods;
