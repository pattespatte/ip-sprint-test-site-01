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
        <h1 class="fk-heading-1">Välkommen till IP Sprint Test Site</h1>
        <p class="fk-text-large fk-mb-4">
          Detta är en demonstrationswebbplats byggd med Försäkringskassans Designsystem (FKUI).
        </p>
        <FButton variant="primary" size="large" @click="navigateToForm" class="button button--primary button--medium">
          Kom igång
        </FButton>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="fk-heading-2 fk-mb-4">Funktioner</h2>
        <div class="feature-grid">
          <FCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">✓</div>
              <h3 class="fk-heading-3">Lätt att använda</h3>
              <p>Byggd med FKUI-komponenter för konsekvens och tillgänglighet.</p>
            </div>
          </FCard>
          <FCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">⚙</div>
              <h3 class="fk-heading-3">Anpassningsbar</h3>
              <p>Temalager möjliggör enkel varumärkesanpassning och anpassning.</p>
            </div>
          </FCard>
          <FCard class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">🛡</div>
              <h3 class="fk-heading-3">Säker</h3>
              <p>Följer svenska statliga säkerhets- och tillgänglighetsstandarder.</p>
            </div>
          </FCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2 class="fk-heading-2">Redo att prova vårt formulär?</h2>
        <FButton variant="secondary" @click="navigateToForm">
          Prova formulärdemo
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