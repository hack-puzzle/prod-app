import {Component, Input} from '@angular/core';
import { UpdateService } from '../update.service';
import { RestService } from '../rest.service';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
	
	data: any;
	
	approved: boolean = false;
	
	signInData = { userName: ''};
	
	msg = { userId: '0', text: ''};
	
	messages : any[] = [];
	

	constructor(public updateService: UpdateService,
				public restService: RestService) {
		if(localStorage.getItem("token")) {
		//	this.isLoggedIn = true;
		}
	}
	
	ionViewWillEnter(){
		this.logTime();
	}

	logTime() {
		setTimeout(() => {
			if (this.messages.length < this.updateService.messages.length) {
				this.messages = this.updateService.messages;
			}
			console.log("hehehe " + this.messages.length + " " + this.updateService.messages.length);
			this.logTime();
        }, 5000);
	}
	
	signIn() {
		if (this.signInData.userName != '') {
			this.restService.signIn(this.signInData).then((res) => {
				this.data = res;
				this.approved = true;
				console.log(this.data);
				this.msg.userId = this.data.userId;
			}, (err) => {
				
			});
		}
	}

	
	sendMessage() {
		if (this.approved) {
			console.log(this.msg);
			this.restService.sendMsg(this.msg).then((res) => {
				this.data = res;
			}, (err) => {
				
			});
			this.msg.text = '';
		}
	}

	
}
