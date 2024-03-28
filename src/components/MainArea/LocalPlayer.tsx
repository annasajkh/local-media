import ReactPlayer from "react-player";
import "./LocalPlayer.css";
import * as Tooltip from "@radix-ui/react-tooltip";

import { Cross2Icon } from '@radix-ui/react-icons';

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
                            <Cross2Icon className="local-player-close-button" onClick={() => onClose()} />
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
