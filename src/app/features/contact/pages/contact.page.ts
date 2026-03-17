import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FrequentlyQuestionComponent } from '../components/frequently-question/frequently-question.component';
import { HaveQuestionsComponent } from "../components/have-questions/have-questions.component";

@Component({
	selector: 'app-contact-page',
	imports: [FrequentlyQuestionComponent, HaveQuestionsComponent],
	templateUrl: './contact.page.html',
	styleUrl: './contact.page.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
	
}
