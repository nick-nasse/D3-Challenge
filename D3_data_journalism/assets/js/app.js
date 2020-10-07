
d3.csv("/assets/data/data.csv").then(function(hdata) {
    
    // Step 4: Format the data using the unary + operator
    hdata.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
    });
    console.log(hdata)
  });