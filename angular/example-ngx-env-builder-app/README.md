# NgxEnvBuilderSample

This project demonstrates how to use `@ngx-env/builder` to manage environment variables in Angular applications.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0 and configured with `@ngx-env/builder`.

## 🚀 What's Configured

This project has been configured to use `@ngx-env/builder` instead of the default Angular builders:

- ✅ Build process uses `@ngx-env/builder:application`
- ✅ Dev server uses `@ngx-env/builder:dev-server` 
- ✅ Extract i18n uses `@ngx-env/builder:extract-i18n`
- ✅ Testing uses `@ngx-env/builder:karma`

## 🌍 Environment Variables

Environment variables must be prefixed with `NG_APP_` to be accessible in your Angular application.

### Usage in TypeScript

```typescript
// Recommended approach using import.meta.env
const apiUrl = import.meta.env.NG_APP_API_URL;
const version = import.meta.env.NG_APP_VERSION;
const environment = import.meta.env.NG_APP_ENV;

// Deprecated approach using process.env (still supported)
const debugMode = process.env.NG_APP_DEBUG === 'true';
```

### Usage in Templates

You can access environment variables in your component and display them in templates:

```typescript
export class MyComponent {
  apiUrl = import.meta.env.NG_APP_API_URL || 'http://localhost:3000';
}
```

```html
<p>API URL: {{ apiUrl }}</p>
```

### Usage in index.html

You can also use environment variables directly in your `index.html`:

```html
<title>My App - %NG_APP_ENV%</title>
```

## 📁 Creating Environment Files

Create a `.env` file in your project root with your environment variables:

```bash
# .env
NG_APP_ENV=development
NG_APP_API_URL=http://localhost:3000/api
NG_APP_VERSION=1.0.0
NG_APP_ENABLE_ANALYTICS=false
NG_APP_DEBUG=true
```

**Important**: Add `.env` files to your `.gitignore` to avoid committing sensitive data:

```gitignore
# Environment files
.env
.env.local
.env.development.local
.env.production.local
```

### Environment File Priority

The `@ngx-env/builder` loads environment files in this order (higher priority overrides lower):

1. `.env.${NG_APP_ENV}.local` (e.g., `.env.development.local`)
2. `.env.${NG_APP_ENV}` (e.g., `.env.development`)
3. `.env.local` (loaded for all environments except test)
4. `.env`

## 🔧 Configuration Options

You can configure `@ngx-env/builder` in your `angular.json`:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "builder": "@ngx-env/builder:application",
          "options": {
            "ngxEnv": {
              "prefix": "NG_APP_",
              "verbose": true,
              "root": "../.."
            }
          }
        }
      }
    }
  }
}
```

### Configuration Options:

- `prefix`: Regular expression to filter environment variables (default: `NG_APP_`)
- `verbose`: Show debug information during build (default: `false`)
- `root`: Root directory to search for .env files (default: current directory)
- `runtime`: Enable runtime environment variables (default: `false`)

## 🔒 Security Notes

⚠️ **Important**: Do not store sensitive information like API keys, passwords, or secrets in environment variables. These values are embedded in the build and visible to anyone who can access your application files.

Only use environment variables for:
- API URLs
- Feature flags
- Application configuration
- Public configuration values

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

You can also run with environment variables:

```bash
# Set environment variables for this session
NG_APP_ENV=staging NG_APP_API_URL=https://staging-api.example.com ng serve

# Or create a .env file and run normally
ng serve
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

You can also build with environment variables:

```bash
# Build with production environment variables
NG_APP_ENV=production NG_APP_API_URL=https://api.example.com ng build

# Or set them in a .env.production file
ng build --configuration=production
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📚 Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### Environment Variable Resources

- [NGX-ENV Builder Documentation](https://www.npmjs.com/package/@ngx-env/builder)
- [Angular Environment Variables Guide](https://angular.dev)
- [Dotenv Documentation](https://github.com/motdotla/dotenv)

## 🏃 Quick Start with Environment Variables

1. Create a `.env` file in your project root:
   ```bash
   NG_APP_API_URL=http://localhost:3000/api
   NG_APP_VERSION=1.0.0
   NG_APP_DEBUG=true
   ```

2. Use the variables in your components:
   ```typescript
   export class AppComponent {
     apiUrl = import.meta.env.NG_APP_API_URL;
     version = import.meta.env.NG_APP_VERSION;
   }
   ```

3. Run the development server:
   ```bash
   ng serve
   ```

4. Open `http://localhost:4200/` to see the environment variables in action!
