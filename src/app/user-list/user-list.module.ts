import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserRowComponent } from './user-row.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, UserListRoutingModule, UserRowComponent, FormsModule],
})
export class UserListModule {}
