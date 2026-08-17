import { NextResponse } from 'next/server';

const ORIGIN = 'https://youseffcreationz.vercel.app';
const ALLOWED = new Set([
  'sky-linen-look.jpeg','monochrome-knit.jpeg','terracotta-set.jpeg','sand-quarterzip.jpeg',
  'neutral-daywear.jpeg','burgundy-set.jpeg','black-white.jpeg','patterned-knit.jpeg','amber-linen.jpeg',
  'black-joggers.jpeg','stone-cargo.jpeg','navy-joggers.jpeg','congo-jersey.jpeg','briefs-navy.jpeg',
  'briefs-blue.jpeg','briefs-plum.jpeg','briefs-teal.jpeg','briefs-sand.jpeg','briefs-green.jpeg'
]);

export async function GET(request) {
  const file = new URL(request.url).searchParams.get('file');
  if (!file || !ALLOWED.has(file)) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const upstream = await fetch(`${ORIGIN}/products/${file}`, { cache: 'force-cache' });
  if (!upstream.ok) {
    return NextResponse.json({ error: 'Image unavailable' }, { status: 502 });
  }

  return new NextResponse(await upstream.arrayBuffer(), {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800'
    }
  });
}
