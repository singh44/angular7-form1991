import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
//import { APP_VERSION } from '../tokens/app-version';

@Component({
   selector: 'app',
   templateUrl: 'app.component.html',
   styleUrls: ['app.component.css']
})

export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        //@Inject(APP_VERSION) public appVersion: string
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}