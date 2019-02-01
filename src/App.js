import React, {Component} from "react";
import "./App.css";
import MainMap from "./components/MainMap.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      programArea: null,
      alternatives: null,
      currentAlternative: "Alt_B",
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
      currentAlternative: newAlt
    });
  }

  async loadProgramArea() {
    try {
      const c = await import(/* webpackChunkName: "programArea" */ "./data/CoastalPlain_ProgramArea.json");
      this.setState({
        programArea: c.default,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loadAlternatives() {
    try {
      var altsData = [];
      altsData.push(await import(/* webpackChunkName: "alternativesData" */ "./data/alternative_b.json"));
      altsData.push(await import(/* webpackChunkName: "alternativesData" */ "./data/alternative_c.json"));
      altsData.push(await import(/* webpackChunkName: "alternativesData" */ "./data/alternative_d1.json"));
      altsData.push(await import(/* webpackChunkName: "alternativesData" */ "./data/alternative_d2.json"));
      this.setState({
        alternatives: altsData
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <MainMap
          programArea={this.state.programArea}
          alternatives={this.state.alternatives}
          currentAlternative={this.state.currentAlternative}
          triggerFilterUpdate={this.triggerFilterUpdate}
          filterUpdateKey={this.state.filterUpdateKey}
          changeAlternative={this.changeAlternative}
        />
      </div>
    );
  }
}

export default App;
