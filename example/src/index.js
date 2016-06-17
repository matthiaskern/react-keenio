import React from "react";
import ReactDOM from "react-dom";
import KeenChart from "../../dist";
import keen from "keen-js";

// These are taken from : https://github.com/keen/dashboards/blob/gh-pages/examples/starter-kit/keen.dashboard.js

const client = new Keen({
  projectId: "5368fa5436bf5a5623000000",
  readKey: "3f324dcb5636316d6865ab0ebbbbc725224c7f8f3e8899c7733439965d6d4a2c7f13bf7765458790bd50ec76b4361687f51cf626314585dc246bb51aeb455c0a1dd6ce77a993d9c953c5fc554d1d3530ca5d17bdc6d1333ef3d8146a990c79435bb2c7d936f259a22647a75407921056"
});

const pageviews_timeline = new Keen.Query("count", {
  eventCollection: "pageviews",
  interval: "hourly",
  groupBy: "user.device_info.browser.family",
  timeframe: {
    start: "2014-05-04T00:00:00.000Z",
    end: "2014-05-05T00:00:00.000Z"
  }
});

const parseData = data => {
  console.log(data);
  return data;
};

ReactDOM.render(
  <KeenChart client={client} query={pageviews_timeline} chartType="linechart" title="My Chart" colors={["#49c5b1"]} customFunction={parseData}
  />,
  document.querySelector("#app")
);
