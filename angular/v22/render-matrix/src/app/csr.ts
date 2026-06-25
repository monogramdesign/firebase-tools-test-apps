import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-csr',
  template: `
    <h1 data-page="csr">CSR — Client only</h1>
    <p>rendered-on: <span data-marker="rendered-on">{{ where }}</span></p>
    <p>render-time: <span data-marker="render-time">{{ now }}</span></p>
  `,
})
export class Csr {
  where = isPlatformServer(inject(PLATFORM_ID)) ? 'server' : 'browser';
  now = new Date().toISOString();
}
