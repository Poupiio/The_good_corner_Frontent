import { Route, Routes } from "react-router-dom";
import RecentAds from "./components/RecentAds";
import Layout from "./pages/Layout";
import About from "./pages/About";
import AdDetails from "./pages/AdDetails";
import Furnishings from "./pages/Furnishings";
import ElectricalAppliances from "./pages/ElectricalAppliances";
import Photography from "./pages/Photography";
import Computing from "./pages/Computing";
import Telephony from "./pages/Telephony";
import Bikes from "./pages/Bikes";
import Sport from "./pages/Sport";
import Clothing from "./pages/Clothing";
import Baby from "./pages/Baby";
import Tools from "./pages/Tools";
import Services from "./pages/Services";
import Holidays from "./pages/Holidays";
import Counter from "./pages/Counter";
import CreateAd from "./pages/CreateAd";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<RecentAds />} />
				<Route path="about" element={<About />} />
				<Route path="ad/:id" element={<AdDetails />} />
				<Route path="ad/new" element={<CreateAd />} />
				<Route path="category/furnishings" element={<Furnishings />} />
				<Route path="category/electrical-appliances" element={<ElectricalAppliances />} />
				<Route path="category/photography" element={<Photography />} />
				<Route path="category/computing" element={<Computing />} />
				<Route path="category/telephony" element={<Telephony />} />
				<Route path="category/bikes" element={<Bikes />} />
				<Route path="category/sport" element={<Sport />} />
				<Route path="category/clothing" element={<Clothing />} />
				<Route path="category/baby" element={<Baby />} />
				<Route path="category/tools" element={<Tools />} />
				<Route path="category/services" element={<Services />} />
				<Route path="category/holidays" element={<Holidays />} />
				<Route path="counter" element={<Counter />} />
			</Route>
		</Routes>
	);
}

export default App;
