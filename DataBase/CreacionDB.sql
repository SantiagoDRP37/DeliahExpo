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
  constraint usuario_id_pk primary key (`idusuario`));
  
  CREATE TABLE `platos`(
  `idPlato` INT NOT NULL AUTO_INCREMENT,																																																																																																																																																																																																																										
  `nombre`  VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `Foto` VARCHAR(200) NOT NULL,
   constraint platos_id_pk primary key (`idPlato`)); 
  
  create table `pedidos`(
   `idPedido` INT  NOT NULL AUTO_INCREMENT,
   `estado`	VARCHAR(45) NOT NULL,
   `fecha` DATETIME NOT NULL,
   `descripcion` VARCHAR(45) NOT NULL,
   `formaDePago` VARCHAR(45) NOT NULL,
   `id_usuario` INT NOT NULL,
    constraint pedidos_id_pk primary key (`idPedido`),
    constraint usuario_id_fk foreign key (`id_usuario`) references `usuarios`( `idusuario`));
    
  -- tabla de relaciones muchos a muchos
  /*CREATE TABLE `platos_favoritos`(
	`usuario_id` int  NOT NULL,
	constraint platosFav_usuario_id_fk foreign key (`usuario_id`) REFERENCES `usuarios` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	`plato_id` int not null,
    constraint platosFav_plato_id_fk foreign key (`plato_id`) references `platos`(`idPlato`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
   );
   */
    CREATE TABLE `pedidos_platos`(
    `id_pedidos_platos` INT NOT NULL AUTO_INCREMENT,
	`pedidos_id` int  NOT NULL,
	FOREIGN KEY (`pedidos_id`) REFERENCES `deli`.`pedidos` (`idPedido`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	`plato_id` int not null,
    foreign key (`plato_id`) references `deli`.`platos`(`idPlato`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    constraint pedidos_platos_id_pk primary key (`id_pedidos_platos`)
   );
   -- Poblar tablas
   -- Poblar tabla de usuario
   
	insert into usuarios (userNick,nombre,apellido,correo,telefono,contrasenea,tipoUser)
		values 
			("alfa",
			"david",
			"rojas",
			"santix37@hotmail.com",
			7410118,
			"contrasenea"
			,1);
	insert into usuarios (userNick,nombre,apellido,correo,telefono,contrasenea,tipoUser)
		values 
			("luigi",
			"Luis",
			"Peres",
			"luisMaster@hotmail.com",
			789456,
			"pudin123"
			,0);
	insert into usuarios (userNick,nombre,apellido,correo,telefono,contrasenea,tipoUser)
		values 
			("mario",
			"mario",
			"bros",
			"marioBros@hotmail.com",
			75315964,
			"chocolate23"
			,0);
            

 insert into platos (nombre,precio,Foto)
		values 
			("Porcion Pizza",
			4300,
			"https://img.freepik.com/foto-gratis/rebanada-pizza-caliente-queso-derretido_34936-282.jpg?size=626&ext=jpg");
 
 insert into platos (nombre,precio,Foto)
		values 
			("Lasagña",
			8000,
			"https://res.cloudinary.com/mundo/image/upload/c_crop,h_3228,w_5738,x_192,y_0/h_409,w_727/v1564406376/lasagna_gf1zpi.jpg");
 
  insert into platos (nombre,precio,Foto)
		values 
			("Cocacola",
			2000,
			"https://mercaldas.vteximg.com.br/arquivos/ids/157452-1300-1300/62748.jpg?v=636918829628970000");
            
 -- Poblar tabla de pedidos
 insert into pedidos (estado,fecha,descripcion,formaDePago,id_usuario)
		values 
			("Recibido",
			now(),
			"1 Pizza de carner",
            "efectivo",
            1);
insert into pedidos (estado,fecha,descripcion,formaDePago,id_usuario)
		values 
			("preparando",
			now(),
			"1 lasagña",
            "tarjeta",
            2);
insert into pedidos (estado,fecha,descripcion,formaDePago,id_usuario)
		values 
			("entregado",
			now(),
			" 1 cocacola",
            "efectivo",
            3);
 -- Poblar tabla de pedidos_platos
 insert into pedidos_platos (pedidos_id,plato_id)
		values 
			(1,1),
            (2,3),
            (3,2);