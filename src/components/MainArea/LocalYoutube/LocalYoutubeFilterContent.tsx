/* eslint-disable @typescript-eslint/no-explicit-any */
import { YoutubeSearchType } from "../../../utils/InterfaceTypes";
import "./LocalYoutubeFilterContent.css";

interface Props {
    youtubeSearchType: YoutubeSearchType
    onTypeSelectChange: (youtubeSearchType: YoutubeSearchType) => void
}

export default function LocalYoutubeFilterContent({youtubeSearchType, onTypeSelectChange}: Props) {
    function onTypeSelectChangeTrigger(typeString: string) {
        switch (typeString) {
            case "video":
                onTypeSelectChange(YoutubeSearchType.VIDEO);
                break;
            case "short":
                onTypeSelectChange(YoutubeSearchType.SHORT);
                break;
            case "all":
                onTypeSelectChange(YoutubeSearchType.ALL);
                break;
        }
    }

    function getYoutubeSearchTypeString() {
        switch (youtubeSearchType) {
            case YoutubeSearchType.VIDEO:
                return "video";
            case YoutubeSearchType.SHORT:
                return "short";
            case YoutubeSearchType.ALL:
                return "all";
        }
    }

	return (
		<>
			<div className="local-youtube-filter-content-container">
				<div className="filter-content">
					<label>Type:</label>
					<select className="search-type-filter" onChange={(event) => onTypeSelectChangeTrigger(event.target.value)} value={getYoutubeSearchTypeString()}>
						<option className="search-type-filter-option" value="video">Video</option>
						<option className="search-type-filter-option" value="short">Short</option>
						<option className="search-type-filter-option" value="all">All</option>
					</select>
				</div>
			</div>
		</>
	);
}
