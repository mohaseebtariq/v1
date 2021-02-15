import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


declare var createAnalytics: (analyticsTrackingId: string) => void;


@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  init() {
    const analyticsTrackingId = environment.googleAnalyticsTrackingID;
    createAnalytics(analyticsTrackingId);
  }

}