import "./Service.css";

interface Props {
	logoPath: string;
	name: string;
	isSelected: boolean;
	onClick: () => void;
}

export default function Service({ logoPath, name, isSelected, onClick }: Props) {
	return (
		<div className={`service-container change-cursor-to-pointer ${isSelected ? "service-container-selected" : "service-container-not-selected"}`} onClick={onClick}>
			<div className="service-logo-container">
				<img className="service-logo" src={logoPath}></img>
			</div>
			<div className="service-text-container">
				<p className="service-text">{name}</p>
			</div>
		</div>
	);
}