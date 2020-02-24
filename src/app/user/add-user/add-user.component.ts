import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService, ApiService } from '../../_services';
import { Subscription } from 'rxjs';
import { User } from '../../_models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

 currentUser: User;
 currentUserSubscription: Subscription;
 addForm: FormGroup;
 loading = false;
 submitted = false;

 constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private apiService: ApiService
    ){
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

  //constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }


 // convenience getter for easy access to form fields
    get f() { return this.addForm.controls; }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });

  }

 onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.addForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  onSubmit1() {
    this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  }

}
