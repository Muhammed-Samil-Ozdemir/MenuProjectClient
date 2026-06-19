import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { Router } from '@angular/router';

@Component({
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Login {
  readonly username = signal<string>("");
  readonly password = signal<string>("");

  readonly loginError = signal<boolean>(false);

  readonly #http = inject(HttpService);
  readonly #router = inject(Router);

  login(form: NgForm) {
    if (!form.valid) return;
    
    this.#http.post<{ token: string }>(
      '/api/auth/login',
      form.value,
      (res) => {
        if(res?.token) {
          localStorage.setItem('token', res.token);
          this.#router.navigateByUrl('/');
        }
      }, () => {
          this.loginError.set(true);
          });
}
}
