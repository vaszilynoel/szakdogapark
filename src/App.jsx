import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import './App.css';
import parkingData from './parkingdata.json'; // The detailed spots
import budapestParking from './budapest_parking.json'; // The large district zones
import { getBudapestZoneStyle } from './zoneStyles';

function App() {
    const position = [47.4979, 19.0402];

    return (
        <div id="map-wrapper" style={{ height: '100vh', width: '100vw' }}>
            <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 1. Large Budapest Background Zones */}
                <GeoJSON
                    data={budapestParking}
                    style={getBudapestZoneStyle}


                    onEachFeature={(Feature, layer) => layer.bindPopup(`<strong>Zone ID</strong><br/>Code: ${Feature.properties.zoneid}`)}
                />

                {/* 2. FREE PARKING SPOTS ONLY */}
                <GeoJSON
                    data={parkingData}
                    // FILTER: Only show features where fee is 0, "no", "free", or missing
                    filter={(feature) => {
                        const fee = feature.properties.fee;
                        const access = feature.properties.access;
                        // Returns true only if it's free AND not private
                        return (fee === 0 || fee === 'no' || fee === 'free' || !fee) && access !== 'private';
                    }}
                    style={{
                        color: '#0000FF', // Solid Blue for free zones
                        weight: 2,
                        fillOpacity: 0.7,
                        fillColor: '#3498db'
                    }}
                    onEachFeature={(feature, layer) => {
                        layer.bindPopup(`<strong>Free Paffrking</strong><br/>Type: ${feature.properties.parking || 'Spot'}`);
                    }}

                />
            </MapContainer>
        </div>
    );
}

export default App;