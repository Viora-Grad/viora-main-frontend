import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { PlansSectionComponent } from './plans-section.component';
import { PricingService } from '../../services/pricing.service';
import { Plan } from '../../models/plan.model';
import { PlanPeriodTime } from '../../models/plan-period-time.enum';

const mockPlans: readonly Plan[] = [
	{
		id: '1',
		name: 'Starter',
		description: 'Basic plan',
		price: 99,
		planPeriodTime: PlanPeriodTime.Monthly,
		planContent: 'Basic features',
		limitedFeatures: [],
		features: [],
	},
];

describe('PlansSectionComponent', () => {
	let component: PlansSectionComponent;
	let fixture: ComponentFixture<PlansSectionComponent>;

	beforeEach(async () => {
		const mockGetAllPlans = vi.fn().mockReturnValue(of(mockPlans));

		await TestBed.configureTestingModule({
			imports: [PlansSectionComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				{ provide: PricingService, useValue: { getAllPlans: mockGetAllPlans } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(PlansSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load plans on init', () => {
		expect(component.plans().length).toBe(1);
		expect(component.plans()[0].name).toBe('Starter');
		expect(component.loading()).toBeFalsy();
	});
});
