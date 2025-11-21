<!-- src/views/DashboardView.vue -->
<script setup>
import { reactive, ref, onMounted } from 'vue'

const stats = reactive({
  applications: 12,
  pending: 3,
  approved: 7,
  needsAction: 2
})

const applications = ref([
  {
    id: 'APP-001',
    name: 'John Doe',
    type: 'Benefits',
    date: '2025-11-15',
    status: 'Approved'
  },
  {
    id: 'APP-002',
    name: 'Jane Smith',
    type: 'Healthcare',
    date: '2025-11-14',
    status: 'Pending'
  },
  {
    id: 'APP-003',
    name: 'Bob Johnson',
    type: 'Benefits',
    date: '2025-11-13',
    status: 'Needs Action'
  },
  {
    id: 'APP-004',
    name: 'Alice Brown',
    type: 'Pension',
    date: '2025-11-12',
    status: 'Approved'
  }
])

const activities = ref([
  {
    id: 1,
    title: 'Application Approved',
    description: 'Application APP-001 has been approved.',
    timestamp: '2025-11-15T14:30:00Z',
    type: 'success'
  },
  {
    id: 2,
    title: 'Document Uploaded',
    description: 'New document uploaded for application APP-002.',
    timestamp: '2025-11-15T10:15:00Z',
    type: 'info'
  },
  {
    id: 3,
    title: 'Action Required',
    description: 'Additional information needed for application APP-003.',
    timestamp: '2025-11-14T16:45:00Z',
    type: 'warning'
  }
])

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const getStatusVariant = (status) => {
  switch (status) {
    case 'Approved': return 'success'
    case 'Pending': return 'info'
    case 'Needs Action': return 'warning'
    default: return 'neutral'
  }
}

const viewDetails = (id) => {
  // In a real application, this would navigate to a details page
  alert(`Viewing details for application ${id}`)
}

onMounted(() => {
  // In a real application, you would fetch data from an API
  console.log('Dashboard loaded')
})
</script>

<template>
  <div class="dashboard-view">
    <div class="container">
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
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">📄</div>
            <h3 class="fk-heading-4">Applications</h3>
            <p class="fk-text-large">{{ stats.applications }}</p>
          </div>
        </FkCard>
        
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">🕐</div>
            <h3 class="fk-heading-4">Pending</h3>
            <p class="fk-text-large">{{ stats.pending }}</p>
          </div>
        </FkCard>
        
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">✓</div>
            <h3 class="fk-heading-4">Approved</h3>
            <p class="fk-text-large">{{ stats.approved }}</p>
          </div>
        </FkCard>
        
        <FkCard class="status-card">
          <div class="status-card-content">
            <div class="status-icon">⚠</div>
            <h3 class="fk-heading-4">Need Action</h3>
            <p class="fk-text-large">{{ stats.needsAction }}</p>
          </div>
        </FkCard>
      </div>
      
      <!-- Recent Applications Table -->
      <FkCard class="fk-mb-6">
        <div class="card-header">
          <h2 class="fk-heading-2">Recent Applications</h2>
        </div>
        
        <div class="table-wrapper">
          <FDataTable :items="applications">
            <FTableColumn id="id" title="ID" />
            <FTableColumn id="name" title="Name" />
            <FTableColumn id="type" title="Type" />
            <FTableColumn id="date" title="Date">
              <template #default="item">
                {{ formatDate(item.date) }}
              </template>
            </FTableColumn>
            <FTableColumn id="status" title="Status">
              <template #default="{ item }">
                <FkBadge :variant="getStatusVariant(item.status)">
                  {{ item.status }}
                </FkBadge>
              </template>
            </FTableColumn>
            <FTableColumn id="actions" title="Actions">
              <template #default="{ item }">
                <FkButton
                  variant="ghost"
                  size="small"
                  @click="viewDetails(item.id)"
                >
                  View
                </FkButton>
              </template>
            </FTableColumn>
          </FDataTable>
        </div>
      </FkCard>
      
      <!-- Activity Timeline -->
      <FkCard class="fk-mb-6">
        <div class="card-header">
          <h2 class="fk-heading-2">Recent Activity</h2>
        </div>
        
        <div class="activity-list">
          <div 
            v-for="activity in activities" 
            :key="activity.id" 
            class="activity-item"
          >
            <div class="activity-icon" :class="`activity-${activity.type}`">
              {{ activity.type === 'success' ? '✓' : activity.type === 'warning' ? '⚠' : 'ℹ' }}
            </div>
            <div class="activity-content">
              <h4 class="activity-title">{{ activity.title }}</h4>
              <p class="activity-description">{{ activity.description }}</p>
              <span class="activity-time">{{ formatDate(activity.timestamp) }}</span>
            </div>
          </div>
        </div>
      </FkCard>
      
      <!-- System Notification -->
      <FkAlert variant="info" class="fk-mb-4">
        <strong>System Update:</strong> Scheduled maintenance will occur this weekend from 2 AM to 6 AM.
      </FkAlert>
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
