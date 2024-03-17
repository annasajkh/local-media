import "./VideoItem.css";
import { VideoData } from "../../../utils/interfaces";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";

interface Props {
	videoData: VideoData;
	onClick: (url: string) => void;
}

export default function VideoItem({ videoData, onClick }: Props) {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // default color

  const fastAverageColor = new FastAverageColor();

  useEffect(() => {
    async function fetchData() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imageData: Buffer = await (window as any).electronAPI.fetchImage(videoData.thumbnail_url);
      const blob = new Blob([imageData], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      const color = fastAverageColor.getColorAsync(url);
      setBackgroundColor((await color).hex);
    }

    fetchData();
    
  });

  return (
    <div className="video-item" onClick={() => onClick(videoData.url)}>
      <div style={{ backgroundColor }} className="video-thumbnail-container">
        <img className="video-thumbnail" src={videoData.thumbnail_url} />
        {videoData.duration && <p className="video-duration">{videoData.duration}</p>}
      </div>
    </div>
  );
}
