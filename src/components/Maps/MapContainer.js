import React, { useEffect, useMemo, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { GOOGLE_MAPS_API_KEY } from "../../../.google_maps_credentials";
import { getLocations } from "../services/locations.services";

const MapContainer = (props) => {
  const [carRentalLocations, setCarRentalLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getLocations();

        setCarRentalLocations(response);
        console.log("locations", carRentalLocations);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const center = useMemo(() => ({ lat: 17.385044, lng: 78.486671 }), []);

  return (
    !loading && (
      <div>
        <Map
          google={props.google}
          zoom={6}
          initialCenter={center} // Center the map on Hyderabad
        >
          {carRentalLocations.map((location, index) => (
            <Marker
              onClick={() => setSelectedLocation(location)}
              key={index}
              title={location.name}
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))}
        </Map>
      </div>
    )
  );
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(MapContainer);
