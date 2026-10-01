import { Component, inject, signal } from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { PatientService } from "../../services/patient.service";
import { dateOfBirthValidator } from "../../validators/date-of-birth.validators";
import { PhoneInput } from "../phone-input/phone-input";
@Component({
  selector: "app-patient-add",
  standalone: true,
  imports: [ReactiveFormsModule, PhoneInput],
  templateUrl: "./patient-add.html",
  styleUrl: "./patient-add.scss",
})
export class PatientAdd {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);

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

  submit(): void {
    // 1. Validate form
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    // 2. Get form data
    const patient = this.patientForm.getRawValue();

    console.log("Saving patient:", patient);

    this.saving.set(true);
    this.errorMessage.set("");

    // 3. Call API
    this.patientService.create(patient).subscribe({
      next: (response) => {
        console.log("Patient created successfully:", response);

        this.saving.set(false);

        // 4. Navigate back to patient list
        this.router.navigate(["/patients"]);
      },

      error: (error) => {
        console.error("Create patient error:", error);

        this.saving.set(false);
        this.errorMessage.set("Unable to save patient. Please try again.");
      },
    });
  }
  cancel(): void {
    this.router.navigate(["/patients"]);
  }
}
