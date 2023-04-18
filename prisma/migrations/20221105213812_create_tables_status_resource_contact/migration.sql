-- CreateTable
CREATE TABLE `contract` (
    `id_contract` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(200) NOT NULL,
    `payload` DECIMAL(32, 12) NOT NULL,
    `origin_planet` VARCHAR(45) NOT NULL,
    `destination_planet` VARCHAR(45) NOT NULL,
    `id_pilot` INTEGER NULL,
    `id_status` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `contract_description_key`(`description`),
    PRIMARY KEY (`id_contract`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resource` (
    `id_resource` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `weight` DECIMAL(32, 12) NOT NULL,
    `id_contract` INTEGER NOT NULL,

    PRIMARY KEY (`id_resource`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id_status` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_id_pilot_fkey` FOREIGN KEY (`id_pilot`) REFERENCES `pilot`(`id_pilot`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id_status`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resource` ADD CONSTRAINT `resource_id_contract_fkey` FOREIGN KEY (`id_contract`) REFERENCES `contract`(`id_contract`) ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO `status` (`status`) VALUES ("Open");
INSERT INTO `status` (`status`) VALUES ("In progress");
INSERT INTO `status` (`status`) VALUES ("Closed");