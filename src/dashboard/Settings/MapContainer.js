import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../../config";

function MapContainer({ google }) {
  return (
    <Map google={google} zoom={14}>
      <Marker name={"Current location"} />

      <InfoWindow>
        <div>
          <h1>Hello</h1>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: config.GOOGLE_MAPS_API_KEY,
})(MapContainer);
