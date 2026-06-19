import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { HttpService } from '../../../../../libraries/src/lib/shared/services/http';
import { Category } from '../../../../../libraries/src/lib/shared/models/category.model';
import CategoryLayout from "./category-layout/category-layout";
import { RouterLink } from "@angular/router";

@Component({
  imports: [CategoryLayout, RouterLink],
  templateUrl: './categories.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Categories {
  readonly #http = inject(HttpService);

  readonly categories = signal<Category[]>([]);

  getAll() {
    this.#http.get<Category[]>('/api/categories', (res) => {
      this.categories.set(res);
    });
  }

  ngOnInit() {
    this.getAll();
  }
}
