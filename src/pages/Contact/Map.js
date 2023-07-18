
import ReactMapGL from 'react-map-gl';
import { useState } from "react";


function MapContact() {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        latitude: 37.7577, // Vĩ độ tọa độ ban đầu
        longitude: -122.4376, // Kinh độ tọa độ ban đầu
        zoom: 8, // Mức zoom ban đầu
      });

    return ( 
        <div>
        <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiaGlldTc0NTIzMyIsImEiOiJjbGkzODU3NHEwMzJmM3JwYzJ2bWU3bDdvIn0.YTXqt9ppZ-W7oANUdgOEOw"
      onViewportChange={(newViewport) => setViewport(newViewport)}
    >
      {/* Hiển thị Marker
      <Marker
        latitude={37.7577}
        longitude={-122.4376}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div>You are here</div>
      </Marker> */}
    </ReactMapGL>
    </div>
     );
}

export default MapContact;