import React, {Component} from "react";
import {fromJS} from 'immutable';
import "./App.css";
import MainMap from "./components/MainMap.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import {dataLayer_template, defaultMapStyle} from './map_style.js'

const ALTERNATIVES = {
  "Alternative B" : "Alt_B",
  "Alternative C" : "Alt_C",
  "Alternative D1" : "Alt_D1",
  "Alternative D2" : "Alt_D2"
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      programArea: null,
      data: null,
      currentAlternative: "Alternative B",
      filterUpdateKey: 0
    };
    this.loadProgramArea();
    this.loadAlternatives();
    this.triggerFilterUpdate = this.triggerFilterUpdate.bind(this);
    this.changeAlternative = this.changeAlternative.bind(this);
  }

  triggerFilterUpdate() {
    this.setState({
      filterUpdateKey: this.state.filterUpdateKey + 1
    });
  }

  changeAlternative(newAlt) {
    this.setState({
      currentAlternative: newAlt,
      filterUpdateKey: this.state.filterUpdateKey + 1
    });
  }

  async loadProgramArea() {
    try {
      const response = await fetch("./data/CoastalPlain_ProgramArea.json");
      const c = await response.json();
      this.setState({
        programArea: c.default,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loadAlternatives() {
    try {
      var altsData = {};
      var resp1 = await fetch("./data/alternative_b.json");
      altsData["Alternative B"] = await resp1.json();
      var resp2 = await fetch("./data/alternative_c.json");
      altsData["Alternative C"] = await resp2.json();
      var resp3 = await fetch("./data/alternative_d1.json");
      altsData["Alternative D1"] = await resp3.json();
      var resp4 = await fetch("./data/alternative_d2.json");
      altsData["Alternative D2"] = await resp4.json();
      this.setState({
        data: altsData
      });
    } catch (error) {
      console.log(error);
    }

    var alts_layers = [];
    var alts_sources = {};
    for (var alt in ALTERNATIVES){
      alts_layers.push(dataLayer_template
      .set('source', alt)
      .set('id', alt)
      .setIn(['paint', 'fill-color', 'property'], ALTERNATIVES[alt]))

      alts_sources[alt] = fromJS({
        type: 'geojson',
        data: altsData[alt]
      })

    }
    var mapStyle = defaultMapStyle
    .set('layers', defaultMapStyle.get('layers').concat(alts_layers))
    .set('sources', defaultMapStyle.get('sources').concat(alts_sources))
    //
    // var mapStyle = fromJS({
    //   version: 8,
    //   sources: alts_sources,
    //   layers: alts_layers
    // });

    console.log(mapStyle.get('layers').toJS())

    this.setState({
      dataLayers: alts_layers,
      dataSources: alts_sources,
      mapStyle: mapStyle
    })
  }

  render() {
    return (
      <div className="App">
        <MainMap
          programArea={this.state.programArea}
          data={this.state.data}
          currentAlternative={this.state.currentAlternative}
          filterUpdateKey={this.state.filterUpdateKey}
          changeAlternative={this.changeAlternative}
          mapStyle={this.state.mapStyle}
        />
      </div>
    );
  }
}

export default App;
