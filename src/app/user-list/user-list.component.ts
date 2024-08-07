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
    modalRef.componentInstance.userSaved.subscribe(() => {
      this.onUserSaved();
    });
  }

  openEditUserModal(user: User): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = this.selectedUser;
    modalRef.componentInstance.isEditMode = this.isEditMode;

    modalRef.componentInstance.userSaved.subscribe(() => {
      this.onUserSaved();
    });
  }

  ConfirmDeleteUser(user: User): void {
    this.userToDelete = { ...user };
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.componentInstance.user = this.userToDelete;

    modalRef.componentInstance.userDeleted.subscribe(() => {
      this.onUserDeleted();
    });
  }

  onUserSaved(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onUserDeleted(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
