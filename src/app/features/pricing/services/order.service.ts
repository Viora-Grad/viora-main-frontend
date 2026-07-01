import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderApi } from '../apis/order.api';
import { PaymentSessionResponse } from '../apis/dtos/payment-session-response.dto';
import { SubscriptionRequest } from '../apis/dtos/subscription-request.dto';

@Injectable({ providedIn: 'root' })
export class OrderService {
	private readonly _orderApi = inject(OrderApi);

	public createSubscription(request: SubscriptionRequest): Observable<string> {
		return this._orderApi.createSubscription(request);
	}

	public getPaymentSession(orderId: string): Observable<PaymentSessionResponse> {
		return this._orderApi.getPaymentSession(orderId);
	}
}
