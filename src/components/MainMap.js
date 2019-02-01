import React, {Component} from "react";
import {Map, TileLayer, GeoJSON} from "react-leaflet";
import Control from 'react-leaflet-control';
import InfoPanel from './InfoPanel.js';
import "./MainMap.css";

const colorDefinitions = {
  "OG-NoSale": "#edf8fb",
  "OG-NSO": "#b2e2e2",
  "OG-CSU": "#66c2a4",
  "OG-TL": "#006d2c",
  "OG-STC": "#006d2c"
}

class MainMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: [69.85, -144],
      zoom: 8,
    };

    this.showFeature = this.showFeature.bind(this);
    this.featureStyle = this.featureStyle.bind(this);
  }

  showFeature(feature, layer) {
    return feature.properties[this.props.currentAlternative] !== "999"
  }

  featureStyle(feature) {
    var styles = {
      fillOpacity: "0.9"
    };
    var color = colorDefinitions[feature.properties[this.props.currentAlternative]] || "#ffffff";
    styles.color = color;
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
    if (this.props.alternatives) {
      alternatives = (
        <GeoJSON
          data={this.props.alternatives}
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
