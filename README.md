# IP Sprint Test Site

A Vue.js + TypeScript + Vite application demonstrating the integration and usage of Försäkringskassans UI (FKUI) design system. This project serves as a test site for implementing FKUI components in a modern web application.

## Project Overview

This is a single-page application built with:

- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety and better development experience
- **Vite** as the build tool and development server
- **FKUI** (Försäkringskassans UI) design system components
- **Vue Router** for client-side routing
- **SCSS** for styling with FKUI theme integration

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ip-sprint-test-site-01
```

2. Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Project Structure

```
ip-sprint-test-site-01/
├── public/                # Static assets
├── src/
│   ├── assets/            # Component assets
│   ├── components/        # Vue components
│   │   └── HelloWorld.vue
│   ├── plugins/           # Vue plugins
│   │   └── fkui.ts        # FKUI plugin configuration
│   ├── router/            # Vue Router configuration
│   │   └── index.ts
│   ├── styles/            # SCSS stylesheets
│   │   ├── _branding.scss
│   │   ├── _colors.scss
│   │   ├── _typography.scss
│   │   ├── _variables.scss
│   │   ├── theme.scss
│   │   └── components/    # Component-specific styles
│   │       ├── _buttons.scss
│   │       └── _forms.scss
│   ├── types/             # TypeScript type definitions
│   │   └── fkui.d.ts      # FKUI component types
│   ├── views/             # Page components
│   │   ├── DashboardView.vue
│   │   ├── FormView.vue
│   │   └── HomeView.vue
│   ├── App.vue            # Root component
│   ├── main.ts            # Application entry point
│   ├── style.css          # Global styles
│   └── vue-shim.d.ts      # Vue TypeScript declarations
├── .env                   # Environment variables
├── .gitignore
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── README.md              # This file
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TypeScript config
├── tsconfig.node.json     # Node-specific TypeScript config
└── vite.config.ts         # Vite configuration
```

## FKUI Integration

### Plugin Configuration

FKUI is integrated through a custom plugin located at [`src/plugins/fkui.ts`](src/plugins/fkui.ts:1). The plugin:

1. Registers all FKUI components globally (components starting with 'F')
2. Provides screen reader context for accessibility
3. Installs the FKUI validation plugin if available

### Theme Integration

The FKUI theme is imported in [`src/main.ts`](src/main.ts:8) and configured in [`vite.config.ts`](vite.config.ts:16) to automatically include FKUI's SCSS variables and mixins in all components.

### Component Usage

FKUI components are available globally throughout the application. Commonly used components include:

- Form components: `FTextField`, `FSelectField`, `FTextareaField`, `FCheckboxField`
- Layout components: `FCard`, `FFieldset`, `FLabel`
- Action components: `FButton`, `FMessageBox`
- Data components: `FDataTable`, `FTable`, `FBadge`

Example usage from [`FormView.vue`](src/views/FormView.vue:158):

```vue
<FFieldset>
  <FLabel for="firstName">First Name *</FLabel>
  <FTextField
    id="firstName"
    v-model="formData.firstName"
    type="text"
    required
  />
</FFieldset>
```

## Routing

The application uses Vue Router with three main routes:

- `/` - Home page
- `/form` - Form demonstration page
- `/dashboard` - Dashboard page

Routing configuration is located in [`src/router/index.ts`](src/router/index.ts:1).

## Styling

The project uses SCSS with FKUI theme integration. Custom styles are organized in the [`src/styles/`](src/styles/) directory:

- `_variables.scss` - Custom CSS variables
- `_colors.scss` - Color definitions
- `_typography.scss` - Typography settings
- `_branding.scss` - Brand-specific styles
- `theme.scss` - Main theme file
- `components/` - Component-specific styles

## Build Process

The production build process:

1. Runs TypeScript compilation with `vue-tsc -b`
2. Builds the application with Vite
3. Outputs to `dist/` directory

The build is optimized for production with:

- Code splitting
- Tree shaking
- Asset optimization
- CSS minification

## Development Workflow

1. Start development server with `npm run dev`
2. Make changes to components in `src/`
3. Hot module replacement updates the browser automatically
4. Use `npm run lint` to check code quality
5. Use `npm run format` to format code consistently

## Environment Variables

The application supports environment variables defined in `.env`:

- `VITE_APP_TITLE` - Application title (default: "IP Sprint Test Site")
- `VITE_APP_VERSION` - Application version (default: "1.0.0")

## Browser Support

The application supports all modern browsers that support:

- ES2020+ JavaScript features
- CSS Grid and Flexbox
- Vue 3 requirements
- FKUI design system requirements

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Utilize FKUI components when possible
4. Test changes thoroughly
5. Run linting and formatting before committing

## Dependencies

### Core Dependencies

- Vue 3.5.24
- Vue Router 4.6.3
- FKUI packages 6.27.0:
  - @fkui/date
  - @fkui/design
  - @fkui/logic
  - @fkui/theme-default
  - @fkui/vue

### Development Dependencies

- TypeScript 5.9.3
- Vite 7.2.4
- Vue TSC 3.1.4
- ESLint 9.39.1
- Prettier 3.0.0
- Sass-embedded 1.93.3
