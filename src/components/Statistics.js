import React, {Component} from "react";
import {VictoryPie, VictoryChart, VictoryLegend} from 'victory';



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
    return Math.trunc(result);
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
    return Math.trunc(result);
  }

  _getDesignationDatum(d) {
    console.log(this.total(d))
    if(this.total(d) > 0){
      return({
        x: this.state.designations[d].prettyName.replace(" ", '\n'),
        y: this.total(d).toLocaleString(),
        fill: this.state.designations[d].color,
        name: this.state.designations[d].prettyName.replace(" ", '\n')
      })
    }

  }

  render() {
    var designationsListEntries = Object.keys(this.state.designations).map((d) => (
      this._getDesignationDatum(d)
      // <React.Fragment key={d}>
      //   <dt>{this.state.designations[d].prettyName}</dt>
      //   <dd>{this.total(d)}</dd>
      // </React.Fragment>
    ));
    var allDesignations =
    Object.keys(this.state.designations).map((d) => (
      { name: this.state.designations[d].prettyName.replace(" ", '\n'),
        fill : this.state.designations[d].color
     }
    ));
    designationsListEntries = designationsListEntries.filter((el) => { return el != null;});
    console.log(allDesignations)
    return (
      <React.Fragment>
        <h5>Total Acres Under Each Designation</h5>
        <svg width={350} height={250}>
                <VictoryLegend standalone={false}
                  x={190} y={0}
                  width = {'100%'}
                  height = {250}
                  orientation = 'vertical'
                  style={{
                      data: {
                        fill: (d) => d.fill,
                      }
                    }}
                  data={allDesignations}
                />
                <VictoryPie standalone={false}
                  width={300} height={200}
                  padding={{
                  	  top: 25, right: 110,
                  }}
                  data={designationsListEntries}
                  labelRadius = {30}
                  labels = {(d) => d.y}
                  style={{
                        data: {
                          fill: (d) => d.fill,
                        },
                        labels : {
                          fill: 'black',
                          fontSize: 10,
                          fontWeight: 'bold'
                        }
                      }}
                />
        </svg>
        <h5>Total Acres for Sale: {this.totalForSale().toLocaleString()}</h5>

      </React.Fragment>
    );
  }
}

export default Statistics;
