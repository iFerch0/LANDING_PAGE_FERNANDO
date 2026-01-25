import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '@/lib/db';
import { getSession } from '@/lib/auth';

// Middleware para verificar autenticación
async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  return null;
}

// GET - Obtener todos los productos (incluyendo no disponibles)
export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const products = await getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

// POST - Crear nuevo producto
export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data = await request.json();

    // Validaciones básicas
    if (!data.title || !data.price || !data.category) {
      return NextResponse.json(
        { error: 'Título, precio y categoría son requeridos' },
        { status: 400 }
      );
    }

    const product = await createProduct(data);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}

// PUT - Actualizar producto
export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: 'ID del producto es requerido' }, { status: 400 });
    }

    const product = await updateProduct(data.id, data);
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID del producto es requerido' }, { status: 400 });
    }

    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}
