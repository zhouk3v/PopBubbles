import React from 'react'
import './css/Button.css'

const TimeRangeSelector = (props) => {
  const onTimeRangeSelect = (time_range) => {
    if(props.time_range !== time_range) { //Prevent an additional API call if the already selected button is clicked again
      props.onTimeRangeSelect(time_range)
    }
  }

  return (
    <div>
      <button 
        className={`ui button ${props.time_range === 'short_term' ? 'primary' : null}`} 
        onClick={() => onTimeRangeSelect('short_term')}
      >
        Short Term
      </button>
      <button 
        className={`ui button ${props.time_range === 'medium_term' ? 'primary' : null}`} 
        onClick={() => onTimeRangeSelect('medium_term')}
      >
        Medium Term
      </button>
      <button 
        className={`ui button ${props.time_range === 'long_term' ? 'primary' : null}`} 
        onClick={() => onTimeRangeSelect('long_term')}
      >
        Long Term
      </button>
    </div>
  );
}

export default TimeRangeSelector;