import { Component, OnInit, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

import { Patient } from "../../models/patient.model";
import { PatientService } from "../../services/patient.service";

@Component({
  selector: "app-patient-list",
  standalone: true,
  imports: [DatePipe],
  templateUrl: "./patient-list.html",
  styleUrl: "./patient-list.scss",
})
export class PatientList implements OnInit {
  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);

  patients = signal<Patient[]>([]);
  loading = signal(false);
  errorMessage = signal("");

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
  edit(id: number): void {
    this.router.navigate(["patients/edit", id]);
  }
  delete(id: number): void {
    const confirmed = confirm("Are you sure you want to delete this patient?");

    if (!confirmed) {
      return;
    }

    this.patientService.delete(id).subscribe({
      next: () => {
        console.log("Patient deleted:", id);

        this.loadPatients();
      },

      error: (error) => {
        console.error("Delete failed:", error);
      },
    });
  }
}
