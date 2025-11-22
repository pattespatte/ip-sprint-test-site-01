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
		type: "Förmåner",
		date: "2025-11-15",
		status: "Godkänd",
	},
	{
		id: "APP-002",
		name: "Jane Smith",
		type: "Sjukvård",
		date: "2025-11-14",
		status: "Väntande",
	},
	{
		id: "APP-003",
		name: "Bob Johnson",
		type: "Förmåner",
		date: "2025-11-13",
		status: "Behöver åtgärd",
	},
	{
		id: "APP-004",
		name: "Alice Brown",
		type: "Pension",
		date: "2025-11-12",
		status: "Godkänd",
	},
]);

const activities = ref([
	{
		id: 1,
		title: "Ansökan godkänd",
		description: "Ansökan APP-001 har godkänts.",
		timestamp: "2025-11-15T14:30:00Z",
		type: "success",
	},
	{
		id: 2,
		title: "Dokument uppladdat",
		description: "Nytt dokument uppladdat för ansökan APP-002.",
		timestamp: "2025-11-15T10:15:00Z",
		type: "info",
	},
	{
		id: 3,
		title: "Åtgärd krävs",
		description: "Ytterligare information behövs för ansökan APP-003.",
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
		case "Godkänd":
			return "success";
		case "Väntande":
			return "info";
		case "Behöver åtgärd":
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
	
	// DEBUG: Let's examine the FDataTable component
	console.log("DEBUG: FDataTable component:", window.FDataTable || "Not available globally");
	
	// DEBUG: Check if we can access the FKUI components
	const fkuiComponents = Object.keys(window.__VUE_DEVTOOLS_GLOBAL_HOOK__?.__VUE__ || {});
	console.log("DEBUG: Available Vue components:", fkuiComponents);
	
	// DEBUG: Let's check what FDataTable properties are available
	console.log("DEBUG: Checking FDataTable implementation...");
	
	// DEBUG: Let's try to understand the error better
	setTimeout(() => {
		console.log("DEBUG: Dashboard fully mounted, checking for any errors...");
	}, 1000);
});
</script>

<template>
	<div class="dashboard-view">
		<div class="container">
			<nav class="breadcrumb fk-mb-4">
				<router-link to="/">Hem</router-link>
				<span class="separator">/</span>
				<span>Dashboard</span>
			</nav>

			<h1 class="fk-heading-1 fk-mb-4">Dashboard</h1>
			<p class="fk-text-large fk-mb-6">
				Översikt av din ansökningsstatus och senaste aktivitet.
			</p>

			<!-- Status Cards -->
			<div class="stats-grid fk-mb-6">
				<FCard class="status-card">
					<div class="status-card-content">
						<div class="status-icon">📄</div>
						<h3 class="fk-heading-4">Ansökningar</h3>
						<p class="fk-text-large">{{ stats.applications }}</p>
					</div>
				</FCard>

				<FCard class="status-card">
					<div class="status-card-content">
						<div class="status-icon">🕐</div>
						<h3 class="fk-heading-4">Väntande</h3>
						<p class="fk-text-large">{{ stats.pending }}</p>
					</div>
				</FCard>

				<FCard class="status-card">
					<div class="status-card-content">
						<div class="status-icon">✓</div>
						<h3 class="fk-heading-4">Godkända</h3>
						<p class="fk-text-large">{{ stats.approved }}</p>
					</div>
				</FCard>

				<FCard class="status-card">
					<div class="status-card-content">
						<div class="status-icon">⚠</div>
						<h3 class="fk-heading-4">Behöver åtgärd</h3>
						<p class="fk-text-large">{{ stats.needsAction }}</p>
					</div>
				</FCard>
			</div>

			<!-- Recent Applications Table -->
			<FCard class="fk-mb-6">
				<div class="card-header">
					<h2 class="fk-heading-2">Senaste ansökningar</h2>
				</div>

				<!-- DEBUG: Try implementing FDataTable correctly according to FKUI documentation -->
				<FDataTable :rows="applications">
					<template #caption>Senaste ansökningar</template>
					<template #default="{ row }">
						<FTableColumn title="ID" type="text">
							{{ row.id }}
						</FTableColumn>
						<FTableColumn title="Namn" type="text">
							{{ row.name }}
						</FTableColumn>
						<FTableColumn title="Typ" type="text">
							{{ row.type }}
						</FTableColumn>
						<FTableColumn title="Datum" type="date">
							{{ formatDate(row.date) }}
						</FTableColumn>
						<FTableColumn title="Status" type="text">
							<FBadge :variant="getStatusVariant(row.status)">
								{{ row.status }}
							</FBadge>
						</FTableColumn>
						<!-- DEBUG: Try using FTableButton for action column instead of type="action" -->
						<FTableColumn title="Åtgärder">
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
					<h2 class="fk-heading-2">Senaste aktivitet</h2>
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
				<strong>Systemuppdatering:</strong> Planerat underhåll kommer att ske
				denna helg från 02:00 till 06:00.
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
