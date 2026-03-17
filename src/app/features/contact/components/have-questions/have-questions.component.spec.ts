import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HaveQuestionsComponent } from './have-questions.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';

describe('HaveQuestionsComponent', () => {
  let component: HaveQuestionsComponent;
  let fixture: ComponentFixture<HaveQuestionsComponent>;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HaveQuestionsComponent,
        ReactiveFormsModule,
        FormsModule,
        FloatLabelModule,
        InputTextModule,
        TextareaModule,
        ButtonModule,
        ToastModule,
        MessageModule,
      ],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(HaveQuestionsComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with 3 controls', () => {
    expect(component.sendQuestion.contains('username')).toBe(true);
    expect(component.sendQuestion.contains('email')).toBe(true);
    expect(component.sendQuestion.contains('message')).toBe(true);
  });

  it('should mark username as invalid if empty', () => {
    const control = component.sendQuestion.get('username');
    control?.setValue('');
    control?.markAsTouched();
    fixture.detectChanges();

    expect(control?.invalid).toBe(true);
  });

  it('should mark email as invalid if incorrect format', () => {
    const control = component.sendQuestion.get('email');
    control?.setValue('invalid-email');
    control?.markAsTouched();
    fixture.detectChanges();

    expect(control?.invalid).toBe(true);
    expect(control?.errors?.['email']).toBe(true);
  });

  it('should submit form and reset if valid', () => {
  vi.spyOn(messageService, 'add');

  component.sendQuestion.setValue({
    username: 'Maryam',
    email: 'maryam@gmail.com',
    message: 'Hello!',
  });

  expect(component.sendQuestion.valid).toBe(true);

  component.Submit();


 expect(messageService.add).toHaveBeenCalled();

  expect(messageService.add).toHaveBeenCalledWith(
    expect.objectContaining({
      severity: 'success',
      summary: 'Success',
      detail: 'Form Submitted',
    })
  );

  expect(component.sendQuestion.value).toEqual({
    username: null,
    email: null,
    message: null,
  });
});

  it('should not submit form if invalid', () => {
    vi.spyOn(messageService, 'add');

    component.sendQuestion.setValue({
      username: '',
      email: 'invalid-email',
      message: '',
    });

    component.Submit();

    expect(messageService.add).not.toHaveBeenCalled();
    expect(component.formSubmitted).toBe(true);
  });

  it('should return true from isInvalid when field is touched and invalid', () => {
    const control = component.sendQuestion.get('username');
    control?.setValue('');
    control?.markAsTouched();

    const result = component.isInvalid('username');

    expect(result).toBe(true);
  });
});