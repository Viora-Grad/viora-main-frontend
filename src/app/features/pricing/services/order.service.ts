import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderApi } from '../apis/order.api';
import { PaymentSessionResponse } from '../apis/dtos/payment-session-response.dto';
import { SubscriptionRequest } from '../apis/dtos/subscription-request.dto';
import { Subscription } from '../models/subscription.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
	private readonly _orderApi = inject(OrderApi);

	public getSubscriptions(organizationId: string): Observable<Subscription[]> {
		return this._orderApi.getSubscriptions(organizationId);
	}

	public createSubscription(request: SubscriptionRequest): Observable<string> {
		return this._orderApi.createSubscription(request);
	}

	public getPaymentSession(orderId: string): Observable<PaymentSessionResponse> {
		return this._orderApi.getPaymentSession(orderId);
	}
}
