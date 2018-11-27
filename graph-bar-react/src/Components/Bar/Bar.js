import React, { Component } from 'react';
import "./Bar.css";

class Bar extends Component {
  state= {
    showAlert:false,
  }

       
  render()
  {
    console.log("In Bar.render()");
    console.log("children=", this.props.children);
    console.log("props=", this.props);
 
    return(
        <div className="Bar" onClick={this.showAlert} style={this.props.style}>
        {this.props.title}
        {this.props.symbol}
        </div>      
    )
  }

showAlert=(ev) =>{
  this.showAlert ? alert("You may choose a Base Code"): ev.preventDefault();
  this.setState({
       showAlert:true
   });
}

}
export default Bar;


