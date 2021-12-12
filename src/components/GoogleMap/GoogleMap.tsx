import React, { useState, useCallback, useRef } from 'react';
import { Input } from 'antd';
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
  Marker
} from '@react-google-maps/api';

interface GoogleMapContentProps {
  width?: string;
  setLocation?: (location: string) => void;
}

export const GoogleMapContent = ({
  width,
  setLocation
}: GoogleMapContentProps) => {
  const [map, setMap] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [searchBox, setSearchBox] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState(20);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    navigator.geolocation.getCurrentPosition(function (position) {
      let location = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      console.log(position);
      setMyLocation(location);
    });
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const containerStyle = {
    width: width ?? '470px',
    height: '300px'
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB9-wzPmQzTYUF2i5txojV6p6Ec2uyEecc',
    libraries: ['drawing', 'places'],
    language: 'th'
  });

  const onSearchBoxLoad = (ref) => setSearchBox(ref);

  const onPlacesChanged = () => {
    const searchLocation = searchBox.getPlaces();
    if (searchLocation[0] !== undefined) {
      setLocation(searchLocation[0].name);
      setCenter(searchLocation[0].geometry.location);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={currentZoom}
      onLoad={onLoad}
      onZoomChanged={() => {
        setCurrentZoom(14);
      }}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        fullscreenControl: false
      }}
      onClick={(e) => {
        navigator.geolocation.getCurrentPosition(function (position) {
          let location = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log(position, location);
          setCenter(location);
        });
        // console.log(map?.getPlaces());
      }}
    >
      <Marker position={center ?? (myLocation as google.maps.LatLng)} />
      <StandaloneSearchBox
        onLoad={onSearchBoxLoad}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: 'absolute',
            left: '50%',
            marginLeft: '-120px'
          }}
        />
      </StandaloneSearchBox>
    </GoogleMap>
  ) : (
    <></>
  );
};
