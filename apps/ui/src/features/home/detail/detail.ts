import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { Food } from '../../../../../../libraries/src/lib/shared/models/food.model';
import { Category } from '../../../../../../libraries/src/lib/shared/models/category.model';

@Component({
  imports: [],
  templateUrl: './detail.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Detail {
  readonly id = signal<string>("");
  readonly name = signal<string>("");
  readonly description = signal<string>("");
  readonly price = signal<number>(0);
  readonly imageUrl = signal<string>("");
  readonly category = signal<Category | null>(null);

  readonly #http = inject(HttpService);
  readonly #route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.#route.snapshot.paramMap.get('id')!;
    this.id.set(id);

    this.#http.get(`/api/foods/${id}`, (res: Food) => {
      this.name.set(res.name);
      this.description.set(res.description);
      this.price.set(res.price);
      this.imageUrl.set(res.imageUrl);
      this.category.set(res.category);
    });
  }
}
