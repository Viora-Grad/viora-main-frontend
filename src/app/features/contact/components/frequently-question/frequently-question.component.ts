import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MessageModule } from 'primeng/message';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';

@Component({
	selector: 'app-frequently-question',
	imports: [FloatLabelModule, InputTextModule, FormsModule, TextareaModule, ColorPickerModule, MessageModule, ToastModule, ButtonModule , ReactiveFormsModule , AccordionModule],
	templateUrl: './frequently-question.component.html',
	styleUrl: './frequently-question.component.css',
})
export class FrequentlyQuestionComponent {
	
}
