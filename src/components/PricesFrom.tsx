import React from 'react';

const PricesFrom = () => {
  const services = [
    { name: 'Formateo + Windows', from: 'COP 40.000' },
    { name: 'Limpieza interna y pasta térmica', from: 'COP 30.000' },
    { name: 'Cambio disco HDD → SSD', from: 'COP 80.000' },
    { name: 'Recuperación de datos (estimado)', from: 'COP 120.000' },
  ];

  return (
    <section id="precios" className="prices">
      <div className="container">
        <h2 className="section-title">Precios desde</h2>
        <div className="prices__grid">
          {services.map((s) => (
            <div key={s.name} className="price-card">
              <div className="price-card__name">{s.name}</div>
              <div className="price-card__from">Desde {s.from}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricesFrom;
