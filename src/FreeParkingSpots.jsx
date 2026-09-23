import {GeoJSON} from "react-leaflet";
import parkingData from "./parkingdata.json";

export default function FreeParkingSpots() {
    return(<GeoJSON
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
            layer.bindPopup(`<strong>Free Parking</strong><br/>Type: ${feature.properties.parking || 'spot'} <br/> Zone: ${feature.properties.zone || 'unknown zone'}`);
        }}

    />);
}