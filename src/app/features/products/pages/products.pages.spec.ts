import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsPage } from './products.pages';
import { FeaturesGridComponent } from '../components/features-grid/features-grid.component';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsPage,
        FeaturesGridComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductsPage', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title', () => {
    const nativeEl = fixture.nativeElement as HTMLElement;
    expect(nativeEl.textContent).toContain('Features for Your Business');
  });

  it('should render description text', () => {
    const nativeEl = fixture.nativeElement as HTMLElement;
    expect(nativeEl.textContent).toContain('Everything you need to manage customers');
  });

  it('should render FeaturesGridComponent', () => {
    const nativeEl = fixture.nativeElement as HTMLElement;
    expect(nativeEl.querySelector('app-features-grid')).not.toBeNull();
  });
  it('should render features grid content', () => {
    const nativeEl = fixture.nativeElement as HTMLElement;
    const cards = nativeEl.querySelectorAll('p-card');
    expect(cards.length).toBeGreaterThan(0);
  });
});