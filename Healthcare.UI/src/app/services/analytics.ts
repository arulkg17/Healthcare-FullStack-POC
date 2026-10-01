import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  PatientAnalyticsRequest
} from '../models/patient-analytics-request.model';

import {
  PatientAnalyticsResponse
} from '../models/patient-analytics-response.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/Analytics`;

  getPatientSummary(
    request: PatientAnalyticsRequest
  ): Observable<PatientAnalyticsResponse> {

    return this.http.post<PatientAnalyticsResponse>(
      `${this.apiUrl}/patient-summary`,
      request
    );
  }
}