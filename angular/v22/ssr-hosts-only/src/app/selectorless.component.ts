import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // No selector! New in Angular v22
  standalone: true,
  template: `
    <div class="selectorless-box">
      <h3>I am a Selectorless Component</h3>
      <p>Imported directly by class in the template.</p>
    </div>
  `,
  styles: [`
    .selectorless-box { background: #f0f0f0; padding: 1rem; border: 2px dashed #999; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorlessComponent {}
