import React, {Component} from "react";
import {Map, TileLayer, GeoJSON} from "react-leaflet";
import Control from "react-leaflet-control";
import InfoPanel from "./InfoPanel.js";
import "./MainMap.css";

const designations = {
  "OG-NoSale": {
    prettyName: "Not For Sale",
    color: "#7fc97f"
  },
  "OG-NSO": {
    prettyName: "No Surface Occupancy",
    color: "#beaed4"
  },
  "OG-CSU": {
    prettyName: "Controlled Surface Use",
    color: "#fdc086"
  },
  "OG-TL": {
    prettyName: "Timing Limitations",
    color: "#ffff99"
  },
  "OG-SaleSTC": {
    prettyName: "Standard Terms and Conditions",
    color: "#f0027f"
  }
};

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
      fillOpacity: "0.3",
      color: "rgb(49, 130, 189)",
    };
    var color = designations[feature.properties.designation].color;
    styles.fillColor = color;
    return styles;
  }

  baseMapStyle(feature) {
    return {
      color: "rgb(49, 130, 189)",
      fillColor: null,
      fillOpacity: 0,
    };
  }

  render() {
    var programArea;
    if (this.props.programArea) {
      programArea = (
        <GeoJSON data={this.props.programArea} style={this.baseMapStyle} />
      );
    }

    var alternatives;
    if (this.props.currentAlternative && this.props.data) {
      alternatives = (
        <GeoJSON
          data={this.props.data[this.props.currentAlternative]}
          filter={this.showFeature}
          key={this.props.filterUpdateKey}
          style={this.featureStyle}
        />
      );
    }

    return (
      <Map center={this.state.position} zoom={this.state.zoom} id="mapid">
        <TileLayer
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          accessToken={mapboxToken}
          attribution="data from <a href='https://eplanning.blm.gov/epl-front-office/eplanning/planAndProjectSite.do?methodName=dispatchToPatternPage&currentPageId=152115'>Alaska BLM</a> "
          id="mapbox.outdoors"
        />
        {programArea}
        {alternatives}
        <InfoPanel
          currentAlternative={this.props.currentAlternative}
          changeAlternative={this.props.changeAlternative}
          data={this.props.data}
          designations={designations}
        />
        <Control position="bottomright" className="info legend">
          {Object.keys(designations).map(d => (
            <React.Fragment key={d}>
              <i style={{background: designations[d].color}} />
              {designations[d].prettyName}
              <br />
            </React.Fragment>
          ))}
        </Control>
      </Map>
    );
  }
}

export default MainMap;

const mapboxToken = 'pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqcm1yZjk3ZDBtY3M0M3RrY2k0N3RjMDcifQ.onvCNE2GGEo63j53moDLMw';
