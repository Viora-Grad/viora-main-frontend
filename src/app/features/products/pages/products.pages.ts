import { Component , ChangeDetectionStrategy } from '@angular/core';
import { FeaturesGridComponent } from '../components/FeaturesGridSection/FeaturesGridSection.component';

@Component({
	selector: 'app-products',
	imports: [FeaturesGridComponent],
	templateUrl: './products.pages.html',
	styleUrl: './products.pages.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true

})
export class ProductsPage {
	
}
