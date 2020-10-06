
/*************************************Single table**********************************/
CREATE TABLE Human(
name VARCHAR(128),
age int
) 

/*insert Data*/
INSERT INTO Human (name, age) VALUES ('Ahmed', '23')
INSERT INTO Human (name, age) VALUES ('shrief', '25')
INSERT INTO Human (name, age) VALUES ('mostafa', '24')
INSERT INTO Human (name, age) VALUES ('heba', '21')
INSERT INTO Human (name, age) VALUES ('salma', '22')

/*Delete Data*/
DELETE FROM Human WHERE age='22'

/*Update Data*/
UPDATE Human SET age='30' WHERE name='Ahmed'

/*Retrive Data*/
SELECT * FROM Human /*Select all the Data in the table Human*/
SELECT * FROM Human where age >22 and age<26  

/*Sorting By order*/ 
SELECT * FROM Human ORDER BY age




/*******************************one to many relation**********************/ 
CREATE TABLE Genre (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
name TEXT
) 

CREATE TABLE Album (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
artist_id INTEGER,
title TEXT
)

CREATE TABLE Track (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT ,
title TEXT,
album_id INTEGER,
genre_id INTEGER,
len INTEGER,
rating INTEGER,
count INTEGER
)

CREATE TABLE Artist (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
name TEXT UNIQUE
) 


insert into Artist (name) values ('Led Zepplin');
insert into Artist (name) values ('AC/DC');
insert into Genre (name) values ('Rock');
insert into Genre (name) values ('Metal')

/**/

insert into Album (title, artist_id) values ('Who Made Who', 2)
insert into Album (title, artist_id) values ('IV', 1)
insert into Track (title, rating, len, count, album_id, genre_id)
values ('Black Dog', 5, 297, 0, 2, 1)
insert into Track (title, rating, len, count, album_id, genre_id)
values ('Stairway', 5, 482, 0, 2, 1)
insert into Track (title, rating, len, count, album_id, genre_id)
values ('About to Rock', 5, 313, 0, 1, 2)
insert into Track (title, rating, len, count, album_id, genre_id)
values ('Who Made Who', 5, 207, 0, 1, 2)
  
/** Join **/
select Album.title, Album.artist_id, Artist.id,Artist.name from Album join Artist on Album.artist_id = Artist.id
select Album.title, Artist.name from Album join Artist on Album.artist_id = Artist.id
select Track.title, Artist.name, Album.title, Genre.name from Track join Genre join Album join Artist on Track.genre_id = Genre.id and Track.album_id = Album.id and Album.artist_id = Artist.id


/*******************************many to many relation**********************/ 
CREATE TABLE user (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
name TEXT,
email TEXT UNIQUE
)

CREATE TABLE Subject (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
title TEXT
)

CREATE TABLE Member (
user_id INTEGER,
subject_id INTEGER,
role INTEGER,
PRIMARY KEY (user_id, subject_id)
)


INSERT INTO User (name, email) VALUES ('Jane', 'jane@tsugi.org');
INSERT INTO student (name, email) VALUES ('Ed', 'ed@tsugi.org');
INSERT INTO student (name, email) VALUES ('Sue', 'sue@tsugi.org');
INSERT INTO Subject (title) VALUES ('Python');
INSERT INTO Subject (title) VALUES ('SQL');
INSERT INTO Subject (title) VALUES ('PHP');

INSERT INTO Member (user_id, subject_id, role) VALUES (1, 1, 1);
INSERT INTO Member (user_id, subject_id, role) VALUES (2, 1, 0);
INSERT INTO Member (user_id,subject_id, role) VALUES (3, 1, 0);
INSERT INTO Member (user_id, subject_id, role) VALUES (1, 2, 0);
INSERT INTO Member (user_id, subject_id, role) VALUES (2, 2, 1);
INSERT INTO Member (user_id, subject_id, role) VALUES (2, 3, 1);
INSERT INTO Member (user_id, subject_id, role) VALUES (3, 3, 0);

SELECT User.name, Subject.title FROM User JOIN Member JOIN Subject ON Member.user_id = User.id AND Member.subject_id = Subject.id ORDER BY User.title, Member.role DESC, User.name