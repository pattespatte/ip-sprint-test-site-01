# Creating a Vue.js Website with Försäkringskassans Designsystem (FKUI)

A comprehensive, step-by-step guide for building "ip-sprint-test-site-01" that uses FKUI as its foundation.

**Development Environment:** VMware with Ubuntu Client

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Initial Setup](#initial-setup)
4. [Configuration](#configuration)
5. [Creating the Theme Layer](#creating-the-theme-layer)
6. [Building the Three Pages](#building-the-three-pages)
7. [Best Practices](#best-practices)
8. [Testing & Running Locally](#testing--running-locally)
9. [Performance & Optimization](#performance--optimization)
10. [Security Considerations](#security-considerations)
11. [Accessibility](#accessibility)
12. [Deployment Preparation](#deployment-preparation)
13. [Troubleshooting Section](#troubleshooting-section)
14. [Next Steps & Resources](#next-steps--resources)

---

## Prerequisites

### System Requirements

**Development Environment:**

- VMware Workstation or VMware Player
- Ubuntu 22.04 LTS or newer (recommended)
- Minimum 4GB RAM allocated to VM (8GB recommended)
- 20GB free disk space

💡 **Tip**: Ensure VMware Tools is installed on your Ubuntu VM for better performance and clipboard sharing between host and guest OS.

### Required Software and Versions

Before you begin, ensure you have the following software installed on your Ubuntu system:

#### Setup Checklist

- [ ] Node.js v16+ installed
- [ ] Git configured with SSH keys
- [ ] VS Code with Vue extensions
- [ ] Build tools installed
- [ ] Project directory created

#### 1. **Node.js** (v16.x or higher)

There are several ways to install Node.js on Ubuntu. Here's the recommended method using NodeSource:

```bash
# Update package index
sudo apt update

# Install curl if not already installed
sudo apt install -y curl

# Add NodeSource repository for Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

**Alternative method using nvm (Node Version Manager):**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install Node.js LTS version
nvm install --lts

# Verify installation
node --version
npm --version
```

💡 **Tip**: Using nvm allows you to easily switch between different Node.js versions, which is useful for managing multiple projects.

⚠️ **Warning**: FKUI requires Node.js 16.x or higher. Verify your version with `node --version` before proceeding.

#### 2. **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)

npm comes bundled with Node.js. To install yarn:

```bash
# Install yarn globally using npm
sudo npm install -g yarn

# Verify installation
yarn --version
```

#### 3. **Git**

```bash
# Install Git
sudo apt update
sudo apt install -y git

# Verify installation
git --version

# Configure Git (replace with your information)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 4. **Code Editor**

**Recommended: Visual Studio Code**

```bash
# Method 1: Download and install from official site
# Visit https://code.visualstudio.com/Download and download the .deb package

# Method 2: Install via snap (recommended for Ubuntu)
sudo snap install --classic code

# Verify installation
code --version
```

**Install recommended VS Code extensions:**

```bash
# Launch VS Code and install extensions via command line
code --install-extension Vue.volar
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

**Alternative editors that work well on Ubuntu:**

- WebStorm (available via snap: `sudo snap install webstorm --classic`)
- Sublime Text (available via snap: `sudo snap install sublime-text --classic`)
- Vim/Neovim (for advanced users: `sudo apt install vim` or `sudo apt install neovim`)

#### 5. **Additional Build Tools** (required for some npm packages)

```bash
# Install build essentials (required for native npm modules)
sudo apt install -y build-essential

# Install additional development libraries
sudo apt install -y libssl-dev
```

### Ubuntu-Specific Terminal Tips

Throughout this guide, you'll use the Ubuntu Terminal. Here are some helpful tips:

**Opening Terminal:**

- Press `Ctrl + Alt + T`
- Or search for "Terminal" in the Activities menu

**Useful Terminal Shortcuts:**

- `Ctrl + C` - Cancel current command
- `Ctrl + L` - Clear terminal screen
- `Tab` - Auto-complete commands and file paths
- `↑` / `↓` - Navigate command history
- `Ctrl + Shift + C` - Copy selected text
- `Ctrl + Shift + V` - Paste text

💡 **Tip**: You can open the current directory in your file manager with the command `xdg-open .`

### Knowledge Prerequisites

This guide assumes you have:

- Basic understanding of HTML, CSS, and JavaScript
- Familiarity with Linux/Ubuntu terminal and basic commands (ls, cd, mkdir, etc.)
- Basic knowledge of Git operations (clone, commit, push)
- Limited Vue.js experience is OK - we'll explain concepts as we go

### Helpful Learning Resources

If you need to brush up on any concepts:

- [Vue.js Official Guide](https://vuejs.org/guide/introduction.html)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [npm Documentation](https://docs.npmjs.com/)
- [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
- [Ubuntu Terminal Basics](https://ubuntu.com/tutorials/command-line-for-beginners)

---

## Architecture Overview

### Understanding the "Theme Layer" Concept

The "theme layer" is a lightweight approach to customizing FKUI without reinventing the wheel. Think of it like putting a custom cover on a book - the content and structure remain the same, but the appearance changes to match your brand.

```
┌─────────────────────────────────────┐
│         ip-sprint-test-site-01      │  ← Your custom theme layer
│  (colors, fonts, branding, pages)   │
├─────────────────────────────────────┤
│             FKUI Core               │  ← Base design system
│    (components, patterns, utils)    │
├─────────────────────────────────────┤
│            Vue.js Framework         │  ← Underlying framework
└─────────────────────────────────────┘
```

💡 **Tip**: The theme layer approach means you only need to maintain your custom changes, not the entire design system. This makes updates much easier!

### When to Override vs. When to Inherit

**Override when:**

- Changing colors, typography, or spacing
- Modifying component appearance (not behavior)
- Adding brand-specific elements
- Creating custom layouts

**Inherit when:**

- Using standard components as-is
- Following established interaction patterns
- Leveraging accessibility features
- Maintaining consistent user experience

⚠️ **Warning**: Be careful when overriding FKUI components. Too many customizations can make future updates difficult. Always ask yourself if the change is truly necessary.

### Benefits of This Approach

1. **Maintainability**: FKUI updates can be integrated with minimal changes
2. **Consistency**: Core functionality remains reliable and tested
3. **Performance**: Smaller codebase, faster load times
4. **Developer Experience**: Easier to understand and modify

---

## Initial Setup

### Step 1: Analyzing the FKUI Repositories

⏱️ **Estimated time: 15 minutes**

First, let's explore the FKUI repositories to understand their structure:

1. **Main Design System**: [https://github.com/Forsakringskassan/designsystem](https://github.com/Forsakringskassan/designsystem)
   - Contains core FKUI components, styles, and utilities
   - This site directly imports and uses these FKUI components
   - Review the README to understand dependencies and requirements

2. **User Template**: [https://github.com/Forsakringskassan/designsystem-user-lib](https://github.com/Forsakringskassan/designsystem-user-lib)
   - An optional intermediate layer that provides additional abstractions
   - **NOT used in this project** - we directly import FKUI components instead
   - The designsystem-user-app is an example application that uses designsystem-user-lib

3. **Direct FKUI Integration (Our Approach)**:
   - This site bypasses the designsystem-user-lib layer
   - Directly imports FKUI components from `@fkui/vue`, `@fkui/design`, etc.
   - Provides more control over component usage and customization
   - Reduces dependency layers and potential abstraction overhead

⚠️ **Important**: Before proceeding, verify the component names and import paths in the FKUI documentation. Component APIs may change between versions.

### Step 2: Setting Up GitLab Repository

⏱️ **Estimated time: 10 minutes**

1. Create a new repository in GitLab named "ip-sprint-test-site-01"
2. Initialize it with a README.md (you can use the default)
3. Clone the repository to your Ubuntu VM:

   ```bash
   # Navigate to your preferred projects directory
   cd ~/projects  # or wherever you keep your code

   # Create the directory if it doesn't exist
   mkdir -p ~/projects

   # Clone the repository
   git clone https://gitlab.com/your-username/ip-sprint-test-site-01.git

   # Navigate into the project directory
   cd ip-sprint-test-site-01
   ```

💡 **Tip**: Use SSH instead of HTTPS for Git operations to avoid entering credentials repeatedly.

**Setting up SSH keys on Ubuntu:**

```bash
# Generate SSH key (press Enter to accept defaults)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start the ssh-agent
eval "$(ssh-agent -s)"

# Add your SSH key to the agent
ssh-add ~/.ssh/id_ed25519

# Copy your public key to clipboard
cat ~/.ssh/id_ed25519.pub
# Then manually copy the output and add it to GitLab (Settings → SSH Keys)
```

### Step 3: Project Initialization

⏱️ **Estimated time: 10 minutes**

We'll use Vite as our build tool, which is recommended for Vue.js projects:

```bash
# Ensure you're in the project directory
cd ~/projects/ip-sprint-test-site-01

# Create a new Vue project with Vite (the dot creates it in current directory)
npm create vue@latest .

# When prompted, select the following options:
# ✅ TypeScript? Yes
# ✅ JSX Support? No
# ✅ Vue Router? Yes
# ✅ Pinia? No (not needed for this project)
# ✅ Vitest? No (we'll add testing later if needed)
# ✅ End-to-End Testing Solution? No
# ✅ ESLint? Yes
# ✅ Prettier? Yes
```

⚠️ **Warning**: The dot (.) after the command creates the project in the current directory. Make sure you're in the right directory before running this command! Use `pwd` to check your current directory.

**Install dependencies:**

```bash
# Install all project dependencies
npm install

# This may take a few minutes on first run
```

### Step 4: Installing FKUI Dependencies

⏱️ **Estimated time: 5 minutes**

Based on the FKUI documentation, install the required packages:

```bash
# Install FKUI packages (ensure all use the same version)
npm install @fkui/theme-default@^6.27.0 @fkui/design@^6.27.0 @fkui/date@^6.27.0 @fkui/logic@^6.27.0 @fkui/vue@^6.27.0

# Install SCSS support for Vite
npm install -D sass-embedded
```

💡 **Tip**: Check the FKUI documentation for the latest version number and any additional dependencies required for your specific use case.

⚠️ **Important**: Always use the same version number for all @fkui packages to avoid compatibility issues. Verify with:

```bash
# To list all @fkui packages: Use
npm list @fkui/*
# or simply
npm list
# to see all dependencies
# To check a specific @fkui package: Use the full name like
npm list @fkui/vue
# To see all @fkui packages globally: Use
npm list -g | grep @fkui
```

### Step 5: Project Folder Structure

Your project structure should look like this:

```
ip-sprint-test-site-01/
├── public/                # Static assets
├── src/
│   ├── assets/            # Custom assets (images, fonts)
│   ├── components/        # Custom Vue components
│   ├── plugins/           # Vue plugins (FKUI registration)
│   ├── router/            # Vue Router configuration
│   ├── styles/            # Custom styles and theme overrides
│   ├── types/             # TypeScript type definitions
│   ├── views/             # Page components
│   ├── App.vue            # Main application component
│   ├── main.ts            # Application entry point
│   └── style.css          # Base styles
├── .env                   # Environment variables
├── .env.local             # Local environment variables (not committed)
├── .gitignore             # Git ignore file
├── index.html             # HTML template with app-container ID
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TypeScript config
├── tsconfig.node.json     # Node-specific TypeScript config
└── vite.config.ts         # Vite configuration
```

**Create additional directories:**

```bash
# Create directory structure
mkdir -p src/plugins
mkdir -p src/types
mkdir -p src/styles/components
```

**View your project structure:**

```bash
# Use tree command to visualize directory structure (install if needed)
sudo apt install tree
tree -L 2 -I 'node_modules'

# Or use ls
ls -la
```

💡 **Tip**: Keeping your theme files organized in the `src/styles/` directory makes them easier to find and maintain as your project grows.

---

## Configuration

### Step 1: Setting Up Build Tools (Vite)

⏱️ **Estimated time: 10 minutes**

Update your `vite.config.ts` to properly handle FKUI:

```typescript
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Add FKUI's SCSS variables and mixins
        additionalData: `@use "@fkui/design" as *;`
      }
    }
  },
  server: {
    port: 5173,
    host: true // This allows access from host machine to VM
  }
})
```

💡 **Tip**: The `host: true` setting allows you to access your development server from your host machine's browser using the VM's IP address.

### Step 2: Configuring package.json

Update your `package.json` with the necessary scripts:

```json
{
  "name": "ip-sprint-test-site-01",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "@fkui/date": "^6.27.0",
    "@fkui/design": "^6.27.0",
    "@fkui/logic": "^6.27.0",
    "@fkui/theme-default": "^6.27.0",
    "@fkui/vue": "^6.27.0",
    "vue": "^3.5.24",
    "vue-router": "^4.6.3"
  },
  "devDependencies": {
    "@types/node": "^24.10.1",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.8.1",
    "eslint": "^9.39.1",
    "prettier": "^3.0.0",
    "sass": "^1.94.2",
    "sass-embedded": "^1.93.3",
    "typescript": "~5.9.3",
    "vite": "^7.2.4",
    "vue-tsc": "^3.1.4"
  }
}
```

### Step 3: Setting Up TypeScript Definitions for FKUI

Create type definitions for FKUI components:

```typescript
// src/types/fkui.d.ts
declare module '@fkui/vue' {
  import { DefineComponent } from 'vue'

  export const FButton: DefineComponent<any, any, any>
  export const FTextField: DefineComponent<any, any, any>
  export const FCard: DefineComponent<any, any, any>
  export const FMessageBox: DefineComponent<any, any, any>
  export const FValidationForm: DefineComponent<any, any, any>
  export const FFieldset: DefineComponent<any, any, any>
  export const FLabel: DefineComponent<any, any, any>
  export const FSelectField: DefineComponent<any, any, any>
  export const FTextareaField: DefineComponent<any, any, any>
  export const FCheckboxField: DefineComponent<any, any, any>
  export const FBadge: DefineComponent<any, any, any>
  export const FDataTable: DefineComponent<any, any, any>
  export const FTableColumn: DefineComponent<any, any, any>
  export const FTable: DefineComponent<any, any, any>
  export const FTableRow: DefineComponent<any, any, any>
  export const FTableCell: DefineComponent<any, any, any>
  export const FTableHeaderCell: DefineComponent<any, any, any>
  // Add other FKUI components as needed
}
```

### Step 4: Creating FKUI Plugin for Component Registration

Create a plugin to register FKUI components:

```typescript
// src/plugins/fkui.ts
import type { App } from 'vue'
// Import all FKUI components and register them globally
import * as FKUI from '@fkui/vue'

export default {
  install(app: App) {
    // DEBUG: Provide basic screen reader context to fix undefined error
    app.provide('screenReaderContextKey', {
      screenReaderContextKey: Symbol('screenReaderContext')
    })

    // Register all FKUI components globally
    Object.entries(FKUI).forEach(([name, component]) => {
      if (name.startsWith('F')) {
        app.component(name, component)
      }
    })

    console.log('DEBUG: FKUI plugin installed with components:', Object.keys(FKUI).filter(name => name.startsWith('F')))
  }
}
```

⚠️ **Important**: Verify all component names against the [FKUI Component Documentation](https://forsakringskassan.github.io/designsystem/components.html). Component names used in this guide are examples and may differ from actual FKUI exports.

### Step 5: Setting Up the Theme Override System

Create the foundation for your theme overrides:

```bash
# Create the styles directory structure
mkdir -p src/styles
```

```scss
// src/styles/theme.scss

// Import FKUI base theme
@use "@fkui/theme-default";

// Import custom theme files
@use "variables";
@use "colors";
@use "typography";
@use "branding";

// Import component overrides
@use "components/buttons";
@use "components/forms";

// Import FKUI base styles (must come after @use rules)
@import "@fkui/design/lib/fkui.css";
@import "@fkui/design/lib/fonts.css";
```

### Step 6: Environment Configuration

Set up environment variables for different stages:

```bash
# Create environment files
touch .env .env.local
```

```bash
# .env
VITE_APP_TITLE=IP Sprint Test Site 01
VITE_APP_VERSION=1.0.0
VITE_FKUI_THEME=default
```

```bash
# .env.local (not committed to version control)
VITE_API_URL=http://localhost:3000/api
VITE_DEBUG=true
```

⚠️ **Important**: The `.env.local` file should contain sensitive or environment-specific data that should not be committed to version control. This file is already included in the `.gitignore` file to prevent accidental commits.

**Creating the .env.local file:**

1. Create the file in your project root:

   ```bash
   touch .env.local
   ```

2. Add your local environment variables:

   ```bash
   # .env.local
   VITE_API_URL=http://localhost:3000/api
   VITE_DEBUG=true
   VITE_APP_ENV=development
   ```

3. Verify it's in .gitignore:

   ```bash
   cat .gitignore | grep .env.local
   # Should output: .env.local
   ```

---

## Creating the Theme Layer

### Step 1: How to Properly Extend FKUI

⏱️ **Estimated time: 20 minutes**

The key to a successful theme layer is extending, not replacing. Here's how to properly set up your theme:

```bash
# Create theme-related SCSS files
touch src/styles/_variables.scss
touch src/styles/_colors.scss
touch src/styles/_typography.scss
touch src/styles/_branding.scss
```

```scss
// src/styles/_variables.scss

// First import FKUI variables
@use "@fkui/design/src/core" as fkui;

// Then define your overrides
$primary-color: #3366cc;   // Your brand primary
$secondary-color: #6699ff; // Your brand secondary
$text-color: #333333;      // Your text color
$background-color: #ffffff; // Your background color

// Override FKUI variables with your values
$fk-primary: $primary-color;
$fk-secondary: $secondary-color;
$fk-text: $text-color;
$fk-background: $background-color;
```

⚠️ **Warning**: Always import FKUI variables before defining your overrides. This ensures you can reference FKUI's original values if needed.

### Step 2: Creating Custom Color Schemes

Create a structured approach to colors:

```scss
// src/styles/_colors.scss

// Define your color palette
$colors: (
  primary: (
    50: #e6f2ff,
    100: #b3d9ff,
    500: #3366cc,  // Main primary color
    600: #2952a3,
    700: #1a3d7a,  // Darker blue
    800: #0d1f40,  // Darkest blue
    900: #0a1426
  ),
  secondary: (
    50: #f0f4ff,
    100: #d9e3ff,
    500: #6699ff,  // Main secondary color
    600: #4d7acc,
    900: #1a2e66
  ),
  neutral: (
    50: #f8f9fa,
    100: #e9ecef,
    500: #6c757d,
    900: #212529
  )
);

// Generate CSS custom properties
:root {
  @each $color-name, $color-shades in $colors {
    @each $shade, $value in $color-shades {
      --color-#{$color-name}-#{$shade}: #{$value};
    }
  }
}
```

### Step 3: Customizing Fonts

Set up your typography system:

```scss
// src/styles/_typography.scss

// Import custom fonts (using Noto Sans as example)
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');

// Define font families
$font-family-sans-serif: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

// Override FKUI typography variables
$fk-font-family-base: $font-family-sans-serif;
$fk-font-family-monospace: $font-family-monospace;

// Custom font sizes (if needed)
$font-sizes: (
  xs: 0.75rem,     // 12px
  sm: 0.875rem,    // 14px
  base: 1rem,      // 16px
  lg: 1.125rem,    // 18px
  xl: 1.25rem,     // 20px
  '2xl': 1.5rem,   // 24px
  '3xl': 1.875rem, // 30px
  '4xl': 2.25rem   // 36px
);

// Generate CSS custom properties for font sizes
:root {
  @each $size-name, $size-value in $font-sizes {
    --font-size-#{$size-name}: #{$size-value};
  }
}
```

### Step 4: Branding Customizations

Add your brand-specific elements:

```scss
// src/styles/_branding.scss

// Logo and branding elements
.brand-logo {
  height: 40px;
  width: auto;
  // Your logo-specific styles
}

// Custom brand components
.brand-header {
  background-color: var(--color-primary-500);
  color: white;
  padding: 1rem 0;
}

.brand-footer {
  background-color: var(--color-neutral-900);
  color: white;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Step 5: Component-Specific Overrides

Create overrides for specific FKUI components:

```scss
// src/styles/components/_buttons.scss

// Custom button overrides - only override specific properties
// This preserves the default FKUI button styling while modifying specific aspects

// Target primary variant buttons with darker background and borders
// Using actual FKUI class names (button and button--primary)
.button.button--primary {
  // Also target large size buttons specifically
  &.button--large {
    // Inherit all the above styles but for large buttons
  }

  // Override only the specific properties we want to change
  background-color: var(--color-primary-700);
  border: 2px solid var(--color-primary-800);
  color: white;

  // Keep FKUI hover behavior but with our darker colors
  &:hover {
    background-color: var(--color-primary-800);
    border-color: var(--color-primary-900);
  }

  // Ensure focus states are also properly styled
  &:focus {
    border-color: var(--color-primary-800);
    box-shadow: 0 0 0 3px rgba(13, 31, 64, 0.25);
  }
}
```

```scss
// src/styles/components/_forms.scss

// Custom form overrides
.fk-input,
.fk-select,
.fk-textarea {
  border-radius: 4px;

  &:focus {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(51, 102, 204, 0.1);
  }
}
```

### Step 6: Main Theme File

Create the main theme file that imports everything:

```scss
// src/styles/theme.scss

// Import FKUI base theme
@use "@fkui/theme-default";

// Import custom theme files
@use "variables";
@use "colors";
@use "typography";
@use "branding";

// Import component overrides
@use "components/buttons";
@use "components/forms";

// Import FKUI base styles (must come after @use rules)
@import "@fkui/design/lib/fkui.css";
@import "@fkui/design/lib/fonts.css";
```

### Step 7: Which Files to Create vs. Which to Import

**Create these files in your project:**

- `src/styles/theme.scss` - Main theme file that imports everything
- `src/styles/_variables.scss` - Variable overrides
- `src/styles/_colors.scss` - Color system
- `src/styles/_typography.scss` - Typography system
- `src/styles/_branding.scss` - Brand-specific styles
- `src/styles/components/_buttons.scss` - Button customizations
- `src/styles/components/_forms.scss` - Form customizations

**Import FKUI files rather than copying them:**

- Component styles from `@fkui/design/`
- Utility styles from `@fkui/design/`
- Base styles from `@fkui/design/`

💡 **Tip**: By importing FKUI files instead of copying them, you automatically get updates and bug fixes when you upgrade the FKUI version.

---

## Building the Three Pages

We'll create three pages to demonstrate different aspects of FKUI:

1. Landing Page - Showcasing layout and content components
2. Form Page - Demonstrating FKUI form components
3. Dashboard/Status Page - Showing data display components

### Step 1: Setting Up Vue Router

⏱️ **Estimated time: 10 minutes**

```bash
# Create views directory if it doesn't exist
mkdir -p src/views
```

Update your router configuration:

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    }
  ]
})

export default router
```

💡 **Tip**: Using dynamic imports (`() => import(...)`) enables code splitting, which improves initial page load performance.

### Step 1.5: Setting Up Main Application Entry Point

⏱️ **Estimated time: 5 minutes**

Update your `src/main.ts` to properly import and register FKUI components:

```typescript
// src/main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

// Import FKUI plugin
import FkuiPlugin from './plugins/fkui'
import '@fkui/theme-default'

const app = createApp(App)

app.use(router)
app.use(FkuiPlugin)

console.log('DEBUG: FKUI plugins loaded')

app.mount('#app-container')

💡 **Important**: Note that we use `#app-container` as mount-point instead of `#app` to avoid duplicate ID errors.
```

### Step 2: Creating the Landing Page

⏱️ **Estimated time: 20 minutes**

```bash
# Create the HomeView component
touch src/views/HomeView.vue
```

```vue
<!-- src/views/HomeView.vue -->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToForm = () => {
  router.push('/form')
}
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="content-container">
        <h1 class="fk-heading-1">Welcome to IP Sprint Test Site</h1>
        <p class="fk-text-large fk-mb-4">
          This is a demonstration site built with Försäkringskassans Designsystem (FKUI).
        </p>
        <FButton variant="primary" size="large" @click="navigateToForm" class="button button--primary button--medium">
          Get Started
        </FButton>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="content-container">
        <h2 class="fk-heading-2 fk-mb-4">Features</h2>
        <div class="feature-grid">
          <FCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">✓</div>
              <h3 class="fk-heading-3">Easy to Use</h3>
              <p>Built with FKUI components for consistency and accessibility.</p>
            </div>
          </FCard>
          <FCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">⚙</div>
              <h3 class="fk-heading-3">Customizable</h3>
              <p>Theme layer allows for easy branding and customization.</p>
            </div>
          </FCard>
          <FCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">🛡</div>
              <h3 class="fk-heading-3">Secure</h3>
              <p>Follows Swedish government security and accessibility standards.</p>
            </div>
          </FCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="content-container">
        <h2 class="fk-heading-2">Ready to try our form?</h2>
        <FButton variant="secondary" @click="navigateToForm">
          Try the Form Demo
        </FButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background-color: var(--color-primary-50);
  padding: 4rem 0;
  text-align: center;
}

.features-section {
  padding: 4rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-section {
  background-color: var(--color-neutral-100);
  padding: 3rem 0;
  text-align: center;
}
</style>
```

### Step 3: Creating the Form Page

⏱️ **Estimated time: 30 minutes**

```bash
# Create the FormView component
touch src/views/FormView.vue
```

```vue
<!-- src/views/FormView.vue -->
<script setup>
import { reactive, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  contactMethod: '',
  notifications: [],
  comments: '',
  agreedToTerms: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  contactMethod: '',
  agreedToTerms: ''
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid'
    isValid = false
  }

  if (!formData.contactMethod) {
    errors.contactMethod = 'Please select a contact method'
    isValid = false
  }

  if (!formData.agreedToTerms) {
    errors.agreedToTerms = 'You must agree to terms'
    isValid = false
  }

  return isValid;
}

const focusFirstErrorField = async () => {
  // Find first field with an error
  const firstErrorField = Object.keys(errors).find(key => errors[key])

  if (firstErrorField) {
    // For checkbox fields, we need to handle differently
    let element
    if (firstErrorField === 'agreedToTerms') {
      // Find the checkbox input within the fieldset
      element = document.querySelector(`input[name="${firstErrorField}"]`)
    } else {
      // Find the input/select element by ID
      element = document.querySelector(`#${firstErrorField}`)
    }

    if (element) {
      // Wait for DOM to update
      await nextTick()

      // Focus element
      element.focus()

      // Scroll to element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

      // Announce error to screen readers
      const errorElement = document.querySelector(`#${firstErrorField}-error`)
      if (errorElement) {
        errorElement.setAttribute('aria-live', 'polite')
        errorElement.setAttribute('role', 'alert')
      }

      console.log(`Focused and scrolled to first error field: ${firstErrorField}`)
    }
  }
}

const handleSubmit = async (event) => {
  event.preventDefault()

  console.log('Form submit triggered')

  if (!validateForm()) {
    console.log('Validation failed, submission prevented')

    // Focus first error field with enhanced accessibility
    await focusFirstErrorField()

    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Show success message
    showSuccessMessage.value = true

    // Reset form
    resetForm()

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(formData, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: '',
    notifications: [],
    comments: '',
    agreedToTerms: false
  })

  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}
</script>

<template>
  <div class="form-view">
    <div class="content-container">
      <nav class="breadcrumb fk-mb-4" aria-label="Breadcrumb navigation">
        <router-link to="/">Home</router-link>
        <span class="separator" aria-hidden="true">/</span>
        <span aria-current="page">Form</span>
      </nav>

      <h1 class="fk-heading-1 fk-mb-4">Application Form</h1>
      <p class="fk-text-large fk-mb-6">
        Please fill out this form to demonstrate FKUI form components.
      </p>

      <!-- Form submission status for screen readers -->
      <div
        v-if="Object.values(errors).some(error => error)"
        class="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Form has validation errors. Please review and correct the highlighted fields.
      </div>

      <form @submit="handleSubmit" class="application-form" novalidate>
        <!-- Personal Information Section -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Personal Information</legend>

          <FFieldset>
            <FLabel for="firstName">First Name *</FLabel>
            <FTextField
              id="firstName"
              v-model="formData.firstName"
              type="text"
              :class="{ 'error': errors.firstName }"
              :aria-invalid="!!errors.firstName"
              :aria-describedby="errors.firstName ? 'firstName-error' : null"
              required
              autocomplete="given-name"
            />
            <div v-if="errors.firstName" id="firstName-error" class="error-message" role="alert">
              {{ errors.firstName }}
            </div>
          </FFieldset>

          <FFieldset>
            <FLabel for="lastName">Last Name *</FLabel>
            <FTextField
              id="lastName"
              v-model="formData.lastName"
              type="text"
              :class="{ 'error': errors.lastName }"
              :aria-invalid="!!errors.lastName"
              :aria-describedby="errors.lastName ? 'lastName-error' : null"
              required
              autocomplete="family-name"
            />
            <div v-if="errors.lastName" id="lastName-error" class="error-message" role="alert">
              {{ errors.lastName }}
            </div>
          </FFieldset>

          <FFieldset>
            <FLabel for="email">Email Address *</FLabel>
            <FTextField
              id="email"
              v-model="formData.email"
              type="email"
              :class="{ 'error': errors.email }"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : null"
              required
              autocomplete="email"
            />
            <div v-if="errors.email" id="email-error" class="error-message" role="alert">
              {{ errors.email }}
            </div>
          </FFieldset>

          <FFieldset>
            <FLabel for="phone">Phone Number</FLabel>
            <FTextField
              id="phone"
              v-model="formData.phone"
              type="tel"
              autocomplete="tel"
            />
          </FFieldset>
        </fieldset>

        <!-- Preferences Section -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Preferences</legend>

          <FFieldset>
            <FLabel for="contactMethod">Preferred Contact Method *</FLabel>
            <FSelectField
              id="contactMethod"
              v-model="formData.contactMethod"
              :class="{ 'error': errors.contactMethod }"
              :aria-invalid="!!errors.contactMethod"
              :aria-describedby="errors.contactMethod ? 'contactMethod-error' : null"
              required
            >
              <option value="">Please select</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="mail">Mail</option>
            </FSelectField>
            <div v-if="errors.contactMethod" id="contactMethod-error" class="error-message" role="alert">
              {{ errors.contactMethod }}
            </div>
          </FFieldset>

          <FFieldset>
            <fieldset class="checkbox-group">
              <legend class="group-legend">Notification Preferences</legend>
              <FCheckboxField
                v-model="formData.notifications"
                value="updates"
                aria-describedby="notifications-help"
              >
                Product updates
              </FCheckboxField>
              <FCheckboxField
                v-model="formData.notifications"
                value="newsletter"
                aria-describedby="notifications-help"
              >
                Newsletter
              </FCheckboxField>
              <FCheckboxField
                v-model="formData.notifications"
                value="promotions"
                aria-describedby="notifications-help"
              >
                Promotions
              </FCheckboxField>
              <div id="notifications-help" class="sr-only">
                Select all notification preferences you wish to receive
              </div>
            </fieldset>
          </FFieldset>

          <FFieldset>
            <FLabel for="comments">Additional Comments</FLabel>
            <FTextareaField
              id="comments"
              v-model="formData.comments"
              rows="4"
              aria-describedby="comments-help"
            />
            <div id="comments-help" class="sr-only">
              Optional field for any additional information you'd like to provide
            </div>
          </FFieldset>
        </fieldset>

        <!-- Agreement Section -->
        <fieldset class="form-section">
          <FFieldset>
            <FCheckboxField
              v-model="formData.agreedToTerms"
              value="terms"
              name="agreedToTerms"
              :class="{ 'error': errors.agreedToTerms }"
              :aria-invalid="!!errors.agreedToTerms"
              :aria-describedby="errors.agreedToTerms ? 'agreedToTerms-error' : 'terms-help'"
              required
            >
              I agree to the terms and conditions *
            </FCheckboxField>
            <div v-if="errors.agreedToTerms" id="agreedToTerms-error" class="error-message" role="alert">
              {{ errors.agreedToTerms }}
            </div>
            <div id="terms-help" class="sr-only">
              You must agree to the terms and conditions to submit this form
            </div>
          </FFieldset>
        </fieldset>

        <!-- Form Actions -->
        <div class="form-actions" role="group" aria-label="Form actions">
          <FButton variant="secondary" type="button" @click="resetForm">
            Reset
          </FButton>
          <FButton
            variant="primary"
            type="submit"
            :disabled="isSubmitting"
            aria-describedby="isSubmitting ? 'submit-status' : null"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
          </FButton>
          <div v-if="isSubmitting" id="submit-status" class="sr-only" role="status" aria-live="polite">
            Form submission in progress, please wait
          </div>
        </div>
      </form>

      <!-- Success Message -->
      <FMessageBox
        v-if="showSuccessMessage"
        variant="success"
        class="fk-mt-6"
        dismissible
        role="alert"
        aria-live="polite"
        @close="showSuccessMessage = false"
      >
        <strong>Success!</strong> Your application has been submitted successfully.
      </FMessageBox>
    </div>
  </div>
</template>

<style scoped>
.form-view {
  padding: 2rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-neutral-600);
}

.breadcrumb a {
  color: var(--color-primary-500);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: var(--color-neutral-400);
}

.application-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-section {
  border: none;
  padding: 0;
  margin-bottom: 2rem;
}

.form-section legend {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-neutral-200);
  width: 100%;
}

.checkbox-group {
  border: none;
  padding: 0;
  margin: 0;
}

.group-legend {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-neutral-900);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* Container styles are now handled by .content-container in App.vue */

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Make error messages more visible */
.error-message {
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 600;
  display: block;
  padding: 0.5rem;
  background-color: #fef2f2;
  border: 1px solid #d32f2f;
  border-radius: 4px;
}

.error-message::before {
  content: "⚠️ Error: ";
  font-weight: bold;
}

/* Target FKUI input elements specifically - using actual FKUI class names */
.text-field__input.error,
.select-field__select.error,
.checkbox-field__input.error {
  border-color: #d32f2f;
  border-width: 2px;
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.3);
  background-color: #fef2f2;
}

/* Target parent containers for better visual feedback */
.text-field.error,
.select-field.error,
.checkbox-field.error {
  /* Style entire field container when in error state */
}

/* Focus styles for error fields */
.text-field__input.error:focus,
.select-field__select.error:focus,
.checkbox-field__input.error:focus {
  outline: 2px solid #d32f2f;
  outline-offset: 2px;
  border-color: #d32f2f;
}

/* Also target wrapper elements for better error visibility */
.text-field__icon-wrapper:has(.text-field__input.error) {
  position: relative;
}

.text-field__icon-wrapper:has(.text-field__input.error)::after {
  content: '';
  position: absolute;
  inset: -2px;
  border: 2px solid #d32f2f;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .error-message {
    border-width: 2px;
    background-color: white;
    color: black;
  }

  .text-field__input.error,
  .select-field__select.error {
    background-color: white;
    color: black;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  form {
    scroll-behavior: auto;
  }
}
</style>
```

### Step 4: Creating the Dashboard/Status Page

⏱️ **Estimated time: 30 minutes**

```bash
# Create the DashboardView component
touch src/views/DashboardView.vue
```

```vue
<!-- src/views/DashboardView.vue -->
<script setup>
import { reactive, ref, onMounted } from "vue";

const stats = reactive({
 applications: 12,
 pending: 3,
 approved: 7,
 needsAction: 2,
});

const applications = ref([
 {
  id: "APP-001",
  name: "John Doe",
  type: "Benefits",
  date: "2025-11-15",
  status: "Approved",
 },
 {
  id: "APP-002",
  name: "Jane Smith",
  type: "Healthcare",
  date: "2025-11-14",
  status: "Pending",
 },
 {
  id: "APP-003",
  name: "Bob Johnson",
  type: "Benefits",
  date: "2025-11-13",
  status: "Needs Action",
 },
 {
  id: "APP-004",
  name: "Alice Brown",
  type: "Pension",
  date: "2025-11-12",
  status: "Approved",
 },
]);

const activities = ref([
 {
  id: 1,
  title: "Application Approved",
  description: "Application APP-001 has been approved.",
  timestamp: "2025-11-15T14:30:00Z",
  type: "success",
 },
 {
  id: 2,
  title: "Document Uploaded",
  description: "New document uploaded for application APP-002.",
  timestamp: "2025-11-15T10:15:00Z",
  type: "info",
 },
 {
  id: 3,
  title: "Action Required",
  description: "Additional information needed for application APP-003.",
  timestamp: "2025-11-14T16:45:00Z",
  type: "warning",
 },
]);

const formatDate = (dateString) => {
 const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
 };
 return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusVariant = (status) => {
 switch (status) {
  case "Approved":
   return "success";
  case "Pending":
   return "info";
  case "Needs Action":
   return "warning";
  default:
   return "neutral";
 }
};

const viewDetails = (id) => {
 // In a real application, this would navigate to a details page
 alert(`Viewing details for application ${id}`);
};

onMounted(() => {
 // In a real application, you would fetch data from an API
 console.log("Dashboard loaded");
});
</script>

<template>
 <div class="dashboard-view">
  <div class="content-container">
   <nav class="breadcrumb fk-mb-4">
    <router-link to="/">Home</router-link>
    <span class="separator">/</span>
    <span>Dashboard</span>
   </nav>

   <h1 class="fk-heading-1 fk-mb-4">Dashboard</h1>
   <p class="fk-text-large fk-mb-6">
    Overview of your application status and recent activity.
   </p>

   <!-- Status Cards -->
   <div class="stats-grid fk-mb-6">
    <FCard class="status-card">
     <div class="status-card-content">
      <div class="status-icon">📄</div>
      <h3 class="fk-heading-4">Applications</h3>
      <p class="fk-text-large">{{ stats.applications }}</p>
     </div>
    </FCard>

    <FCard class="status-card">
     <div class="status-card-content">
      <div class="status-icon">🕐</div>
      <h3 class="fk-heading-4">Pending</h3>
      <p class="fk-text-large">{{ stats.pending }}</p>
     </div>
    </FCard>

    <FCard class="status-card">
     <div class="status-card-content">
      <div class="status-icon">✓</div>
      <h3 class="fk-heading-4">Approved</h3>
      <p class="fk-text-large">{{ stats.approved }}</p>
     </div>
    </FCard>

    <FCard class="status-card">
     <div class="status-card-content">
      <div class="status-icon">⚠</div>
      <h3 class="fk-heading-4">Need Action</h3>
      <p class="fk-text-large">{{ stats.needsAction }}</p>
     </div>
    </FCard>
   </div>

   <!-- Recent Applications Table -->
   <FCard class="fk-mb-6">
    <div class="card-header">
     <h2 class="fk-heading-2">Recent Applications</h2>
    </div>

    <!-- DEBUG: Try implementing FDataTable correctly according to FKUI documentation -->
    <FDataTable :rows="applications">
     <template #caption>Lates applications</template>
     <template #default="{ row }">
      <FTableColumn title="ID" type="text">
       {{ row.id }}
      </FTableColumn>
      <FTableColumn title="Name" type="text">
       {{ row.name }}
      </FTableColumn>
      <FTableColumn title="Type" type="text">
       {{ row.type }}
      </FTableColumn>
      <FTableColumn title="Date" type="date">
       {{ formatDate(row.date) }}
      </FTableColumn>
      <FTableColumn title="Status" type="text">
       <FBadge :variant="getStatusVariant(row.status)">
        {{ row.status }}
       </FBadge>
      </FTableColumn>
      <!-- DEBUG: Try using FTableButton for action column instead of type="action" -->
      <FTableColumn title="Actions">
       <FTableButton @click="viewDetails(row.id)">
        Visa
       </FTableButton>
      </FTableColumn>
     </template>
    </FDataTable>
   </FCard>

   <!-- Activity Timeline -->
   <FCard class="fk-mb-6">
    <div class="card-header">
     <h2 class="fk-heading-2">Recent Activity</h2>
    </div>

    <div class="activity-list">
     <div
      v-for="activity in activities"
      :key="activity.id"
      class="activity-item"
     >
      <div
       class="activity-icon"
       :class="`activity-${activity.type}`"
      >
       {{
        activity.type === "success"
         ? "✓"
         : activity.type === "warning"
          ? "⚠"
          : "ℹ"
       }}
      </div>
      <div class="activity-content">
       <h4 class="activity-title">{{ activity.title }}</h4>
       <p class="activity-description">
        {{ activity.description }}
       </p>
       <span class="activity-time">{{
        formatDate(activity.timestamp)
       }}</span>
      </div>
     </div>
    </div>
   </FCard>

   <!-- System Notification -->
   <!-- DEBUG: Adding type prop to fix missing required prop error -->
   <FMessageBox type="info" variant="info" class="fk-mb-4">
    <strong>System Update:</strong> Scheduled maintenance will occur
    this weekend from 2 AM to 6 AM.
   </FMessageBox>
  </div>
 </div>
</template>

<style scoped>
.dashboard-view {
 padding: 2rem 0;
}

.breadcrumb {
 display: flex;
 align-items: center;
 gap: 0.5rem;
 color: var(--color-neutral-600);
}

.breadcrumb a {
 color: var(--color-primary-500);
 text-decoration: none;
}

.breadcrumb a:hover {
 text-decoration: underline;
}

.separator {
 color: var(--color-neutral-400);
}

.stats-grid {
 display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
 gap: 1.5rem;
}

.status-card {
 text-align: center;
}

.status-card-content {
 padding: 2rem 1rem;
}

.status-icon {
 font-size: 3rem;
 margin-bottom: 0.5rem;
}

.card-header {
 padding: 1.5rem;
 border-bottom: 1px solid var(--color-neutral-200);
}

.table-wrapper {
 overflow-x: auto;
}

.applications-table {
 width: 100%;
 border-collapse: collapse;
 border-spacing: 0;
}

.applications-table th,
.applications-table td {
 padding: 0.75rem;
 text-align: left;
 border-bottom: 1px solid var(--color-neutral-200);
}

.applications-table th {
 background-color: var(--color-neutral-50);
 font-weight: 600;
 color: var(--color-neutral-700);
}

.applications-table tbody tr:hover {
 background-color: var(--color-neutral-50);
}

.activity-list {
 padding: 1.5rem;
}

.activity-item {
 display: flex;
 gap: 1rem;
 padding: 1rem 0;
 border-bottom: 1px solid var(--color-neutral-100);
}

.activity-item:last-child {
 border-bottom: none;
}

.activity-icon {
 width: 40px;
 height: 40px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 50%;
 font-size: 1.25rem;
 flex-shrink: 0;
}

.activity-success {
 background-color: var(--color-primary-100);
 color: var(--color-primary-700);
}

.activity-warning {
 background-color: #fff3cd;
 color: #856404;
}

.activity-info {
 background-color: #d1ecf1;
 color: #0c5460;
}

.activity-content {
 flex: 1;
}

.activity-title {
 font-weight: 600;
 margin-bottom: 0.25rem;
}

.activity-description {
 color: var(--color-neutral-600);
 margin-bottom: 0.5rem;
}

.activity-time {
 font-size: 0.875rem;
 color: var(--color-neutral-500);
}

.container {
 max-width: 1200px;
 margin: 0 auto;
 padding: 0 1rem;
}
</style>
```

### Step 5: Creating Navigation Between Pages

⏱️ **Estimated time: 15 minutes**

Update your main App.vue to include navigation:

```vue
<!-- src/App.vue -->
<script setup>
import { ref } from 'vue'

const appTitle = import.meta.env.VITE_APP_TITLE || 'IP Sprint Test Site'
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <div id="app-container">
    <header class="app-header">
      <div class="content-container">
        <nav class="app-nav">
          <div class="app-logo">
            <router-link to="/">
              <h1>{{ appTitle }}</h1>
            </router-link>
          </div>
          
          <button
            class="mobile-menu-toggle"
            @click="toggleMobileMenu"
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          
          <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
            <li>
              <router-link to="/" class="nav-link" @click="mobileMenuOpen = false">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/form" class="nav-link" @click="mobileMenuOpen = false">
                Form
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard" class="nav-link" @click="mobileMenuOpen = false">
                Dashboard
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="app-main">
      <div class="content-container">
        <Suspense>
          <template #default>
            <router-view />
          </template>
          <template #fallback>
            <div class="loading-container">
              <div class="loading-spinner"></div>
              <p>Loading...</p>
            </div>
          </template>
        </Suspense>
      </div>
    </main>
    
    <footer class="app-footer">
      <div class="content-container">
        <p>&copy; 2025 IP Sprint Test Site. Built with Försäkringskassans Designsystem.</p>
        <p class="version">Version {{ appVersion }}</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Import theme styles */
@import '@/styles/theme.scss';

/* Global layout styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-main {
  flex: 1;
  padding: 0;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  font-family: var(--fk-font-family-base, 'Noto Sans', sans-serif);
}

.app-header {
  background-color: var(--color-primary-700);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-logo a {
  color: white;
  display: block;
  text-decoration: none;
}

.app-logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  border-bottom-color: white;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-neutral-200);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.app-footer {
  background-color: var(--color-primary-700);
  color: white;
  padding: 1.5rem 0;
  text-align: center;
  margin-top: auto;
}

.app-footer .version {
  font-size: 0.875rem;
  color: var(--color-neutral-400);
  margin-top: 0.5rem;
}

/* Layer 2: Content wrapper */
.content-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Layer 3: Responsive adjustments */
@media (max-width:768px) {
  .content-container {
    padding: 1rem 0.5rem;
  }
}

/* Mobile Responsive */
@media (max-width:768px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-primary-600);
    flex-direction: column;
    gap: 0;
    padding: 1rem;
    display: none;
  }
  
  .nav-links.mobile-open {
    display: flex;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
```

---

## Best Practices

### Folder Organization for Overrides

Organize your theme files in a logical structure:

```
src/
├── styles/
│   ├── theme.scss           # Main theme file (imports all others)
│   ├── _variables.scss      # Variable overrides
│   ├── _colors.scss         # Color system
│   ├── _typography.scss     # Typography system
│   ├── _branding.scss       # Brand-specific styles
│   └── components/          # Component-specific overrides
│       ├── _buttons.scss    # Button customizations
│       ├── _forms.scss      # Form customizations
│       └── _layout.scss     # Layout customizations
```

### Naming Conventions

Follow these naming conventions for consistency:

1. **SCSS Files**:
   - Use underscores for partials: `_variables.scss`
   - Use kebab-case for component files: `_form-controls.scss`

2. **CSS Classes**:
   - Prefix custom classes with your project name: `ip-header`
   - Use BEM methodology for component styles: `ip-card__title--highlighted`

3. **Vue Components**:
   - Use PascalCase for component names: `FormPage.vue`
   - Use descriptive names that indicate purpose: `ApplicationStatusCard.vue`

4. **TypeScript/JavaScript**:
   - Use camelCase for variables and functions: `const userName = ...`
   - Use PascalCase for types and interfaces: `interface UserData { ... }`

### Documentation Within the Project

⏱️ **Estimated time: 15 minutes**

Create comprehensive documentation:

```bash
# Create docs directory
mkdir docs
touch docs/THEME_CUSTOMIZATION.md
touch docs/COMPONENT_GUIDE.md
```

```markdown
<!-- docs/THEME_CUSTOMIZATION.md -->
# Theme Customization Guide

## Overview
This guide explains how to customize the theme layer for ip-sprint-test-site-01.

## Color System
Colors are defined in `src/styles/_colors.scss` using a structured approach:
- Primary colors: Used for main branding elements
- Secondary colors: Used for supporting elements
- Neutral colors: Used for text, backgrounds, and borders

## Typography
Typography is defined in `src/styles/_typography.scss`:
- Font families are defined as variables
- Font sizes follow a modular scale
- Line heights are optimized for readability

## Component Overrides
Component-specific overrides are in `src/styles/components/`:
- Each file targets specific FKUI components
- Use CSS custom properties for dynamic theming
- Avoid modifying FKUI core styles directly

## Adding New Customizations
1. Identify if the customization should be global or component-specific
2. Add variables to the appropriate file
3. Create CSS custom properties for dynamic values
4. Document the purpose and usage of the customization
```

### How to Check if Something Should Be Overridden or Inherited

Use this decision tree when considering customizations:

| Scenario | Action | Why |
|----------|--------|-----|
| Visual branding (colors, fonts) | Override in theme layer | Brand identity requirement |
| Component behavior | Extend, don't override | Maintain accessibility & UX |
| Layout structure | Create custom components | Preserve FKUI components |
| Accessibility features | Always inherit | Standards compliance |

### Common Pitfalls to Avoid

❌ **Don't: Modify FKUI source files directly**

```scss
// Bad - editing node_modules/@fkui/design/...
.fk-button { ... }
```

✅ **Do: Override in your theme layer**

```scss
// Good - in src/styles/components/_buttons.scss
.fk-button {
  // Your customizations
}
```

❌ **Don't: Import components without registering them**

```vue
<template>
  <FkButton>Click me</FkButton> <!-- Will fail if not registered -->
</template>
```

✅ **Do: Register components properly**

```typescript
// In src/plugins/fkui.ts or component file
import { FkButton } from '@fkui/vue'
app.component('FkButton', FkButton)
```

❌ **Don't: Use inline styles for theming**

```vue
<FkButton style="background-color: #3366cc">Click</FkButton>
```

✅ **Do: Use CSS custom properties**

```vue
<FkButton class="custom-button">Click</FkButton>
```

```scss
.custom-button {
  background-color: var(--color-primary-500);
}
```

---

## Testing & Running Locally

### Development Server Setup

⏱️ **Estimated time: 5 minutes**

Start the development server:

```bash
# Make sure you're in the project directory
cd ~/projects/ip-sprint-test-site-01

# Install dependencies (if you haven't already)
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173` (or another port if 5173 is unavailable).

**Accessing from Host Machine:**

```bash
# Get your VM's IP address
ip addr show

# Look for inet address under your network interface (usually ens33 or similar)
# Example: inet 192.168.1.100/24
```

Then access from your host machine's browser:

- `http://192.168.1.100:5173` (replace with your VM's IP)

💡 **Tip**: If you can't access from host machine, check your Ubuntu firewall:

```bash
# Check firewall status
sudo ufw status

# Allow port 5173 if firewall is active
sudo ufw allow 5173/tcp

# Alternative: temporarily disable firewall for testing
sudo ufw disable
```

### Ubuntu-Specific Development Tips

**Terminal Multiplexing:**

```bash
# Install and use tmux for multiple terminal sessions
sudo apt install tmux

# Start tmux session
tmux

# Split panes: Ctrl+b then "
# Switch between panes: Ctrl+b then arrow keys
```

**Process Management:**

```bash
# Run development server in background
npm run dev &

# View running Node processes
ps aux | grep node

# Kill process if needed
kill <process-id>

# Or use pkill
pkill -f "vite"
```

### How to Verify FKUI Integration

⏱️ **Estimated time: 10 minutes**

1. **Check Component Rendering**:
   - Open Firefox or Chrome on Ubuntu (`firefox` or `google-chrome` from terminal)
   - Press `F12` to open developer tools
   - Inspect FKUI elements to verify they have the correct classes
   - Verify that FKUI styles are being applied

2. **Verify Theme Overrides**:
   - Use the browser's computed styles panel to check your customizations
   - Ensure CSS custom properties are being applied correctly
   - Test responsive behavior at different screen sizes

3. **Test Component Functionality**:
   - Test all interactive elements (buttons, forms, navigation)
   - Verify form validation works correctly
   - Check that router navigation functions properly

### Testing Customizations

Create a dedicated test page to verify your theme:

```bash
# Create the ThemeTestView component
touch src/views/ThemeTestView.vue
```

```vue
<!-- src/views/ThemeTestView.vue -->
<script setup>
import { reactive } from 'vue'

// Define your color palette for testing
const colorPalette = reactive({
  primary: {
    50: '#e6f2ff',
    100: '#b3d9ff',
    500: '#3366cc',
    600: '#2952a3',
    900: '#0d1f40'
  },
  secondary: {
    50: '#f0f4ff',
    100: '#d9e3ff',
    500: '#6699ff',
    600: '#4d7acc',
    900: '#1a2e66'
  },
  neutral: {
    50: '#f8f9fa',
    100: '#e9ecef',
    500: '#6c757d',
    900: '#212529'
  }
})
</script>

<template>
  <div class="theme-test-view">
    <div class="content-container">
      <h1 class="fk-heading-1">Theme Test Page</h1>

      <!-- Color Tests -->
      <section class="test-section">
        <h2 class="fk-heading-2">Color System</h2>
        <div class="color-swatch-grid">
          <div v-for="(shades, colorName) in colorPalette" :key="colorName" class="color-group">
            <h3>{{ colorName }}</h3>
            <div v-for="(hex, shade) in shades" :key="shade" class="color-swatch">
              <div class="swatch" :style="{ backgroundColor: hex }"></div>
              <span>{{ shade }}: {{ hex }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography Tests -->
      <section class="test-section">
        <h2 class="fk-heading-2">Typography</h2>
        <p class="fk-text-small">Small text</p>
        <p>Normal text</p>
        <p class="fk-text-large">Large text</p>
        <h1 class="fk-heading-1">Heading 1</h1>
        <h2 class="fk-heading-2">Heading 2</h2>
        <h3 class="fk-heading-3">Heading 3</h3>
      </section>

      <!-- Component Tests -->
      <section class="test-section">
        <h2 class="fk-heading-2">Component Variations</h2>
        <div class="component-test-group">
          <h3>Buttons</h3>
          <FkButton variant="primary" class="fk-mr-2">Primary</FkButton>
          <FkButton variant="secondary" class="fk-mr-2">Secondary</FkButton>
          <FkButton variant="ghost" class="fk-mr-2">Ghost</FkButton>
        </div>

        <div class="component-test-group">
          <h3>Badges</h3>
          <FkBadge variant="success" class="fk-mr-2">Success</FkBadge>
          <FkBadge variant="warning" class="fk-mr-2">Warning</FkBadge>
          <FkBadge variant="error" class="fk-mr-2">Error</FkBadge>
        </div>

        <div class="component-test-group">
          <h3>Alerts</h3>
          <FkAlert variant="info" class="fk-mb-2">Info alert</FkAlert>
          <FkAlert variant="success" class="fk-mb-2">Success alert</FkAlert>
          <FkAlert variant="warning" class="fk-mb-2">Warning alert</FkAlert>
          <FkAlert variant="error" class="fk-mb-2">Error alert</FkAlert>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.theme-test-view {
  padding: 2rem 0;
}

.test-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-neutral-100);
}

.color-swatch-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.color-group {
  min-width: 200px;
}

.color-swatch {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.swatch {
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  border: 1px solid var(--color-neutral-300);
}

.component-test-group {
  margin-bottom: 1.5rem;
}

/* Container styles are now handled by .content-container in App.vue */
</style>
```

Add this test page to your router:

```typescript
// src/router/index.ts
{
  path: '/theme-test',
  name: 'theme-test',
  component: () => import('../views/ThemeTestView.vue')
}
```

---

## Performance & Optimization

⏱️ **Estimated time: 15 minutes**

### Lazy Loading Routes

Routes are already configured with lazy loading using dynamic imports:

```typescript
// src/router/index.ts - already implemented
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('../views/DashboardView.vue')
}
```

💡 **Tip**: This creates separate chunks for each route, improving initial load time.

### Optimize Images

```bash
# Install image optimization tool
sudo apt install imagemagick

# Optimize images in assets folder
cd src/assets
mogrify -resize 1200x1200\> -quality 85 *.jpg
mogrify -resize 1200x1200\> -quality 85 *.png

# Or use modern formats
mogrify -format webp *.jpg
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Update vite.config.ts
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  // ... rest of config
})
```

```bash
# Build and analyze
npm run build
# Opens visualization in browser
```

### Production Build Optimization

```bash
# Build for production with optimizations
npm run build

# Check build size
du -sh dist/

# Preview production build
npm run preview
```

---

## Security Considerations

⏱️ **Estimated time: 10 minutes**

### Input Sanitization

```bash
# Install DOMPurify for sanitizing user input
npm install dompurify
npm install -D @types/dompurify
```

```typescript
// src/utils/sanitize.ts
import DOMPurify from 'dompurify'

export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty)
}

// Usage in components
import { sanitizeHTML } from '@/utils/sanitize'

const cleanHTML = sanitizeHTML(userInput)
```

### Environment Variables

⚠️ **Security Best Practices:**

1. **Never commit `.env.local`**

   ```bash
   # Verify .env.local is in .gitignore
   cat .gitignore | grep .env.local
   ```

2. **Use different credentials for dev/prod**

   ```bash
   # .env.local (development)
   VITE_API_URL=http://localhost:3000/api

   # .env.production (production)
   VITE_API_URL=https://api.production.com
   ```

3. **Rotate API keys regularly**
   - Change API keys every 90 days
   - Use GitLab CI/CD variables for sensitive data

### Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically when possible
npm audit fix

# For breaking changes
npm audit fix --force

# View detailed vulnerability report
npm audit --json
```

### Content Security Policy

Add CSP headers to your deployment:

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;
               script-src 'self';">
```

---

## Accessibility

⏱️ **Estimated time: 15 minutes**

### Keyboard Navigation Testing

```bash
# Test checklist:
# - Tab through all interactive elements
# - Enter/Space to activate buttons
# - Arrow keys for navigation
# - Escape to close modals/dialogs
# - Focus indicators visible on all elements
```

### Screen Reader Testing

```bash
# Install Orca screen reader on Ubuntu
sudo apt install orca

# Start Orca
orca

# Or use command line
orca --replace
```

**Testing Checklist:**

- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Buttons have descriptive text
- [ ] Navigation landmarks are properly marked
- [ ] Skip to main content link exists

### Color Contrast

```bash
# Use browser dev tools to check contrast ratios
# Ensure WCAG AA compliance (4.5:1 for normal text)
```

**Add contrast checking to your theme:**

```scss
// src/styles/_accessibility.scss

// Ensure sufficient contrast
.fk-button {
  // Primary button - check contrast
  &.primary {
    background-color: var(--color-primary-500); // #3366cc
    color: white; // Contrast ratio: 7.37:1 ✓
  }
}

// High contrast mode
@media (prefers-contrast: high) {
  .fk-button {
    border: 2px solid currentColor;
  }
}

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ARIA Labels

Ensure proper ARIA labels in your components:

```vue
<template>
  <!-- Good: Has aria-label -->
  <button
    class="mobile-menu-toggle"
    @click="toggleMenu"
    aria-label="Toggle navigation menu"
    aria-expanded="false"
  >
    ☰
  </button>

  <!-- Good: Has aria-live for dynamic content -->
  <div aria-live="polite" aria-atomic="true">
    {{ statusMessage }}
  </div>

  <!-- Good: Descriptive link text -->
  <a href="/form" aria-label="Go to application form">
    Apply Now
  </a>
</template>
```

---

## Deployment Preparation

### Build Commands

⏱️ **Estimated time: 5 minutes**

Build your project for production:

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The build command creates optimized assets in the `dist` directory.

**Check build output:**

```bash
# View build output with sizes
du -sh dist/
tree dist/ -L 2

# Check for large files
find dist/ -type f -size +500k -exec ls -lh {} \;
```

⚠️ **Warning**: Always test your production build locally before deploying. The production build might behave differently from the development build.

### What Files to Commit to GitLab

Create a proper `.gitignore` file:

```bash
# Create/edit .gitignore
nano .gitignore
```

```gitignore
# .gitignore

# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build outputs
dist/
dist-ssr/
build/

# Environment variables
.env.local
.env.*.local

# IDE files
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
logs/
*.log

# Coverage directory
coverage/
*.lcov

# Temporary folders
tmp/
temp/
.cache/

# Ubuntu-specific
.directory

# Vite
.vite/
```

**Commit your changes:**

```bash
# Check status
git status

# Add all files (respecting .gitignore)
git add .

# Commit with descriptive message
git commit -m "feat: initial project setup with FKUI integration

- Setup Vue 3 with Vite and TypeScript
- Integrate FKUI design system
- Create theme layer with custom colors and typography
- Implement three pages: Home, Form, Dashboard
- Add responsive navigation
- Configure build and development environment"

# Push to GitLab
git push origin main
```

💡 **Tip**: Use conventional commit messages for better change tracking.

### Git Best Practices

```bash
# Create feature branches for new work
git checkout -b feature/add-user-profile

# After work is done
git add .
git commit -m "feat: add user profile page with FKUI components"

# Push feature branch
git push origin feature/add-user-profile

# Merge into main (via GitLab merge request recommended)
git checkout main
git merge feature/add-user-profile
git push origin main

# Delete feature branch
git branch -d feature/add-user-profile
git push origin --delete feature/add-user-profile
```

### Environment Variables for Deployment

Set up environment variables for different deployment stages:

```bash
# Create production environment file
touch .env.production
```

```bash
# .env.production
VITE_APP_TITLE=IP Sprint Test Site 01
VITE_APP_VERSION=1.0.0
VITE_FKUI_THEME=production
VITE_API_URL=https://api.yourdomain.com
```

### GitLab CI/CD Configuration

⏱️ **Estimated time: 20 minutes**

Create a `.gitlab-ci.yml` file for automated deployment:

```bash
# Create CI/CD configuration
touch .gitlab-ci.yml
```

```yaml
# .gitlab-ci.yml

stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: '18'

cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
    - .npm/

# Install dependencies
.install_deps: &install_deps
  - npm ci --cache .npm --prefer-offline

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - *install_deps
    - npm run lint
    # Add unit tests when available
    # - npm run test
  only:
    - merge_requests
    - main

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - *install_deps
    - npm run build
    - echo "Build completed successfully"
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main

deploy_staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh
  script:
    - echo "Deploying to staging server"
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - ssh-keyscan -H $STAGING_SERVER >> ~/.ssh/known_hosts
    - rsync -avz --delete dist/ $STAGING_USER@$STAGING_SERVER:$STAGING_PATH
  environment:
    name: staging
    url: https://staging.yourdomain.com
  only:
    - main
  when: manual

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh
  script:
    - echo "Deploying to production server"
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - ssh-keyscan -H $PROD_SERVER >> ~/.ssh/known_hosts
    - rsync -avz --delete dist/ $PROD_USER@$PROD_SERVER:$PROD_PATH
  environment:
    name: production
    url: https://yourdomain.com
  only:
    - main
  when: manual
```

**Configure GitLab CI/CD Variables:**

1. Go to GitLab Project → Settings → CI/CD → Variables
2. Add the following variables:
   - `SSH_PRIVATE_KEY` - Your deployment SSH key
   - `STAGING_SERVER` - Staging server hostname
   - `STAGING_USER` - Staging server username
   - `STAGING_PATH` - Path on staging server
   - `PROD_SERVER` - Production server hostname
   - `PROD_USER` - Production server username
   - `PROD_PATH` - Path on production server

---

## Troubleshooting Section

### HTML Structure and CSS Issues

#### 1. Duplicate ID Errors

**Problem**: "Duplicate ID 'app' found in the document" error in browser console

**Solution**: The duplicate ID error occurs when both the HTML template and CSS reference the same ID. We fixed this by changing the main container ID from "app" to "app-container".

**What was changed:**

- HTML: Changed `<div id="app">` to `<div id="app-container">`
- CSS: Updated selectors from `#app` to `#app-container`
- JavaScript: Updated the mount point in `src/main.ts` from `app.mount('#app')` to `app.mount('#app-container')`

**Why this matters:**

- HTML IDs must be unique within a document
- Duplicate IDs can cause JavaScript errors and CSS selector conflicts
- Search engines and accessibility tools may fail with duplicate IDs

#### 2. Content Centering Issues

**Problem**: Content not properly centered or responsive layout broken

**Solution**: Implement a three-layer CSS hierarchy for proper content centering:

```css
/* Layer 1: Main app container */
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Layer 2: Content wrapper */
.content-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Layer 3: Responsive adjustments */
@media (max-width: 768px) {
  .content-container {
    padding: 1rem 0.5rem;
  }
}
```

**CSS Hierarchy Explanation:**

1. **#app-container**: The root layout container that establishes the flex structure
2. **#app-container → .content-container**: Direct child for consistent max-width and centering
3. **Responsive breakpoints**: Mobile-first approach with consistent padding

#### 3. Removing Redundant Container Definitions

**Problem**: Multiple container definitions causing layout conflicts

**Solution**: Remove redundant `.container` classes from individual view components and use the centralized `.content-container` from App.vue instead.

**Before (problematic):**

```vue
<!-- In each view component -->
<div class="view-container">
  <!-- Content directly, no extra container -->
</div>
```

**After (correct):**

```vue
<!-- In each view component -->
<div class="view-container">
  <!-- Content directly, no extra container -->
</div>
```

**Benefits:**

- Consistent layout across all pages
- Reduced CSS specificity conflicts
- Better maintainability
- Improved responsive design consistency

#### 4. Improved Responsive Design with Consistent Breakpoints

**Problem**: Inconsistent responsive behavior across different screen sizes

**Solution**: Implement a unified breakpoint system with consistent mobile-first approach:

```css
/* Base responsive breakpoints */
/* Mobile-first approach with consistent scaling */
@media (max-width: 768px) {
  .content-container {
    padding: 1rem 0.5rem;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-primary-600);
    flex-direction: column;
    gap: 0;
    padding: 1rem;
    display: none;
  }
  
  .nav-links.mobile-open {
    display: flex;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}

/* Tablet and desktop styles inherit from base */
/* No need for additional breakpoints unless specifically required */
```

**Key Improvements:**

1. **Single breakpoint system**: Uses 768px as the primary mobile/desktop boundary
2. **Consistent padding**: Mobile padding (1rem 0.5rem) vs desktop (2rem 1rem)
3. **Unified navigation**: Mobile menu behavior consistent across all pages
4. **Predictable scaling**: Content scales smoothly between breakpoints

**Implementation Notes:**

- The `.content-container` class handles all responsive padding
- Navigation menu transforms from horizontal (desktop) to vertical (mobile)
- No conflicting media queries - single, clear breakpoint system

### Ubuntu-Specific Issues

#### 1. Permission Denied Errors

**Problem**: `EACCES: permission denied` when installing global packages

**Solution**: Use npm's recommended method to avoid sudo

```bash
# Create directory for global packages
mkdir ~/.npm-global

# Configure npm to use new directory
npm config set prefix '~/.npm-global'

# Add to PATH (add this to ~/.bashrc or ~/.profile)
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc

# Reload shell configuration
source ~/.bashrc

# Now install global packages without sudo
npm install -g yarn
```

#### 2. Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5173`

**Solution**: Find and kill the process using the port

```bash
# Find process using port 5173
sudo lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use fuser
sudo fuser -k 5173/tcp

# Or change the port in vite.config.ts
server: {
  port: 3000, // Use a different port
}
```

#### 3. File Watcher Limit Exceeded

**Problem**: `ENOSPC: System limit for number of file watchers reached`

**Solution**: Increase the file watcher limit

```bash
# Check current limit
cat /proc/sys/fs/inotify/max_user_watches

# Increase limit temporarily
sudo sysctl -w fs.inotify.max_user_watches=524288

# Make it permanent
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### 4. VMware Shared Folders Issues

**Problem**: Slow performance or file watching not working in shared folders

**Solution**: Clone project to VM's local disk instead of shared folder

```bash
# Clone to home directory instead
cd ~
mkdir projects
cd projects
git clone https://gitlab.com/your-username/ip-sprint-test-site-01.git
```

### Common Errors for Vue Beginners

#### 1. "Module not found" Error

**Problem**: Import paths are incorrect

**Solution**: Check that file paths are correct and use the `@` alias for src directory

```typescript
// Bad
import MyComponent from '../../../components/MyComponent.vue'

// Good
import MyComponent from '@/components/MyComponent.vue'
```

```bash
# Verify file exists
ls -l src/components/MyComponent.vue
```

#### 2. "Component not registered" Error

**Problem**: Component not properly registered

**Solution**: Ensure component is registered in the FKUI plugin or imported locally

```typescript
// Global registration (in src/plugins/fkui.ts)
import { FkButton } from '@fkui/vue'
app.component('FkButton', FkButton)

// Local registration
<script setup>
import { FkButton } from '@fkui/vue'
</script>
```

#### 3. "Props mutation" Warning

**Problem**: Attempting to modify props directly

**Solution**: Use reactive copies or emit events

```vue
<script setup>
import { ref } from 'vue'

const props = defineProps<{
  initialValue: string
}>()

// Create a local copy
const localValue = ref(props.initialValue)

// Or emit changes to parent
const emit = defineEmits(['update:modelValue'])
</script>
```

### FKUI-Specific Issues

#### 1. FKUI Components Not Rendering

**Problem**: FKUI styles not being applied

**Solution**: Ensure you're importing FKUI theme correctly

```typescript
// src/main.ts
import '@fkui/theme-default'
```

**Debug steps:**

```bash
# Check if FKUI packages are installed
npm list @fkui/vue @fkui/theme-default @fkui/design @fkui/date @fkui/logic

# Verify all packages are same version
npm list @fkui

# Clear cache and reinstall if versions mismatch
rm -rf node_modules package-lock.json
npm install
```

#### 2. Theme Overrides Not Working

**Problem**: Custom styles being overridden by FKUI

**Solution**: Ensure proper CSS specificity and import order

```scss
// src/styles/theme.scss

// Import FKUI first
@use "@fkui/theme-default";

// Then your overrides
.fk-button {
  // Your custom styles
  background-color: var(--color-primary-500);
}
```

#### 3. Component Variants Not Available

**Problem**: Using a variant that doesn't exist in the current FKUI version

**Solution**: Check the FKUI documentation for available variants

```bash
# Check FKUI documentation
# https://forsakringskassan.github.io/designsystem/components.html
```

### Dependency Conflicts

#### 1. Vue Version Mismatch

**Problem**: FKUI requires a different Vue version than what's installed

**Solution**: Check FKUI's package.json for compatible Vue versions

```bash
# Check installed Vue version
npm list vue

# Check FKUI peer dependencies
npm info @fkui/vue peerDependencies

# Install compatible version
npm install vue@3.5.24
```

#### 2. CSS Preprocessor Issues

**Problem**: Sass/SCSS compilation errors

**Solution**: Ensure compatible versions

```bash
# Install sass-embedded (recommended for Vite)
npm install -D sass-embedded

# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

#### 3. Build Failures on Ubuntu

**Problem**: Native module compilation fails

**Solution**: Install build tools

```bash
# Install required build tools
sudo apt update
sudo apt install -y build-essential python3

# Rebuild native modules
npm rebuild

# If still failing, clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debugging Tips for Ubuntu

```bash
# Monitor logs in real-time
npm run dev 2>&1 | tee debug.log

# Check Node.js and npm versions
node --version
npm --version

# Clear all caches
npm cache clean --force
rm -rf node_modules package-lock.json
rm -rf ~/.npm
npm install

# Run with verbose logging
npm run dev --verbose

# Check system resources
free -h  # Memory
df -h    # Disk space
htop     # CPU and processes (install with: sudo apt install htop)
```

### Known Issues & Workarounds

#### Issue: FKUI Component X doesn't render

**Cause**: Version mismatch between @fkui packages

**Solution**: Ensure all @fkui packages use the same version

```bash
# Check versions
npm list @fkui

# Update all to same version
npm install @fkui/vue@6.26.0 @fkui/design@6.26.0 @fkui/date@6.26.0 @fkui/logic@6.26.0 @fkui/theme-default@6.26.0
```

#### Issue: TypeScript errors in FKUI imports

**Cause**: Missing type definitions

**Solution**: Use the type definitions file we created

```typescript
// Verify src/types/fkui.d.ts exists
// If not, create it with component declarations
```

### Where to Find Help

1. **FKUI Documentation**
   - [Official FKUI Documentation](https://forsakringskassan.github.io/designsystem/)
   - [FKUI GitHub Issues](https://github.com/Forsakringskassan/designsystem/issues)

2. **Vue.js Resources**
   - [Vue.js Official Documentation](https://vuejs.org/guide/)
   - [Vue.js Discord Community](https://discord.com/invite/vue)

3. **Ubuntu Community**
   - [Ubuntu Forums](https://ubuntuforums.org/)
   - [Ask Ubuntu](https://askubuntu.com/)
   - [Ubuntu Discourse](https://discourse.ubuntu.com/)

4. **GitLab Issues**
   - Create an issue in your GitLab repository for project-specific problems
   - Include error messages, steps to reproduce, and expected behavior

5. **Stack Overflow**
   - Search with tags: `vue.js`, `vite`, `ubuntu`, `scss`
   - Include relevant code snippets and error messages

---

## Next Steps & Resources

### How to Add More Customizations

⏱️ **Estimated time: varies by feature**

#### 1. Adding New Pages

```bash
# Create new page component
touch src/views/AboutView.vue

# Add route in src/router/index.ts
{
  path: '/about',
  name: 'about',
  component: () => import('../views/AboutView.vue')
}

# Add navigation link in App.vue
<router-link to="/about" class="nav-link">About</router-link>
```

#### 2. Extending Components

```bash
# Create custom component
mkdir -p src/components
touch src/components/CustomButton.vue
```

```vue
<!-- src/components/CustomButton.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'custom'
  size?: 'small' | 'medium' | 'large'
}>()

const buttonClass = computed(() => {
  return {
    [`fk-button--${props.variant}`]: props.variant,
    [`fk-button--${props.size}`]: props.size,
    'custom-button': true
  }
})
</script>

<template>
  <FkButton :class="buttonClass">
    <slot></slot>
  </FkButton>
</template>

<style scoped>
.custom-button {
  /* Your custom styles */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
</style>
```

#### 3. Adding New Theme Variables

```scss
// src/styles/_variables.scss

// Add new custom variables
$border-radius-small: 4px;
$border-radius-medium: 6px;
$border-radius-large: 8px;

$shadow-small: 0 2px 4px rgba(0, 0, 0, 0.1);
$shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-large: 0 8px 16px rgba(0, 0, 0, 0.1);

// Convert to CSS custom properties
:root {
  --border-radius-small: #{$border-radius-small};
  --border-radius-medium: #{$border-radius-medium};
  --border-radius-large: #{$border-radius-large};

  --shadow-small: #{$shadow-small};
  --shadow-medium: #{$shadow-medium};
  --shadow-large: #{$shadow-large};
}
```

### FKUI Documentation Links

1. **Main Documentation**
   - [FKUI Getting Started Guide](https://forsakringskassan.github.io/designsystem/getting-started.html)
   - [Component Library](https://forsakringskassan.github.io/designsystem/components.html)
   - [Design Tokens](https://forsakringskassan.github.io/designsystem/design-tokens.html)

2. **GitHub Repositories**
   - [Main Design System](https://github.com/Forsakringskassan/designsystem)
   - [User Template](https://github.com/Forsakringskassan/designsystem-user-lib)
   - [Issue Tracker](https://github.com/Forsakringskassan/designsystem/issues)

### Vue.js Learning Resources

1. **Official Documentation**
   - [Vue.js Guide](https://vuejs.org/guide/introduction.html)
   - [Vue.js API Reference](https://vuejs.org/api/)
   - [Vue.js Style Guide](https://vuejs.org/style-guide/)

2. **Community Resources**
   - [Vue.js News](https://news.vuejs.org/)
   - [Awesome Vue](https://github.com/vuejs/awesome-vue)
   - [Vue School](https://vueschool.io/) (Paid courses)

3. **YouTube Channels**
   - [Vue Mastery](https://www.youtube.com/@VueMastery)
   - [Program With Erik](https://www.youtube.com/@ProgramWithErik)

### Advanced Topics to Explore

#### 1. State Management with Pinia

```bash
npm install pinia
```

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')

  function setUser(userData: { name: string; email: string }) {
    name.value = userData.name
    email.value = userData.email
  }

  return { name, email, setUser }
})
```

#### 2. Testing Vue Applications

```bash
# Install Vitest and Vue Test Utils
npm install -D vitest @vue/test-utils happy-dom

# Add test script to package.json
"scripts": {
  "test": "vitest"
}
```

#### 3. Progressive Web App (PWA) Features

```bash
# Install Vite PWA plugin
npm install -D vite-plugin-pwa
```

#### 4. Internationalization (i18n)

```bash
# Install Vue I18n
npm install vue-i18n@9
```

#### 5. API Integration

```bash
# Install Axios for API calls
npm install axios

# Create API service
mkdir src/services
touch src/services/api.ts
```

```typescript
// src/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
```

### Ubuntu Development Productivity Tips

```bash
# Create useful aliases (add to ~/.bashrc)
cat << 'EOF' >> ~/.bashrc

# Development aliases
alias dev="npm run dev"
alias build="npm run build"
alias preview="npm run preview"

# Git aliases
alias gst="git status"
alias gco="git checkout"
alias gcm="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph --decorate"

# Navigation
alias projects="cd ~/projects"
alias ip-sprint="cd ~/projects/ip-sprint-test-site-01"
EOF

# Reload bashrc
source ~/.bashrc

# Install useful development tools
sudo apt install -y \
  htop \
  ncdu \
  tldr \
  bat \
  ripgrep \
  fd-find

# Optional: Better terminal with oh-my-zsh
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

---

## Conclusion

This guide provides a comprehensive foundation for building a Vue.js application using Försäkringskassans Designsystem (FKUI) on **Ubuntu running in VMware**. By following the theme layer approach, you can create a customized application while maintaining the benefits of a robust design system.

### Key Principles to Remember

1. **Inherit before you override** - Leverage FKUI's functionality whenever possible
2. **Document your customizations** - Make it easy for future developers to understand your changes
3. **Test thoroughly** - Ensure your customizations work across different browsers and devices
4. **Stay updated** - Keep FKUI dependencies current to benefit from improvements and security updates
5. **Use Ubuntu best practices** - Take advantage of the Linux environment for efficient development
6. **Prioritize accessibility** - Ensure your application is usable by everyone
7. **Security first** - Always sanitize inputs and follow security best practices

### Quick Reference Commands

```bash
# Development
cd ~/projects/ip-sprint-test-site-01
npm run dev                    # Start development server
npm run build                  # Build for production
npm run preview                # Preview production build
npm run lint                   # Run linter

# Git workflow
git status                     # Check status
git add .                      # Stage all changes
git commit -m "Your message"   # Commit changes
git push                       # Push to remote

# Troubleshooting
npm audit                      # Check for vulnerabilities
npm audit fix                  # Fix vulnerabilities
rm -rf node_modules package-lock.json && npm install  # Clean reinstall

# System
ip addr show                   # Check VM IP address
sudo ufw allow 5173/tcp        # Allow dev server through firewall
pkill -f "vite"                # Kill development server
free -h                        # Check memory
df -h                          # Check disk space
```

### Project Structure Overview

```
ip-sprint-test-site-01/
├── src/
│   ├── assets/                # Images, fonts, etc.
│   ├── components/            # Reusable components
│   ├── plugins/               # Vue plugins (FKUI registration)
│   ├── router/                # Vue Router configuration
│   ├── styles/                # Theme and custom styles
│   │   ├── theme.scss         # Main theme file
│   │   ├── _variables.scss    # Variable overrides
│   │   ├── _colors.scss       # Color system
│   │   ├── _typography.scss   # Typography
│   │   └── components/        # Component overrides
│   ├── types/                 # TypeScript definitions
│   ├── views/                 # Page components
│   ├── App.vue                # Root component
│   └── main.ts                # Application entry
├── public/                    # Static assets
├── docs/                      # Project documentation
├── .env                       # Environment variables
├── .env.local                 # Local environment (not committed)
├── .gitignore                 # Git ignore file
├── .gitlab-ci.yml             # CI/CD configuration
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
└── tsconfig.json              # TypeScript configuration
```

### Getting Help

If you encounter issues:

1. Check the [Troubleshooting Section](#troubleshooting-section)
2. Review FKUI documentation
3. Search for similar issues on Stack Overflow
4. Create an issue in your GitLab repository
5. Ask in the Vue.js Discord community

### Next Workshop Steps

- [ ] Complete the three-page site
- [ ] Customize the theme to match your branding
- [ ] Add form validation and error handling
- [ ] Implement accessibility best practices
- [ ] Set up CI/CD pipeline
- [ ] Deploy to staging environment
- [ ] Conduct user testing
- [ ] Deploy to production

**Happy FKUI coding! 🚀**

---

## Appendix: Useful Bash Scripts

### Development Setup Script

```bash
#!/bin/bash
# setup-dev.sh - Quick development environment setup

echo "Setting up IP Sprint Test Site development environment..."

# Check Node.js version
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"

# Install dependencies
echo "Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cat > .env.local << EOF
VITE_API_URL=http://localhost:3000/api
VITE_DEBUG=true
EOF
fi

# Check for FKUI version consistency
echo "Checking FKUI package versions..."
npm list @fkui

echo "Setup complete! Run 'npm run dev' to start development server."
```

### Deployment Check Script

```bash
#!/bin/bash
# pre-deploy-check.sh - Run checks before deployment

echo "Running pre-deployment checks..."

# Run linter
echo "Running linter..."
npm run lint

# Check for vulnerabilities
echo "Checking for security vulnerabilities..."
npm audit

# Build the project
echo "Building project..."
npm run build

# Check build size
echo "Build size:"
du -sh dist/

echo "Pre-deployment checks complete!"
```

Make scripts executable:

```bash
chmod +x setup-dev.sh pre-deploy-check.sh
```

---

**Document Version**: 2.0
**Last Updated**: November 2025
**Author**: Workshop Team
**License**: MIT
