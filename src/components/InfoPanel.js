import React, {Component} from "react";
import Control from 'react-leaflet-control';
import { Form} from 'react-bootstrap';

const alternatives = ["Alt_A", "Alt_B", "Alt_C", "Alt_D1", "Alt_D2"];

class InfoPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Control position="topright" className="info">
        <h4>Proposed Alternative: </h4>
        <Form.Control as="select" defaultValue={this.props.currentAlternative} onChange={(event) => { this.props.changeAlternative(event.target.value); }}>
          { alternatives.map((alt) => (<option key={alt}>{alt}</option>)) }
        </Form.Control>
      </Control>
    );
  }
}
export default InfoPanel;
