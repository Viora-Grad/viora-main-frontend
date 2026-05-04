import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FrequentlyQuestionComponent } from '../components/FrequentlyQuestionSection/FrequentlyQuestionSection.component';
import { HaveQuestionsComponent } from "../components/HaveQuestionsSection/HaveQuestionsSection.component";

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
