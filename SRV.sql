-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: SRV
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cliente` (
  `rut_cliente` int(32) NOT NULL,
  `telefono` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fecha_nac` date DEFAULT NULL,
  PRIMARY KEY (`rut_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` VALUES (19328308,934823003,'Juanito.Tojones@gmail.com','1996-03-12'),(19824957,937918293,'Pato.el.jugoso.hinojosa@gmail.com','1230-05-02'),(19887114,942423701,'sebita.33@gmail.com','1998-03-01'),(19941255,929304884,'alex.toro.s25@gmail.com','1998-06-25'),(20010905,986399270,'Vale.raza.aria.clavijo@gmail.com','1998-07-31'),(20343124,923482397,'Facu.elFucking.Martinez@gmail.com','1998-10-29');
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Direccion_sucursal`
--

DROP TABLE IF EXISTS `Direccion_sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Direccion_sucursal` (
  `id_sucursal` int(11) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `numero` int(11) NOT NULL,
  PRIMARY KEY (`id_sucursal`),
  CONSTRAINT `Direccion_sucursal_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `Sucursal` (`id_sucursal`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Direccion_sucursal`
--

LOCK TABLES `Direccion_sucursal` WRITE;
/*!40000 ALTER TABLE `Direccion_sucursal` DISABLE KEYS */;
INSERT INTO `Direccion_sucursal` VALUES (10,'General cruz','Valparaiso','Valparaiso',228),(20,'Alvarez','Valparaiso','Vina del mar',877),(30,'San Diego','Santiago','Santiago',1102),(40,'Maipu','Antofagasta','Antofagasta',605),(50,'Chacabuco','Atacama','Copiapo',812),(60,'Juan Antonio Ríos','Coquimbo','Coquimbo',1640),(70,'5 Ote.','Maule','Talca',1201),(80,'Las heras','Concepcion','Concepcion',1001),(90,'Espana','Araucania','Temuco',478),(100,'Av. Pdte. Ibáñez','Los lagos','Puerto Montt',1431);
/*!40000 ALTER TABLE `Direccion_sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Empleado`
--

DROP TABLE IF EXISTS `Empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Empleado` (
  `rut_empleado` int(32) NOT NULL,
  `id_sucursal` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`rut_empleado`),
  KEY `id_sucursal` (`id_sucursal`),
  CONSTRAINT `Empleado_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `Sucursal` (`id_sucursal`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Empleado`
--

LOCK TABLES `Empleado` WRITE;
/*!40000 ALTER TABLE `Empleado` DISABLE KEYS */;
INSERT INTO `Empleado` VALUES (5225667,10,'pedro@gmail.com','Rentador','pdAutomatico16'),(5234457,10,'alfonso@gmail.com','Rentador','alo8856'),(5333333,10,'nate.g@gmail.com','Administrador','admin'),(5345774,10,'michael@gmail.com','Rentador','jacksonFive5'),(5345775,30,'arturo.v@gmail.com','Rentador','arturoTiene6'),(5443443,20,'juan@gmail.com','Rentador','jsonRdirect2'),(5663865,10,'antonio@gmail.com','Rentador','antmanSinPoderes0'),(5699666,10,'eliverto@gmail.com','Rentador','eli1063'),(5888777,10,'frosties@gmail.com','Rentador','frosnike10');
/*!40000 ALTER TABLE `Empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Nombre_cliente`
--

DROP TABLE IF EXISTS `Nombre_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Nombre_cliente` (
  `rut_cliente` int(32) NOT NULL,
  `primer_nom` varchar(30) NOT NULL,
  `apellido_pat` varchar(30) NOT NULL,
  `apellido_mat` varchar(30) NOT NULL,
  PRIMARY KEY (`rut_cliente`),
  CONSTRAINT `Nombre_cliente_ibfk_1` FOREIGN KEY (`rut_cliente`) REFERENCES `Cliente` (`rut_cliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Nombre_cliente`
--

LOCK TABLES `Nombre_cliente` WRITE;
/*!40000 ALTER TABLE `Nombre_cliente` DISABLE KEYS */;
INSERT INTO `Nombre_cliente` VALUES (19328308,'Juan','Valenzuela','Canto'),(19824957,'Patricio','Hinojosa','Godoy'),(19887114,'Sebastian','Medina','Guzman'),(19941255,'Alex','Toro','Sepulveda'),(20010905,'Valentina','Clavijo','Baack'),(20343124,'Facundo','Martinez','Gulle');
/*!40000 ALTER TABLE `Nombre_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Nombre_empleado`
--

DROP TABLE IF EXISTS `Nombre_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Nombre_empleado` (
  `rut_empleado` int(32) NOT NULL,
  `primer_nom` varchar(30) DEFAULT NULL,
  `apellido_pat` varchar(30) DEFAULT NULL,
  `apellido_mat` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`rut_empleado`),
  CONSTRAINT `Nombre_empleado_ibfk_1` FOREIGN KEY (`rut_empleado`) REFERENCES `Empleado` (`rut_empleado`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Nombre_empleado`
--

LOCK TABLES `Nombre_empleado` WRITE;
/*!40000 ALTER TABLE `Nombre_empleado` DISABLE KEYS */;
INSERT INTO `Nombre_empleado` VALUES (5225667,'Pedro','Martinez','Gonzalez'),(5234457,'Alfonso','Munoz','Castro'),(5333333,'Nate','Diaz','Tapia'),(5345774,'Michael','Cardenas','Gonzalez'),(5345775,'Arturo','Soto','Soto'),(5443443,'Juan','Sepulveda','Castro'),(5663865,'Antonio','Sanchez','Vargas'),(5699666,'Eliverto','Goldlit','Reifeth'),(5888777,'Frosties','Rojas','Cortes');
/*!40000 ALTER TABLE `Nombre_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Renta`
--

DROP TABLE IF EXISTS `Renta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Renta` (
  `id_renta` int(11) NOT NULL AUTO_INCREMENT,
  `rut_cliente` int(32) DEFAULT NULL,
  `matricula` varchar(6) DEFAULT NULL,
  `estado` enum('Cancelada','En Curso','Finalizada') DEFAULT NULL,
  `fecha_retiro` datetime DEFAULT NULL,
  `local_retiro` int(11) DEFAULT NULL,
  `region_retiro` varchar(40) DEFAULT NULL,
  `fecha_devolucion` datetime DEFAULT NULL,
  `local_devolucion` int(11) DEFAULT NULL,
  `region_devolucion` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id_renta`),
  KEY `rut_cliente` (`rut_cliente`),
  KEY `matricula` (`matricula`),
  CONSTRAINT `Renta_ibfk_1` FOREIGN KEY (`rut_cliente`) REFERENCES `Cliente` (`rut_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Renta_ibfk_2` FOREIGN KEY (`matricula`) REFERENCES `Vehiculo` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Renta`
--

LOCK TABLES `Renta` WRITE;
/*!40000 ALTER TABLE `Renta` DISABLE KEYS */;
INSERT INTO `Renta` VALUES (1,19941255,'ALOM25','En Curso','2019-08-02 13:00:00',10,'Valparaiso','2019-11-30 08:30:00',10,'Valparaiso'),(2,19887114,'MOLA77','Cancelada','2019-05-01 11:00:00',70,'Maule','2019-07-20 08:30:00',10,'Valparaiso'),(3,19824957,'APEX21','Finalizada','2019-01-01 11:00:00',70,'Maule','2019-08-13 08:45:00',30,'Santiago'),(4,20343124,'UKWO27','En Curso','2019-04-05 15:00:00',60,'Coquimbo','2019-07-10 14:30:00',60,'Coquimbo'),(5,19328308,'AADQ37','Finalizada','2019-05-05 14:30:00',90,'Araucania','2019-10-20 17:15:00',90,'Araucania');
/*!40000 ALTER TABLE `Renta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Siniestro`
--

DROP TABLE IF EXISTS `Siniestro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Siniestro` (
  `id_siniestro` int(11) NOT NULL,
  `matricula` varchar(6) DEFAULT NULL,
  `fecha_siniestro` date DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_siniestro`),
  KEY `matricula` (`matricula`),
  CONSTRAINT `Siniestro_ibfk_1` FOREIGN KEY (`matricula`) REFERENCES `Vehiculo` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Siniestro`
--

LOCK TABLES `Siniestro` WRITE;
/*!40000 ALTER TABLE `Siniestro` DISABLE KEYS */;
/*!40000 ALTER TABLE `Siniestro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sucursal`
--

DROP TABLE IF EXISTS `Sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sucursal` (
  `id_sucursal` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `hora_apertura` time DEFAULT NULL,
  `hora_cierre` time DEFAULT NULL,
  PRIMARY KEY (`id_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sucursal`
--

LOCK TABLES `Sucursal` WRITE;
/*!40000 ALTER TABLE `Sucursal` DISABLE KEYS */;
INSERT INTO `Sucursal` VALUES (10,'general.c.v@gmail.com','07:10:00','22:00:00'),(20,'alvarez.v.v@gmail.com','02:50:00','23:00:00'),(30,'sandiego.s.s@gmail.com','05:30:00','24:00:00'),(40,'maipu.a.a@gmail.com','08:59:00','22:00:00'),(50,'chacabuco.a.c@gmail.com','08:59:00','22:00:00'),(60,'juanar.c.c@gmail.com','08:59:00','22:00:00'),(70,'cincoote.m.t@gmail.com','08:59:00','22:00:00'),(80,'lasheras.c.c@gmail.com','08:59:00','22:00:00'),(90,'espana.a.t@gmail.com','08:59:00','22:00:00'),(100,'avpedte.l.p@gmail.com','08:59:00','22:00:00');
/*!40000 ALTER TABLE `Sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehiculo`
--

DROP TABLE IF EXISTS `Vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vehiculo` (
  `matricula` varchar(6) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `anio` date DEFAULT NULL,
  `kilometraje` int(40) NOT NULL,
  `precio` int(32) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`matricula`),
  KEY `id_sucursal` (`id_sucursal`),
  CONSTRAINT `Vehiculo_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `Sucursal` (`id_sucursal`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehiculo`
--

LOCK TABLES `Vehiculo` WRITE;
/*!40000 ALTER TABLE `Vehiculo` DISABLE KEYS */;
INSERT INTO `Vehiculo` VALUES ('AADQ37',90,'SUV','Chevrolet','Tracker','rojo','2019-03-12',1550,31000,1),('ALCZ25',90,'Furgoneta','Toyota','Hiace','verde','2019-01-23',3450,23000,0),('ALOM25',20,'Motocicleta Deportiva','Honda','CBR1000','rojo','2019-02-21',190,190000,1),('APEX21',30,'Automovil','Audi','A4','negro','2011-03-01',330,255000,1),('ASSW11',10,'Camioneta','Ford','F20','negro','2019-02-01',230,400000,0),('DFAR54',70,'Automovil','Toyota','Hilux','naranjo','2019-01-03',220,22000,0),('FEFG35',40,'Scooter','Yamaha','NMAX','blanco','2019-05-01',120,90000,0),('HJNG12',50,'SUV','Chery','Tiggo 5','rojo','2019-02-04',250,21000,0),('HVYD21',20,'SUV','Chery','Tiggo 5','rojo','2019-02-01',120,210000,0),('IHYT73',50,'Automovil','Kia','Rio 5','blanco','2017-05-14',260,29000,0),('KFCH90',60,'Scooter','Yamaha','NMAX','azul','2019-04-26',100,10000,0),('KLLD09',30,'Automovil','Mitsubishi','Lancer Evo','negro','2019-02-01',220,300000,0),('LKKA19',80,'SUV','Kia','Sportage C','negro','2019-03-12',950,30000,0),('MNGA12',60,'Motocicleta Deportiva','Honda','CBR1000','negro','2019-02-13',300,19000,0),('MOLA77',70,'Automovil','Alfa Romeo','Giulia Quadrifoglio','cafe','2019-03-12',220,50000,1),('NKSH67',10,'AutoMovil','Hiundait','Accent','verde','2019-04-10',180,249000,0),('UKWO27',60,'Automovil','Ford','Fiesta','negro','2019-01-15',250,30000,1),('VTRW23',100,'Automovil','Ford','Fiesta','plomo','2019-01-03',250,300000,0),('XD4913',100,'Automovil','Chevrolet','Aveo','blanco','2005-10-12',150,120000,0),('XF3O13',20,'Automovil','Subaru','Impreza','amarillo','2000-01-25',200,100000,0),('XSZA51',40,'Camioneta','Mitsubishi','L-200','rojo','2019-03-12',300,39000,0),('YETA69',80,'Camioneta','Nissan','NP300','naranjo','2018-11-30',280,27000,0);
/*!40000 ALTER TABLE `Vehiculo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-17 13:20:48
