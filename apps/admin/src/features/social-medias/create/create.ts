import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';

@Component({
  imports: [FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateSocialMedia {
  readonly name = signal<string>("");
  readonly url = signal<string>("");

  readonly #http = inject(HttpService);

  create(form: NgForm) {
    this.#http.post("/api/social-medias", form.value, () => {
      form.reset();
    });
  }
}
