export interface VideoData {
	is_short: boolean;
	thumbnail_url: string;
	title: string;
	url: string;
	duration: string | undefined;
	channel_name: string | null;
	channel_is_verified: boolean | null;
	view_count: number;
	background_color: string | null;
}
