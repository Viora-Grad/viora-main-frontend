import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PricingApi } from '../apis/pricing.api';
import { Plan } from '../models/plan.model';

@Injectable({ providedIn: 'root' })
export class PricingService {
  private readonly _pricingApi = inject(PricingApi);

  public getAllPlans(): Observable<Plan[]> {
    return this._pricingApi.getAllPlans();
  }
}
