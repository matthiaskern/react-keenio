import React, {
  Component
} from "react";

import keen from "keen-js";

export default class Chart extends React.Component {

  constructor(props){
    super(props);

    this.initChart = this.initChart.bind(this);
  }

  initChart() {
    this._chart = new Keen.Dataviz()
      .el(this._chartRef)
      .chartType(this.props.chartType)
      .title(this.props.title)
      .library(this.props.library)
      .height(this.props.height)
      .width(this.props.width)
      .colors(this.props.colors)
      .labelMapping(this.props.labelMapping)
      .colorMapping(this.props.colorMapping)
      .labels(this.props.labels)
      .chartOptions(this.props.chartOptions)
      .prepare();
  }
  componentDidMount(){
    this.initChart();
    this.props.client.run(this.props.query, (err, res) => {
      if (err) {
        // Display the API error
        this._chart.error(err.message);
      }
      else {
        // Handle the response
        this._chart
          .parseRawData({result: res.result})
          .render();
      }
    });
  }

  render(){
    return(<div ref={(c) => this._chartRef = c}></div>);
  }

}

Chart.propTypes = {
  client: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  chartType: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  library: React.PropTypes.string,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  colors: React.PropTypes.array,
  colorMapping: React.PropTypes.object,
  labelMapping: React.PropTypes.object,
  labels: React.PropTypes.array,
  chartOptions: React.PropTypes.object,
};

Chart.defaultProps = {
  title: "",
  library: "",
  height: 400,
  width: 600,
  colors: [],
  colorMapping: {},
  labelMapping: {},
  labels: [],
  chartOptions: {}
};
