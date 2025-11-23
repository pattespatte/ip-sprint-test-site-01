<!-- src/views/FormView.vue -->
<script setup>
import { reactive, ref } from 'vue'
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
    errors.firstName = 'Förnamn är obligatoriskt'
    isValid = false
  }
  
  if (!formData.lastName.trim()) {
    errors.lastName = 'Efternamn är obligatoriskt'
    isValid = false
  }
  
  if (!formData.email.trim()) {
    errors.email = 'E-post är obligatoriskt'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'E-post är ogiltig'
    isValid = false
  }
  
  if (!formData.contactMethod) {
    errors.contactMethod = 'Välj en kontaktmetod'
    isValid = false
  }
  
  if (!formData.agreedToTerms) {
    errors.agreedToTerms = 'Du måste godkänna villkoren'
    isValid = false
  }
  
  
  return isValid;
}

const handleSubmit = async (event) => {
  event.preventDefault()
  
  console.log('Form submit triggered')
  
  if (!validateForm()) {
    console.log('Validation failed, submission prevented')
    
    // Find the first field with an error and focus it
    const firstErrorField = Object.keys(errors).find(key => errors[key])
    if (firstErrorField) {
      const element = document.querySelector(`#${firstErrorField}`)
      if (element) {
        // Focus the element
        element.focus()
        
        // Scroll to the element with smooth behavior
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        
        console.log(`Focused and scrolled to first error field: ${firstErrorField}`)
      }
    }
    
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
    <nav class="breadcrumb fk-mb-4">
        <router-link to="/">Hem</router-link>
        <span class="separator">/</span>
        <span>Formulär</span>
      </nav>
      
      <h1 class="fk-heading-1 fk-mb-4">Ansökningsformulär</h1>
      <p class="fk-text-large fk-mb-6">
        Fyll i detta formulär för att demonstrera FKUI-formulärskomponenter.
      </p>
      
      <form @submit="handleSubmit" class="application-form" novalidate>
        <!-- Personal Information Section -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Personinformation</legend>
          
          <FFieldset>
            <FLabel for="firstName">Förnamn *</FLabel>
            <FTextField
              id="firstName"
              v-model="formData.firstName"
              type="text"
              :class="{ 'error': errors.firstName }"
              required
            />
            <div v-if="errors.firstName" class="error-message" role="alert">
              {{ errors.firstName }}
            </div>
          </FFieldset>
          
          <FFieldset>
            <FLabel for="lastName">Efternamn *</FLabel>
            <FTextField
              id="lastName"
              v-model="formData.lastName"
              type="text"
              :class="{ 'error': errors.lastName }"
              required
            />
            <div v-if="errors.lastName" class="error-message" role="alert">
              {{ errors.lastName }}
            </div>
          </FFieldset>
          
          <FFieldset>
            <FLabel for="email">E-postadress *</FLabel>
            <FTextField
              id="email"
              v-model="formData.email"
              type="email"
              :class="{ 'error': errors.email }"
              required
            />
            <div v-if="errors.email" class="error-message" role="alert">
              {{ errors.email }}
            </div>
          </FFieldset>
          
          <FFieldset>
            <FLabel for="phone">Telefonnummer</FLabel>
            <FTextField
              id="phone"
              v-model="formData.phone"
              type="tel"
            />
          </FFieldset>
        </fieldset>
        
        <!-- Preferences Section -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Preferenser</legend>
          
          <FFieldset>
            <FLabel for="contactMethod">Önskad kontaktmetod *</FLabel>
            <FSelectField
              id="contactMethod"
              v-model="formData.contactMethod"
              :class="{ 'error': errors.contactMethod }"
              required
            >
              <option value="">Välj</option>
              <option value="email">E-post</option>
              <option value="phone">Telefon</option>
              <option value="mail">Post</option>
            </FSelectField>
            <div v-if="errors.contactMethod" class="error-message" role="alert">
              {{ errors.contactMethod }}
            </div>
          </FFieldset>
          
          <FFieldset>
            <FLabel>Aviseringspreferenser</FLabel>
            <FCheckboxField v-model="formData.notifications" value="updates">Produktuppdateringar</FCheckboxField>
            <FCheckboxField v-model="formData.notifications" value="newsletter">Nyhetsbrev</FCheckboxField>
            <FCheckboxField v-model="formData.notifications" value="promotions">Erbjudanden</FCheckboxField>
          </FFieldset>
          
          <FFieldset>
            <FLabel for="comments">Ytterligare kommentarer</FLabel>
            <FTextareaField
              id="comments"
              v-model="formData.comments"
              rows="4"
            />
          </FFieldset>
        </fieldset>
        
        <!-- Agreement Section -->
        <fieldset class="form-section">
          <FFieldset>
            <FCheckboxField
              v-model="formData.agreedToTerms"
              value="terms"
              :class="{ 'error': errors.agreedToTerms }"
              required
            >
              Jag godkänner villkoren och bestämmelserna *
            </FCheckboxField>
            <div v-if="errors.agreedToTerms" class="error-message" role="alert">
              {{ errors.agreedToTerms }}
            </div>
          </FFieldset>
        </fieldset>
        
        <!-- Form Actions -->
        <div class="form-actions">
          <FButton variant="secondary" type="button" @click="resetForm">
            Återställ
          </FButton>
          <FButton variant="primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Skickar...' : 'Skicka ansökan' }}
          </FButton>
        </div>
      </form>
      
      <!-- Success Message -->
      <FMessageBox
        v-if="showSuccessMessage"
        variant="success"
        class="fk-mt-6"
        dismissible
        @close="showSuccessMessage = false"
      >
        <strong>Lyckades!</strong> Din ansökan har skickats framgångsrikt.
      </FMessageBox>
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

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
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
  content: "⚠️ Fel: ";
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

/* Target the parent containers for better visual feedback */
.text-field.error,
.select-field.error,
.checkbox-field.error {
  /* Style the entire field container when in error state */
}

/* Focus styles for error fields */
.text-field__input.error:focus,
.select-field__select.error:focus,
.checkbox-field__input.error:focus {
  outline: 2px solid #d32f2f;
  outline-offset: 2px;
  border-color: #d32f2f;
}

/* Also target the wrapper elements for better error visibility */
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-view {
    padding: 1rem 0;
  }
  
  .application-form {
    max-width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>