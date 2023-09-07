import React, { useEffect, useMemo, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = (props) => {
  const [carRentalLocations, setCarRentalLocations] = useState([
    { name: "Location 1", lat: 17.405044, lng: 78.486671 },
    { name: "Location 2", lat: 17.395044, lng: 78.476671 },
    // Add more car rental locations here
  ]);

  const center = useMemo(() => ({ lat: 17.385044, lng: 78.486671 }), []);

  // useEffect(() => {
  //   // You can add the provided locations to your state here.
  //   const locations = [
  //     "Banjara Hills",
  //     "Jubilee Hills",
  //     "Hitech City",
  //     "Gachibowli",
  //     "Secunderabad",
  //     "Kukatpally",
  //     "Madhapur",
  //     "Ameerpet",
  //     "Begumpet",
  //     "Shamshabad",
  //   ];

  //   // Geocode the locations to get their latitude and longitude.
  //   const geocoder = new props.google.maps.Geocoder();

  //   const fetchLocationCoordinates = async () => {
  //     const locationsWithCoordinates = await Promise.all(
  //       locations.map(async (location) => {
  //         return new Promise((resolve) => {
  //           geocoder.geocode({ address: location }, (results, status) => {
  //             if (status === "OK" && results && results[0]) {
  //               const { lat, lng } = results[0].geometry.location;
  //               resolve({ name: location, lat, lng });
  //             } else {
  //               console.error(`Geocoding error for location: ${location}`);
  //               resolve(null); // Resolve with null if geocoding fails
  //             }
  //           });
  //         });
  //       })
  //     );

  //     // Filter out null results (locations with geocoding errors) and set the state.
  //     setCarRentalLocations(
  //       locationsWithCoordinates.filter((location) => location !== null)
  //     );
  //   };

  //   fetchLocationCoordinates();
  // }, [props.google.maps.Geocoder]); // This useEffect runs when the component mounts

  return (
    <div>
      <Map
        google={props.google}
        zoom={14}
        initialCenter={center} // Center the map on Hyderabad
      >
        {carRentalLocations.map((location, index) => (
          <Marker
            key={index}
            title={location.name}
            position={{ lat: location.lat, lng: location.lng }}
          />
        ))}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY, // Replace with your API key
})(MapContainer);
