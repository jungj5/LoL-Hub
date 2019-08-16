export interface ComponentState {
  fullContent: Content[];
  selectedContentType: string;
  selectedRole: string;
  isLoading: boolean;
}

export interface Content {
  type: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
  creatorName: string;
  createdAt: string;
  embedLink: string;
  viewCount?: number;
  redditInfo?: object;
  videoClipInfo?: object;
  upvotes?: number;
}
