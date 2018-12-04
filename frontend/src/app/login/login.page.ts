import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showError: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form) {
    this.authService.login(form.value).subscribe((res) => {
      if (res.status == 200) {
        this.showError = false;
        this.router.navigateByUrl(`home/${res.user_id}`);
      }
      else {
        this.showError = true;
      }
    });
  }
}
