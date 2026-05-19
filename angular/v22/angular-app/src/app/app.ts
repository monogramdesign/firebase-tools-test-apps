import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main>
      <h1>Angular v22 CSR Test App</h1>
      <p>Status: Running</p>
      <section>
        <h2>CSR Test</h2>
        <p>Client Time: {{ clientTime }}</p>
      </section>
    </main>
    <router-outlet />
  `,
  styles: [`
    main { font-family: sans-serif; padding: 2rem; }
    section { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; max-width: 300px; }
  `]
})
export class App implements OnInit {
  clientTime = 'Loading...';

  ngOnInit() {
    this.clientTime = new Date().toLocaleTimeString();
  }
}
