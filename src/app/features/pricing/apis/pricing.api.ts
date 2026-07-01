import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Plan } from '../models/plan.model';
import { GetAllPlansResponse } from './dtos/get-all-plans-response.dto';

@Injectable({ providedIn: 'root' })
export class PricingApi {
  private readonly _baseUrl = environment.apiBaseUrl;
  private readonly _http = inject(HttpClient);

  public getAllPlans(): Observable<GetAllPlansResponse> {
    return this._http.get<GetAllPlansResponse>(`${this._baseUrl}/plan/getAll`);
  }

  public getPlan(planId: string): Observable<Plan> {
    return this._http.get<Plan>(`${this._baseUrl}/plan/get/${planId}`);
  }
}
