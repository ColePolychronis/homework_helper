CREATE DATABASE homeworkhelper;
use homeworkhelper;

CREATE TABLE login_cred (
    us VARCHAR(25),
    pa VARCHAR(25)
);

CREATE TABLE events (
  user VARCHAR(25),
  title VARCHAR(25),
  startTime VARCHAR(100),
  endTime VARCHAR(100)
);

INSERT INTO login_cred values('cole', 'colespass');
INSERT INTO login_cred values('jenny', 'jennyspass');
INSERT INTO login_cred values('william', 'williamspass');




