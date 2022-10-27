/*create database blackjack;*/

use blackjack;

CREATE TABLE `blackjack`.`carta` (
  `idcarta` INT NOT NULL AUTO_INCREMENT,
  `numero` INT NOT NULL,
  `tipo` VARCHAR(1) NOT NULL,
  `valor` INT NOT NULL,
  `img` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcarta`));
  
CREATE TABLE `blackjack`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `blackjack`.`player` (
  `idplayer` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(10) NOT NULL,
  `password` VARCHAR(8) NOT NULL,
  `idrol` INT NULL,
  PRIMARY KEY (`idplayer`),
  INDEX `rol_fk_idx` (`idrol` ASC) VISIBLE,
  CONSTRAINT `rol_fk`
    FOREIGN KEY (`idrol`)
    REFERENCES `blackjack`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
  
CREATE TABLE `blackjack`.`resultado` (
  `idresultado` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idresultado`));
  
CREATE TABLE `blackjack`.`detalle_resultado` (
  `idresultado` INT NOT NULL,
  `idcarta` INT NOT NULL,
  `idplayer` INT NOT NULL,
  PRIMARY KEY (`idresultado`, `idcarta`, `idplayer`),
  INDEX `carta_fk_idx` (`idcarta` ASC) VISIBLE,
  INDEX `player_fk_idx` (`idplayer` ASC) VISIBLE,
  CONSTRAINT `resultado_fk`
    FOREIGN KEY (`idresultado`)
    REFERENCES `blackjack`.`resultado` (`idresultado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `carta_fk`
    FOREIGN KEY (`idcarta`)
    REFERENCES `blackjack`.`carta` (`idcarta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `player_fk`
    FOREIGN KEY (`idplayer`)
    REFERENCES `blackjack`.`player` (`idplayer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
INSERT INTO `blackjack`.`rol` (`id`, `descripcion`) VALUES ('1', 'CRUPIER');
INSERT INTO `blackjack`.`rol` (`id`, `descripcion`) VALUES ('2', 'JUGADOR');
INSERT INTO `blackjack`.`rol` (`id`, `descripcion`) VALUES ('3', 'ADMIN');

INSERT INTO `blackjack`.`player` (`nombre`, `password`,`idrol`) VALUES ('CRUPIER', '', '1');
INSERT INTO `blackjack`.`player` (`nombre`, `password`, `idrol`) VALUES ('EZEQUIEL', '123456', '2');

INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('1', 'C', '11', '../../assets/img/cartas/1C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('2', 'C', '2', '../../assets/img/cartas/2C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('3', 'C', '3', '../../assets/img/cartas/3C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('4', 'C', '4', '../../assets/img/cartas/4C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('5', 'C', '5', '../../assets/img/cartas/5C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('6', 'C', '6', '../../assets/img/cartas/6C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('7', 'C', '7', '../../assets/img/cartas/7C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('8', 'C', '8', '../../assets/img/cartas/8C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('9', 'C', '9', '../../assets/img/cartas/9C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('10', 'C', '10', '../../assets/img/cartas/10C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('11', 'C', '10', '../../assets/img/cartas/11C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('12', 'C', '10', '../../assets/img/cartas/12C.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('13', 'C', '10', '../../assets/img/cartas/13C.svg');

INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('1', 'H', '11', '../../assets/img/cartas/1H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('2', 'H', '2', '../../assets/img/cartas/2H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('3', 'H', '3', '../../assets/img/cartas/3H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('4', 'H', '4', '../../assets/img/cartas/4H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('5', 'H', '5', '../../assets/img/cartas/5H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('6', 'H', '6', '../../assets/img/cartas/6H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('7', 'H', '7', '../../assets/img/cartas/7H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('8', 'H', '8', '../../assets/img/cartas/8H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('9', 'H', '9', '../../assets/img/cartas/9H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('10', 'H', '10', '../../assets/img/cartas/10H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('11', 'H', '10', '../../assets/img/cartas/11H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('12', 'H', '10', '../../assets/img/cartas/12H.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('13', 'H', '10', '../../assets/img/cartas/13H.svg');

INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('1', 'D', '11', '../../assets/img/cartas/1D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('2', 'D', '2', '../../assets/img/cartas/2D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('3', 'D', '3', '../../assets/img/cartas/3D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('4', 'D', '4', '../../assets/img/cartas/4D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('5', 'D', '5', '../../assets/img/cartas/5D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('6', 'D', '6', '../../assets/img/cartas/6D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('7', 'D', '7', '../../assets/img/cartas/7D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('8', 'D', '8', '../../assets/img/cartas/8D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('9', 'D', '9', '../../assets/img/cartas/9D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('10', 'D', '10', '../../assets/img/cartas/10D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('11', 'D', '10', '../../assets/img/cartas/11D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('12', 'D', '10', '../../assets/img/cartas/12D.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('13', 'D', '10', '../../assets/img/cartas/13D.svg');

INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('1', 'S', '11', '../../assets/img/cartas/1S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('2', 'S', '2', '../../assets/img/cartas/2S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('3', 'S', '3', '../../assets/img/cartas/3S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('4', 'S', '4', '../../assets/img/cartas/4S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('5', 'S', '5', '../../assets/img/cartas/5S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('6', 'S', '6', '../../assets/img/cartas/6S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('7', 'S', '7', '../../assets/img/cartas/7S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('8', 'S', '8', '../../assets/img/cartas/8S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('9', 'S', '9', '../../assets/img/cartas/9S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('10', 'S', '10', '../../assets/img/cartas/10S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('11', 'S', '10', '../../assets/img/cartas/11S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('12', 'S', '10', '../../assets/img/cartas/12S.svg');
INSERT INTO `blackjack`.`carta` (`numero`, `tipo`, `valor`, `img`) VALUES ('13', 'S', '10', '../../assets/img/cartas/13S.svg');

INSERT INTO `blackjack`.`resultado` (`fecha`) VALUES (now());

INSERT INTO `blackjack`.`detalle_resultado` (`idresultado`, `idcarta`, `idplayer`) VALUES ('1', '24', '2');
INSERT INTO `blackjack`.`detalle_resultado` (`idresultado`, `idcarta`, `idplayer`) VALUES ('1', '13', '1');
INSERT INTO `blackjack`.`detalle_resultado` (`idresultado`, `idcarta`, `idplayer`) VALUES ('1', '44', '2');
