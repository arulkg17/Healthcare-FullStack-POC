import { Component, OnInit, inject, signal } from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { PatientService } from "../../services/patient.service";
import { PhoneInput } from "../phone-input/phone-input";
import { dateOfBirthValidator } from "../../validators/date-of-birth.validators";

@Component({
  selector: "app-patient-edit",
  standalone: true,
  imports: [ReactiveFormsModule, PhoneInput],
  templateUrl: "./patient-edit.html",
  styleUrl: "./patient-edit.scss",
})
export class PatientEdit implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);

  patientId = 0;

  loading = signal(false);
  saving = signal(false);
  errorMessage = signal("");

  patientForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(2)]],

    lastName: ["", [Validators.required, Validators.minLength(2)]],

    dateOfBirth: ["", [Validators.required, dateOfBirthValidator()]],

    gender: ["", Validators.required],

    phone: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

    email: ["", [Validators.required, Validators.email]],

    address: ["", Validators.required],

    isActive: [true],
  });

  ngOnInit(): void {
    this.loadPatient();
  }

  loadPatient(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get("id"));

    console.log("Patient ID:", this.patientId);

    if (!this.patientId) {
      this.errorMessage.set("Invalid patient ID.");
      return;
    }

    this.loading.set(true);

    this.patientService.getById(this.patientId).subscribe({
      next: (patient) => {
        console.log("Patient received:", patient);

        this.patientForm.patchValue({
          firstName: patient.firstName,
          lastName: patient.lastName,
          dateOfBirth: patient.dateOfBirth
            ? patient.dateOfBirth.substring(0, 10)
            : "",
          gender: patient.gender,
          phone: patient.phone,
          email: patient.email,
          address: patient.address,
          isActive: patient.isActive,
        });

        console.log("Form value after patch:", this.patientForm.value);

        this.loading.set(false);

        console.log("Loading:", this.loading);
      },

      error: (error) => {
        console.error("Get patient error:", error);

        this.errorMessage.set("Unable to load patient.");

        this.loading.set(false);
      },
    });
  }

  submit(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const patient = {
      patientId: this.patientId,
      ...this.patientForm.getRawValue(),
    };

    console.log("Updating patient:", patient);

    this.saving.set(true);
    this.errorMessage.set("");

    this.patientService.update(this.patientId, patient).subscribe({
      next: (response) => {
        console.log("Patient updated successfully:", response);

        this.saving.set(false);

        this.router.navigate(["/patients"]);
      },

      error: (error) => {
        console.error("Update patient error:", error);

        this.saving.set(false);

        this.errorMessage.set("Unable to update patient. Please try again.");
      },
    });
  }
}
