import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import FoodLayout from './food-layout/food-layout';

import { SocialMedia } from '../../../../../libraries/src/lib/shared/models/social-media.model';
import { CategoryWithFoods } from '../../../../../libraries/src/lib/shared/models/category-with-foods.model';
import { HttpService } from '../../../../../libraries/src/lib/shared/services/http';

@Component({
  imports: [FoodLayout],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  readonly categories = signal<CategoryWithFoods[]>([]);
  readonly socialMedias = signal<SocialMedia[]>([]);
  
  readonly #http = inject(HttpService);

  getAll() {
    this.#http.get<CategoryWithFoods[]>('/api/categories/customers', (res) => {
      this.categories.set(res);
    });
  }

  ngOnInit() {
    this.#http.get<SocialMedia[]>(`/api/social-medias`, (res) => {
      this.socialMedias.set(res);
    });
    this.getAll();
  }
}
