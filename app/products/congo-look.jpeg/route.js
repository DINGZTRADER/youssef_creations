import { NextResponse } from 'next/server';

export async function GET() {
  const upstream = await fetch('https://youseffcreationz.vercel.app/products/congo-jersey.jpeg', { cache: 'force-cache' });
  if (!upstream.ok) {
    return NextResponse.json({ error: 'Hero image unavailable' }, { status: 502 });
  }

  return new NextResponse(await upstream.arrayBuffer(), {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800'
    }
  });
}
