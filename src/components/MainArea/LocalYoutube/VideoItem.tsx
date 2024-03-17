import "./VideoItem.css"


interface Props {
  thumbnail_url: string,
  duration: string,
  title: string,
  channel_name: string,
  channel_is_verified: boolean,
  view_count: number,
  url: string,
  onClick: (url: string) => void;
}


export default function VideoItem({thumbnail_url, duration, title, channel_name, channel_is_verified, view_count, url, onClick}: Props) {
  return (
    <div className="video-item" onClick={() => onClick(url)}>
      <img className="video-item-thumbnail" src={thumbnail_url} />
      <p className="video-item-duration">{duration}</p>
    </div>
  )
}
