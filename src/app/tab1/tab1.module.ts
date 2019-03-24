import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {ArtistInfoComponent} from "../components/artist-info/artist-info.component";
import { RouterModule} from '@angular/router';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [
      Tab1Page,
      ArtistInfoComponent
  ]
})
export class Tab1PageModule {}
