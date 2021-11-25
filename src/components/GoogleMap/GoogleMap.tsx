import React, { useState, useCallback, useRef } from 'react';
import { Input } from 'antd';
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox
} from '@react-google-maps/api';

export const GoogleMapContent = (children: any) => {
  const [map, setMap] = useState<any>(null);
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [searchBox, setSearchBox] = useState<any>(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const containerStyle = {
    width: '470px',
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
      setCenter(searchLocation[0].geometry.location);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <StandaloneSearchBox
        onLoad={onSearchBoxLoad}
        onPlacesChanged={onPlacesChanged}
      >
        {/* <Input /> */}
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
