export interface PatientAnalyticsResponse {
  totalPatients: number;
  activePatients: number;
  inactivePatients: number;
  averageAge: number;
  maleCount: number;
  femaleCount: number;
}