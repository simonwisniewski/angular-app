import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss'
})
export class ConfirmDeleteModalComponent {
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close("confirm");
  }
  cancel() {
    this.activeModal.dismiss("cancel");
  }
}
