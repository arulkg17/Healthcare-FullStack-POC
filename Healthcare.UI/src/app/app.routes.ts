import { Routes } from "@angular/router";
import { PatientList } from "./components/patient-list/patient-list";
import { PatientAdd} from "./components/partient-add/patient-add";

export const routes: Routes = [
  {
    path: "patients",
    component: PatientList,
  },
  {
    path:"patients/add",
    component: PatientAdd
  },
  {
    path: "",
    redirectTo: "patients",
    pathMatch: "full",
  },
];
