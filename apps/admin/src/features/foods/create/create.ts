import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '../../../../../../libraries/src/lib/shared/models/category.model';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
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
export default class CreateFood {
  readonly #http = inject(HttpService);

  readonly name = signal<string>("");
  readonly description = signal<string>("");
  readonly price = signal<number>(0);
  readonly imageUrl = signal<string>("");
  readonly category = signal<string>("");

  readonly categories = signal<Category[]>([]);

  create(form: NgForm) {
    this.#http.post('/api/foods', form.value, () => {
      form.reset();
    });
  }

  ngOnInit() {
    this.#http.get<Category[]>('/api/categories', (res) => {
      this.categories.set(res);
    });
  }
}