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
    errors.agreedToTerms = 'You must agree to the terms'
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
    <div class="container">
      <nav class="breadcrumb fk-mb-4">
        <router-link to="/">Home</router-link>
        <span class="separator">/</span>
        <span>Form</span>
      </nav>
      
      <h1 class="fk-heading-1 fk-mb-4">Application Form</h1>
      <p class="fk-text-large fk-mb-6">
        Please fill out this form to demonstrate FKUI form components.
      </p>
      
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
              required
            />
            <div v-if="errors.firstName" class="error-message" role="alert">
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
              required
            />
            <div v-if="errors.lastName" class="error-message" role="alert">
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
              required
            />
            <div v-if="errors.email" class="error-message" role="alert">
              {{ errors.email }}
            </div>
          </FFieldset>
          
          <FFieldset>
            <FLabel for="phone">Phone Number</FLabel>
            <FTextField
              id="phone"
              v-model="formData.phone"
              type="tel"
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
              required
            >
              <option value="">Please select</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="mail">Mail</option>
            </FSelectField>
            <div v-if="errors.contactMethod" class="error-message" role="alert">
              {{ errors.contactMethod }}
            </div>
          </FFieldset>
          
          <FFieldset>
            <FLabel>Notification Preferences</FLabel>
            <FCheckboxField v-model="formData.notifications" value="updates">Product updates</FCheckboxField>
            <FCheckboxField v-model="formData.notifications" value="newsletter">Newsletter</FCheckboxField>
            <FCheckboxField v-model="formData.notifications" value="promotions">Promotions</FCheckboxField>
          </FFieldset>
          
          <FFieldset>
            <FLabel for="comments">Additional Comments</FLabel>
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
              I agree to the terms and conditions *
            </FCheckboxField>
            <div v-if="errors.agreedToTerms" class="error-message" role="alert">
              {{ errors.agreedToTerms }}
            </div>
          </FFieldset>
        </fieldset>
        
        <!-- Form Actions -->
        <div class="form-actions">
          <FButton variant="secondary" type="button" @click="resetForm">
            Reset
          </FButton>
          <FButton variant="primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
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

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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
</style>