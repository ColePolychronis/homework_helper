// export class Iris {
//     sepalLength: number = 5.0;
//     sepalWidth: number = 3.5;
//     petalLength: number = 2.5;
//     petalWidth: number = 1.2;
// }

// export class ProbabilityPrediction {
//     name: string;
//     value: number;
// }

// export class SVCParameters {
//     C: number = 2.0;
// }

// export class SVCResult {
//     accuracy: number;
// }

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
}

// startTime: new Date().toISOString(), 
//     endTime: new Date().toISOString(), 
//     // allDay: false 
//     confidence: 3,
//     easyHard: 3,
//     timeCompleteion: new Date().toISOString()
