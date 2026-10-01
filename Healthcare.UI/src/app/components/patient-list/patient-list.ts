import { Component, OnInit, inject, signal } from "@angular/core";
import { DeleteConfirmation } from "../delete-confirmation/delete-confirmation";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

import { Patient } from "../../models/patient.model";
import { PatientService } from "../../services/patient.service";

@Component({
  selector: "app-patient-list",
  standalone: true,
  imports: [DatePipe, DeleteConfirmation],
  templateUrl: "./patient-list.html",
  styleUrl: "./patient-list.scss",
})
export class PatientList implements OnInit {
  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);

  patients = signal<Patient[]>([]);
  loading = signal(false);
  errorMessage = signal("");
  selectedPatient = signal<Patient | null>(null);

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    console.log("1. loadPatients() called");

    this.loading.set(true);
    this.errorMessage.set("");

    this.patientService.getAll().subscribe({
      next: (data) => {
        console.log("2. API response received:", data);

        this.patients.set(data);
        this.loading.set(false);

        console.log("3. loading set to:", this.loading());
      },

      error: (error) => {
        console.error("4. API error:", error);

        this.errorMessage.set("Unable to load patients.");
        this.loading.set(false);
      },
    });
  }
  addPatient(): void {
    this.router.navigate(["/patients/add"]);
  }
  edit(id: number): void {
    this.router.navigate(["patients/edit", id]);
  }
  delete(patient: Patient): void {
    this.selectedPatient.set(patient);
  }
  confirmDelete(): void {
    const patient = this.selectedPatient();

    if (!patient) {
      return;
    }

    this.patientService.delete(patient.patientId).subscribe({
      next: () => {
        console.log("Patient deleted:", patient.patientId);

        this.selectedPatient.set(null);

        this.loadPatients();
      },

      error: (error) => {
        console.error("Delete failed:", error);

        this.selectedPatient.set(null);
      },
    });
  }

  cancelDelete(): void {
    this.selectedPatient.set(null);
  }
}
