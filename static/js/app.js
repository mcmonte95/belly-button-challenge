const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// d3.json(url).then(function(data) {
//     console.log(data);
// });

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



// Set up dropdown and setup a return so i can wait for this to load and use it to initialize my charts for the first refresh.
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

        console.log(sample);
        
        // Pull data for bar chart and get Top 10 values for each all in same line. Data appears already sorted so no need to sort but do need to reverse
        let bar_vals = sample.sample_values.slice(0,10);
        let bar_labels = sample.otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let bar_hoverText = sample.otu_labels.slice(0,10);
        
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

        //Plotly.newPlot("bar", [barChart], layoutBar);

        //Check if plot exists yet using helper function
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
 * SECTION: Change Data per Dropdown Value
 **************************************/

function optionChanged(item){
    createBar(item);
  }


/**************************************
 * SECTION: Initialize
 **************************************/

function init() {
    dropdownSelections().then(() => {
        createBar(d3.select("#selDataset").property("value"));
    });
}

init();
