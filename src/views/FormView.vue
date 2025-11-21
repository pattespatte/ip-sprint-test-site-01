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
  
  if (!formData.firstName) {
    errors.firstName = 'First name is required'
    isValid = false
  }
  
  if (!formData.lastName) {
    errors.lastName = 'Last name is required'
    isValid = false
  }
  
  if (!formData.email) {
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
  
  if (!validateForm()) return
  
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
      
      <form @submit="handleSubmit" class="application-form">
        <!-- Personal Information Section -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Personal Information</legend>
          
          <FkFormGroup>
            <FkLabel for="firstName">First Name *</FkLabel>
            <FkInput
              id="firstName"
              v-model="formData.firstName"
              type="text"
              :class="{ 'error': errors.firstName }"
            />
            <FkErrorMessage v-if="errors.firstName">
              {{ errors.firstName }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="lastName">Last Name *</FkLabel>
            <FkInput
              id="lastName"
              v-model="formData.lastName"
              type="text"
              :class="{ 'error': errors.lastName }"
            />
            <FkErrorMessage v-if="errors.lastName">
              {{ errors.lastName }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="email">Email Address *</FkLabel>
            <FkInput
              id="email"
              v-model="formData.email"
              type="email"
              :class="{ 'error': errors.email }"
            />
            <FkErrorMessage v-if="errors.email">
              {{ errors.email }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="phone">Phone Number</FkLabel>
            <FkInput
              id="phone"
              v-model="formData.phone"
              type="tel"
            />
          </FkFormGroup>
        </fieldset>
        
        <!-- Preferences Section -->
        <fieldset class="form-section">
          <legend class="fk-heading-2">Preferences</legend>
          
          <FkFormGroup>
            <FkLabel for="contactMethod">Preferred Contact Method *</FkLabel>
            <FkSelect
              id="contactMethod"
              v-model="formData.contactMethod"
              :class="{ 'error': errors.contactMethod }"
            >
              <option value="">Please select</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="mail">Mail</option>
            </FkSelect>
            <FkErrorMessage v-if="errors.contactMethod">
              {{ errors.contactMethod }}
            </FkErrorMessage>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel>Notification Preferences</FkLabel>
            <FkCheckboxGroup v-model="formData.notifications">
              <FkCheckbox value="updates">Product updates</FkCheckbox>
              <FkCheckbox value="newsletter">Newsletter</FkCheckbox>
              <FkCheckbox value="promotions">Promotions</FkCheckbox>
            </FkCheckboxGroup>
          </FkFormGroup>
          
          <FkFormGroup>
            <FkLabel for="comments">Additional Comments</FkLabel>
            <FkTextarea
              id="comments"
              v-model="formData.comments"
              rows="4"
            />
          </FkFormGroup>
        </fieldset>
        
        <!-- Agreement Section -->
        <fieldset class="form-section">
          <FkFormGroup>
            <FkCheckbox v-model="formData.agreedToTerms">
              I agree to the terms and conditions *
            </FkCheckbox>
            <FkErrorMessage v-if="errors.agreedToTerms">
              {{ errors.agreedToTerms }}
            </FkErrorMessage>
          </FkFormGroup>
        </fieldset>
        
        <!-- Form Actions -->
        <div class="form-actions">
          <FkButton variant="secondary" type="button" @click="resetForm">
            Reset
          </FkButton>
          <FkButton variant="primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
          </FkButton>
        </div>
      </form>
      
      <!-- Success Message -->
      <FkAlert
        v-if="showSuccessMessage"
        variant="success"
        class="fk-mt-6"
        dismissible
        @close="showSuccessMessage = false"
      >
        <strong>Success!</strong> Your application has been submitted successfully.
      </FkAlert>
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
</style>