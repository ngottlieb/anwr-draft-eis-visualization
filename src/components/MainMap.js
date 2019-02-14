import React, {Component} from "react";
import ReactMapGL from 'react-map-gl';
import Control from "react-leaflet-control";
import InfoPanel from "./InfoPanel.js";
import {fromJS} from "immutable";
import "./MainMap.css";
import _ from 'lodash';


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
    console.log("optional", props.optionalLayers)

    this.state = {
      viewport : {
        latitude: 69.85,
        longitude: -144,
        zoom: 7
      },
      map_style : this.props.mapStyle,
      currentAlternative: this.props.currentAlternative,
      optionalLayers : this.props.optionalLayers,
      style_set: false,
      loading: this.props.loading
    }
  }


  baseMapStyle(feature) {
    return {
      color: "rgb(49, 130, 189)",
      fillColor: null,
      fillOpacity: 0,
    };
  }


    static getDerivedStateFromProps(props, state) {
      console.log('props', state)

      var derivedState = {}

      if(!state.style_set){

        if(props.mapStyle != null){

          derivedState['map_style'] = props.mapStyle
          derivedState['style_set'] = true
          derivedState['loading'] = false
          return(derivedState)
        }
      }

      if(state.currentAlternative !== props.currentAlternative){


        const layers = state.map_style.get('layers')
            .map(layer => {

              const id = layer.get('id');
              if (id === state.currentAlternative) {
                return layer.setIn(['layout', 'visibility'], 'none');
              }

              if (id === props.currentAlternative) {
                return layer.setIn(['layout', 'visibility'], 'visible')
              }

              return layer;
            });


        derivedState['map_style'] = state.map_style.set('layers', layers)
        derivedState['currentAlternative'] = props.currentAlternative
      }


      // if(state.map_style != null ){
      //   console.log('editing optional layers')
      //   var interimLayers = null
      //   try{
      //     interimLayers = derivedState.map_style.get('layers')
      //   }
      //   catch(err){
      //     interimLayers = state.map_style.get('layers')
      //   }
      //   const layers = interimLayers
      //       .map(layer => {
      //
      //         const id = layer.get('id');
      //         try{
      //           // drop optional
      //           var new_id = id.split('_')[1]
      //           if (props.optionalLayers[new_id]['visible']) {
      //             return layer.setIn(['layout', 'visibility'], 'visible');
      //           }
      //           else{
      //             return layer.setIn(['layout', 'visibility'], 'none')
      //           }
      //
      //           return layer;
      //         } catch(err){
      //           console.log(err)
      //           return layer
      //         }
      //       });
      //
      //   derivedState['map_style'] = state.map_style.set('layers', layers)
      //   console.log("done")
      // }
      //

      return(derivedState)
    }

  render() {

    return (

      <ReactMapGL
        {...this.state.viewport}
        width="100%"
        height="100%"
        mapStyle = {this.state.map_style}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken =  'pk.eyJ1IjoiYWNhbm5pc3RyYSIsImEiOiJLWVM2RWhJIn0.TputXxRYBUPh-vjDg6_TFA'>
        <InfoPanel
            loading = {this.state.loading}
            currentAlternative={this.props.currentAlternative}
            changeAlternative={this.props.changeAlternative}
            changeLayers={this.props.changeLayers}
            optionalLayers={this.props.optionalLayers}
            data={this.props.data}
            designations={designations}
        />
      </ReactMapGL>

    );
  }
}

export default MainMap;
