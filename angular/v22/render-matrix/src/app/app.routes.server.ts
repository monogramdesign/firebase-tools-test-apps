import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'csr', renderMode: RenderMode.Client },
  { path: 'ssr/:id', renderMode: RenderMode.Server },
  { path: 'defer', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
