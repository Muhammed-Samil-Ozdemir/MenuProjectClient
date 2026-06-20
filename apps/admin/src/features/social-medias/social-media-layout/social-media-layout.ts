import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';

@Component({
  imports: [
    RouterLink
  ],
  selector: 'tr[app-social-media-layout]',
  templateUrl: './social-media-layout.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SocialMediaLayout {
  readonly id = input<string>("");
  readonly name = input<string>("");
  readonly url = input<string>("");

  readonly #http = inject(HttpService);

  delete(id: string) {
    this.#http.delete(`/social-medias/${id}`, () => {
      window.location.reload();
    });
  }
}
