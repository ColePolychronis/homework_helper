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

    // public getClients(){
    //     // this.http.post(`${SERVER_URL}train`, svcParameters).map((res) => res.json());
    //     return this.http.get(`${SERVER_URL}clients`).map((res) => res.json());
    // }

    // public checkLogin(username: string, password: string){
        
    //     return this.getClients().map(res => {
    //         res = JSON.stringify(res);
    //         let creds = JSON.parse(res);

    //         for(let client in creds){
    //             if(client == username){
    //                 if(creds[client] == password){
    //                     return true
    //                 }
    //             }
    //         }
    //         return false;
    //     });
    // }

    // public newUser(newCred: newCredential){
    //     console.log("newUser")
    //     this.http.post(`${SERVER_URL}clients`, newCred).subscribe((res) => {
    //         console.log(res)
    //         this.getClients().subscribe((res) => {
    //             console.log(res)
    //         })
    //     })
    // }

}
