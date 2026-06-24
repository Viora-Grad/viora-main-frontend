import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
	selector: 'app-features-grid',
	imports: [CardModule],
	templateUrl: './FeaturesGridSection.component.html',
	styleUrl: './FeaturesGridSection.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true
})


export class FeaturesGridComponent {


	public features = [

		{
			title: 'Multi-Branch Management',
			description: 'Manage multiple branches and assign a manager for each branch.',
			useCase: 'Businesses with multiple locations.',
			benefit: 'Centralized control with branch-level flexibility.',
		},
		{
			title: 'Smart Scheduling & Appointment',
			description: 'Manage bookings with a dynamic timetable and real-time updates.',
			useCase: 'Clinics and appointment-based services.',
			benefit: 'Avoid double bookings and scheduling issues.',
		},
		{
			title: 'Smart Notifications',
			description: 'Send notifications via Email, Push, and WhatsApp.',
			useCase: 'Reminders and updates.',
			benefit: 'Reduce no-shows and improve engagement.',
		},
		{
			title: 'Role Management',
			description: 'Create staff accounts, assign roles, and define custom permissions.',
			useCase: 'Teams with different responsibilities.',
			benefit: 'Flexible team and permission management.',
		},
		{
			title: 'Secure Payments & Billing',
			description: 'Handle subscriptions, payments, and invoices with automation.',
			useCase: 'Businesses needing reliable billing systems.',
			benefit: 'Easy and automated financial management.',
		},
		{
			title: 'Customer Wallet System',
			description: 'Each customer has a wallet to manage balance and transactions.',
			useCase: 'Frequent or returning customers.',
			benefit: 'Simplified and faster payments.',
		},

		{
			title: 'Flexible Subscription Plans',
			description: 'Choose plans based on your business needs with different features and limits.',
			useCase: 'Startups and growing businesses.',
			benefit: 'Scale your system easily.',
		},

		{
			title: 'Reservation Management',
			description: 'Control booking rules, time slots, and reservation statuses.',
			useCase: 'Any service-based business.',
			benefit: 'Full control over reservations.',
		},
		{
			title: 'AI Marketing Tools',
			description: 'Generate AI-powered posts automatically or on-demand.',
			useCase: 'Businesses wanting better marketing.',
			benefit: 'Save time and improve engagement.',
		},
		{
			title: 'AI Chatbot Assistant',
			description: 'Assist customers with pre-diagnosis and booking suggestions.',
			useCase: 'Customer self-service systems.',
			benefit: 'Reduce workload on staff.',
		},

		{
			title: 'Patient Records & History',
			description: 'Store medical records, prescriptions, and appointment details.',
			useCase: 'Clinics and healthcare providers.',
			benefit: 'Better tracking and personalized care.',
		},
		{
			title: 'Inventory Management',
			description: 'Track product quantities and receive low-stock alerts.',
			useCase: 'Clinics using products.',
			benefit: 'Avoid running out of important items.',
		},
		{
			title: 'Feedback & Ratings',
			description: 'Allow customers to rate services and leave feedback.',
			useCase: 'Service quality improvement.',
			benefit: 'Build trust and improve performance.',
		}
	];
}
