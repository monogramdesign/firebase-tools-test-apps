import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Declare the global variable defined by webpack
declare const process: {
  env: {
    CUSTOM_VAR: string;
  };
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'example-custom-webpack-builder-app';
  protected customVar = process.env.CUSTOM_VAR;
}
