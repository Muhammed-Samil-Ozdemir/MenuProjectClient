import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../../../../../libraries/src/lib/shared/models/category.model';

@Component({
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './update.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateCategory {
  readonly id = signal<string>("");
  readonly name = signal<string>("");

  readonly #http = inject(HttpService);
  readonly #route = inject(ActivatedRoute);

  update(form: NgForm) {
    if (!form.valid) return;

    this.#http.put(`/api/categories/${this.id()}`, form.value, () => {
      form.reset();
    }, () => {
      alert("Kategori güncellenemedi.");
    });
  }

  ngOnInit() {
    const id = this.#route.snapshot.paramMap.get('id')!;
    this.id.set(id);

    this.#http.get<Category>(`/api/categories/${id}`, (res) => {
      this.name.set(res.name);
    });
  }
}
