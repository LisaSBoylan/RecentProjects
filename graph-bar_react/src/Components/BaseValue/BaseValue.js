import React, { Component } from 'react';
import './BaseValue.css';

class BaseValue extends Component 
{


  render()
  {
        <h2 className="BaseValue">Base Currency:</h2>
        <select 
          basecode={this.prop.baseCode} 
          className="BaseCode" 
          onChange={this.onBaseCodeChange}>
          <option value="USA">USA</option>
          <option value="AUD">AUD</option>
          <option value="SGD">SGD</option>
          <option value="EUR">EUR</option>
        </select>
   }
}

export default BaseValue
