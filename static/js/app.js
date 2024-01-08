const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

function init(){
    d3.json(url).then(function(data) {
        
        console.log(data.samples[0]);
        
        // Pull data for bar chart and get Top 10 values for each all in same line. Data appears already sorted so no need to sort
        let bar_vals = data.samples[0].sample_values.slice(0,10).reverse();
        let bar_labels = data.samples[0].otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let bar_hoverText = data.samples[0].otu_labels.slice(0,10).reverse();
        
        let barChart = {
            type: 'bar',
            x: bar_vals,
            y: bar_labels,
            orientation: 'h',
            text: bar_hoverText,
            hoverinfo: 'text'
        };
    
        let layoutBar = {
            title: {
                text: 'Top 10 OTUs',
                font: {
                    size: 24,       
                    color: '#000', 
                    weight: 'bold'  
                }
            }, 
            margin: {
                l: 100,  
                r: 100,  
                b: 100,  
                t: 50,  
                pad: 4  
            }, 
        };

        Plotly.newPlot("bar", [barChart], layoutBar);

    });
}

init();