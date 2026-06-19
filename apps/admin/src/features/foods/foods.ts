import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { HttpService } from '../../../../../libraries/src/lib/shared/services/http';
import { Food } from '../../../../../libraries/src/lib/shared/models/food.model';
import FoodLayout from './food-layout/food-layout';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [
    FoodLayout,
    RouterLink
  ],
  templateUrl: './foods.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Foods {
  readonly #http = inject(HttpService);

  readonly foods = signal<Food[]>([]);

  getAll() {
    this.#http.get<Food[]>('/api/foods', (res) => {
      this.foods.set(res);
    });
  }

  ngOnInit() {
    this.getAll();
  }
}
