-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parcode` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `type` ENUM('COACH', 'TRAINEE', 'SECRETARY') NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `date_of_birth` DATETIME(3) NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT CONCAT(phone_number, '-default-password'),
    `subscription_type` ENUM('PRIVATE', 'NOT_PRIVATE') NOT NULL,
    `subscription_date` DATETIME(3) NOT NULL,
    `subscription_start_date` DATETIME(3) NOT NULL,
    `subscription_months` INTEGER NOT NULL,
    `subscription_classes` INTEGER NOT NULL,
    `remaining_classes` INTEGER NOT NULL,
    `subscription_end_date` DATETIME(3) NOT NULL,
    `training_name` VARCHAR(191) NULL,
    `paid` BOOLEAN NOT NULL,
    `reminder` BOOLEAN NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL,
    `offer_name` VARCHAR(191) NULL,
    `medical_problem` VARCHAR(191) NULL,
    `surgeries` VARCHAR(191) NULL,
    `goal` VARCHAR(191) NULL,
    `sunday_note` VARCHAR(191) NULL,
    `monday_note` VARCHAR(191) NULL,
    `tuesday_note` VARCHAR(191) NULL,
    `wednesday_note` VARCHAR(191) NULL,
    `thursday_note` VARCHAR(191) NULL,
    `friday_note` VARCHAR(191) NULL,
    `saturday_note` VARCHAR(191) NULL,
    `general_note` VARCHAR(191) NULL,

    UNIQUE INDEX `User_parcode_key`(`parcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InBody` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `BMI` DOUBLE NOT NULL,
    `current_situation` VARCHAR(191) NOT NULL,
    `daily_water_need` DOUBLE NOT NULL,
    `calories_required` DOUBLE NOT NULL,
    `muscle_weight` DOUBLE NOT NULL,
    `fat_mass` DOUBLE NOT NULL,
    `bone_density` DOUBLE NOT NULL,
    `belly_fat` DOUBLE NOT NULL,
    `diet_file` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `length` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `shoulder` DOUBLE NOT NULL,
    `chest` DOUBLE NOT NULL,
    `below_chest` DOUBLE NOT NULL,
    `middle` DOUBLE NOT NULL,
    `stomach` DOUBLE NOT NULL,
    `buttocks` DOUBLE NOT NULL,
    `thigh` DOUBLE NOT NULL,
    `arm` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InBody` ADD CONSTRAINT `InBody_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
