import React from 'react';
import './styles.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

function App() {
  const [ ATMs, setATMs ] = React.useState([]);
  React.useEffect(()=>{
    loadATMs();
  },[])
  const loadATMs=async()=>{
    try{
      const res=await axios.post("/fetch");
      console.log(res.data.records);
      setATMs(res.data.records)
    }
    catch(err){
      console.error(err);
    }
  }
  const getCoordinates=(a,b)=>{
    return a > b ? [b,a] : [a,b];
  }
  const position = [31.5, 34.870682]
  return (
    <div className="app">
      <div className="flex-container">
        <div className="col-lg-7">
          <div className="leaflet-container">
            <MapContainer center={position} zoom={8} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {ATMs.map((item)=>{
                if(item.Y_Coordinate && item.X_Coordinate) 
                  return(
                    <Marker 
                      key={item._id} 
                      marker_index={item._id}
                      position={getCoordinates(item.X_Coordinate, item.Y_Coordinate)}
                    >
                      <Popup>
                        {item.City} <br />
                        {item.ATM_Address} <br />
                        {item.Bank_Name} <br />
                        {item.ATM_Location} <br/>
                      </Popup>
                    </Marker>
                  )
              })}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
