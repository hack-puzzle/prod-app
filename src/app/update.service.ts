import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
	
	startTime: any;
	notificationList: any[] = [];
	currentSongId: any;
	data: any;

	constructor() { }
  
	update(data) {
		this.data = data;
		this.startTime = this.data.startTime;
		this.notificationList = this.data.notificationList;
	//	for (var notification of this.data.notificationList) {
	//		this.notificationList.push(notification);
	//	}
		this.currentSongId = this.data.currentSongId;
		console.log(data);
	}
}
