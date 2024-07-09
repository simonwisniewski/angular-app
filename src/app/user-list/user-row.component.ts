import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'tr[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class UserRowComponent {
  pen2square = faPenToSquare
  @Input() user!: User;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
}
