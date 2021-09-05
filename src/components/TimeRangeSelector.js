import React from 'react'

const TimeRangeSelector = (props) => {
  const onTimeRangeSelect = (time_range) => {
    props.onTimeRangeSelect(time_range)
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