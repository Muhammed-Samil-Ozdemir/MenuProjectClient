import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [
    RouterLink
  ],
  selector: 'app-food-layout',
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
}
