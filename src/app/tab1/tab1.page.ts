import { Component } from '@angular/core';
import { UpdateService } from '../update.service';
import { RestService } from '../rest.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	
	data: any;

	signInData = { name: '', approved: false};

	startTime = this.updateService.startTime;
	notificationList : any[] = [];
	currentSongId = -1;
	songList: any[] = [];

	artistInfo: any;

	secondsRemaining;
	displayTime;
	hasFinished : boolean = false;

	constructor(public updateService: UpdateService,
				public restService: RestService,
				public scroller: ViewportScroller) {
		if(localStorage.getItem("token")) {
		//	this.isLoggedIn = true;
		}
	}

	ionViewWillEnter(){
		this.getInfo();
		if (this.displayTime == undefined && this.startTime != undefined) {
			this.secondsRemaining = (Date.parse(this.startTime) - Date.now()) / 1000;
			this.timerTick();
		}
		console.log("hohoho");
		this.logTime();
	}
	
	getInfo() {
		this.restService.getEvent().then((res) => {
			this.data = res;
			console.log(this.data);
			this.artistInfo = this.data.artistInfo;
			this.songList = this.data.songList;
		}, (err) => {
			
		});
	}
	

	logTime() {
		setTimeout(() => {
			if (this.displayTime == undefined && this.startTime != undefined) {
				this.secondsRemaining = (Date.parse(this.startTime) - Date.now()) / 1000;
				this.timerTick();
			} else if (this.startTime != this.updateService.startTime) {
				setTimeout(() => {
					this.secondsRemaining = 0;
				}, 1000);
				this.startTime = this.updateService.startTime;
				this.secondsRemaining = (Date.parse(this.startTime) - Date.now()) / 1000;
				this.timerTick();
			}
			if (this.notificationList.length != this.updateService.notificationList.length) {
				this.notificationList = this.updateService.notificationList;
			}
			console.log("hehehe " + this.notificationList.length + " " + this.startTime + " " + this.updateService.startTime + " " + this.displayTime);
			this.logTime();
        }, 5000);
	}

	timerTick() {
		setTimeout(() => {
			if (this.secondsRemaining > 0 && this.startTime == this.updateService.startTime) {
				this.secondsRemaining--;
				this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
                this.timerTick();
            }
            else {
                this.hasFinished = true;
            }
        }, 1000);
	}

	getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }
}
