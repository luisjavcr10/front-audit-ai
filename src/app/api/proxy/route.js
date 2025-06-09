export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const backendUrl = `http://3.141.25.111:8080${path}`; // Reemplaza con tu URL HTTP

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: Object.fromEntries(request.headers.entries()),
    });
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al conectar con el backend' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const backendUrl = `http://3.141.25.111:8080${path}`;
  const body = await request.json();

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: Object.fromEntries(request.headers.entries()),
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al conectar con el backend' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}