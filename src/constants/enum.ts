
export enum StorageSource {
    R2 = 0,
    Telegram = 1,
}

export enum FileType {
    Image = 1,
    Text = 2,
    Document = 3,
    Audio = 4,
    Video = 5,
    Compressed = 6,
    System = 7,
    Unknown = 8
}

export enum FileStatus {
    Pending = 0,
    Uploading = 1,
    Uploaded = 2,
    Failed = 3,
}

export enum AccountType {
    Free = "Free",
    Pro = "Pro",
    Plus = "Plus",
}

export enum OrderType {
    Pro = "UPGRADE_PRO",
    Plus = "UPGRADE_PLUS",
}

export enum SubscriptionType {
    Monthly = "Monthly",
    Yearly = "Yearly",
}