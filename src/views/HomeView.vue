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
      <div class="container">
        <h1 class="fk-heading-1">Welcome to IP Sprint Test Site</h1>
        <p class="fk-text-large fk-mb-4">
          This is a demonstration site built with Försäkringskassans Designsystem (FKUI).
        </p>
        <FkButton variant="primary" size="large" @click="navigateToForm" class="button button--primary button--medium">
          Get Started
        </FkButton>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="fk-heading-2 fk-mb-4">Features</h2>
        <div class="feature-grid">
          <FkCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">✓</div>
              <h3 class="fk-heading-3">Easy to Use</h3>
              <p>Built with FKUI components for consistency and accessibility.</p>
            </div>
          </FkCard>
          <FkCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">⚙</div>
              <h3 class="fk-heading-3">Customizable</h3>
              <p>Theme layer allows for easy branding and customization.</p>
            </div>
          </FkCard>
          <FkCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">🛡</div>
              <h3 class="fk-heading-3">Secure</h3>
              <p>Follows Swedish government security and accessibility standards.</p>
            </div>
          </FkCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2 class="fk-heading-2">Ready to try our form?</h2>
        <FkButton variant="secondary" @click="navigateToForm">
          Try the Form Demo
        </FkButton>
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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