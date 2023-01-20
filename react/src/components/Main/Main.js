import { Component } from 'react';
import Notification from "../Notification/Notification"
export default class Main extends Component
{
  render(){
    return (
      <div className="main">
      <Notification />
        { this.props.children }
      </div>
    );
  }
}