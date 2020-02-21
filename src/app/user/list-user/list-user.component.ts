import { Component, OnInit ,OnDestroy, Inject} from '@angular/core';
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {User} from "../../_model";
import {UserService, AuthenticationService, ApiService} from "../../_services";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {

  //users: Model[];
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
// Search the tags in the DOM
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) { }

  ngOnInit() {
    // if(!window.localStorage.getItem('token')) {
    //   this.router.navigate(['login']);
    //   return;
    // }
     this.loadAllUsers();
     // remove the the body classes
     this.bodyTag.classList.remove('background-body');
    
  }

  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        //this.currentUserSubscription.unsubscribe();
        this.bodyTag.classList.add('background-body');
        
    }

  deleteUser(user: User): void {
      this.userService.delete(user.id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    // this.apiService.deleteUser(user.id)
    //   .subscribe( data => {
    //     this.users = this.users.filter(u => u !== user);
    //   })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

   private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
