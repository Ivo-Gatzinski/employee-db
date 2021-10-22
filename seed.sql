use field_trip_db;

insert into trips (trip_date, destination)
  VALUES 
    ("2020-11-15", "Scripps Aquarium"),
    ("2020-12-08", "Taylor Guitar Factory"),
    ("2020-12-14", "Disneyland");

insert into participants (first_name, last_name, is_minor, parent_id)
  VALUES 
    ("Ivo", "Gatzinski", false, null),
    ("Bridgette", "Quiambao", false, null),
    ("John", "Desrosiers", true, 1),
    ("Erica", "Snyder", true, 1),
    ("Elena", "Liu", true, 2);

