import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MessageModule } from 'primeng/message';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';

@Component({
	selector: 'app-have-questions',
	imports: [FloatLabelModule, InputTextModule, FormsModule, TextareaModule, ColorPickerModule, MessageModule, ToastModule, ButtonModule , ReactiveFormsModule , AccordionModule],
    templateUrl: './have-questions.component.html',
	styleUrl: './have-questions.component.css',
})
export class HaveQuestionsComponent {

	// fb = inject(FormBuilder);
	// messageService = inject(MessageService);
    sendQuestion: FormGroup;
    formSubmitted: boolean = false;

   constructor(private fb: FormBuilder, private messageService: MessageService) {
  this.sendQuestion = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });
}

    Submit() {
        this.formSubmitted = true;
        if (this.sendQuestion.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            this.sendQuestion.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.sendQuestion.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }

}
