drop database if exists field_trip_db;
create database field_trip_db;
use field_trip_db;

CREATE TABLE trips (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  trip_date DATE NOT NULL,
  destination VARCHAR(255) NOT NULL
);

CREATE TABLE participants (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  is_minor BOOLEAN NOT NULL DEFAULT false,
  parent_id INT,
  FOREIGN KEY (parent_id)
  REFERENCES participants(id)
);
