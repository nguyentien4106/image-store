export interface Channel {
    channelId: number;
    description: string;
    channelName: string;
    messageCount: number;
    id: string;
    createdAt: string;
    createdBy: string | null;
    lastModified: string | null;
    lastModifiedBy: string | null;
}

  
export interface AddChannelPayload {
    channelName: string;
    description?: string;
}