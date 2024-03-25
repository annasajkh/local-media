import ReactPlayer from "react-player";
import closeIcon from "../../assets/icons/close.png";
import "./LocalPlayer.css";
import * as Tooltip from "@radix-ui/react-tooltip";

interface Props {
	url: string;
	onClose: () => void;
}

export default function LocalPlayer({ url, onClose }: Props) {
	return (
		<div className="local-player-container">
			<div className="local-player-item">
				<ReactPlayer className="react-player" url={url} controls={true} />

				<Tooltip.Provider delayDuration={100}>
					<Tooltip.Root>
						<Tooltip.Trigger asChild>
                            <img className="local-player-close-button" src={closeIcon} onClick={() => onClose()}></img>
						</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content className="local-player-close-button-tooltip" side="bottom">
								Close
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
		</div>
	);
}
