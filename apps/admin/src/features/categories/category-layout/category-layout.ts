import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'tr[app-category-layout]',
  templateUrl: './category-layout.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryLayout {
  readonly id = input<string>("");
  readonly name = input<string>("");

  readonly #http = inject(HttpService);
  readonly #router = inject(Router);

  delete(id: string) {
    this.#http.delete(`/api/categories/${id}`, (res) => {
      window.location.reload();
    });
  }
}
