import * as React from 'react';
import { useState } from 'react'
import ReactMapGL from 'react-map-gl'
export interface MapProps {
}

export function Map(props: MapProps) {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    ongitude: -122.4376,
    zoom: 8,
    width: window.innerWidth,
    height: window.innerHeight
  });
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken="REACT_APP_MY_ACCESS-TOKEN"
        width="100vw"
        height="100%"
        onViewportChange={(newView) => setViewport(newView)}></ReactMapGL>

    </div>
  );
}
