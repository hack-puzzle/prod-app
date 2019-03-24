import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { RestService } from './rest.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
	
	data: any;
	
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
	private restService: RestService,
	private route: ActivatedRoute
  ) {
    this.initializeApp();
  }

  initializeApp() {
      let concertParam = this.route.snapshot.queryParamMap.get('concert');
      if (concertParam != null) {
          console.log('Change concert param to: ' + concertParam);
          localStorage.setItem('concertParam', concertParam);
      }
		
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	  this.restService.longPolling();
	  this.restService.messageLongPolling();
  }
}
