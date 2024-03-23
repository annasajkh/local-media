/* eslint-disable @typescript-eslint/no-explicit-any */

import TopBar from "../components/MainArea/TopBar/TopBar";
import "./LocalYoutube.css";

import { useState } from "react";
import SearchBar from "../components/MainArea/TopBar/SearchBar";

import loadingAnimation from "../assets/animations/loading.gif";
import VideoItem from "../components/MainArea/LocalYoutube/VideoItem";
import { VideoData } from "../utils/InterfaceTypes";
import LocalPlayer from "../components/MainArea/LocalPlayer";


export default function LocalYoutube() {
	const [youtubeSearchResult, setYoutubeSearchResult] = useState<VideoData[] | null>(null);
    const [videoPlayerUrl, setVideoPlayerUrl] = useState<string>();
	

	async function searchYoutubeVideo(query: string) {
		setYoutubeSearchResult([]);

		const result: VideoData[] = await window.electron.searchYoutubeVideo(query, 4 * 10);
		setYoutubeSearchResult(result);
	}

    function onLocalPlayerClosed() {
        setVideoPlayerUrl("");
    }

	function onVideoItemClick(url: string) {
		setVideoPlayerUrl(url);
	}

	function videoArea() {
		return (
			<>
                { videoPlayerUrl && <LocalPlayer url={videoPlayerUrl} onClose={onLocalPlayerClosed}/> }
				
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
				<img className="loading-image" src={loadingAnimation} alt="loading..." />
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