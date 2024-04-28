-- CreateTable
CREATE TABLE `locations` (
    `id` CHAR(36) NOT NULL,
    `zipcode` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `locations_zipcode_key`(`zipcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weather` (
    `id` CHAR(36) NOT NULL,
    `dateutc` BIGINT NOT NULL,
    `tempf` DOUBLE NOT NULL,
    `humidity` INTEGER NOT NULL,
    `windspeedmph` DOUBLE NOT NULL,
    `windgustmph` DOUBLE NOT NULL,
    `maxdailygust` DOUBLE NOT NULL,
    `winddir` INTEGER NOT NULL,
    `uv` INTEGER NOT NULL,
    `solarradiation` DOUBLE NOT NULL,
    `hourlyrainin` DOUBLE NOT NULL,
    `eventrainin` DOUBLE NOT NULL,
    `dailyrainin` DOUBLE NOT NULL,
    `weeklyrainin` DOUBLE NOT NULL,
    `monthlyrainin` DOUBLE NOT NULL,
    `totalrainin` DOUBLE NOT NULL,
    `battout` INTEGER NOT NULL,
    `tempinf` DOUBLE NOT NULL,
    `humidityin` INTEGER NOT NULL,
    `baromrelin` DOUBLE NOT NULL,
    `baromabsin` DOUBLE NOT NULL,
    `feelsLike` DOUBLE NOT NULL,
    `dewPoint` DOUBLE NOT NULL,
    `feelsLikein` DOUBLE NOT NULL,
    `dewPointin` DOUBLE NOT NULL,
    `lastRain` DATETIME(3) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weatherlocations` (
    `weatherId` CHAR(36) NOT NULL,
    `locationId` CHAR(36) NOT NULL,

    PRIMARY KEY (`weatherId`, `locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weatherlocations` ADD CONSTRAINT `weatherlocations_weatherId_fkey` FOREIGN KEY (`weatherId`) REFERENCES `weather`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weatherlocations` ADD CONSTRAINT `weatherlocations_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
