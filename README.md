# Belly Button Biodiversity Dashboard

## Project Background

In this challenge assignment for Columbia Data Analytics Bootcamp, I have built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Project Overview
This JavaScript code creates an interactive dashboard for visualizing and exploring the Belly Button Biodiversity dataset. The dashboard comprises three main views:

1. A bar chart displaying the top 10 Operational Taxonomic Units (OTUs).
2. A bubble chart visualizing the OTUs.
3. A panel displaying demographic information for each individual.

Additionally, an interactive dropdown menu is implemented to allow users to select different OTU IDs and dynamically update the charts and demographic information panel based on the selection.

## Detailed Steps

### 1. Setting Up the Dropdown Menu
- The `dropdownSelections` function fetches the data from a given URL.
- It populates the dropdown menu (`#selDataset`) with the available OTU IDs from the data.
- This function returns a Promise to ensure subsequent steps wait for its completion.

### 2. Creating the Bar Chart
- The `createBar` function is responsible for generating the bar chart.
- It filters the dataset based on the selected OTU ID and extracts the top 10 samples.
- The function creates a Plotly bar chart trace with this data, specifying orientation, labels, and hover text.
- It checks whether a bar chart already exists in the specified element and updates it using `Plotly.restyle` if it does, or creates a new one using `Plotly.newPlot` if it doesn't.

### 3. Creating the Bubble Chart
- The `createBubble` function generates the bubble chart.
- Similar to the bar chart, it filters the dataset based on the selected OTU ID.
- It creates a Plotly bubble chart trace, configuring the x and y values, marker size, color, and labels.
- This function also checks for the existence of a previous plot and updates or creates it accordingly.

### 4. Displaying the Metadata
- The `createMetadata` function displays the demographic information.
- It retrieves and formats the metadata for the selected OTU ID.
- The function then appends this information as paragraphs in the `#sample-metadata` div, ensuring to clear any existing content first.

### 5. Interactivity Through Dropdown Menu
- The `optionChanged` function is triggered when a different OTU ID is selected from the dropdown menu.
- It calls `createBar`, `createMetadata`, and `createBubble` with the new ID, thereby updating all views with the relevant data.

### 6. Initialization
- The `init` function initializes the dashboard.
- It first populates the dropdown menu and then uses the first available OTU ID to render the initial views.
- This ensures that the dashboard is populated with data as soon as the page loads.



