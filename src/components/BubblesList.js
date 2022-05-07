import React, { useState, useEffect } from "react";

import spotify from "../api/spotify";
import TypeSelector from "./TypeSelector";
import TimeRangeSelector from "./TimeRangeSelector";
import Bubble from "./Bubble";
import "./css/BubblesList.css";
import "./css/Button.css";

const BubblesList = ({ token, logout }) => {
  // State variables
  const [type, setType] = useState("artists");
  const [timeRange, setTimeRange] = useState("medium_term");
  const [data, setData] = useState([]);

  // Make a call to spotify API when the component mounts
  useEffect(() => {
    const getData = async (type, time_range) => {
      const response = await spotify.get(`/v1/me/top/${type}`, {
        headers: { Authorization: "Bearer " + token },
        params: { limit: 10, time_range: time_range },
      });
      setData(response.data.items);
    };
    getData(type, timeRange);
  }, [type, timeRange, token]);

  // Callback functions for type and time range selectors
  const onTypeSelect = (newType) => {
    setType(newType);
  };

  const onTimeRangeSelect = (newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  // Helper function to render bubbles
  const renderList = () => {
    return data.map((item) => {
      return (
        <div id="child" key={item.id}>
          <Bubble data={item} token={token} />
        </div>
      );
    });
  };

  return (
    <div className="background">
      <div className="ui container">
        <div className="selectors">
          <TypeSelector type={type} onTypeSelect={onTypeSelect} />
          <TimeRangeSelector
            time_range={timeRange}
            onTimeRangeSelect={onTimeRangeSelect}
          />
          <button
            className="ui button primary"
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </button>
        </div>
        <div className="header">
          <h1>
            Your top {data.length} {type}
          </h1>
        </div>
        <div className="ui relaxed list">{renderList()}</div>
      </div>
    </div>
  );
};
/*
class BubblesList extends React.Component {
  // Set state to default values in Spotify API documentation
  state = { type: "artists", time_range: "medium_term", data: [] };

  // Call to spotify API
  getData = async (type, time_range) => {
    const response = await spotify.get(`/v1/me/top/${type}`, {
      headers: { Authorization: "Bearer " + this.props.token },
      params: { limit: 10, time_range: time_range },
    });
    this.setState({
      type: type,
      time_range: time_range,
      data: response.data.items,
    });
  };

  // Callback functions for type and time range selectors
  onTypeSelect = (type) => {
    this.getData(type, this.state.time_range);
  };

  onTimeRangeSelect = (time_range) => {
    this.getData(this.state.type, time_range);
  };

  // Lifecycle methods
  componentDidMount() {
    this.getData(this.state.type, this.state.time_range);
  }

  // Helper function to render bubbles
  renderList() {
    return this.state.data.map((item) => {
      return (
        <div id="child" key={item.id}>
          <Bubble data={item} token={this.props.token} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="background">
        <div className="ui container">
          <div className="selectors">
            <TypeSelector
              type={this.state.type}
              onTypeSelect={this.onTypeSelect}
            />
            <TimeRangeSelector
              time_range={this.state.time_range}
              onTimeRangeSelect={this.onTimeRangeSelect}
            />
            <button
              className="ui button primary"
              onClick={() => {
                this.props.logout();
              }}
            >
              Log Out
            </button>
          </div>
          <div className="header">
            <h1>
              Your top {this.state.data.length} {this.state.type}
            </h1>
          </div>
          <div className="ui relaxed list">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}
*/

export default BubblesList;
