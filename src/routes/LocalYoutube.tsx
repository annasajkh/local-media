import TopBar from "../components/MainArea/TopBar/TopBar";
import "./LocalYoutube.css";

import { useState, useEffect } from "react";
import SearchBar from "../components/MainArea/TopBar/SearchBar";

import loadingAnimation from "../assets/animations/loading.gif";
import VideoItem from "../components/MainArea/LocalYoutube/VideoItem";
import ReactPlayer from "react-player";

export default function LocalYoutube() {
	const [youtubeSearchResult, setYoutubeSearchResult] = useState([]);
	const [videoPlayerUrl, setVideoPlayerUrl] = useState("");

	async function searchYoutubeVideo(query: string) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await (window as any).electronAPI.searchYoutubeVideo(query, 100);
		setYoutubeSearchResult(JSON.parse(result));
	}

	function onVideoItemClick(url: string) {
		setVideoPlayerUrl(url);
	}

	useEffect(() => {
		if (youtubeSearchResult.length != 0) {
			console.log(youtubeSearchResult);
		}
	}, [youtubeSearchResult]);

	return (
		<div className="local-youtube">
			<TopBar>
				<SearchBar onSearchEnter={searchYoutubeVideo} />
			</TopBar>

			<div className="video-area">
				<ReactPlayer style={{ marginTop: "64px" }} className="react-player" url={videoPlayerUrl} controls={true} />
			</div>

			<div className="video-list-container">
				{youtubeSearchResult.length === 0 ? <img src={loadingAnimation} alt="loading..." /> : youtubeSearchResult.map((video) => <VideoItem onClick={onVideoItemClick} key={video.url} thumbnail_url={video.thumbnails[video.thumbnails.length - 1].url} duration={video.duration_string} title={video.title} channel_name={video.channel} channel_is_verified={video.channel_is_verified} view_count={video.view_count} url={video.url} />)}
			</div>
		</div>
	);
}
