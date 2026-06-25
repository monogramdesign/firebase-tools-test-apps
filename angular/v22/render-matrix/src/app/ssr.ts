import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ssr',
  template: `
    <h1 data-page="ssr">SSR — Server (per-request)</h1>
    <p>param-id: <span data-marker="param-id">{{ id }}</span></p>
    <p>rendered-on: <span data-marker="rendered-on">{{ where }}</span></p>
    <p>render-time: <span data-marker="render-time">{{ now }}</span></p>
  `,
})
export class Ssr {
  where = isPlatformServer(inject(PLATFORM_ID)) ? 'server' : 'browser';
  now = new Date().toISOString();
  id = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
