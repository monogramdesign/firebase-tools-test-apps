import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-heavy',
  template: `
    <div data-page="heavy">
      <p>heavy-rendered-on: <span data-marker="heavy-rendered-on">{{ where }}</span></p>
      <p>heavy-time: <span data-marker="heavy-time">{{ now }}</span></p>
    </div>
  `,
})
export class Heavy {
  where = isPlatformServer(inject(PLATFORM_ID)) ? 'server' : 'browser';
  now = new Date().toISOString();
}
