import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ConfirmDeleteModalComponent {
  @Input() user: any = {};
  @Output() userDeleted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    public activeModal: NgbActiveModal
  ) {}

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.userDeleted.emit();
      this.activeModal.close('User Deleted');
    });
  }

  closeModal() {
    this.activeModal.dismiss('Modal Closed');
  }
}
