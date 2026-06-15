import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { prefersReducedMotion } from '../../utils/motion.util';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (prefersReducedMotion()) {
      return;
    }

    anime({
      targets: '#loader circle',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutQuart',
      duration: 1500,
      delay: 300,
      direction: 'alternate',
      loop: false,
    });

    anime({
      targets: '#loader path',
      fill: '#00FFB3',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutQuart',
      duration: 1500,
      delay: 500,
      direction: 'alternate',
      loop: false,
    });
  }
}
