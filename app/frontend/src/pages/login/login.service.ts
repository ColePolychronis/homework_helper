import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { newCredential } from '../home/types';

const SERVER_URL: string = 'http://localhost:5000/api/';

@Injectable()
export class LoginService {    

    constructor(private http: Http) {
    }

    public getClients(){
        // this.http.post(`${SERVER_URL}train`, svcParameters).map((res) => res.json());
        return this.http.get(`${SERVER_URL}clients`).map((res) => res.json());
    }

    public checkLogin(username: string, password: string){
        
        return this.getClients().map(res => {
            res = JSON.stringify(res);
            let creds = JSON.parse(res);

            for(let client in creds){
                if(client == username){
                    if(creds[client] == password){
                        return true
                    }
                }
            }
            return false;
        });
    }

    public newUser(newCred: newCredential){
        console.log("newUser")
        this.http.post(`${SERVER_URL}clients`, newCred).subscribe((res) => {
            console.log(res)
            this.getClients().subscribe((res) => {
                console.log(res)
            })
        })
    }

}
