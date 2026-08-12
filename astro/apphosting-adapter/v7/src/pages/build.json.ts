import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () =>
  Response.json({ builtAt: new Date().toISOString() });
