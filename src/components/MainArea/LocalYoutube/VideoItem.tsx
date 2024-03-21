import "./VideoItem.css";
import { VideoData } from "../../../utils/InterfaceTypes";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { useState } from "react";


interface Props {
    videoData: VideoData;
	onClick: (url: string) => void;
}

const fastAverageColor = new FastAverageColor();

export default function VideoItem({ videoData, onClick }: Props) {
	const [backgroundColor, setBackgroundColor] = useState("black"); // default color

    async function calculateBackgroundColorForShorts() {
        const imageData: Buffer = await window.electron.fetchImage(videoData.thumbnail_url);
        const color: Promise<FastAverageColorResult> = fastAverageColor.getColorAsync(URL.createObjectURL(new Blob([imageData], { type: "image/jpeg" })));

        setBackgroundColor((await color).hex);
    }

    if (videoData.is_short) {
        calculateBackgroundColorForShorts();
    }

	return (
		<div className="video-item" onClick={() => onClick(videoData.url)}>
			<div style={{ backgroundColor }} className="video-thumbnail-container">
				<img className="video-thumbnail" src={videoData.thumbnail_url} />
				{videoData.duration && <p className="video-duration">{videoData.duration}</p>}
			</div>

			<div className="video-info-container">
                <p className="video-title">{videoData.title}</p>
			</div>
		</div>
	);
}
