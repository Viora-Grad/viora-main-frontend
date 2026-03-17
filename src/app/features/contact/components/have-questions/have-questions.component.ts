import { FormGroup, FormsModule, Validators, FormBuilder, AbstractControl } from '@angular/forms'; // ضيفي AbstractControl هنا
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MessageModule } from 'primeng/message';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'app-have-questions',
    imports: [FloatLabelModule, InputTextModule, FormsModule, TextareaModule, ColorPickerModule, MessageModule, ToastModule, ButtonModule, ReactiveFormsModule, AccordionModule],
    templateUrl: './have-questions.component.html',
    styleUrl: './have-questions.component.css',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HaveQuestionsComponent {

    private readonly _fb = inject(FormBuilder);
    private readonly _messageService = inject(MessageService);

    public readonly sendQuestion: FormGroup = this._fb.group({
        username: ['', { validators: [(control: AbstractControl) => Validators.required(control)] }],
        email: ['', { validators: [(control: AbstractControl) => Validators.required(control), (control: AbstractControl) => Validators.email(control)] }],
        message: ['', { validators: [(control: AbstractControl) => Validators.required(control)] }],
    });

    public formSubmitted = false;

    public Submit(): void {
        this.formSubmitted = true;
        if (this.sendQuestion.valid) {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            this.sendQuestion.reset();
            this.formSubmitted = false;
        }
    }

    public isInvalid(controlName: string): boolean {
        const control = this.sendQuestion.get(controlName);
        return (control?.invalid && (control.touched || this.formSubmitted)) ?? false;
    }
}