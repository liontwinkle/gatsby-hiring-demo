import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Box, Flex } from '@rebass/grid/emotion'
import { GoLocation } from 'react-icons/go'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends Component {
  state = {
    viewport: {
      width: 300,
      height: 400,
      latitude: 41.99521,
      longitude: 21.43226,
      zoom: 15,
    },
  }

  render() {
    return (
      <Flex justifyContent="center">
        <Box m={4}>
          <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxApiAccessToken="pk.eyJ1IjoiYm96aGlkYXIiLCJhIjoidjY3d3lJOCJ9.jVwMipPTpYpDKcYzz_keWw"
            {...this.state.viewport}
            onViewportChange={viewport => this.setState({ viewport })}
          >
            <Marker
              latitude={41.99521}
              longitude={21.43226}
              offsetLeft={-10}
              offsetTop={-20}
            >
              <GoLocation color="black" size={30} />
            </Marker>
          </ReactMapGL>
        </Box>
      </Flex>
    )
  }
}

export default Map
