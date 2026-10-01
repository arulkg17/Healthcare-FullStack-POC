import { Component, OnInit, inject, signal } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  forkJoin,
  concatMap,
  mergeMap,
  exhaustMap,
  from,
  of,
  delay,
  Subject,
} from "rxjs";
import { Patient } from "../../models/patient.model";
import { PatientService } from "../../services/patient.service";
import { PatientStatistics } from "../../models/patient-statistics.model";
import { DeleteConfirmation } from "../delete-confirmation/delete-confirmation";

@Component({
  selector: "app-patient-list",
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, DeleteConfirmation],
  templateUrl: "./patient-list.html",
  styleUrl: "./patient-list.scss",
})
export class PatientList implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);
  private readonly saveClicks$ = new Subject<number>();

  private saveClickNumber = 0;
  patients = signal<Patient[]>([]);
  loading = signal(false);
  errorMessage = signal("");
  selectedPatient = signal<Patient | null>(null);
  statistics = signal<PatientStatistics | null>(null);
  searchForm = this.fb.group({
    searchTerm: [""],
  });

  ngOnInit(): void {
    this.loadPatients();
    this.setupSearch();
    this.setupExhaustMapDemo();
  }

  loadPatients(): void {
    this.loading.set(true);
    this.errorMessage.set("");

    forkJoin({
      patients: this.patientService.getAll(),
      statistics: this.patientService.getStatistics(),
    }).subscribe({
      next: (result) => {
        this.patients.set(result.patients);
        this.statistics.set(result.statistics);

        this.loading.set(false);
      },

      error: (error) => {
        console.error("Failed to load patient data:", error);

        this.errorMessage.set("Unable to load patient data.");

        this.loading.set(false);
      },
    });
  }
  setupSearch(): void {
    this.searchForm.controls.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          const term = searchTerm.trim();

          if (!term) {
            return this.patientService.getAll();
          }

          this.loading.set(true);
          this.errorMessage.set("");

          return this.patientService.search(term);
        }),
      )
      .subscribe({
        next: (data) => {
          this.patients.set(data);
          this.loading.set(false);
        },

        error: (error) => {
          console.error("Search error:", error);

          this.errorMessage.set("Unable to search patients.");

          this.loading.set(false);
        },
      });
  }
  runConcatMapDemo(): void {
    const patientIds = [101, 102, 103];

    console.log("Queue started");

    from(patientIds)
      .pipe(concatMap((id) => of(id).pipe(delay(1000))))
      .subscribe({
        next: (id) => {
          console.log(`Completed patient ${id}`);
        },

        complete: () => {
          console.log("Queue completed");
        },
      });
  }
  runMergeMapDemo(): void {
    const patientIds = [101, 102, 103];

    console.log("Parallel processing started");

    from(patientIds)
      .pipe(mergeMap((id) => of(id).pipe(delay(1000))))
      .subscribe({
        next: (id) => {
          console.log(`Completed patient ${id}`);
        },

        complete: () => {
          console.log("Parallel processing completed");
        },
      });
  }
  setupExhaustMapDemo(): void {
    this.saveClicks$
      .pipe(
        exhaustMap((clickNumber) => {
          console.log(`Processing click ${clickNumber}`);

          return of(clickNumber).pipe(delay(3000));
        }),
      )
      .subscribe({
        next: (clickNumber) => {
          console.log(`Completed click ${clickNumber}`);
        },

        error: (error) => {
          console.error("exhaustMap error:", error);
        },
      });
  }
  runExhaustMapDemo(): void {
    this.saveClickNumber++;

    console.log(`Save button clicked: ${this.saveClickNumber}`);

    this.saveClicks$.next(this.saveClickNumber);
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
