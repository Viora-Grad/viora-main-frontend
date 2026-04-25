import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the FooterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render copyright text', () => {
    const nativeEl = fixture.nativeElement as HTMLElement;
    expect(nativeEl.textContent).toContain('© 2026 Viora Technologies Inc. All rights reserved.');
  });
});