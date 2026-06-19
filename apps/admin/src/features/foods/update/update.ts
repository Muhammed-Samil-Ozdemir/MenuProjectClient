import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { Category } from '../../../../../../libraries/src/lib/shared/models/category.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Food } from '../../../../../../libraries/src/lib/shared/models/food.model';

@Component({
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './update.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateFood {
  readonly #http = inject(HttpService);
  readonly #route = inject(ActivatedRoute);

  readonly id = signal<string>("");
  readonly name = signal<string>("");
  readonly description = signal<string>("");
  readonly price = signal<number>(0);
  readonly imageUrl = signal<string>("");
  readonly category = signal<Category | null>(null);

  readonly categories = signal<Category[]>([]);

  update(form: NgForm) {
    if (!form.valid) return;
    
    this.#http.put(`/api/foods/${this.id()}`, form.value, () => {
      form.reset();
    }, () => {
        alert("Yemek güncellenemedi.");
      });
  }

  ngOnInit() {
    const id = this.#route.snapshot.paramMap.get('id')!;
    this.id.set(id);

    this.#http.get<Category[]>('/api/categories', (res) => {
      this.categories.set(res);
    });

    this.#http.get(`/api/foods/${id}`, (res: Food) => {
      this.name.set(res.name);
      this.description.set(res.description);
      this.price.set(res.price);
      this.imageUrl.set(res.imageUrl);
      this.category.set(res.category);
    });
  }
}
