import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, timer} from "rxjs";
import { UpdateService } from './update.service';

	const httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'})
	};
	
	const apiUrl = 'http://hack-university-server.herokuapp.com/' + "radiotapok/";

@Injectable({
	providedIn: 'root'
})
export class RestService {

	constructor(public http: HttpClient, public updateService : UpdateService) { }
  
	getEvent(id) {
		return new Promise((resolve, reject) => {
			// let headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
			this.http.get(apiUrl + "concert-start")
				.subscribe(res => {					
				//	console.log(res); // log
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
		this.getRequest(apiUrl + "concert-update")
			.then(res => {
				this.updateService.update(res);
				timer(5000).subscribe(() => this.longPolling());
			})
			.catch(() => {
				timer(5000).subscribe(() => this.longPolling());
			});
	}
	
}
