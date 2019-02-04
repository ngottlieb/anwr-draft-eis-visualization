import React, {Component} from "react";
import ReactMapGL from 'react-map-gl';
import Control from "react-leaflet-control";
import InfoPanel from "./InfoPanel.js";
import {fromJS} from "immutable";
import "./MainMap.css";
import MAP_STYLE from "../map-style-basic-v8.json"

const IMM_MAP_STYLE = fromJS(MAP_STYLE)

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

// redundant
const designation_colors = [
  ["OG-NoSale" ,  "#7fc97f"],
  ["OG-NSO", "#beaed4"],
  ["OG-CSU", "#fdc086"],
  ["OG-TL", "#ffff99"],
  ["OG-SaleSTC", "#f0027f"]
];


const alt_colnames = {
  "Alternative B" : "Alt_B",
  "Alternative C" : "Alt_C",
  "Alternative D1" : "Alt_D1",
  "Alternative D2" : "Alt_D2"
}

class MainMap extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   position: [69.85, -144],
    //   zoom: 8,
    // };


    this.state = {
      viewport : {
        latitude: 69.85,
        longitude: -144,
        zoom: 7
      },
      map_style : this.props.mapStyle,
      currentAlternative: this.props.currentAlternative,
      style_set: false,
    }
  }




  componentWillReceiveProps(newProps) {

    if(this.props.currentAlternative !== newProps.currentAlternative){
      console.log("changing data")

      const layers = this.state.map_style.get('layers')
          .map(layer => {
            console.log(layer)
            const id = layer.get('id');

            if (id === this.props.currentAlternative) {
              console.log("CHANGING TO NONE")
              return layer.setIn(['layout', 'visibility'], 'none');
            }

            if (id === newProps.currentAlternative) {
              return layer.setIn(['layout', 'visibility'], 'visible')
            }

            return layer;
          });


      this.setState({map_style: this.state.map_style.set('layers', layers)})

    }
  };

  baseMapStyle(feature) {
    return {
      color: "rgb(49, 130, 189)",
      fillColor: null,
      fillOpacity: 0,
    };
  }


    static getDerivedStateFromProps(props, state) {
      var derivedState = {}

      if(!state.style_set){

        if(props.mapStyle != null){
          console.log("GOT STYLE~!", props.mapStyle)

          derivedState['map_style'] = props.mapStyle
          derivedState['style_set'] = true
          return(derivedState)
        }
      }

      if(state.currentAlternative !== props.currentAlternative){
        console.log("changing data")

        const layers = state.map_style.get('layers')
            .map(layer => {

              const id = layer.get('id');
              console.log(id)
              if (id === state.currentAlternative) {
                console.log("CHANGING TO NONE")
                return layer.setIn(['layout', 'visibility'], 'none');
              }

              if (id === props.currentAlternative) {
                console.log("CHANGING TO VIZ")
                return layer.setIn(['layout', 'visibility'], 'visible')
              }

              return layer;
            });


        derivedState['map_style'] = state.map_style.set('layers', layers)
        derivedState['currentAlternative'] = props.currentAlternative
      }



      return(derivedState)
    }



  render() {
    var programArea;
    // if (this.props.programArea) {
    //   programArea = (
    //     <GeoJSON data={this.props.programArea} style={this.baseMapStyle} />
    //   );
    // }
    //

    // if (this.props.currentAlternative && this.props.data) {
    //   console.log(this.props.currentAlternative)
    //   map_style = fromJS({
    //     version: 8,
    //     sources: {
    //       alternative: {
    //         type: 'geojson',
    //         data : this.props.data[this.props.currentAlternative]
    //       }
    //     },
    //     layers: [
    //       {
    //         id: 'data',
    //         source: 'alternative',
    //         type: 'fill',
    //         interactive: true,
    //         paint: {
    //           'fill-color' : {
    //             property: alt_colnames[this.props.currentAlternative],
    //             type: 'categorical',
    //             stops: designation_colors
    //           },
    //           // 'fill-color': 'blue',
    //           'fill-opacity': 0.8
    //         }
    //       }
    //     ]
    //   });
    //
    //
    // };



    return (
      // <Map center={this.state.position} zoom={this.state.zoom} id="mapid">
      //   <TileLayer
      //     url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
      //     accessToken={mapboxToken}
      //     attribution="data from <a href='https://eplanning.blm.gov/epl-front-office/eplanning/planAndProjectSite.do?methodName=dispatchToPatternPage&currentPageId=152115'>Alaska BLM</a> "
      //     id="mapbox.outdoors"
      //   />
      //   {programArea}
      //   {alternatives}
      //   <InfoPanel
      //     currentAlternative={this.props.currentAlternative}
      //     changeAlternative={this.props.changeAlternative}
      //     data={this.props.data}
      //     designations={designations}
      //   />
      //   <Control position="bottomright" className="info legend">
      //     {Object.keys(designations).map(d => (
      //       <React.Fragment key={d}>
      //         <i style={{background: designations[d].color}} />
      //         {designations[d].prettyName}
      //         <br />
      //       </React.Fragment>
      //     ))}
      //   </Control>
      // </Map>
      <ReactMapGL
        {...this.state.viewport}
        width="100%"
        height="100%"
        mapStyle = {this.state.map_style}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken =  'pk.eyJ1IjoiYWNhbm5pc3RyYSIsImEiOiJLWVM2RWhJIn0.TputXxRYBUPh-vjDg6_TFA'>
        <InfoPanel
            currentAlternative={this.props.currentAlternative}
            changeAlternative={this.props.changeAlternative}
            data={this.props.data}
            designations={designations}
        />
      </ReactMapGL>

    );
  }
}

export default MainMap;

const mapboxToken = 'pk.eyJ1IjoibmdvdHRsaWViIiwiYSI6ImNqcm1yZjk3ZDBtY3M0M3RrY2k0N3RjMDcifQ.onvCNE2GGEo63j53moDLMw';
