// ==========================================================================================================
// 
// Typescript class for the LoginService service
// 
// This typescript class implements the login service, which allows the frontend to send GET and POST
// requests to the backend server to enable the frontend to get all registered users and add a new
// user
// 
// ========================================================================================================== 

// import relevant components and pages
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { newCredential } from '../home/types';

// URL for the Flask server running on localhost
const SERVER_URL: string = 'http://10.0.1.14:5000/api/';

@Injectable()
export class LoginService {    

    // Constructor
    constructor(private http: Http) {
    }

    // Method: getClients
    // returns all users currently registered with Homework Helper
    public getClients(){
        return this.http.get(`${SERVER_URL}clients`).map((res) => res.json());
    }

    // Method: checkLogin
    // returns true if the input username and password belong to a user currently registered
    // with Homework Helper, else returns false
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

    // Method: newUser
    // passes a new credential set to the backend to be saved to the database
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
