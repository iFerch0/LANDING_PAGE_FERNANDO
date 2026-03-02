// src/app/api/wompi/webhook/route.ts
// Webhook de Wompi: valida firma y actualiza estado de la orden

import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { orderService } from '@/lib/services';

export async function POST(req: NextRequest) {
  // Leer el body como texto ANTES de parsear JSON para que la firma sea correcta
  const bodyText = await req.text();

  // Validar checksum: Wompi envía SHA256(bodyText + eventsSecret)
  const checksum = req.headers.get('x-event-checksum') || '';
  const secret = process.env.WOMPI_EVENTS_SECRET;

  if (!secret) {
    console.error('[Wompi Webhook] WOMPI_EVENTS_SECRET no configurado');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const expected = createHash('sha256')
    .update(bodyText + secret)
    .digest('hex');

  if (checksum !== expected) {
    console.warn('[Wompi Webhook] Checksum inválido');
    return NextResponse.json({ error: 'Invalid checksum' }, { status: 401 });
  }

  // Parsear el evento
  let event: Record<string, unknown>;
  try {
    event = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Extraer datos de la transacción
  const transaction = (event?.data as Record<string, unknown>)?.transaction as Record<
    string,
    unknown
  >;

  if (!transaction) {
    // No es un evento de transacción — ignorar silenciosamente
    return NextResponse.json({ ok: true });
  }

  const wompiStatus = transaction.status as string;
  const reference = transaction.reference as string;
  const txId = transaction.id as string;

  if (!wompiStatus || !reference || !txId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Actualizar estado de la orden
  try {
    await orderService.confirmPayment(txId, wompiStatus, reference);
  } catch (err) {
    console.error('[Wompi Webhook] Error al actualizar orden:', err);
    // Devolver 200 igualmente para que Wompi no reintente indefinidamente
  }

  // Siempre responder 200 para que Wompi confirme la recepción
  return NextResponse.json({ ok: true });
}
