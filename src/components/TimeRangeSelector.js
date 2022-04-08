import React from "react";
import "./css/Button.css";

const TimeRangeSelector = (props) => {
  const onTimeRangeSelect = (time_range) => {
    if (props.time_range !== time_range) {
      //Prevent an additional API call if the already selected button is clicked again
      props.onTimeRangeSelect(time_range);
    }
  };

  return (
    <div>
      <button
        className={`ui button ${
          props.time_range === "short_term" ? "primary" : null
        }`}
        onClick={() => onTimeRangeSelect("short_term")}
      >
        Last 4 weeks
      </button>
      <button
        className={`ui button ${
          props.time_range === "medium_term" ? "primary" : null
        }`}
        onClick={() => onTimeRangeSelect("medium_term")}
      >
        Last 6 months
      </button>
      <button
        className={`ui button ${
          props.time_range === "long_term" ? "primary" : null
        }`}
        onClick={() => onTimeRangeSelect("long_term")}
      >
        All time
      </button>
    </div>
  );
};

export default TimeRangeSelector;
