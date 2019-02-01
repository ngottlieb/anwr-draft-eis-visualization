import React, {Component} from "react";
import {Map, TileLayer, GeoJSON} from "react-leaflet";
import Control from 'react-leaflet-control';
import InfoPanel from './InfoPanel.js';
import "./MainMap.css";

const colorDefinitions = {
  "OG-NoSale": "#7fc97f",
  "OG-NSO": "#beaed4",
  "OG-CSU": "#fdc086",
  "OG-TL": "#ffff99",
  "OG-STC": "#386cb0",
  "No Restriction": "#f0027f"
}

class MainMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: [69.85, -144],
      zoom: 8,
    };

    this.featureStyle = this.featureStyle.bind(this);
  }

  featureStyle(feature) {
    var styles = {
      fillOpacity: "0.9",
      color: "rgb(49, 130, 189)",
    };
    var color = colorDefinitions[feature.properties.designation] || colorDefinitions["No Restriction"];
    styles.fillColor = color;
    return styles;
  }

  baseMapStyle(feature) {
    return {
      color: "rgb(49, 130, 189)",
      fillColor: null,
      fillOpacity: 0
    };
  }

  render() {
    var programArea;
    if (this.props.programArea) {
      programArea = <GeoJSON data={this.props.programArea} style={this.baseMapStyle} />;
    }

    var alternatives;
    if (this.props.currentAlternative && this.props.alternatives) {
      alternatives = (
        <GeoJSON
          data={this.props.alternatives[this.props.currentAlternative]}
          filter={this.showFeature}
          key={this.props.filterUpdateKey}
          style={this.featureStyle}
        />
      );
    }

    return (
      <Map center={this.state.position} zoom={this.state.zoom} id="mapid">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="test"
        />
        {programArea}
        {alternatives}
        <InfoPanel currentAlternative={this.props.currentAlternative} changeAlternative={this.props.changeAlternative} />
        <Control position="bottomright" className="info legend">
          { Object.keys(colorDefinitions).map((designation) => (
            <React.Fragment key={designation}>
              <i style={{background:colorDefinitions[designation]}} />
              { designation }
              <br />
            </React.Fragment>
          ))}
        </Control>
      </Map>
    );
  }
}

export default MainMap;
