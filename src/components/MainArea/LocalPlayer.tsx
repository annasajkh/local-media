import ReactPlayer from "react-player";
import "./LocalPlayer.css";
import closeIcon from "../../assets/icons/close.png";

interface Props {
	url: string;
	onClose: () => void;
}

export default function LocalPlayer({ url, onClose}: Props) {
	return (
		<div className="local-player-container">
			<div className="local-player-item">
				<ReactPlayer className="react-player" url={url} controls={true} />

                <img className="local-player-close-button" src={closeIcon} onClick={()=> onClose()}></img>
			</div>
		</div>
	);
}
