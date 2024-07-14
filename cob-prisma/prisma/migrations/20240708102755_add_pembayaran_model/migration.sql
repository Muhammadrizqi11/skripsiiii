-- CreateTable
CREATE TABLE `pembayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah` DOUBLE NOT NULL,
    `metode` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `waktuBayar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pemesananId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_pemesananId_fkey` FOREIGN KEY (`pemesananId`) REFERENCES `pemesanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
