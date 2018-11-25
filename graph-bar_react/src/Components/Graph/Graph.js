import React, { Component } from 'react';
import './Graph.css';

import Bar from '../Bar/Bar.js'

class Graph extends Component {

  render() 
  {
    console.log("In Graph:render()");
    console.log("children=", this.props.children);
    console.log("props=", this.props);
    return (
      <div className="Graph">
        {
            this.props.bars.map((bar, index) => (
              <Bar
              key={index} 
              title={bar[0]} 
              symbol= "$"
              style={bar[1]} 
              />
            ))      

        }
      </div>
    );
  }
}

export default Graph;




