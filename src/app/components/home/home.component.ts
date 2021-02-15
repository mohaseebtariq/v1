import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import anime from 'animejs/lib/anime.es';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    // animation('fadeIn', 0.5)
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    anime({
      targets: '.main-section',
      translateY: [100, 0],
      duration: 1000,
      easing: 'easeOutSine',
    });
  }

  ngOnInit(): void {}

}
