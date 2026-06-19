import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateCategory {
  readonly name = signal<string>("");

  readonly #http = inject(HttpService);

  create(form: NgForm) {
    if (!form.valid) return;
    
    this.#http.post<null>('/api/categories', form.value, () => {
      form.reset();
    }, () => {
      alert("Kategori oluşturulamadı.");
    });
  }
}
