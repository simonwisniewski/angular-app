import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class UserRowComponent {
  @Input() user: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  editUser() {
    this.edit.emit(this.user);
  }

  deleteUser() {
    this.delete.emit(this.user);
  }
}
