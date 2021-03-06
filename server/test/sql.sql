
CREATE DATABASE IF NOT EXISTS end DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS think_user(
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `pwd` VARCHAR(255) NOT NULL DEFAULT 'e10adc3949ba59abbe56e057f20f883e',
  `nickname` VARCHAR(255) NOT NULL DEFAULT '',
  `avatar` VARCHAR(255) NOT NULL DEFAULT '',
  `role` INT(1) NOT NULL DEFAULT 2,
  `age` INT NOT NULL DEFAULT 10,
  `sex` INT(1) NOT NULL DEFAULT 0,
  `flag` INT(1) NOT NULL DEFAULT 1,
  `createTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ( `id` ),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO think_user(
  username,
  pwd,
  role
) VALUES('admin', MD5('admin'), 1);