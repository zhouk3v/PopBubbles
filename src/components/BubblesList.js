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
  const [error, setError] = useState("");
  // should we store the number of elements in state?

  // Make a call to spotify API when the component mounts
  useEffect(() => {
    const getData = async (type, time_range) => {
      try {
        const response = await spotify.get(`/v1/me/top/${type}`, {
          headers: { Authorization: "Bearer " + token },
          params: { limit: 10, time_range: time_range },
        });
        setType(type);
        setTimeRange(time_range);
        setData(response.data.items);
        setError(``);
      } catch (err) {
        console.log(`${err}`);
        setError(`Error with the Spotify API: (${err}) Please try again`);
      }
    };
    getData(type, timeRange);
  }, [type, token, timeRange]);

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
      <div className="error">
        <p>{error}</p>
      </div>
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

export default BubblesList;
