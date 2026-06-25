import { Component } from '@angular/core';
import { Heavy } from './heavy';

@Component({
  selector: 'app-defer',
  imports: [Heavy],
  template: `
    <h1 data-page="defer">DEFER — streaming + incremental hydration</h1>
    @defer (hydrate on viewport) {
      <app-heavy />
    } @placeholder {
      <p data-marker="defer-placeholder">placeholder</p>
    } @loading {
      <p data-marker="defer-loading">loading</p>
    }
  `,
})
export class Defer {}
