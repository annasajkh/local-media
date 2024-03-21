/* eslint-disable @typescript-eslint/no-explicit-any */

import TopBar from "../components/MainArea/TopBar/TopBar";
import "./LocalYoutube.css";

import { useState } from "react";
import SearchBar from "../components/MainArea/TopBar/SearchBar";

import loadingAnimation from "../assets/animations/loading.gif";
import VideoItem from "../components/MainArea/LocalYoutube/VideoItem";
import ReactPlayer from "react-player";
import { VideoData } from "../utils/InterfaceTypes";


export default function LocalYoutube() {
	const [youtubeSearchResult, setYoutubeSearchResult] = useState<VideoData[] | null>(null);
	const [videoPlayerUrl, setVideoPlayerUrl] = useState<string>();

	async function searchYoutubeVideo(query: string) {
		setYoutubeSearchResult([]);

		const result: VideoData[] = await window.electron.searchYoutubeVideo(query, 9 * 5);
		setYoutubeSearchResult(result);
	}

	function onVideoItemClick(url: string) {
		setVideoPlayerUrl(url);
	}

	function reactPlayerContainer() {
		return (
			<div className="react-player-container">
				<ReactPlayer style={{ marginTop: "32px", marginBottom: "32px" }} className="react-player" url={videoPlayerUrl} controls={true} />
			</div>
		);
	}

	function videoArea() {
		return (
			<>
                { videoPlayerUrl && reactPlayerContainer() }
				
                <div className="video-list-container">
					{youtubeSearchResult?.map((videoData: VideoData) => (
						<VideoItem key={videoData.url} onClick={onVideoItemClick} videoData={videoData} />
					))}
				</div>
			</>
		);
	}

	function loadingImage() {
		return (
			<div className="loading-image-container">
				<img src={loadingAnimation} alt="loading..." />
			</div>
		);
	}

	return (
		<div className="local-youtube">
			<TopBar>
				<SearchBar onSearchEnter={searchYoutubeVideo} />
			</TopBar>

			{youtubeSearchResult?.length === 0 ? loadingImage() : videoArea()}
		</div>
	);
}
