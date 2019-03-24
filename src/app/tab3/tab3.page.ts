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
	
	signInData = { name: '', approved: false};
	
	msg = { name: '', message: ''};
	
	myMsgs : any[] = [];
	
	messages : any[] = [{
      "author" : "xyz",
      "text" : "2019-03-23T22:42:38"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalggggggal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    },{
      "author" : "xyzz",
      "text" : "lalalal"
    }];
	

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
		if (this.signInData.name != '') {
			this.signInData.approved = true;
			console.log(this.signInData);
			this.msg.name = this.signInData.name;
		}
	}

	
	sendMessage() {
		if (this.signInData.approved) {
			console.log(this.msg);
			this.restService.sendMsg(this.msg).then((res) => {
				this.data = res;
				this.myMsgs.push(this.data.id);
			}, (err) => {
				
			});
			this.msg.message = '';
		}
	}

	
}
