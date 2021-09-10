import React from "react";

import spotify from "../api/spotify";
import TypeSelector from "./TypeSelector";
import TimeRangeSelector from "./TimeRangeSelector";
import Bubble from "./Bubble";
import './css/BubblesList.css'

class BubblesList extends React.Component {

  // Set state to default values in Spotify API documentation
  state = { type:"artists", time_range: 'medium_term', data: [] }

  // Call to spotify API
  getData = async (type, time_range) => {
    const response = await spotify.get(`/v1/me/top/${type}`,{
      headers: {Authorization: 'Bearer ' + this.props.token },
      params: {limit: 10, time_range: time_range}
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
    return this.state.data.map(item => {
      return (
        <div id="child" key={item.id}>
          <Bubble data={item} token = {this.props.token}/>
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
              Your top {this.state.data.length} {this.state.type}
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