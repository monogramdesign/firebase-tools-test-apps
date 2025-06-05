import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ngx-env-builder-sample';
  
  // Using environment variables with @ngx-env/builder
  // Note: These will be undefined until you create a .env file with NG_APP_ prefixed variables
  protected envVars = {
    // Recommended approach using import.meta.env
    environment: (import.meta as any).env?.NG_APP_ENV || 'development',
    apiUrl: (import.meta as any).env?.NG_APP_API_URL || 'http://localhost:3000',
    version: (import.meta as any).env?.NG_APP_VERSION || '1.0.0',
    
    // Deprecated approach using process.env (still supported for backward compatibility)
    // debugMode: process.env?.NG_APP_DEBUG === 'true',
    // apiKey: process.env?.NG_APP_API_KEY || 'default-key'
  };
  
  ngOnInit() {
    console.log('Environment Variables:', this.envVars);
    console.log('All NG_APP_ variables:', Object.keys((import.meta as any).env || {})
      .filter(key => key.startsWith('NG_APP_'))
      .reduce((obj: any, key) => {
        obj[key] = (import.meta as any).env[key];
        return obj;
      }, {}));
  }
}
