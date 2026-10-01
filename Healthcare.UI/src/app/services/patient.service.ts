import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Patient } from "../models/patient.model";
import { CreatePatient } from "../models/create-patient.model";
import { PatientStatistics } from '../models/patient-statistics.model';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/Patients`;

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }
  search(searchTerm: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/search`, {
      params: {
        SearchTerm: searchTerm,
      },
    });
  }
  getStatistics(): Observable<PatientStatistics> {
    return this.http.get<PatientStatistics>(`${this.apiUrl}/statistics`);
  }
  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  create(patient: CreatePatient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  update(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
