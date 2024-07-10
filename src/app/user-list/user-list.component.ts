import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { ModalComponent } from '../modal/modal.component';
import { UserRowComponent } from './user-row.component';
import { User } from '../user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule, UserRowComponent, FormsModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = {} as User;
  isModalVisible = false;
  isEditMode = false;
  userToDelete: User = {} as User;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userService.fetchInitialUsers().subscribe((data) => {
      this.users = data;
    });
  }

  openAddUserModal(): void {
    this.selectedUser = {} as User;
    this.isEditMode = false;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = this.selectedUser;
    modalRef.componentInstance.isEditMode = this.isEditMode;
  }

  openEditUserModal(user: User): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = this.selectedUser;
    modalRef.componentInstance.isEditMode = this.isEditMode;
  }

  ConfirmDeleteUser(user: User): void {
    this.userToDelete = user;
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.componentInstance.message = `Czy napewno chcesz usunąć ${user.first_name} ${user.last_name}?`;

    modalRef.result.then(
      (result: string) => {
        if (result === 'confirm') {
          this.deleteUser(user);
        }
      },
      (reason) => {
        // dismiss action
      }
    );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }

  onUserSaved(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
