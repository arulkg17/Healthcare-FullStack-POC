import { Routes } from "@angular/router";
import { PatientList } from "./components/patient-list/patient-list";

export const routes: Routes = [
  {
    path: "patients",
    component: PatientList,
  },
  {
    path: "",
    redirectTo: "patients",
    pathMatch: "full",
  },
];
