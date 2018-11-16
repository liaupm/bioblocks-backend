SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tfg
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tfg
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bioblocks` DEFAULT CHARACTER SET utf8 ;
USE `bioblocks` ;

-- -----------------------------------------------------
-- Table `tfg`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`usuario` (
  `idusuario` INT NOT NULL,
  `nombre_y_apellidos` VARCHAR(45) NOT NULL,
  `nombre_usuario` VARCHAR(45) NOT NULL,
  `password` VARCHAR(10) NOT NULL,
  `genero` VARCHAR(20) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `correo` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tfg`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`proyecto` (
  `idproyecto` INT NOT NULL,
  `nombre_proyecto` VARCHAR(45) NOT NULL,
  `link` VARCHAR(300) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `ultima_modificacion` DATETIME NOT NULL,
  `publico` TINYINT(1) NOT NULL,
  PRIMARY KEY (`idproyecto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tfg`.`usuario_pertenece_proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`usuario_pertenece_proyecto` (
  `usuario_idusuario` INT NOT NULL,
  `proyecto_idproyecto` INT NOT NULL,
  PRIMARY KEY (`usuario_idusuario`, `proyecto_idproyecto`),
  INDEX `fk_usuario_has_proyecto_proyecto1_idx` (`proyecto_idproyecto` ASC),
  INDEX `fk_usuario_has_proyecto_usuario_idx` (`usuario_idusuario` ASC),
  CONSTRAINT `fk_usuario_has_proyecto_usuario`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `tfg`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_proyecto_proyecto1`
    FOREIGN KEY (`proyecto_idproyecto`)
    REFERENCES `tfg`.`proyecto` (`idproyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tfg`.`GrupoUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`GrupoUsuarios` (
  `idGrupoUsuarios` INT NOT NULL,
  `nombre_grupo` VARCHAR(45) NOT NULL,
  `id_administrador` INT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `publico` TINYINT(1) NOT NULL,
  PRIMARY KEY (`idGrupoUsuarios`),
  UNIQUE INDEX `id_administrador_UNIQUE` (`id_administrador` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tfg`.`usuario_pertenece_GrupoUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`usuario_pertenece_GrupoUsuarios` (
  `usuario_idusuario` INT NOT NULL,
  `GrupoUsuarios_idGrupoUsuarios` INT NOT NULL,
  PRIMARY KEY (`usuario_idusuario`, `GrupoUsuarios_idGrupoUsuarios`),
  INDEX `fk_usuario_has_GrupoUsuarios_GrupoUsuarios1_idx` (`GrupoUsuarios_idGrupoUsuarios` ASC),
  INDEX `fk_usuario_has_GrupoUsuarios_usuario1_idx` (`usuario_idusuario` ASC),
  CONSTRAINT `fk_usuario_has_GrupoUsuarios_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `tfg`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_GrupoUsuarios_GrupoUsuarios1`
    FOREIGN KEY (`GrupoUsuarios_idGrupoUsuarios`)
    REFERENCES `tfg`.`GrupoUsuarios` (`idGrupoUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tfg`.`proyecto_pertenece_GrupoUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`proyecto_pertenece_GrupoUsuarios` (
  `proyecto_idproyecto` INT NOT NULL,
  `GrupoUsuarios_idGrupoUsuarios` INT NOT NULL,
  PRIMARY KEY (`proyecto_idproyecto`, `GrupoUsuarios_idGrupoUsuarios`),
  INDEX `fk_proyecto_has_GrupoUsuarios_GrupoUsuarios1_idx` (`GrupoUsuarios_idGrupoUsuarios` ASC),
  INDEX `fk_proyecto_has_GrupoUsuarios_proyecto1_idx` (`proyecto_idproyecto` ASC),
  CONSTRAINT `fk_proyecto_has_GrupoUsuarios_proyecto1`
    FOREIGN KEY (`proyecto_idproyecto`)
    REFERENCES `tfg`.`proyecto` (`idproyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyecto_has_GrupoUsuarios_GrupoUsuarios1`
    FOREIGN KEY (`GrupoUsuarios_idGrupoUsuarios`)
    REFERENCES `tfg`.`GrupoUsuarios` (`idGrupoUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tfg`.`GrupoProyectos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`GrupoProyectos` (
  `idGrupoProyectos` INT NOT NULL,
  `nombreGrupoProyectos` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGrupoProyectos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tfg`.`proyecto_pertenece_GrupoProyectos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`proyecto_pertenece_GrupoProyectos` (
  `proyecto_idproyecto` INT NOT NULL,
  `GrupoProyectos_idGrupoProyectos` INT NOT NULL,
  PRIMARY KEY (`proyecto_idproyecto`, `GrupoProyectos_idGrupoProyectos`),
  INDEX `fk_proyecto_has_GrupoProyectos_GrupoProyectos1_idx` (`GrupoProyectos_idGrupoProyectos` ASC),
  INDEX `fk_proyecto_has_GrupoProyectos_proyecto1_idx` (`proyecto_idproyecto` ASC),
  CONSTRAINT `fk_proyecto_has_GrupoProyectos_proyecto1`
    FOREIGN KEY (`proyecto_idproyecto`)
    REFERENCES `tfg`.`proyecto` (`idproyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyecto_has_GrupoProyectos_GrupoProyectos1`
    FOREIGN KEY (`GrupoProyectos_idGrupoProyectos`)
    REFERENCES `tfg`.`GrupoProyectos` (`idGrupoProyectos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
