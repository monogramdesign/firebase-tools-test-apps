import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <h1 data-page="home">HOME — Prerender / SSG</h1>
    <p>rendered-on: <span data-marker="rendered-on">{{ where }}</span></p>
    <p>render-time: <span data-marker="render-time">{{ now }}</span></p>
  `,
})
export class Home {
  where = isPlatformServer(inject(PLATFORM_ID)) ? 'server' : 'browser';
  now = new Date().toISOString();
}
