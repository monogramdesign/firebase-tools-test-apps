import { Component, signal, OnInit, ChangeDetectionStrategy, inject, PLATFORM_ID, makeStateKey, TransferState } from '@angular/core';
import { isPlatformServer, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SelectorlessComponent } from './selectorless.component';
import { SignalFormComponent } from './signal-form.component';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

const SERVER_TIME_KEY = makeStateKey<string>('serverTime');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectorlessComponent, SignalFormComponent, CommonModule],
  template: `
    <main>
      <h1>Angular v22 Test App (Signal-First)</h1>
      <p>Status: Running (Zoneless)</p>
      
      <div class="test-sections">
        <!-- SSR Tests -->
        <section class="ssr-test">
          <h2>SSR & Rendering Tests</h2>
          <div class="status-box">
            <p><strong>Platform:</strong> {{ platform }}</p>
            <p><strong>Server Render Time (UTC):</strong> <span class="highlight">{{ serverTime }}</span></p>
            <p><strong>Render Context:</strong> {{ renderContext }}</p>
          </div>
          <div class="info-note">
            <p><i>Note: The Server Render Time above is fixed at the moment of SSR and preserved via TransferState.</i></p>
          </div>
          <div class="data-box">
            <h3>External Data (SSR Fetch)</h3>
            <pre>{{ ssrData() | json }}</pre>
          </div>
        </section>

        <!-- CSR & Signals -->
        <section class="csr-test">
          <h2>CSR & Signals</h2>
          <p><strong>Local Client Time:</strong> <span class="highlight-alt">{{ clientTime() }}</span></p>
          <button (click)='updateTime()'>Update Time</button>
          <p class="info-note">This time updates in the browser and uses your local timezone.</p>
        </section>

        <!-- Selectorless -->
        <section>
          <h2>Selectorless Component</h2>
          <div [innerHTML]="'<!-- Selectorless components are used by class in v22 -->'"></div>
          <p>Testing selectorless by class reference in code instead of template tag for now due to compiler constraints in next.9</p>
        </section>

        <!-- Signal Forms -->
        <section>
          <app-signal-form />
        </section>
      </div>
    </main>
    <router-outlet />
  `,
  styles: [`
    main { font-family: sans-serif; padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .test-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    section { border: 1px solid #ccc; padding: 1.5rem; border-radius: 8px; background: #f9f9f9; }
    .ssr-test { border-color: #007bff; background: #f0f7ff; }
    .csr-test { border-color: #28a745; background: #f0fff4; }
    .status-box { background: #fff; padding: 0.5rem 1rem; border-radius: 4px; border: 1px solid #dee2e6; margin-bottom: 1rem; }
    .highlight { color: #d63384; font-weight: bold; font-family: monospace; font-size: 1.1rem; }
    .highlight-alt { color: #198754; font-weight: bold; font-family: monospace; font-size: 1.1rem; }
    .info-note { font-size: 0.8rem; color: #666; margin-top: 0.5rem; }
    .data-box pre { background: #212529; color: #f8f9fa; padding: 1rem; border-radius: 4px; overflow: auto; max-height: 200px; font-size: 0.85rem; }
    h1 { color: #333; }
    h2 { margin-top: 0; color: #007bff; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private transferState = inject(TransferState);

  platform = isPlatformServer(this.platformId) ? 'Server (SSR)' : 'Browser (CSR)';
  serverTime = '';
  renderContext = '';
  
  clientTime = signal('Loading...');
  ssrData = signal<any>({ loading: true });

  constructor() {
    if (isPlatformServer(this.platformId)) {
      this.serverTime = new Date().toISOString();
      this.renderContext = 'Initial Server Render';
      this.transferState.set(SERVER_TIME_KEY, this.serverTime);
      
      // Test SSR Data Fetching
      this.http.get('https://jsonplaceholder.typicode.com/todos/1')
        .pipe(catchError(err => of({ error: 'Failed to fetch in SSR', details: err.message })))
        .subscribe(data => {
          this.ssrData.set(data);
        });
    } else {
      this.serverTime = this.transferState.get(SERVER_TIME_KEY, 'N/A (Not found in TransferState)');
      this.renderContext = 'Hydrated on Client';
    }
  }

  ngOnInit() {
    this.updateTime();
    if (!isPlatformServer(this.platformId)) {
      // If we didn't get data from SSR (e.g. CSR only or hydration failed), fetch it now
      if (this.ssrData().loading) {
        this.http.get('https://jsonplaceholder.typicode.com/todos/1')
          .subscribe(data => this.ssrData.set(data));
      }
    }
  }

  updateTime() {
    this.clientTime.set(new Date().toLocaleTimeString());
  }
}
