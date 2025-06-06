# Angular i18n SSR Example App

A modern Angular application demonstrating internationalization (i18n) with Server-Side Rendering (SSR), ready for Firebase deployment.

## Features

- ✅ **Full i18n Support**: English and Polish locales
- ✅ **Server-Side Rendering**: Better SEO and performance
- ✅ **Firebase Ready**: Configured for Firebase hosting and functions
- ✅ **Modern Angular**: Built with Angular 20+ and standalone components
- ✅ **Responsive Design**: Mobile-friendly UI with modern styling

## Supported Locales

- **English (en-US)**: Default locale
- **Polish (pl)**: Translated interface

## Project Structure

```
src/
├── app/
│   ├── app.ts              # Main app component
│   ├── app.html            # Template with i18n markers
│   ├── app.scss            # Styling
│   └── app.config.ts       # App configuration
├── locale/
│   ├── messages.xlf        # Source messages (English)
│   └── messages.pl.xlf     # Polish translations
├── main.ts                 # Bootstrap file
├── main.server.ts          # SSR bootstrap
└── server.ts               # Express server for SSR
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Angular CLI 20+

### Installation

```bash
npm install
```

### Development Servers

Start development server with specific locale:

```bash
# English (default)
npm run start
npm run start:en

# Polish
npm run start:pl
```

### Building

Build for production with all locales:

```bash
# Build with i18n support
npm run build:i18n

# Build for production (all locales)
npm run build:prod
```

Build for specific locale:

```bash
# English only
ng build --configuration=production-en

# Polish only
ng build --configuration=production-pl
```

### i18n Workflow

1. **Extract messages** from templates:
   ```bash
   npm run extract-i18n
   ```

2. **Translate messages** in `src/locale/messages.pl.xlf`

3. **Build with translations**:
   ```bash
   npm run build:i18n
   ```

## Firebase Deployment

### Setup

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase project:
   ```bash
   firebase init
   ```

### Deploy

1. Build the application:
   ```bash
   npm run build:prod
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

### Firebase Configuration

The app includes a `firebase.json` configuration that:
- Serves static files from the browser build
- Routes `/en/**` and `/pl/**` to SSR functions
- Redirects root requests to `/en/`

## i18n Implementation Details

### Template Markers

The app uses Angular i18n markers in templates:

```html
<h1 i18n="@@welcome.title">Welcome to Angular i18n SSR App</h1>
<p i18n="@@hero.description">
  This application demonstrates i18n with SSR.
</p>
```

### Locale Detection

The app automatically detects and displays:
- Current locale
- Localized date formats
- Localized currency formats

### Language Switching

Navigation links allow switching between locales:
- `/en/` - English version
- `/pl/` - Polish version

## SSR Considerations

The app is SSR-compatible with:
- Platform detection for browser-only code
- Proper handling of timers and intervals
- SEO-friendly prerendering

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm start` | Start dev server (English) |
| `npm run start:en` | Start dev server (English) |
| `npm run start:pl` | Start dev server (Polish) |
| `npm run build` | Build for production |
| `npm run build:i18n` | Build with all locales |
| `npm run build:prod` | Production build with all locales |
| `npm run extract-i18n` | Extract i18n messages |
| `npm test` | Run unit tests |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add translations if needed
5. Test with both locales
6. Submit a pull request

## License

This project is licensed under the MIT License.
