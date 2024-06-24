import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ModalComponent],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = {};
  isModalVisible = false;
  isEditMode = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchInitialUsers().subscribe((data) => {
      this.users = data;
    });
  }

  openAddUserModal(): void {
    this.selectedUser = {};
    this.isEditMode = false;
    this.isModalVisible = true;
  }

  openEditUserModal(user: any): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
    this.isModalVisible = true;
  }

  deleteUser(user: any): void {
    if (
      confirm(
        `Are you sure you want to delete ${user.first_name} ${user.last_name}?`
      )
    ) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.users = this.users.filter((u) => u.id !== user.id);
      });
    }
  }

  onUserSaved(): void {
    this.isModalVisible = false;
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onModalClosed(): void {
    this.isModalVisible = false;
  }
}
