import React from 'react'

const TypeSelector = (props) => {
  const onTypeSelect = (type) => {
    if(props.type !== type){ //Prevent an additional API call if the already selected button is clicked again
      props.onTypeSelect(type)
    }
  }

  return (
    <div>
      <button 
        className={`ui button ${props.type === 'artists' ? 'primary' : null}`} 
        onClick={() => onTypeSelect('artists')}
      >
        Artists
      </button>

      <button 
        className={`ui button ${props.type === 'tracks' ? 'primary' : null}`} 
        onClick={() => onTypeSelect('tracks')}
      >
        Tracks
      </button>
    </div>
  );
}

export default TypeSelector;