import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import * as L from "leaflet";
import { ATM_TYPE } from './api';

export class MapTools{

	static initialPostiion=[31.5, 34.870682];
  static initialZoom=8;

  static fixPosition=(a,b)=>{
    return a > b ? [b,a] : [a,b];
  }
}
const BLUE_ICON_URL= "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2975e6&chf=a,s,ee00FFFF";
const ORANGE_ICON_URL = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff8300&chf=a,s,ee00FFFF";

const LeafIcon = L.Icon.extend({options: {}});
const blueIcon = new LeafIcon({iconUrl: BLUE_ICON_URL}), 
  orangeIcon = new LeafIcon({iconUrl: ORANGE_ICON_URL});

function MapControler({zoom, center}) {
  const map = useMap()
  React.useEffect(()=>{
    if(zoom && center)
      map.setView(center, zoom);
  },[zoom, center])
  return null
}

export function Map({markers, center, zoom}){
  return(
    <MapContainer 
      center={center ? center : MapTools.initialPostiion} 
      zoom={zoom ? zoom : MapTools.initialZoom} 
    >
      <MapControler center={center} zoom={zoom}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((item)=>{
        if(item.Y_Coordinate && item.X_Coordinate) 
          return(
            <Marker 
              key={item._id} 
              marker_index={item._id}
              position={MapTools.fixPosition(item.X_Coordinate, item.Y_Coordinate)}
              icon={item.ATM_Type===ATM_TYPE.CASH ? orangeIcon : blueIcon}
            >
              <Popup>
                {item.City} <br />
                {item.ATM_Address} <br />
                {item.Bank_Name} <br />
                {item.ATM_Location} <br/>
              </Popup>
            </Marker>
          )
        else
          return null
      })}
    </MapContainer>
  )
}