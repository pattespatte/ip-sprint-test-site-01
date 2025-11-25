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
            aria-label="Växla navigeringsmeny"
          >
            ☰
          </button>
          
          <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
            <li>
              <router-link to="/" class="nav-link" @click="mobileMenuOpen = false">
                Hem
              </router-link>
            </li>
            <li>
              <router-link to="/form" class="nav-link" @click="mobileMenuOpen = false">
                Formulär
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
              <p>Laddar...</p>
            </div>
          </template>
        </Suspense>
      </div>
    </main>
    
    <footer class="app-footer">
      <div class="content-container">
        <p>&copy; 2025 IP Sprint Test Site. Byggd med Försäkringskassans Designsystem.</p>
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

.container {
  margin: 0 auto;
  padding: 0 1rem;
}

.content-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .content-container {
    padding: 1rem 0.5rem;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
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