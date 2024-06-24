import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ModalComponent {
  @Input() user: any = {};
  @Input() isVisible = false;
  @Input() isEditMode = false;
  @Output() userSaved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  saveUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.userSaved.emit();
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        this.userSaved.emit();
      });
    }
  }

  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }
}
