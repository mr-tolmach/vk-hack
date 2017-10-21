SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `vk_hack_afisha` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `vk_hack_afisha`;

CREATE TABLE IF NOT EXISTS `creations` (
    `eventId` int(15) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `creationId` varchar(1000) NOT NULL,
    `eventName` varchar(1000) NOT NULL,
    `originalName` varchar(1000),
    `description` varchar(1000),
    `editorialComment` varchar(1000),
    `widgetDescription` varchar(1000),
    `synopsis` varchar(1000),
    `rating` DOUBLE,
    `mainPhoto` varchar(1000)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `schedules`(
    `city` varchar(1000) NOT NULL,
    `eventId` int(15) NOT NULL,
    `placeId` varchar(1000) NOT NULL,
    `beginDate` datetime,
    `endDate` datetime,
    `eventDate` datetime,
    FOREIGN KEY (`eventId`) REFERENCES `creations`(`eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `users` (
    `userId` int(15) NOT NULL,
    `eventId` int (15) NOT NULL,
    FOREIGN KEY (`eventId`) REFERENCES `creations`(`eventId`),
    PRIMARY KEY (`userId`, `eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `matches` (
    `currentUserId` int(11) NOT NULL,
    `targetUserId` int(11) NOT NULL,
    `eventId` int (15) NOT NULL,
    `state` ENUM('skip', 'like', 'sent') NOT NULL,
    PRIMARY KEY (`currentUserId`, `targetUserId`, `eventId`),
    FOREIGN KEY (`currentUserId`, `eventId`) REFERENCES `users`(`userId`, `eventId`),
    FOREIGN KEY (`targetUserId`, `eventId`) REFERENCES `users`(`userId`, `eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

GRANT ALL PRIVILEGES ON *.* TO 'dev'@'%';
