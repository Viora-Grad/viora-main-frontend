import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Subscription } from '../models/subscription.model';
import { PaymentSessionResponse } from './dtos/payment-session-response.dto';
import { SubscriptionRequest } from './dtos/subscription-request.dto';

@Injectable({ providedIn: 'root' })
export class OrderApi {
	private readonly _http = inject(HttpClient);
	private readonly _baseUrl = environment.apiBaseUrl;

	public getSubscriptions(organizationId: string): Observable<Subscription[]> {
		return this._http.get<Subscription[]>(`${this._baseUrl}/subscription/${organizationId}`);
	}

	public createSubscription(request: SubscriptionRequest): Observable<string> {
		return this._http.post(`${this._baseUrl}/order/subscription`, request, {
			responseType: 'text',
		});
	}

	public getPaymentSession(orderId: string): Observable<PaymentSessionResponse> {
		return this._http.post<PaymentSessionResponse>(
			`${this._baseUrl}/payments/session/${orderId.split('"')[1]}`,
			{},
		);
	}
}
