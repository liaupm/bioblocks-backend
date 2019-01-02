-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bioblocks
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bioblocks
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bioblocks` DEFAULT CHARACTER SET utf8 ;
USE `bioblocks` ;

-- -----------------------------------------------------
-- Table `bioblocks`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `creation_date` DATE NOT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bioblocks`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`project` (
  `id_project` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `last_modification` DATETIME NOT NULL,
  `public` TINYINT(1) NOT NULL,
  `owner` INT NOT NULL,
  PRIMARY KEY (`id_project`),
  UNIQUE INDEX `idproyect_UNIQUE` (`id_project` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bioblocks`.`user_belongs_project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`user_belongs_project` (
  `id_user` INT NOT NULL,
  `id_project` INT NOT NULL,
  PRIMARY KEY (`id_user`, `id_project`),
  INDEX `fk_usuario_has_proyecto_proyecto1_idx` (`id_project` ASC),
  INDEX `fk_usuario_has_proyecto_usuario_idx` (`id_user` ASC),
  CONSTRAINT `fk_usuario_has_proyecto_usuario`
    FOREIGN KEY (`id_user`)
    REFERENCES `bioblocks`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_proyecto_proyecto1`
    FOREIGN KEY (`id_project`)
    REFERENCES `bioblocks`.`project` (`id_project`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bioblocks`.`projects_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`projects_group` (
  `id_group` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_group`),
  UNIQUE INDEX `idgroup_UNIQUE` (`id_group` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bioblocks`.`project_belongs_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`project_belongs_group` (
  `id_project` INT NOT NULL,
  `id_group` INT NOT NULL,
  PRIMARY KEY (`id_project`, `id_group`),
  INDEX `fk_proyecto_has_GrupoProyectos_GrupoProyectos1_idx` (`id_group` ASC),
  INDEX `fk_proyecto_has_GrupoProyectos_proyecto1_idx` (`id_project` ASC),
  CONSTRAINT `fk_proyecto_has_GrupoProyectos_proyecto1`
    FOREIGN KEY (`id_project`)
    REFERENCES `bioblocks`.`project` (`id_project`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyecto_has_GrupoProyectos_GrupoProyectos1`
    FOREIGN KEY (`id_group`)
    REFERENCES `bioblocks`.`projects_group` (`id_group`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
