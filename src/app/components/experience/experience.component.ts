import { ContentfulService } from './../../shared/services/contentful.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import "core-js/stable";
import "regenerator-runtime/runtime"; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExperienceComponent implements OnInit {

  jobs$: Observable<any>;

  constructor(private contentfulApiService: ContentfulService) { }

  ngOnInit() { 
    this.jobs$ = this.contentfulApiService.getDetails('jobs');
  }

}
