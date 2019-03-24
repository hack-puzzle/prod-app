import { Injectable } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScreenOrientationService {

  orientationType = this.screenOrientation.type;

  constructor(public screenOrientation: ScreenOrientation) {
    this.screenOrientation.onChange().subscribe(() => {
      this.orientationType = this.screenOrientation.type;
    });
  }


}
