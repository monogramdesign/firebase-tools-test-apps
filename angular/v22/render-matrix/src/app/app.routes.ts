import { Routes } from '@angular/router';
import { Home } from './home';
import { Ssr } from './ssr';
import { Csr } from './csr';
import { Defer } from './defer';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'ssr/:id', component: Ssr },
  { path: 'csr', component: Csr },
  { path: 'defer', component: Defer },
];
