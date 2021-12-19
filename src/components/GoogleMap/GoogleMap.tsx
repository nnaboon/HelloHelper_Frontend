import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Spin } from 'antd';
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
  Marker,
  Circle
} from '@react-google-maps/api';

interface GoogleMapContentProps {
  width?: string;
  requestLocation?: any;
  setRequestLocation?: (location: any) => void;
}

export const GoogleMapContent = ({
  width,
  requestLocation,
  setRequestLocation
}: GoogleMapContentProps) => {
  const [map, setMap] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [searchBox, setSearchBox] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState(20);

  const onLoad = React.useCallback(function callback(map) {
    console.log('re', requestLocation);
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);

    if (requestLocation) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: requestLocation }).then((res) => {
        if (res.results[0]) {
          map.setZoom(20);
          setMyLocation(res.results[0].geometry.location);
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        let location = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setMyLocation(location);
      });
    }

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

    console.log(searchLocation);
    map.setZoom(20);
    if (searchLocation[0] !== undefined) {
      setRequestLocation(searchLocation[0]);
      console.log(searchLocation[0]);
      setCenter(searchLocation[0].geometry.location);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center ? center : myLocation}
      zoom={17}
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
        setCenter(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
      }}
    >
      <Marker position={center ? center : (myLocation as google.maps.LatLng)} />

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
