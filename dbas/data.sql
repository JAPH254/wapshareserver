--SOCIAL MEDIA APPLICATION DATABASE
--DATABASE
--CREATE DATABASE SOCIALMEDIAPP
--USE SOCIALMEDIAPP
CREATE TABLE USERS(
FULL_NAME VARCHAR(250),
USERNAME VARCHAR(250),
USERID INT PRIMARY KEY IDENTITY(1,1),
EMAIL VARCHAR(255),
USER_PASSWORD VARCHAR(255),
PROFILE_PIC VARCHAR(255),
COVER_PIC VARCHAR (255),
COUNTRY VARCHAR(255),
WEBSITE VARCHAR(255),
PHONE_NUMBER INT 
)

CREATE TABLE POSTS(
POSTID INT PRIMARY KEY IDENTITY(1,1),
CONTENT TEXT,
POSTMAKER VARCHAR(255),
USERID INT,
POSTIMAGE VARCHAR(255),
POSTDATE DATE,
FOREIGN KEY (USERID) REFERENCES USERS(USERID)
)

CREATE TABLE COMMENTS(
COMMENTID INT PRIMARY KEY IDENTITY(1,1),
CONTENT TEXT,
DATE_CREATED DATE,
USERID INT,
POSTID INT,
FOREIGN KEY (USERID) REFERENCES  USERS(USERID),
FOREIGN KEY (POSTID) REFERENCES POSTS(POSTID)
)

CREATE TABLE STORIES (
STORYID INT PRIMARY KEY IDENTITY(1,1),
STORY_IMAGE VARCHAR(255),
USERID INT,
DATE_POSTED DATE,
FOREIGN KEY (USERID) REFERENCES USERS(USERID)
)

CREATE TABLE LIKES(
LIKEID INT PRIMARY KEY IDENTITY (1,1),
USERID INT,
POSTID INT
FOREIGN KEY (USERID) REFERENCES USERS(USERID),
FOREIGN KEY (POSTID) REFERENCES POSTS(POSTID)
)

CREATE TABLE RELATIONS(
RELATIONID INT PRIMARY KEY IDENTITY (1,1),
FOLLOWERUSERID INT,
FOLLOWEDUSERID INT,
FOREIGN KEY (FOLLOWERUSERID) REFERENCES USERS(USERID),
FOREIGN KEY (FOLLOWEDUSERID) REFERENCES USERS(USERID),
)

SELECT * FROM USERS
SELECT * FROM POSTS
SELECT * FROM COMMENTS
SELECT * FROM STORIES
SELECT * FROM LIKES