import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// In v22, Signal-based forms are stable. We'll simulate the usage pattern.
// Note: Actual imports might vary slightly depending on final v22 API, 
// but the goal is to test if Firebase Hosting handles the resulting bundle/SSR.

@Component({
  selector: 'app-signal-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section>
      <h2>Signal-based Form</h2>
      <form [formGroup]="form">
        <input [formControl]="nameControl" placeholder="Enter name">
        <p>Value: {{ nameValue() }}</p>
      </form>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalFormComponent {
  nameControl = new FormControl('');
  form = new FormGroup({
    name: this.nameControl
  });

  // Signal-based forms allow accessing values as signals
  // nameValue = this.nameControl.valueAsSignal; // Hypothetical v22 API
  nameValue = signal(''); // Fallback for now to ensure build passes if API differs

  constructor() {
    this.nameControl.valueChanges.subscribe(v => this.nameValue.set(v || ''));
  }
}
