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
import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';




@Component({
	selector: 'app-contact',
	imports: [FloatLabelModule, InputTextModule, FormsModule, TextareaModule, ColorPickerModule, MessageModule, ToastModule, ButtonModule , ReactiveFormsModule , AccordionModule],
	providers: [MessageService],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.css',
})
export class ContactComponent {

	fb = inject(FormBuilder);
	messageService = inject(MessageService);
    exampleForm: FormGroup;
    formSubmitted: boolean = false;

    constructor() {
        this.exampleForm = this.fb.group({
                    username: ['', Validators.required],
                    email: ['', [Validators.required, Validators.email]],
					message: ['', Validators.required]
                });
    }

    Submit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
