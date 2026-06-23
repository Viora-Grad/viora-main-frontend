import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import emailjs from '@emailjs/browser';
import { Button } from "primeng/button";
import { environment } from '../../../../../environments/environment';

const EMAILJS_SERVICE_ID = environment.emailjs.serviceId;
const EMAILJS_TEMPLATE_ID = environment.emailjs.templateId;
const EMAILJS_PUBLIC_KEY = environment.emailjs.publicKey;

@Component({
    selector: 'app-have-questions',
    imports: [FloatLabelModule, InputTextModule, TextareaModule, MessageModule, ToastModule, ReactiveFormsModule, Button],
    templateUrl: './HaveQuestionsSection.component.html',
    styleUrl: './HaveQuestionsSection.component.css',
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
    public readonly isSending = signal(false);

    public Submit(): void {
        this.formSubmitted = true;

        if (this.sendQuestion.invalid) return;

        this.isSending.set(true);

        const { username, email, message } = this.sendQuestion.value as { username: string; email: string; message: string };

        const templateParams = {
            name: username,
            email: email,
            message: message,
        };


        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then(() => {
                this._messageService.add({
                    severity: 'success',
                    summary: 'Sent!',
                    detail: 'Your message has been sent successfully.',
                    life: 3000,
                });
                this.sendQuestion.reset();
                this.formSubmitted = false;
            })
            .catch(() => {
                this._messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to send message. Please try again.',
                    life: 3000,
                });
            })
            .finally(() => {
                this.isSending.set(false);
            });
    }

    public isInvalid(controlName: string): boolean {
        const control = this.sendQuestion.get(controlName);
        return (control?.invalid && (control.touched || this.formSubmitted)) ?? false;
    }
}