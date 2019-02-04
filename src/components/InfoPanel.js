import React, {Component} from "react";
import Control from 'react-leaflet-control';
import { Form} from 'react-bootstrap';
import Statistics from './Statistics.js';

const alternatives = ["Alternative B", "Alternative C", "Alternative D1", "Alternative D2"];

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

class InfoPanel extends Component {
  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    return (
      <Container>
        <h3>ANWR EIS Alternatives</h3>
        <p>Map showing land use designations for {this.props.currentAlternative}</p>

        <div>Choose another: <Form as="select" defaultValue={this.props.currentAlternative} onChange={(event) => { this.props.changeAlternative(event.target.value); }}>
        { alternatives.map((alt) => (<option key={alt}>{alt}</option>)) }
        </Form></div>

        <hr />
        <Statistics currentAlternative={this.props.currentAlternative} designations={this.props.designations} data={this.props.data} />

        <small>Map by <a href="http://www.nicholasgottlieb.com/">Nick Gottlieb</a> and <a href="http://www.anthonycannistra.com">Tony Cannistra</a>. <a href="https://www.github.com/ngottlieb/anwr-draft-eis-visualization">Code</a>.</small>
      </Container>
    );
  }
}

export default InfoPanel;
