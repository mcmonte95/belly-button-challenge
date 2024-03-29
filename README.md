# Belly Button Biodiversity Dashboard

## Project Background

In this challenge assignment for Columbia Data Analytics Bootcamp, I have built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Project Overview
This JavaScript code creates an interactive dashboard for visualizing and exploring the Belly Button Biodiversity dataset. The dashboard comprises three main views:

1. A bar chart displaying the top 10 Operational Taxonomic Units (OTUs).
2. A bubble chart visualizing the OTUs.
3. A panel displaying demographic information for each individual.

Additionally, an interactive dropdown menu is implemented to allow users to select different OTU IDs and dynamically update the charts and demographic information panel based on the selection.

This dashboard is currently deployed in `Git Pages`. Check out the live dashboard here: [Belly Button Biodiversity Dashboard](https://mcmonte95.github.io/belly-button-challenge/)

## Repository Guide

This repository is structured to facilitate the development and deployment of the Belly Button Biodiversity Dashboard. Below is a guide to the primary components of the repository:

### Directory and File Structure

- `static/js`:
  - `app.js`: This is the main JavaScript file that contains all the logic for pulling data from the API and creating as well as updating the plots on the dashboard. It utilizes D3.js for data manipulation and Plotly.js for rendering the charts.

- `index.html`: Located in the root directory, this file is the HTML frontend of the dashboard. It includes:
  - Imports for D3.js and Plotly.js libraries.
  - A script tag for the `app.js` file.
  - **Disclaimer**: The `index.html` file was provided beforehand and has not been edited as part of this project. It serves as the interface where the dashboard is rendered.

- `samples.json`: Also in the root directory, this file contains sample data from the Belly Button Biodiversity API. It is used as a reference for the structure and format of the data that the `app.js` script processes and visualizes.

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



