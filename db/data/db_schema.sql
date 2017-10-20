SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `vk_hack_afisha` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `vk_hack_afisha`;

CREATE TABLE IF NOT EXISTS `users` (
    `userId` int(15) NOT NULL,
    `eventId` int (15) NOT NULL,
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
