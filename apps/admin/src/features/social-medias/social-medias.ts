import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import SocialMediaLayout from './social-media-layout/social-media-layout';
import { SocialMedia } from '../../../../../libraries/src/lib/shared/models/social-media.model';
import { HttpService } from '../../../../../libraries/src/lib/shared/services/http';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    SocialMediaLayout,
    RouterLink
  ],
  templateUrl: './social-medias.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SocialMedias {
  readonly socialMedias = signal<SocialMedia[]>([]);

  readonly #http = inject(HttpService);

  getAll() {
    this.#http.get<SocialMedia[]>("/api/social-medias", (res) => {
      this.socialMedias.set(res);
    });
  }

  ngOnInit() {
    this.getAll();
  }
}
