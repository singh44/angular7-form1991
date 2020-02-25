import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { routing }        from '../app.routing';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';


@NgModule({
  imports: [
   BrowserModule,
   ReactiveFormsModule,
   HttpClientModule,
   routing,
  ],
  declarations: [
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  exports: [
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ]
})
export class UserFormModule {
}