CREATE DATABASE  IF NOT EXISTS `deli`;

USE deli; 																	-- Uso de base de datos deli

CREATE TABLE `usuarios` (											-- creacion de tabla de usuarios
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `userNick` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `telefono` INT NOT NULL,
  `contrasenea` VARCHAR(45) NOT NULL,
  `tipoUser` boolean NOT NULL,
  PRIMARY KEY (`idusuario`));
  
  CREATE TABLE `platos`(
  `idPlato` INT NOT NULL AUTO_INCREMENT,																																																																																																																																																																																																																										
  `nombre`  VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `Foto` BLOB NOT NULL,
  PRIMARY KEY (`idPlato`));
  
  create table `pedidos`(
   `idPedido` INT  NOT NULL AUTO_INCREMENT,
   `estado`	VARCHAR(45) NOT NULL,
   `fecha` DATE NOT NULL,
   `descripcion` VARCHAR(45) NOT NULL,
   `formaDePago` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`idPedido`)
  );
  -- tabla de relaciones muchos a muchos
  CREATE TABLE `usuarios_platos`(
	`usuario_id` int  NOT NULL,
	FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	`plato_id` int not null,
    foreign key (`plato_id`) references `deli`.`platos`(`idPlato`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
   );
    CREATE TABLE `pedidos_platos`(
	`pedidos_id` int  NOT NULL,
	FOREIGN KEY (`pedidos_id`) REFERENCES `deli`.`pedidos` (`idPedido`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	`plato_id` int not null,
    foreign key (`plato_id`) references `deli`.`platos`(`idPlato`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
   );
    CREATE TABLE `pedidos_usuarios`(
	`pedidos_id` int  NOT NULL,
	FOREIGN KEY (`pedidos_id`) REFERENCES `deli`.`pedidos` (`idPedido`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	`usuario_id` int  NOT NULL,
	FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
   );
    insert into usuarios (userNick,nombre,apellido,correo,telefono,contrasenea,tipoUser)values ("alfa","david","rojas","santix37@hotmail.com",7410118,"contrasenea",0)