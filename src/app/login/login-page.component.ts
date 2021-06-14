
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    @ViewChild('f', {static: false}) floatingLabelForm: NgForm;
    @ViewChild('vform', {static: false}) validationForm: FormGroup;
    regularForm: FormGroup;

    constructor(private userService: UserService, private router: Router,
        private route: ActivatedRoute) {
            this.regularForm = new FormGroup({
                login: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
            });
        
    }
    
    ngOnInit() {
       
    }

    onReactiveFormSubmit() {
        this.regularForm.reset();
    }
    onTemplateFormSubmit() {
        this.floatingLabelForm.reset();
    }
    onCustomFormSubmit() {
        this.validationForm.reset();
    }

    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
    public login() {
        const credentials = this.regularForm.value;
        this.userService.login(credentials.login, credentials.password);
    }

}
