from typing import List, Dict
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json
import os

app = Flask(__name__)
CORS(app)

db_config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'homeworkhelper'
    }

# def favorite_colors() -> List[Dict]:
#     config = db_config;
#     connection = mysql.connector.connect(**config)
#     cursor = connection.cursor()
#     cursor.execute('SELECT * FROM favorite_colors')
#     results = [{name: color} for (name, color) in cursor]
#     cursor.close()
#     connection.close()

#     return results

def clients() -> List[Dict]:
    config = db_config;
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM login_cred')
    # results = [{us: pa} for (us, pa) in cursor]
    results = {}
    for (usid, us, pa) in cursor:
        results[us] = pa
    cursor.close()
    connection.close()

    return results

def events() -> List[Dict]:
    config = db_config;
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM events')
    results = {}
    # for index, (user, title, startTime, endTime) in enumerate(cursor):
    for index, (user, title, startTime, endTime, estimatedTime, confidence, easyHard, assignClass, assignType, actualTime, predictedTime, completed, timeSpent) in enumerate(cursor):
        results[index] = {
            "user": user,
            "title": title,
            "startTime": startTime,
            "endTime": endTime,
            "estimatedTime": estimatedTime,
            "confidence": confidence,
            "easyHard": easyHard,
            "assignClass": assignClass,
            "assignType": assignType,
            "actualTime": actualTime,
            "predictedTime": predictedTime,
            "completed": completed,
            "timeSpent": timeSpent
        }
    cursor.close()
    connection.close()

    return results


@app.route('/api/clients', methods=['GET'])
def index() -> str:
    return json.dumps(clients())

@app.route('/api/clients', methods=['POST'])
def addUser() -> str:
    parameters = request.get_json()
    u = parameters['username']
    p = parameters['password']
    # val = "(\'" + u + "\', \'" + p + "\')"
    sql = "INSERT INTO login_cred(us, pa) values(%s, %s)"
    val = (u, p)

    config = db_config;
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute(sql, val);
    connection.commit();
    cursor.close()
    connection.close()

    return "Added Stuff"
    # print "Login Vals: " + val






@app.route('/api/events', methods=['GET'])
def eventsIndex() -> str:
    return json.dumps(events())

@app.route('/api/updateEvent', methods=['POST'])
def updateEvent() -> str:
    parameters = request.get_json()
    user = parameters['user']
    title = parameters['title']
    completed = parameters['completed']
    timeSpent = parameters['timeSpent']

    config = db_config;
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    sql = "UPDATE events SET completed=%s, timeSpent=timeSpent+%s where user=%s AND title=%s"
    val = (completed, timeSpent, user, title)
    cursor.execute(sql, val);
    connection.commit();
    cursor.close()
    connection.close()

    return json.dumps(events())





@app.route('/api/events', methods=['POST'])
def addEvent() -> str:
    parameters = request.get_json()
    user = parameters['user']
    title = parameters['title']
    startTime = parameters['startTime']
    endTime = parameters['endTime']
    estimatedTime = parameters['timeCompletion']
    confidence = parameters['confidence']
    easyHard = parameters['easyHard']
    assignClass = parameters['assignClass']
    assignType = parameters['assignType']
    actualTime = parameters['actualTime']
    # predictedTime = calculateAssignTime(parameters)
    predictedTime = calculateAssignTime(parameters)
    completed = parameters['completed']
    timeSpent = parameters['timeSpent']

    sql = "INSERT INTO events values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (user, title, startTime, endTime, estimatedTime, confidence, easyHard, assignClass, assignType, actualTime, predictedTime, completed, timeSpent)

    config = db_config;
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute(sql, val);
    connection.commit();
    cursor.close()
    connection.close()

    return jsonify({'prediction': calculateAssignTime(parameters)})
    # return jsonify({'accuracy': round(clf.score(X, y) * 100, 2)})

def calculateAssignTime(parameters) -> str:
    assignmentDict = {}

    # process user time estimate
    user_time_est = parameters['timeCompletion']
    assignmentDict['user_time_est'] = user_time_est

    # process confidence
    confidence = parameters['confidence']
    for i in range(1, 6):
        name = "confidence_" + str(i)
        if i == confidence:
            assignmentDict[name] = 1
        else:
            assignmentDict[name] = 0

    # process easyHard 
    easyHard = parameters['easyHard']
    for i in range(1, 6):
        name = "hard_easy_" + str(i)
        if i == easyHard:
            assignmentDict[name] = 1
        else:
            assignmentDict[name] = 0
    
    # process assignClass
    assignClass = parameters['assignClass']
    assignClasses = ["Mathematics", "Science", "Foreign_Language", "Social_Studies", "Language_&_Literature"]
    for cl in assignClasses:
        name = "class_type_" + cl
        assignmentDict[name] = 0
        if assignClass == "Mathematics" or assignClass == "Science":
            name = "class_type_" + assignClass
            assignmentDict[name] = 1
        elif assignClass == "Foreign Language":
            name = "class_type_Foreign_Language"
            assignmentDict[name] = 1
        elif assignClass == "Social Studies":
            name = "class_type_Social_Studies"
            assignmentDict[name] = 1
        elif assignClass == "Language & Literature":
            name = "class_type_Language_&_Literature"
            assignmentDict[name] = 1
        else:
            name = "class_type_" + cl
            assignmentDict[name] = 0


    # process assignType
    assignType = parameters['assignType']
    assignTypes = ["Homework", "Online_Activity", "Reading", "Takehome_Test", "Study_Guide", "Presentation", "Writing_Prompt", "Essay", "Lab", "Translation_Activity", "Interview"]
    for at in assignTypes:
        name = "assign_type_" + at
        assignmentDict[name] = 0
        if assignType == "Online Activity":
            name = "assign_type_" + "Online_Activity"
            assignmentDict[name] = 1
        elif assignType == "Study Guide":
            name = "assign_type_" + "Study_Guide"
            assignmentDict[name] = 1
        elif assignType == "Takehome Test":
            name = "assign_type_" + "Takehome_Test"
            assignmentDict[name] = 1
        elif assignType == "Writing Prompt":
            name = "assign_type_" + "Writing_Prompt"
            assignmentDict[name] = 1
        elif assignType == "Translation Activity":
            name = "assign_type_" + "Translation_Activity"
            assignmentDict[name] = 1
        else:
            name = "assign_type_" + at
            assignmentDict[name] = 1

    
    prediction = 0

    # with open(os.path.join(os.path.dirname(__file__), 'model.json')) as f:
    #     model_params = json.load(f)
    model_params = {"class_type_Science": 13.0027833735946, "confidence_1": 14.592245652315391, "confidence_3": 3.07309494058943, "confidence_2": 5.891696684957204, "confidence_5": -8.887425741559039, "confidence_4": -1.2154584434764064, "user_time_est": 1.0413421026894385, "assign_type_Reading": -11.352713365761808, "assign_type_Lab": 3.6895321896676827, "assign_type_Writing_Prompt": -2.9059475007341793, "class_type_Mathematics": 23.076564912766408, "class_type_Foreign_Language": 7.740519912076476, "assign_type_Interview": -11.075830407586125, "assign_type_Translation_Activity": -0.6889565327727634, "class_type_Social_Studies": -14.16149001147156, "hard_easy_4": 10.870489972535195, "hard_easy_5": 14.791488024934422, "hard_easy_2": -1.8619093231383756, "hard_easy_3": 2.9518669375842084, "assign_type_Study_Guide": 9.153266646585447, "assign_type_Online_Activity": 5.663135767490296, "assign_type_Takehome_Test": 20.980678105703362, "hard_easy_1": -7.042163268955801, "assign_type_Homework": -5.672573529004104, "assign_type_Presentation": 13.810536876549996, "assign_type_Essay": 24.04559357371683, "hard_easy_expected_4": -1.5718701653593787, "hard_easy_expected_5": -6.6229289150490445, "hard_easy_expected_2": 9.103396511599943, "hard_easy_expected_3": 2.9843261170165434, "hard_easy_expected_1": 17.650870636688914, "class_type_Language_&_Literature": -8.487684916023488}

    for key in assignmentDict:
        prediction += model_params[key]*assignmentDict[key]
    return prediction




if __name__ == '__main__':
    app.run(host='0.0.0.0')
