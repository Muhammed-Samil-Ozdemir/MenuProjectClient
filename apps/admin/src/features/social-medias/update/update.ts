import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../../../libraries/src/lib/shared/services/http';
import { SocialMedia } from '../../../../../../libraries/src/lib/shared/models/social-media.model';

@Component({
  imports: [FormsModule],
  templateUrl: './update.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateSocialMedia {
  readonly id = signal<string>("");
  readonly name = signal<string>("");
  readonly url = signal<string>("");

  readonly #http = inject(HttpService);
  readonly #route = inject(ActivatedRoute);

  update(form: NgForm) {
    if (!form.valid) return;

    this.#http.put(`/api/social-medias/${this.id()}`, form.value, () => {
      form.reset();
    }, () => {
      alert("Sosyal medya güncellenemedi.");
    });
  }

    ngOnInit() {
      const id = this.#route.snapshot.paramMap.get('id')!;
      this.id.set(id);
  
      this.#http.get<SocialMedia>(`/api/social-medias/${id}`, (res) => {
        this.name.set(res.name);
        this.url.set(res.url);
      });
    }
}
