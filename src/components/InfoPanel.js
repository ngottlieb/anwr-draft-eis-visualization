import React, {Component} from "react";
import Control from 'react-leaflet-control';
import { Form} from 'react-bootstrap';
import Statistics from './Statistics.js';
import {ClipLoader} from 'react-spinners'
import { css } from '@emotion/core';



const alternatives = ["Alternative B", "Alternative C", "Alternative D1", "Alternative D2"];

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;




class InfoPanel extends Component {

  constructor(props){
    super(props);
    console.log(props.optionalLayers)
    this.state =  {
      loading : this.props.loading
    }
  }



  _changeAlternative = event => {
    this.setState({loading: true});
    this.props.changeAlternative(event.target.value);
  }

  _changeLayers = event => {
    this.props.changeLayers(event.target);
  }


  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    return (
      <Container>
        <h3>
          <ClipLoader
            sizeUnit={"px"}
            size={20}
            color={'#123abc'}
            loading={this.props.loading}
          />
          ANWR EIS Alternatives</h3>
        <p>Map showing land use designations for {this.props.currentAlternative}</p>

        <div>Choose another: <Form as="select" defaultValue={this.props.currentAlternative} onChange={this._changeAlternative}>
        { alternatives.map((alt) => (<option key={alt}>{alt}</option>)) }
        </Form></div>

        <div>
          <Form>
            <label>Display Caribou Range:
              <input
                name = 'caribou'
                type = 'checkbox'
                checked = {this.props.optionalLayers['caribou']['visible']}
                onChange = {this._changeLayers}
              />
            </label>
          </Form>
        </div>
        <hr />
        <Statistics currentAlternative={this.props.currentAlternative} designations={this.props.designations} data={this.props.data} />

        <small>Map by <a href="http://www.nicholasgottlieb.com/">Nick Gottlieb</a> and <a href="http://www.anthonycannistra.com">Tony Cannistra</a>. <a href="https://www.github.com/ngottlieb/anwr-draft-eis-visualization">Code</a>.</small>

      </Container>
    );
  }
}

export default InfoPanel;
