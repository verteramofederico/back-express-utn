# back-express-utn

{
DATABASE

Name = resto_bd 
utf8_unicode_ci

CREATE TABLE `resto_bd`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

INSERT INTO resto_bd.users
Values (null, 'federico', MD5('federico'));
SELECT * FROM resto_bd.users

MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB_NAME=

}