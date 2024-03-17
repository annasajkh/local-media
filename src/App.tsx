import "./App.css";
import ServiceNavBar from "./components/ServiceNavBar/ServiceNavBar";
import MainArea from "./components/MainArea/MainArea";
import { HashRouter, Route, Routes } from "react-router-dom";
import LocalYoutube from "./routes/LocalYoutube";
import LocalSoundCloud from "./routes/LocalSoundCloud";

export default function App() {
	return (
		<div className="app">
			<HashRouter>
				<ServiceNavBar />
				
				<MainArea>
					<Routes>
						<Route path="/local_youtube" element={<LocalYoutube />} />
						<Route path="/local_soundcloud" element={<LocalSoundCloud />} />
					</Routes>
				</MainArea>
			</HashRouter>
		</div>
	);
}
