import React, {Component} from "react";
import {fromJS} from 'immutable';
import "./App.css";
import MainMap from "./components/MainMap.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import {dataLayer_template, defaultMapStyle, optionalLayer_template} from './map_style.js'

const ALL_LAYERS = {
  "Alternative B" : "Alt_B",
  "Alternative C" : "Alt_C",
  "Alternative D1" : "Alt_D1",
  "Alternative D2" : "Alt_D2",
  "optional_caribou": "optional_caribou"
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      programArea: null,
      data: null,
      currentAlternative: "Alternative B",
      filterUpdateKey: 0,
      loading: true,
      optionalLayers: {
        'caribou' : {
          'visible' : false
        }
      }
    };
    this.loadProgramArea();
    this.loadAlternatives();
    this.triggerFilterUpdate = this.triggerFilterUpdate.bind(this);
    this.changeAlternative = this.changeAlternative.bind(this);
    this.changeLayers = this.changeLayers.bind(this);
  }

  triggerFilterUpdate() {
    this.setState({
      filterUpdateKey: this.state.filterUpdateKey + 1
    });
  }



  changeAlternative(newAlt) {
    this.setState({
      currentAlternative: newAlt,
      loading: true
    });
  }

  changeLayers(toggledLayer) {
    var optionalLayers = this.state.optionalLayers
    var isVisible = this.state.optionalLayers[toggledLayer.name]['visible']
    if(toggledLayer.value === 'on' && !isVisible){
      optionalLayers[toggledLayer.name]['visible'] = true
    }
    if(toggledLayer.value === 'on' && isVisible){
      optionalLayers[toggledLayer.name]['visible'] = false
    }
    this.setState({
      optionalLayers : optionalLayers
    });
    console.log(optionalLayers)
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
      var resp2 = await fetch("./data/alternative_c_rewrite.geojson");
      altsData["Alternative C"] = await resp2.json();
      var resp3 = await fetch("./data/alternative_d1.json");
      altsData["Alternative D1"] = await resp3.json();
      var resp4 = await fetch("./data/alternative_d2.json");
      altsData["Alternative D2"] = await resp4.json();
      var caribou = await fetch("./data/caribou_range.json")
      altsData['optional_caribou'] = await caribou.json()
      this.setState({
        data: altsData
      });
    } catch (error) {
      console.log(error);
    }

    var alts_layers = [];
    var alts_sources = {};
    for (var alt in ALL_LAYERS){

      var dataLayer = dataLayer_template
      .set('source', alt)
      .set('id', alt)

      if (alt.startsWith("optional")){
        dataLayer = optionalLayer_template
        .set('source', alt)
        .set('id', alt)
      }

      if(alt === this.state.currentAlternative){
        console.log(alt)
        dataLayer = dataLayer.setIn(['layout', 'visibility'], 'visible')
      }


      alts_layers.push(dataLayer)


      alts_sources[alt] = fromJS({
        type: 'geojson',
        data: altsData[alt],
        attribution: "<a href='https://eplanning.blm.gov/epl-front-office/eplanning/planAndProjectSite.do?methodName=dispatchToPatternPage&currentPageId=152115'>Alaska BLM</a>"
      })

      if (alt.startsWith("optional")){
        alts_sources[alt] = alts_sources[alt].set('attribution', "Other Sources")
      }

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
          loading = {this.state.loading}
          programArea={this.state.programArea}
          data={this.state.data}
          currentAlternative={this.state.currentAlternative}
          filterUpdateKey={this.state.filterUpdateKey}
          changeAlternative={this.changeAlternative}
          changeLayers={this.changeLayers}
          optionalLayers={this.state.optionalLayers}
          mapStyle={this.state.mapStyle}
        />
      </div>
    );
  }
}

export default App;
