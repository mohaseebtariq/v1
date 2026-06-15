import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text-loader',
  templateUrl: './text-loader.component.html',
  styleUrls: ['./text-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLoaderComponent {}
