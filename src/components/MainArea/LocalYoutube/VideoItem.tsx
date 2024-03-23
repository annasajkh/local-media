import "./VideoItem.css";
import { VideoData } from "../../../utils/InterfaceTypes";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { useEffect, useState } from "react";

interface Props {
	videoData: VideoData;
	onClick: (url: string) => void;
}

const fastAverageColor = new FastAverageColor();

export default function VideoItem({ videoData, onClick }: Props) {
	const [backgroundColor, setBackgroundColor] = useState("black"); // default color

	useEffect(() => {
		async function calculateBackgroundColorForShorts() {
			const imageData: Buffer = await window.electron.fetchImage(videoData.thumbnail_url);
			const color: Promise<FastAverageColorResult> = fastAverageColor.getColorAsync(URL.createObjectURL(new Blob([imageData], { type: "image/jpeg" })));

			setBackgroundColor((await color).hex);
		}

		if (videoData.is_short) {
			calculateBackgroundColorForShorts();
		}
	}, [videoData]);

	return (
		<div className="video-item" onClick={() => onClick(videoData.url)}>
			<div style={{ backgroundColor }} className="video-thumbnail-container">
				<img className="video-thumbnail" src={videoData.thumbnail_url} />
				{videoData.duration && <p className="video-duration">{videoData.duration}</p>}
			</div>

			<div className="video-info-container">
				<h5 className="video-title">{videoData.title}</h5>
                <div className="channel-name-container">
                    <p className="channel-name" >{videoData.channel_name}</p>
                    {
                        videoData.channel_name &&
                        <svg className="channel-is-verified" height="24" width="24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
                        </svg>
                    }
                </div>
			</div>
		</div>
	);
}
