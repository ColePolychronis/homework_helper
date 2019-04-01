import {Injectable} from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
// import { newCredential } from '../home/types';
import { event }  from '../home/types';

const SERVER_URL: string = 'http://localhost:5000/api/';

@Injectable()
export class EventService {    

    

    constructor(private http: Http) {
    }

    public getEvents(){
        return this.http.get(`${SERVER_URL}events`).map((res) => res.json());
    }

    public newEvent(newEv: event){
        return this.http.post(`${SERVER_URL}events`, newEv).map((res) => {
            console.log("Event Prediciton")
            console.log(res.json())
            this.getEvents().subscribe((res) => {
                console.log("EVENTS")
                console.log(res)
            });
            return res.json();
        });
    }

    public updateEvent(ev: event){
        return this.http.post(`${SERVER_URL}updateEvent`, ev).map((res) => {
            // console.log("Event Prediciton")
            // console.log(res.json())
            this.getEvents().subscribe((res) => {
                console.log("EVENTS")
                console.log(res)
            });
            return res.json();
        });
    }

}
