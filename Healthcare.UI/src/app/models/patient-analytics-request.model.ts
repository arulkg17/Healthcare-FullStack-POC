export interface PatientAnalyticsRequest {
  patients: PatientAnalytics[];
}

export interface PatientAnalytics {
  patientId: number;
  age: number;
  gender: string;
  isActive: boolean;
}