import React, { Component } from 'react'

class Eventlist extends Component {
  constructor(props) {
    super(props);
    this.heartClick = this.heartClick.bind(this);
    this.shareClick = this.shareClick.bind(this);
    this.trashClick = this.trashClick.bind(this);
    this.state = {
      heart: false,
      share: false,
      trash: false,
    }
  }
  
  heartClick() {
    this.setState({
      heart: !this.state.heart
    })
  }

  shareClick() {
    this.setState({
      share: !this.state.share
    })
  }

  trashClick() {
    this.setState({
      trash: !this.state.trash
    })
  }
  render() {
    const iconStyle = {
      color : 'red'
    }
console.log(this.props);
    return (
      <div className="eventItem">
        <div className="panel panel-default">
          <img src={this.props.image} alt='techcity' className='logo' />    
          <h2 className="panel-header">{this.props.title}</h2>  
          <div className="panel-body">
            <p>{new Date(this.props.start_date).toDateString()} - {new Date(this.props.end_date).toDateString()}</p>
            <p>
              {this.props.start_time} - {this.props.end_time}
            </p>
            <p>
              {this.props.description}
            </p>
            <p> {this.props.name} </p>
            <div className="panel-footer">
              <i className="fa fa-trash-o" aria-hidden="true" onClick={this.trashClick} style={this.state.trash ? iconStyle : null}></i>
              <i className="fa fa-share-alt" aria-hidden="true" onClick={this.shareClick} style={this.state.share ? iconStyle : null}></i>
              <i className="fa fa-heartbeat" aria-hidden="true" onClick={this.heartClick} style={this.state.heart ? iconStyle : null}></i>  
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Eventlist;