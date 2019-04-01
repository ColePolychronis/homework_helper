CREATE DATABASE homeworkhelper;
use homeworkhelper;

CREATE TABLE login_cred (
    usid INT NOT NULL AUTO_INCREMENT,
    us VARCHAR(25),
    pa VARCHAR(25),
    PRIMARY KEY (usid)
);

CREATE TABLE events (
  user VARCHAR(25),
  title VARCHAR(25),
  startTime VARCHAR(100),
  endTime VARCHAR(100),
  estimatedTime FLOAT(10, 2),
  confidence INT,
  easyHard INT,
  assignClass VARCHAR(100),
  assignType VARCHAR(100),
  actualTime FLOAT(10, 2),
  predictedTime FLOAT(10,2),
  completed BOOLEAN,
  timeSpent FLOAT(10, 2)
);

INSERT INTO login_cred(us, pa) values('cole', 'colespass');
INSERT INTO login_cred(us, pa) values('jenny', 'jennyspass');
INSERT INTO login_cred(us, pa) values('william', 'williamspass');




