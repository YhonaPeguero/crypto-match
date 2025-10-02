import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Aquí puedes procesar los eventos de Base Mini App
    console.log('Webhook recibido:', body);
    
    // Responder con estado de éxito
    return Response.json({ 
      success: true, 
      message: 'Webhook procesado correctamente' 
    });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return Response.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ 
    message: 'Webhook endpoint activo',
    timestamp: new Date().toISOString()
  });
}
