import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { Category } from '../../../../../../libraries/src/lib/shared/models/category.model';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: "tr[app-food-layout]",
  templateUrl: './food-layout.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FoodLayout {
  readonly id = input<string>("");
  readonly name = input<string>("");
  readonly description = input<string>("");
  readonly price = input<number>(0);
  readonly imageUrl = input<string>("");
  readonly isActive = input<boolean>(true);
  readonly category = input<Category | null>(null);

  readonly #http = inject(HttpService);

  delete(id: string) {
    this.#http.delete(`/api/foods/${id}`, (res) => {
      window.location.reload();
    });
  }
}