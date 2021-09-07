import React from "react";

import spotify from "../api/spotify";
import TypeSelector from "./TypeSelector";
import TimeRangeSelector from "./TimeRangeSelector";
import ViewportBubble from "./Bubble";
import './css/BubblesList.css'

class BubblesList extends React.Component {

  state = { type:"artists", time_range: 'medium_term', data: [] }

  // API call to spotify API
  getData = async (type, time_range) => {
    const response = await spotify.get(`/v1/me/top/${type}`,{
      headers: {Authorization: 'Bearer ' + this.props.token },
      params: {limit: 20, time_range: time_range}
    })
    this.setState({ type:type, time_range:time_range, data:response.data.items });
  }

  // Callback functions for type and time range selectors
  onTypeSelect = (type) => {
    this.getData(type, this.state.time_range);
  }

  onTimeRangeSelect = (time_range) => {
    this.getData(this.state.type, time_range);
  }

  // Lifecycle methods
  componentDidMount() {
    this.getData(this.state.type, this.state.time_range);
  }

  // Helper function to render bubbles
  renderList(){
    console.log(this.state.data)
    return this.state.data.map(item => {
      return (
        <div id="child" key={item.id}>
          <ViewportBubble data={item}/>
        </div>
      );
    });
  }

  render(){
    return (
      <div className="background">
        <div className="ui container">
          <div className="ui secondary pointing menu">        
            <TypeSelector type={this.state.type} onTypeSelect={this.onTypeSelect} />
            <div className="right menu">
              <TimeRangeSelector time_range={this.state.time_range} onTimeRangeSelect={this.onTimeRangeSelect} />
            </div>
          </div>
          <div className="header">
            <h1>
              Your top {this.state.type}
            </h1>
          </div>
          <div className="ui relaxed list">
            {this.renderList()}
          </div>
        </div>
      </div>
    )
  }
}

export default BubblesList;