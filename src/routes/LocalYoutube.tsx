/* eslint-disable @typescript-eslint/no-explicit-any */

import TopBar from "../components/MainArea/TopBar/TopBar";
import "./LocalYoutube.css";

import { useState } from "react";
import SearchBar from "../components/MainArea/TopBar/SearchBar";

import loadingAnimation from "../assets/animations/loading.gif";
import VideoItem from "../components/MainArea/LocalYoutube/VideoItem";
import { YoutubeSearchData, VideoData, YoutubeSearchType } from "../utils/InterfaceTypes";
import LocalPlayer from "../components/MainArea/LocalPlayer";
import LocalYoutubeFilterContent from "../components/MainArea/LocalYoutube/LocalYoutubeFilterContent";

export default function LocalYoutube() {
	const [youtubeSearchResult, setYoutubeSearchResult] = useState<VideoData[] | null>(null);
	const [videoPlayerUrl, setVideoPlayerUrl] = useState<string>();
    const [youtubeSearchType, setYoutubeSearchType] = useState<YoutubeSearchType>(YoutubeSearchType.ALL);

	async function searchYoutubeVideo(query: string) {
		setYoutubeSearchResult([]);

        const youtubeSearchData: YoutubeSearchData  = {
            query: query,
            count: 128,
            type: youtubeSearchType!
        }

		const result: VideoData[] = await window.electron.searchYoutubeVideo(youtubeSearchData);
		setYoutubeSearchResult(result);
	}

	function onLocalPlayerClosed() {
		setVideoPlayerUrl("");
	}

	function onVideoItemClick(url: string) {
		setVideoPlayerUrl(url);
	}

    function onTypeSelectChange(youtubeSearchType: YoutubeSearchType) {
        setYoutubeSearchType(youtubeSearchType);
    }

	function loadingImage() {
		return (
			<div className="loading-image-container">
				<img className="loading-image" src={loadingAnimation} alt="loading..." />
			</div>
		);
	}

	function videoArea() {
		return (
			<>
				{videoPlayerUrl && <LocalPlayer url={videoPlayerUrl} onClose={onLocalPlayerClosed} />}

				<div className="video-list-container">
					{youtubeSearchResult?.map((videoData: VideoData) => (
						<VideoItem key={videoData.url} onClick={onVideoItemClick} videoData={videoData} />
					))}
				</div>
			</>
		);
	}

	return (
		<div className="local-youtube">
			<TopBar>
				<SearchBar onSearchEnter={searchYoutubeVideo} filterContent={<LocalYoutubeFilterContent onTypeSelectChange={onTypeSelectChange} youtubeSearchType={youtubeSearchType!}/>} />
			</TopBar>
            
			{youtubeSearchResult?.length === 0 ? loadingImage() : videoArea()}
		</div>
	);
}
