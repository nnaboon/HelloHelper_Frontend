/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useCallback } from 'react';
import { Spin } from 'antd';
import { mediaQueryLargeDesktop } from '../../styles/variables';
import { LoadingOutlined } from '@ant-design/icons';
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
  Marker
} from '@react-google-maps/api';

interface GoogleMapContentProps {
  width?: string;
  height?: string;
  requestLocation?: any;
  setRequestLocation?: (location: any) => void;
}

export const GoogleMapContent = ({
  width,
  height,
  requestLocation,
  setRequestLocation
}: GoogleMapContentProps) => {
  const [map, setMap] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<google.maps.LatLng>();
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [searchBox, setSearchBox] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState(40);

  const antIcon = <LoadingOutlined style={{ color: '#ee6400' }} spin />;

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    const geocoder = new google.maps.Geocoder();
    map.fitBounds(bounds);

    if (requestLocation) {
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

        geocoder
          .geocode({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
          .then((response) => {
            setRequestLocation(response.results[0]);
          });

        map.setZoom(14);
      });
    }

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const containerStyle = {
    width: width ?? '470px',
    height: height ?? '300px'
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB9-wzPmQzTYUF2i5txojV6p6Ec2uyEecc',
    libraries: ['drawing', 'places'],
    language: 'th'
  });

  const onSearchBoxLoad = (ref) => setSearchBox(ref);

  const onPlacesChanged = () => {
    const searchLocation = searchBox.getPlaces();

    map.setZoom(20);
    if (searchLocation[0] !== undefined) {
      setRequestLocation(searchLocation[0]);
      setCenter(searchLocation[0].geometry.location);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center ? center : myLocation}
      zoom={15}
      onLoad={onLoad}
      onZoomChanged={() => {
        setCurrentZoom(20);
      }}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }}
      onClick={(e) => {
        setCenter(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
        const geocoder = new google.maps.Geocoder();
        geocoder
          .geocode({
            location: { lat: e.latLng.lat(), lng: e.latLng.lng() }
          })
          .then((response) => {
            setRequestLocation(response.results[0]);
          });
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
    <Spin
      indicator={antIcon}
      css={css`
        display: flex;
        position: relative;
        height: 460px;
        width: 100%;
        align-items: center;
        justify-content: center;

        svg {
          font-size: 25px;
        }

        ${mediaQueryLargeDesktop} {
          height: 270px;
        }
      `}
    />
  );
};
