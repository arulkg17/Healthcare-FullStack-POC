import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-delete-confirmation",
  standalone: true,
  imports: [],
  templateUrl: "./delete-confirmation.html",
  styleUrl: "./delete-confirmation.scss",
})
export class DeleteConfirmation {
  @Input() patientName = "";

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
