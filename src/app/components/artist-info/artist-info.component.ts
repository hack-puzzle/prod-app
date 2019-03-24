import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss'],
})
export class ArtistInfoComponent implements OnInit {

  @Input()
  artistInfo: any;

  constructor() { }

  ngOnInit() {}

}
