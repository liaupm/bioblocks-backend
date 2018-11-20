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
  `id_user` INT NOT NULL,
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
-- Table `bioblocks`.`projects_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`projects_group` (
  `id_group` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_group`),
  UNIQUE INDEX `idgroup_UNIQUE` (`id_group` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bioblocks`.`user_has_project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`user_has_project` (
  `user_id_fk` INT NOT NULL,
  `project_id_fk` INT NOT NULL,
  PRIMARY KEY (`user_id_fk`, `project_id_fk`),
  INDEX `fk_user_has_project_project1_idx` (`project_id_fk` ASC),
  INDEX `fk_user_has_project_user1_idx` (`user_id_fk` ASC),
  CONSTRAINT `fk_user_has_project_user1`
    FOREIGN KEY (`user_id_fk`)
    REFERENCES `bioblocks`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_project_project1`
    FOREIGN KEY (`project_id_fk`)
    REFERENCES `bioblocks`.`project` (`id_project`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bioblocks`.`project_has_projects_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bioblocks`.`project_has_projects_group` (
  `project_id_fk` INT NOT NULL,
  `projects_group_fk` INT NOT NULL,
  PRIMARY KEY (`project_id_fk`, `projects_group_fk`),
  INDEX `fk_project_has_projects_group_projects_group1_idx` (`projects_group_fk` ASC),
  INDEX `fk_project_has_projects_group_project1_idx` (`project_id_fk` ASC),
  CONSTRAINT `fk_project_has_projects_group_project1`
    FOREIGN KEY (`project_id_fk`)
    REFERENCES `bioblocks`.`project` (`id_project`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_has_projects_group_projects_group1`
    FOREIGN KEY (`projects_group_fk`)
    REFERENCES `bioblocks`.`projects_group` (`id_group`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
