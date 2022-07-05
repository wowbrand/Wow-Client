import * as React from 'react';
import { useState } from 'react'
import { Shop } from 'react-bootstrap-icons';
import ReactMapGL, { Marker} from 'react-map-gl'
export interface MapProps {
}

export function Map(props: MapProps) {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  return (
    <div>
<ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MY_ACCESS_TOKEN}
        style={{width: window.innerWidth, height: window.innerHeight}}
        onMove={evt => setViewport(evt.viewState)}
      >

        <Marker longitude={-100} latitude={40} anchor="bottom" >
          <Shop color="royalblue" size={50} />
        </Marker>

        <Marker longitude={55} latitude={40} anchor="bottom">
          <Shop color="royalblue" size={50} />
        </Marker>
      </ReactMapGL>






      {/* <ReactMapGL
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MY_ACCESS_TOKEN}
        width="100vw"
        height="100%"
        onViewportChange={(newView) => setViewport(newView)}></ReactMapGL> */}

    </div>
  );
}
