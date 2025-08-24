import React from 'react';

const ProblemsCommon = () => {
  const items = [
    'Equipo no enciende',
    'Arranque lento / Windows no carga',
    'Ruido en ventilador / sobrecalentamiento',
    'Pantalla azul o fallas de hardware',
    'Pérdida o corrupción de datos',
    'Conexión a internet inestable',
  ];

  return (
    <section id="problemas" className="problems">
      <div className="container">
        <h2 className="section-title">Problemas comunes que solucionamos</h2>
        <ul className="problems__list">
          {items.map((it) => (
            <li key={it} className="problems__item">{it}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProblemsCommon;
