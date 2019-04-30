// ==========================================================================================================
// 
// Typescript class for the EventService service
// 
// This typescript class implements the event service, which allows the frontend to send GET and POST
// requests to the backend server to enable the frontend to get all currently tracked assignments, update
// an assignment that is already being tracked, and add a completely new assignment to be tracked
// 
// ========================================================================================================== 

// import relevant components and pages
import {Injectable} from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { event }  from '../home/types';

// URL for the Flask server running on localhost
const SERVER_URL: string = 'http://10.0.1.14:5000/api/';

@Injectable()
export class EventService {    
    
    // Constructor
    constructor(private http: Http) {
    }

    // Method: getEvents
    // returns all assignments currently being tracked with Homework Helper
    public getEvents(){
        return this.http.get(`${SERVER_URL}events`).map((res) => res.json());
    }

    // Method: newEvent
    // passes a new event to the backend to be saved to the database
    public newEvent(newEv: event){
        return this.http.post(`${SERVER_URL}events`, newEv).map((res) => {
            this.getEvents().subscribe((res) => {
            });
            return res.json();
        });
    }

    // Method: updateEvent
    // passes an event that needs to be updated to the backend to be saved to the database
    public updateEvent(ev: event){
        return this.http.post(`${SERVER_URL}updateEvent`, ev).map((res) => {
            this.getEvents().subscribe((res) => {
            });
            return res.json();
        });
    }

}
