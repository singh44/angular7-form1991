import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../model";
import {UserService, AuthenticationService,AlertService} from "../../_services";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  user: User;
  editForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      username: [{value: '', disabled:true}, Validators.required],
      password: [{value: '', disabled:true}],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });

    this.userService.getById(+userId)
    .pipe(first())
    .subscribe(user => {
            this.editForm.setValue(user);
     });

  }

 // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

  onSubmit() {
   
    this.submitted = true;

      // stop here if form is invalid
      if (this.editForm.invalid) {
          return;
      }

   this.loading = true;
    this.userService.update(this.editForm.value)
    .pipe(first())
    .subscribe(
        user => {
            // this.alertService.success('Registration successful', true);
            this.router.navigate(['/list-user']);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });

    // this.userService.update(this.editForm.value)
    // .pipe(first())
    // .subscribe(
    //   user => {
    //         this.router.navigate(['list-user']);
    //     },
    //   error => {
    //       alert(error);
    //   });
   

    // this.userService.update(this.editForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if(data.status === 200) {
    //         alert('User updated successfully.');
    //         this.router.navigate(['list-user']);
    //       }else {
    //         alert(data.message);
    //       }
    //     },
    //     error => {
    //       alert(error);
    //     });
  }

}
