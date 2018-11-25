import React, { Component } from 'react';
import './App.css';

import Graph from './Components/Graph/Graph.js'

function buildBar(rates)
{
    // rates is an arraay of objects
    // the objects are {countryCode:rate}
    // we want [countryCode:style]
    console.log("In buildBar");
        
    const bars = Object.entries(rates);
    
    bars.forEach(entry => {
          console.log("entry=", entry[1]);
          const value = entry[1];
          
         // format value to be x.xx
         const formatValue = parseFloat(value).toFixed(2) * 30;
         const style = {"height" :  formatValue + '%'}; // format the JSX style height attribute          
         entry[1]=style;
         console.log("key-", entry[1]);
    });
    console.log("buildBars.bars=", bars);
    return (bars);
}


function getFetchUrl(baseCode)
{
    // Remove new base from comparator
    console.log("In GetSelect");
    
    // Currently displayed currencies;
    let symbols = ["BGN", "SGD", "AUD", "EUR", "USD"];
    let comparator = "BGN,SGD,AUD,EUR,USD";
    
    // Get the requested base currency
    console.log("baseCode:", baseCode);
        
    // find the code in symbols
    let i = 0;    
    while ((symbols[i++].valueOf() !== baseCode) && ( i < symbols.length))  {/*do nothing*/} 
    
    i--;  // reposition counter to new baseCode
    if (symbols[i] === baseCode)
    {
        comparator = symbols.splice(i,1);  // remmove element
    }
    console.log("symbols:", comparator);
    
    let fetchString='https://api.exchangeratesapi.io/2018-11-01?base=' + baseCode + "&symbols=" + symbols;
    console.log("new fetch string=", fetchString);
    return(fetchString);
}

class App extends Component 
{

  state = {
    baseCode:"",
    bars:[],
  }


  // Add data during initial page load. Kind of likke constructor
  componentDidMount = () => {
    console.log("In did Mount and State:", this.state);
    const url = "https://api.exchangeratesapi.io/latest?base=USD&symbols=BGN,GBP,AUD,EUR"
    this.getData(url, "USD");
  }

  render() 
  {
    console.log("Apps.render");

    return (
      <div>
        <h1 className="Title"> Currency</h1>
        <h2 className="BaseValue">Base Currency:</h2>
        <select 
          basecode={this.baseCode} 
          className="BaseCode" 
          onChange={this.onBaseCodeChange}>
          <option value="USA">USA</option>
          <option value="AUD">AUD</option>
          <option value="SGD">SGD</option>
          <option value="EUR">EUR</option>
        </select>
        <Graph 
              className="Graph"
              bars={this.state.bars}        
         />
      </div>
    );
  }

  onBaseCodeChange = (ev) => {
      const code = ev.target.value;
      const url =  getFetchUrl(code);
   
      // Make request
      this.getData(url, code);
  }

  getData(url,code)
  { 
    console.log("In GetData");
  
     fetch(url)
     .then(response => response.json())
     .then ( (data) => {
           console.log("Got Data");
           console.log("Data=", data);
           console.log("Rates=", data.rates);
           const results = buildBar(data.rates);
           console.log("results=", results);
           this.setState({
              bars:results,
              baseCode:code,
           });
       });
  } 
}

export default App;
