import React from "react";
import spotify from "../api/spotify";

class BubblesList extends React.Component {

  state = { type:"tracks", data: [] }

  getData = async (type) => {
    const response = await spotify.get(`/v1/me/top/${type}`,{
      headers: {Authorization: 'Bearer ' + this.props.token },
      params: {limit: 10, time_range:'medium_term'}
    })
    this.setState({ type:type, data:response.data.items });
  }

  componentDidMount() {
    this.getData(this.state.type);
  }

  renderList(){
    console.log(this.state.data)
    return this.state.data.map(item => {
      return (
        <div className="item" key={item.id}>
          <div className="content">
            <div className="header">{item.name}</div>
          </div>
        </div>
      );
    });
  }

  render(){
    this.renderList();
    return (
      <div className="ui container">
        <div>
          <button className="ui button">Artists</button>
          <button className="ui button">Tracks</button>
        </div>
        <div className="ui relaxed divided list">
          {this.renderList()}
        </div>
      </div>
    )
  }
}

export default BubblesList;