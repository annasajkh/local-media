export interface VideoData {
	is_short: boolean;
	thumbnail_url: string;
	title: string;
	url: string;
	duration: string | undefined;
	channel_name: string | null;
	channel_is_verified: boolean | null;
	background_color: string | null;
}

export enum YoutubeSearchType {
    VIDEO,
    SHORT,
    ALL
}

export interface YoutubeSearchData {
    query: string,
    count: number,
    type: YoutubeSearchType
}