// URL of API where data is located
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


/**************************************
 * SECTION: Helper Functions
 **************************************/

// Create helper function to check if there is an existing plotly element at a specific HTML ID
function plotExists(plotId) {
    let plotElement = d3.select('#' + plotId);
    return !plotElement.empty() && plotElement.select('svg').empty() === false;
};


/**************************************
 * SECTION: Set Dropdown Options
 **************************************/

// Set up dropdown and setup a return so we can wait for this to load and use the initial value to initialize my charts.
function dropdownSelections(){
    return d3.json(url).then(function(data) {

        let dropdown = d3.select("#selDataset")
        
        data.names.forEach(function(name) {
            dropdown.append("option")
                .text(name)
                .attr("value", name);
        });
    });
};



/**************************************
 * SECTION: Create Bar Graph
 **************************************/

function createBar(id){
    
    d3.json(url).then(function(data) {
        
        // Need to filter by inputted id to get a single sample. Since you would still get an array returned, you need you grab index '0' of a 1 element array
        let sample = data.samples.filter(sample => sample.id == id)[0];
        
        // Pull data for bar chart and get Top 10 values for each all in same line. Data appears already sorted so no need to sort but do need to reverse
        let bar_vals = sample.sample_values.slice(0,10);
        let bar_labels = sample.otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let bar_hoverText = sample.otu_labels.slice(0,10);
        
        // Create bar chart
        let barChart = {
            type: 'bar',
            x: bar_vals,
            y: bar_labels,
            orientation: 'h',
            text: bar_hoverText,
            hoverinfo: 'text'
        };
    
        // Create bar chart layout
        let layoutBar = {
            title: {
                text: 'Top 10 OTUs',
                font: {
                    size: 18,       
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
            yaxis: {
                autorange: 'reversed'
            }
        };

        // Check if plot exists yet using helper function
        if (!plotExists("bar")) {
            // No plot exists, create it
            Plotly.newPlot("bar", [barChart], layoutBar);
        } else {
            // Plot exists, update it
            let updateData = {
                x: [bar_vals],
                y: [bar_labels],
                text: [bar_hoverText]
            };
            Plotly.restyle("bar", updateData);
        }

    });
};


/**************************************
 * SECTION: Create Bubble Chart
 **************************************/

function createBubble(id){
    
    d3.json(url).then(function(data) {

        // Need to filter by inputted id to get a single sample. Since you would still get an array returned, you need you grab index '0' of a 1 element array
        let sample = data.samples.filter(sample => sample.id == id)[0];

        // Pull data for bubble chart
        let x_val = sample.otu_ids;
        let y_val = sample.sample_values;
        let marker_size = sample.sample_values;
        let marker_color = sample.otu_ids;
        let labels = sample.otu_labels;
        
        // Create bubble chart 
        let bubbleChart = {
            
            x: x_val,
            y: y_val,
            mode: 'markers',
            marker: {
                size: marker_size,
                color: marker_color,
            },
            text: labels,
            hoverinfo: 'text'
        };

        // Create bubble chart layout
        let layoutBubble = {
            showlegend: false,
            title: {
                text: 'OTU Bubble Chart',
                font: {
                    size: 18,       
                    color: '#000', 
                    weight: 'bold'  
                }
            },
            xaxis: {
                title: 'OTU ID',
                weight: 'bold'  
            }, 
        };


        //Check if plot exists yet using helper function
        if (!plotExists("bubble")) {
            // No plot exists, create it
            Plotly.newPlot("bubble", [bubbleChart], layoutBubble)
        } else {
            // Plot exists, update it
            let updateData = {
                x: [x_val],
                y: [y_val],
                'marker.size': [marker_size],
                'marker.color': [marker_color] 
            };
            Plotly.restyle("bubble", updateData);
        }

    });



}



/**************************************
 * SECTION: Create Metadata
 **************************************/

function createMetadata(id){
    
    d3.json(url).then(function(data) {

        // Need to filter by inputted id to get a single sample. Then need to map into an array of strings using Object.entries
        let sample_str_array = Object.entries(data.metadata.filter(sample => sample.id == id)[0]).map(entry => `${entry[0]}: ${entry[1]}`)
        
        let metadata = d3.select("#sample-metadata");
        
        // Clear existing paragraphs and then add new ones based on the current data using the above array of strings
        d3.select("#sample-metadata").html("");
        metadata.selectAll('p')
            .data(sample_str_array)
            .enter().append('p')
            .text(d => d);

    });
}


/**************************************
 * SECTION: Change Data per Dropdown Value
 **************************************/

function optionChanged(item){
    createBar(item);
    createMetadata(item);
    createBubble(item);
  }


/**************************************
 * SECTION: Initialize
 **************************************/

function init() {
    dropdownSelections().then(() => {
        createBar(d3.select("#selDataset").property("value"));
        createMetadata(d3.select("#selDataset").property("value"));
        createBubble(d3.select("#selDataset").property("value"));
    });
}

init();
