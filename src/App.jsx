import { MapContainer, TileLayer} from 'react-leaflet';
import './App.css';
import BudapestZones from "./BudapestZones.jsx";
import FreeParkingSpots from "./FreeParkingSpots.jsx";
import {useState} from "react";


function App() {
    const position = [47.4979, 19.0402]; // budapest start location

    const [isSlideOutOpen,setIsSlideOutOpen]= useState(false)

    function toggleSideBar(){
        setIsSlideOutOpen(!isSlideOutOpen)
    }




    return (
        <div id="map-wrapper" style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
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
            {/* 3. button for sliding out */}
            <button className={"sidebar-toggle-button"} onClick={toggleSideBar}>{isSlideOutOpen ? 'Close Menu' : 'Open Menu'}</button>

            <div className={`slide-out-menu ${isSlideOutOpen ? "open" : ""}`}>
                <h1>Welcome!</h1>


            </div>
        </div>
    );
}

export default App;