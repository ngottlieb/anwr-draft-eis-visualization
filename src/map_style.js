import {fromJS} from 'immutable';
import MAP_STYLE from "./outside-style.json"

export const dataLayer_template = fromJS({
  id : null,
  source : null,
  type : 'fill',
  interactive: 'true',
  paint: {
    'fill-outline-color': 'black',
    'fill-color': {
      'property' : 'designation',
      'type': 'categorical',
      stops : [
        ["OG-NoSale" ,  "#7fc97f"],
        ["OG-NSO", "#beaed4"],
        ["OG-CSU", "#fdc086"],
        ["OG-TL", "#ffff99"],
        ["OG-SaleSTC", "#f0027f"]
      ]
    },
    'fill-opacity' : 0.8
  },
  layout: {
    visibility: 'none'
  }
});

export const optionalLayer_template = fromJS({
  id : null,
  source : null,
  type : 'fill',
  interactive: 'true',
  paint: {
    'fill-outline-color': 'black',
    'fill-color': 'blue',
    'fill-opacity' : 0.2
  },
  layout: {
    visibility: 'none'
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE)
