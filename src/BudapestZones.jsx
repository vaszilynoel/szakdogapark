import budapestParking from "./budapest_parking.json";
import {getBudapestZoneStyle} from "./zoneStyles.js";
import {GeoJSON} from "react-leaflet";

export default function BudapestZones({onZoneClick}) {
    return(
        <GeoJSON
            data={budapestParking}
            style={getBudapestZoneStyle}


            onEachFeature={(feature, layer) => {

                layer.bindPopup(`<strong>Zone ID</strong><br/>Code: ${feature.properties.zoneid} <br/> Fee/hr: ${feature.properties.fee}`);

                layer.on("click", () => {
                    onZoneClick(feature.properties);
                })
            }
        }
        />
    )
}
