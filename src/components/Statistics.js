import React, {Component} from "react";

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      designations: this.props.designations || []
    };
  }

  total(designation) {
    if (!this.props.data) {
      return 0;
    }
    const current = this.props.data[this.props.currentAlternative];
    var result = 0;
    for (const feature of current.features) {
      if (feature.properties.designation === designation) {
        result += feature.properties["GIS_Acres"];
      }
    }
    return Math.trunc(result).toLocaleString();
  }

  totalForSale() {
    if (!this.props.data) {
      return 0;
    }
    const current = this.props.data[this.props.currentAlternative];
    var result = 0;
    for (const feature of current.features) {
      if (feature.properties.designation !== "OG-NoSale") {
        result += feature.properties["GIS_Acres"]
      }
    }
    return Math.trunc(result).toLocaleString();
  }

  render() {
    const designationsListEntries = Object.keys(this.state.designations).map((d) => (
      <React.Fragment key={d}>
        <dt>{this.state.designations[d].prettyName}</dt>
        <dd>{this.total(d)}</dd>
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        <h4>Statistics</h4>
        <h5>Total Acres Under Each Designation</h5>
        <dl className="dl-horizontal">
          { designationsListEntries }
        </dl>
        <h5>Total Acres for Sale: {this.totalForSale()}</h5>

      </React.Fragment>
    );
  }
}

export default Statistics;
