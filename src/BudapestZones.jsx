import budapestParking from "./budapest_parking.json";
import {getBudapestZoneStyle} from "./zoneStyles.js";
import {GeoJSON} from "react-leaflet";

function BudapestZones() {
    return(
        <GeoJSON
            data={budapestParking}
            style={getBudapestZoneStyle}


            onEachFeature={(feature, layer) => layer.bindPopup(`<strong>Zone ID</strong><br/>Code: ${feature.properties.zoneid} <br/> Fee/hr: ${feature.properties.fee}`)}
        />
    )
}
export default BudapestZones