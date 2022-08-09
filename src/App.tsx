import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

interface Vessel {
    SHIPNAME: 'string'
    SHIP_ID: 'string'
    LAT: 'string'
    LON: 'string'
}

function App() {
  const [vessels, setVessels] = useState<Vessel[]>([])
  useEffect(() => {

      const timeframe = [60, 525600];
      const time = timeframe.join(',');
      const lat = 51.3023
      const lng = 6.7355
      const distance =  2
      fetch(`/en/reports?asset_type=vessels&columns=time_of_latest_position:desc,
  flag,shipname,photo,recognized_next_port,reported_eta,reported_destination,current_port,imo,ship_type,show_on_
  live_map,area,lat_of_latest_position,lon_of_latest_position&time_of_latest_position_between=${time}&near_me=${lat},${lng},${distance}`, {
          headers: {
              'vessel-image': '0053e92efe9e7772299d24de2d0985adea14',
          },

      }).then(res =>
      {res.json().then((json) => setVessels(json.data))}
    )


  }, [])


    vessels.forEach(vessel => console.log(vessel))
  return (
    <div className="App">
      <MapContainer center={[51.3023, 6.7355]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {vessels.map(vessel => <Marker position={[parseFloat(vessel.LAT), parseFloat(vessel.LON)]}></Marker>)}

      </MapContainer>
    </div>
  );
}

export default App;
