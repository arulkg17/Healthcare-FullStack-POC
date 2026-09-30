import { Routes } from "@angular/router";
import { PatientList } from "./components/patient-list/patient-list";
import { PatientAdd} from "./components/partient-add/patient-add";
import { PatientEdit} from "./components/patient-edit/patient-edit";

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
    path:"patients/edit/:id",
    component: PatientEdit
  },
  {
    path: "",
    redirectTo: "patients",
    pathMatch: "full",
  },
];
