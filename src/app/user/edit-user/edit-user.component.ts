import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../model";
import {UserService, AuthenticationService} from "../../_services";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
        ) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      username: [{value: '', disabled:true}, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: [{value: null, disabled:true}],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.userService.getById(+userId).pipe(first()).subscribe(user => {
            this.editForm.setValue(user);
        });

  }

 // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
