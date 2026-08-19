import { NextResponse } from 'next/server';

const DRIVE_IDS = new Set([
  '1HCB3D55HwiceTPe2i5c1dOOuShTTRIlZ','1c5kIJpqxfwQE-9i7tAc8ClnnIVo2zf88','1sFD_Af4TzrwIGHqcJ3ug78ntZfYCc6ds',
  '1_kuul9XwT1Q3QRdDyofyubfTD_XW2nn7','15S0nzHt8RVYgFwH4r1uwxVyt97KNcZUt','1ir4pOaEm37EGQfGx5eFjCMdKopeG0rK3',
  '1M2OlKxCfv2XYe5RqYPOmOQGMPF2NCsAJ','1OUkzXSMqa8loAqBL7_oOJOJXDh5uopBx','1NXu6RW9QQNvvx5VnBT0hZaiXC54NTEpN',
  '1lEh5HeBiMlYRiOGOldIBThqty0WOytvj','1HgFj9USSa5Sp5nIZsrMAPnF9XierFowx','1eI_gg_MxyGloL_FP2_mjgjOnReX152Mf',
  '1Doi8NKAzMVWBzi5CYZQQmc6S0h1oo0nZ','158SOYMVl6DmaZRDg8z203ZO_4Zye2J6v','1qBgOurERYFPYLVLk7SSfyXJhumC8h3qz',
  '1_-KiyNtgjAYbHA4kYvKHwbG06s3TlQsB','118bbF1HIDlpQExB-VjO56NQI8025Tmqm','1wmoIX03GNXxFPEpcTGndK172tHhrBQqa',
  '1KdTey4vLB8LmH2309cKf0v48giFjc-3z','1ZwWIawoR0omW7YULb45O9H9BV_Xr8kq3'
]);

const LOGO_ID = '1uW6Xy4xR4LvlF0KDLEpLVnT2QGClUnAI';

export async function GET(request) {
  const value = new URL(request.url).searchParams.get('id');
  const isLogo = value === 'logo';
  const id = isLogo ? LOGO_ID : value;

  if (!id || (!isLogo && !DRIVE_IDS.has(id))) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const source = `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;
  const upstream = await fetch(source, {
    cache: 'force-cache',
    redirect: 'follow',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: 'Image unavailable' }, { status: 502 });
  }

  return new NextResponse(await upstream.arrayBuffer(), {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
    }
  });
}
