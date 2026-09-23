import { MapContainer, TileLayer} from 'react-leaflet';
import './App.css';
import BudapestZones from "./BudapestZones.jsx";
import FreeParkingSpots from "./FreeParkingSpots.jsx";


function App() {
    const position = [47.4979, 19.0402]; // budapest start location

    return (
        <div id="map-wrapper" style={{ height: '100vh', width: '100vw' }}>
            <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 1. Large Budapest Background Zones */}
                <BudapestZones/>
                {/* 2. FREE PARKING SPOTS ONLY */}
                <FreeParkingSpots/>

            </MapContainer>
        </div>
    );
}

export default App;