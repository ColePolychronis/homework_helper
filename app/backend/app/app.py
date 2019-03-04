from typing import List, Dict
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json

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
    for (us, pa) in cursor:
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
    for index, (user, title, startTime, endTime, estimatedTime, confidence, easyHard, assignClass, assignType, easyHardExpected, actualTime) in enumerate(cursor):
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
            "easyHardExpected": easyHardExpected,
            "actualTime": actualTime
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
    sql = "INSERT INTO login_cred values(%s, %s)"
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
    easyHardExpected = parameters['easyHardExpected']
    actualTime = parameters['actualTime']

# CREATE TABLE events (
#   user VARCHAR(25),
#   title VARCHAR(25),
#   startTime VARCHAR(100),
#   endTime VARCHAR(100),
#   estimatedTime FLOAT(10, 2),
#   confidence INT,
#   easyHard INT,
#   assignClass VARCHAR(100),
#   assignType VARCHAR(100),
#   easyHardExpected INT,
#   actualTime FLOAT(10, 2)
# );
    sql = "INSERT INTO events values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (user, title, startTime, endTime, estimatedTime, confidence, easyHard, assignClass, assignType, easyHardExpected, actualTime)

    config = db_config;
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute(sql, val);
    connection.commit();
    cursor.close()
    connection.close()

    return "Events retrieved"
    # return jsonify({'accuracy': round(clf.score(X, y) * 100, 2)})




if __name__ == '__main__':
    app.run(host='0.0.0.0')
