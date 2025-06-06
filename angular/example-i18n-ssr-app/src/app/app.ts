import { Component, LOCALE_ID, PLATFORM_ID, inject, signal, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly currentLocale = inject(LOCALE_ID);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly title = 'example-i18n-ssr-app';
  protected readonly price = 99.99;
  protected readonly currency = 'USD';

  protected readonly currentTime = signal(new Date());
  protected readonly counter = signal(0);

  protected readonly pluralMessage = computed(() => {
    const count = this.counter();
    if (count === 0) {
      return 'No items selected';
    } else if (count === 1) {
      return 'One item selected';
    } else {
      return `${count} items selected`;
    }
  });

  constructor() {
    // Effect for timer (only in browser)
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const interval = setInterval(() => {
          this.currentTime.set(new Date());
        }, 1000);

        // Cleanup function would be called when effect is destroyed
        return () => clearInterval(interval);
      }
      return () => {}; // No-op cleanup for server
    });
  }

  protected incrementCounter(): void {
    this.counter.update(current => current + 1);
  }

  protected decrementCounter(): void {
    this.counter.update(current => current - 1);
  }
}
