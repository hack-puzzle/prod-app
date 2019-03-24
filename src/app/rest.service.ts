import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, timer} from "rxjs";
import { UpdateService } from './update.service';

	const httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'})
	};
	
	const apiUrl = 'http://hack-university-server.herokuapp.com/';

@Injectable({
	providedIn: 'root'
})
export class RestService {

	constructor(public http: HttpClient, public updateService : UpdateService) { }
  
	getEvent() {
		return new Promise((resolve, reject) => {
			// let headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
			this.http.get(this.getApiUrl() + "concert-info")
				.subscribe(res => {					
				//	console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});
	}
	
	signIn(name) {
		return new Promise((resolve, reject) => {
			this.http.get(this.getApiUrl() + 'registration/' + name.userName)
				.subscribe(res => {
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});
	}
	
	sendMsg(message) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();
			headers.append('content-type', 'application/json');
			let body = new HttpParams();
			body = body.set('text', message.text);
			body = body.set('userId', message.userId);
			this.http.post(this.getApiUrl() + 'send-msg', body, {headers: headers})
				.subscribe(res => {
					console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});
	}

	getRequest(url: string) {
		return new Promise((resolve, reject) => {
			// let headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
			this.http.get(url)
				.subscribe(res => {
				//	console.log(res); // log
					resolve(res);
				}, (err) => {
					console.log(err); // log
					reject(err);
				});
		});
	}

	longPolling() {
		this.getRequest(this.getApiUrl() + "concert-update")
			.then(res => {
				this.updateService.update(res);
			})
			.finally(() => {
				timer(5000).subscribe(() => this.longPolling());
			});
	}
	
	messageLongPolling() {
		this.getRequest(this.getApiUrl() + "chat-update")
			.then(res => {
				this.updateService.updateMessages(res);
			})
			.finally(() => {
				timer(1000).subscribe(() => this.messageLongPolling());
			});
	}

	getApiUrl() {
		return apiUrl + this.getConcertParam() + '/';
	}

	getConcertParam() {
		let concertParam = localStorage.getItem('concertParam');
		console.log('Current param: ' + concertParam);
		if (concertParam != null) {
			return concertParam;
		} else {
			return 'team';
		}
	}
	
}
