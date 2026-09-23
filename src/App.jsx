import { MapContainer, TileLayer} from 'react-leaflet';
import './App.css';
import BudapestZones from "./BudapestZones.jsx";
import FreeParkingSpots from "./FreeParkingSpots.jsx";
import {useState} from "react";


function App() {
    const position = [47.4979, 19.0402]; // budapest start location

    const [isSlideOutOpen,setIsSlideOutOpen]= useState(false)

    const [currentBudapestZone,setCurrentBudapestZone]=useState(null)
    const [currentFreeZone,setCurrentFreeZone]=useState(null)

    function toggleSideBar(){
        setIsSlideOutOpen(!isSlideOutOpen)
    }

    function handleBudapestClick(zoneData){
        setCurrentBudapestZone(zoneData)
        setCurrentFreeZone(null)
        setIsSlideOutOpen(true)
    }
    function handleFreeClick(zoneData){
        setCurrentFreeZone(zoneData)
        setCurrentBudapestZone(null)
        setIsSlideOutOpen(true)
    }

    function priceRange(){
        let priceRanged= "";
        switch (currentBudapestZone.fee) {
        case 300:
            priceRanged="Low";
            break; // The 'break' stops it from accidentally running the next case
        case 450:
            priceRanged="Medium";
            break;
        case 600:
            priceRanged="High";
            break;
        default:
            priceRanged=""
            break;
        }
        return priceRanged;
    }



    return (
        <div id="map-wrapper" style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
            <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 1. Large Budapest Background Zones */}
                <BudapestZones onZoneClick={handleBudapestClick}/>
                {/* 2. FREE PARKING SPOTS ONLY */}
                <FreeParkingSpots onFreeZoneClick={handleFreeClick}/>

            </MapContainer>
            {/* 3. button for sliding out */}
            <button className={"sidebar-toggle-button"} onClick={toggleSideBar}>{isSlideOutOpen ? 'Close Menu' : 'Open Menu'}</button>

            <div className={`slide-out-menu ${isSlideOutOpen ? "open" : ""}`}>
                <h1>Welcome!</h1>
                <h2>Parking Info:</h2>
                {currentBudapestZone && (
                    <div className={"current-budapest-zone-info"}>
                        <p><strong>Zone code:</strong> {currentBudapestZone.zoneid}</p>
                        <p><strong>Cost range:</strong> {priceRange()}</p>
                        <p><strong>Fee:</strong> {currentBudapestZone.fee ? `${currentBudapestZone.fee} HUF`: "Unknown"} </p>
                    </div>
                )
                }
                {currentFreeZone && (
                        <div className={"current-free-zone-info"}>
                            <h1>Free Parking</h1>
                            <p><strong>Parking type:</strong> {currentFreeZone.parking}</p>
                            <p><strong>Total capacity:</strong> {currentFreeZone.capacity ? `${currentFreeZone.capacity} spots` : "Unknown"}</p>
                        </div>
                    )
                }
                {!currentBudapestZone && !currentFreeZone && (
                    <h3>Start by picking a zone!</h3>
                )}
            </div>
        </div>
    );
}

export default App;