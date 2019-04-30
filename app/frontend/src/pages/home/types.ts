// Credential Class
export class newCredential {
    username: string = "";
    password: string = "";
}

// Event (assignment) Class
export class event {
    startTime: string = "";
    endTime: string = "";
    timeCompletion: string = "";
    confidence: number = 3;
    easyHard: number = 3;
    title: string = "";
    user: string = "";
    assignClass = "";
    assignType = "";
    actualTime = 0;

    predictedTime = 0;
    pt_hr = 0;
    pt_min = 0;

    completed: boolean = false;
    timeSpent: number = 0;
}
