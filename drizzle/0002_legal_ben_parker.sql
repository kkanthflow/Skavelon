CREATE TABLE `indexnow_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`apiKey` varchar(255) NOT NULL,
	`autoSubmit` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `indexnow_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `indexnow_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`urls` text NOT NULL,
	`apiKey` varchar(255) NOT NULL,
	`status` int NOT NULL,
	`responseMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `indexnow_submissions_id` PRIMARY KEY(`id`)
);
