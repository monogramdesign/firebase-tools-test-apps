import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: 'Hello from Astro v7 via @apphosting/astro-adapter' }));
};
