import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyQuestionComponent } from './frequently-question.component';

describe('FrequentlyQuestionComponent', () => {
	let component: FrequentlyQuestionComponent;
	let fixture: ComponentFixture<FrequentlyQuestionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FrequentlyQuestionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FrequentlyQuestionComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

    it('should render all accordion panels', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const panels = nativeElement.querySelectorAll('p-accordion-panel');
    expect(panels.length).toBe(5);
    });

	it('should contain content for second FAQ question', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const secondPanel = nativeElement.querySelectorAll('p-accordion-panel')[1];

		expect(secondPanel?.textContent).toContain('Getting started with Viora is simple');
		expect(secondPanel?.textContent).toContain('Go to the Sign Up page and create your account');

		const listItems = secondPanel?.querySelectorAll('li');
		expect(listItems?.length).toBe(4);
	});
});
