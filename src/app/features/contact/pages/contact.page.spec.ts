import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPage } from './contact.page';
import { FrequentlyQuestionComponent } from '../components/frequently-question/frequently-question.component';
import { HaveQuestionsComponent } from "../components/have-questions/have-questions.component";
import { MessageService } from 'primeng/api';

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactPage,
        FrequentlyQuestionComponent,
        HaveQuestionsComponent
      ],
	        providers: [MessageService],

    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ContactPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should render FrequentlyQuestionComponent', () => {
    const nativeEl = fixture.nativeElement as HTMLElement;
    expect(nativeEl.querySelector('app-frequently-question')).not.toBeNull();
  });

  it('should render HaveQuestionsComponent', () => {
    const nativeEl = fixture.nativeElement as HTMLElement;
    expect(nativeEl.querySelector('app-have-questions')).not.toBeNull();
  });

});