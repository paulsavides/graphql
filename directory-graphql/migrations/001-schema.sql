CREATE TABLE properties
(
    id INTEGER PRIMARY  KEY,
    name TEXT,
    value TEXT
);

INSERT INTO properties (name, value) VALUES ('schema_version', '1');

CREATE TABLE position
(
    id INTEGER PRIMARY KEY,
    description TEXT
);

CREATE TABLE building
(
    id INTEGER PRIMARY KEY,
    name TEXT,
    address_number INTEGER,
    street TEXT
);

CREATE TABLE person
(
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    position_id INTEGER,
    building_id INTEGER,
    CONSTRAINT person_fk_position FOREIGN KEY (position_id) REFERENCES position (id),
    CONSTRAINT person_fk_building FOREIGN KEY (building_id) REFERENCES building (id)
);