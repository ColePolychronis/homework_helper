export class newCredential {
    username: string = "test";
    password: string = "testPass";
}

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

    easyHardExpected: number =3;
    actualTime = 0;

    predictedTime = 0;
    pt_hr = 0;
    pt_min = 0;
}
