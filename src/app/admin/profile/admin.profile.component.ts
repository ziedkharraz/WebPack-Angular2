import {Component, OnInit, trigger, state, style, transition, animate}      from '@angular/core';
import {User} from "../../login/user";
import {LoginService} from "../../shared/services/login.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../shared/services/localStorage.service";


@Component({
    styleUrls: ['form.css'],
    templateUrl: 'profile.html',
    animations: [
        trigger('errorMessage', [
            state("true", style({opacity: 0, display: "none"})),
            state("false", style({opacity: 1, display: "block"})),
            transition('1 => 0', animate('.5s'))
        ])
    ]
})
export class AdminProfileComponent implements OnInit {

    logedUser: User = null;
    success: boolean;
    error: boolean;
    loading: boolean;

    constructor(private loginService: LoginService, private router: Router, private titleService: Title) {
        this.titleService.setTitle("Profile");
    }


    ngOnInit() {
        this.success = false;
        this.loginService.verifUserLogged();
        this.logedUser = Object.assign({}, this.loginService.logedUser);
    }

    update() {
        this.loading=true;
        this.loginService.update(this.logedUser).subscribe(response => {
            if(response.status=="success")
            {
                this.loginService.logedUser = Object.assign({}, this.logedUser);
                LocalStorageService.setItem("currentUser", this.logedUser);
                this.success = true;
                setTimeout(() => this.success = false, 3000);
            }
            else
            {
                this.error=true;
                setTimeout(() => this.error = false, 3000);
            }
            this.loading=false;
        });

    }


}

