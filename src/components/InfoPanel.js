import React, {Component} from "react";
import Control from 'react-leaflet-control';
import { Form} from 'react-bootstrap';
import Statistics from './Statistics.js';

const alternatives = ["Alternative B", "Alternative C", "Alternative D1", "Alternative D2"];

class InfoPanel extends Component {
  render() {
    return (
      <Control position="topright" className="info">
        <h4>Proposed Alternative: </h4>
        <Form.Control as="select" defaultValue={this.props.currentAlternative} onChange={(event) => { this.props.changeAlternative(event.target.value); }}>
          { alternatives.map((alt) => (<option key={alt}>{alt}</option>)) }
        </Form.Control>
        <hr />
        <Statistics currentAlternative={this.props.currentAlternative} designations={this.props.designations} data={this.props.data} />
      </Control>
    );
  }
}

export default InfoPanel;
