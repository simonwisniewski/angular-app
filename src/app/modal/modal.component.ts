import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ModalComponent {
  @Input() user: any = {};
  @Input() isSaving = false;
  @Input() isEditMode = false;
  @Output() userSaved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    public activeModal: NgbActiveModal
  ) {}

  saveUser(form: NgForm) {
    if (!form.invalid) {
      this.isSaving = true;

      if (this.isEditMode) {
        this.userService.updateUser(this.user).subscribe(() => {
          this.isSaving = false;
          this.userSaved.emit();
          this.activeModal.close('User Updated');
        });
      } else {
        this.userService.addUser(this.user).subscribe(() => {
          this.isSaving = false;
          this.userSaved.emit();
          this.activeModal.close('User Added');
        });
      }
    }
  }

  closeModal() {
    this.activeModal.dismiss('Modal Closed');
  }
}
