import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home';
import { LoginComponent } from '../login';
import { RegisterComponent } from '../register';
import {AddUserComponent} from "../user/add-user";
import {EditUserComponent} from "../user/edit-user";
import {ListUserComponent} from "../user/list-user";
import { AuthGuard } from '../_guards';

const appRoutes: Routes = [
    { path: '', component: ListUserComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'edit-user', component: EditUserComponent },
   // { path: 'list-user', component: ListUserComponent },
   
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const LoginRoutingModule = RouterModule.forRoot(appRoutes);