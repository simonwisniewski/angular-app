import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { ModalComponent } from '../modal/modal.component';
import { UserRowComponent } from './user-row.component';


@NgModule({
  imports: [
    CommonModule,
    UserListRoutingModule,
    ModalComponent,
    UserRowComponent
  ]
})
export class UserListModule { }
