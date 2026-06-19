import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  readonly #router = inject(Router);

  handle(err: HttpErrorResponse) {
    console.log(err);
    const status = err.status;
    if(status === 0){
      this.#router.navigateByUrl("/unavailable");
    }
    else if (status === 403 || status === 422 || status === 500) {
      const messages = err.error.message;
      console.log(messages);
    }else if(status === 401){
      const message = "Tekrar giriş yapmalısınız";
      this.#router.navigateByUrl("/login");
      localStorage.clear();
    }else{
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
  }
}
