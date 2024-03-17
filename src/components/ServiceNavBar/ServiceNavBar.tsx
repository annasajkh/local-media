import Service from "./Service";
import "./ServiceNavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import youtubeLogoPath from "../../assets/service_logos/youtube.png";
import soundcloudLogoPath from "../../assets/service_logos/soundcloud.png";

export default function ServiceNavBar() {
	const [selectedIndex, setSelectedIndex] = useState(-1);

  function onServiceClicked(index: number) {
    setSelectedIndex(index);
  }

	return (
		<div className="service-navbar">
			<Link to="/local_youtube">
				<Service logoPath={youtubeLogoPath} name="Youtube" isSelected={selectedIndex == 0} onClick={() => onServiceClicked(0)}></Service>
			</Link>

			<Link to="/local_soundcloud">
				<Service logoPath={soundcloudLogoPath} name="SoundCloud" isSelected={selectedIndex == 1}  onClick={() => onServiceClicked(1)}></Service>
			</Link>
		</div>
	);
}
