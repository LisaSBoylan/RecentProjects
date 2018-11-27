
function getData()
{
    console.log("In GetData");
    
    // The data format from the remote site will be
    // "date": "YYYY-MM-DD",
    // "rates": {"CCC":dec,"CCC":dec,}, "base":"
    /* Use to test
    const data =
    {
        "date" : "2018-01-01",
        "rates":{"USD":1.0,"GBP":10.0},
        "base":"USD "        
    };
    */
    
    /*
    let data =  {
        "date" : "2018-01-01",
        "rates":{"USD":1.0,"GBP":10.0},
        "base":"USD "        
    };
    */
    
     fetch("https://api.exchangeratesapi.io/latest?base=USD&symbols=BGN,SGD,AUD,EUR")
     .then(response => response.json())
     .then ( (data) => {
           console.log("Got Data");
           console.log(data);
           render(data.rates);
       });
    

}


function render(rates)
{
    console.log("In render");
    
    //Using rates, refresh the graph
         
    /*
    // The format of the HTML to be modified is:
    let graph = document.querySelect('#Graph');
    <div class="Graph">
        <div class="Graph-data1" onclick="alert(\'EUR costs 0.88lb\') " style="height:88.5%" ">EUR &#8364</div>
        <div class="Graph-data2" style="height:75.5%">USD $</div>
        <div class="Graph-data3" style="height:55.9%">AUD $</div>
        <div class="Graph-data4" style="height:45.5%">GBP &pound</div>
    </div>
    */
    
    // Get the rates
    // Note: used for..of becasue it is MUCH faster than Object.entries
    let lineNum = 1;
    
    for (const key of Object.keys(rates))
    {
        const value = rates[key];
        
        //Check for properties from prototype chain   
        if (rates.hasOwnProperty(key))
        {
            //not a property from prototype chain
            let graphString='.Graph-data' + lineNum++;

            // format value to be x.xx
            const formatValue = parseFloat(value).toFixed(2) * 30;
            // format the HTML style attribute
            const style = 'height:' + formatValue + '%';
            
            // Modify the DOM Element
            let graphBar = document.querySelector(graphString); 
            graphBar.setAttribute("style", style);
          
            // Add text to bar
            const symbol = "$";   // Should automate this
            graphBar.textContent=key + " " + symbol;
        }
    }
}



function getSelect(baseCode)
{
    // Create a query string by setting the new baseCode and removing new base from comparator
    console.log("In GetSelect");
    
    // Currently displayed currencies;
    let symbols = ["BGN", "SGD", "AUD", "EUR", "USD"];
    let comparator = "BGN,SGD,AUD,EUR,USD";
    
    
    // Get the requested base currency
    //const baseCode = document.getElementById("BaseCode").value;
    console.log("New Base Code:", baseCode);
    
    
    let i = 0;
    while ((symbols[i++].valueOf() != baseCode) && ( i < symbols.length))  // find the code in symbols
    {}
    
    i--;  // reposition counter to found item
    if (symbols[i] === baseCode)
    {
        comparator = symbols.splice(i,1);  // remmove elemment
    }
    console.log("symbols:", comparator);
    
    let fetchString='https://api.exchangeratesapi.io/2018-11-01?base=' + baseCode + "&symbols=" + symbols;
    
    // Make request
    fetch(fetchString)
     .then(response => response.json())
     .then ( (data) => {
           console.log("Got Data");
           console.log(data);
           render(data.rates);
       });
}