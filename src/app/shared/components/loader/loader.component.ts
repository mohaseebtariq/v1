import { AfterViewInit, Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
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
  ngOnInit(): void {}
}
