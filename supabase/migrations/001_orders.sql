-- supabase/migrations/001_orders.sql
-- Tabla de órdenes para pagos con Wompi
-- Ejecutar manualmente en el SQL Editor de Supabase Dashboard

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT,
  buyer_city TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total INTEGER NOT NULL,             -- En pesos COP (entero)
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'failed', 'cancelled')),
  wompi_tx_id TEXT,
  wompi_status TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Índices para consultas frecuentes
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_reference_idx ON orders(reference);

-- RLS: solo accesible por usuarios autenticados (admin)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
