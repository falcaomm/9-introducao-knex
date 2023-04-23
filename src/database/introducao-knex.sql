-- Active: 1682210969242@@127.0.0.1@3306

-- Tabelas já foram criadas
CREATE TABLE bands (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE songs (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    band_id TEXT NOT NULL,
    FOREIGN KEY (band_id) REFERENCES bands (id)
);

SELECT * FROM bands;

INSERT INTO bands (id, name)
VALUES("001", "acdc");


SELECT * FROM bands
WHERE id = "fulano";


UPDATE bands 
SET name = "name"
WHERE id = "id";