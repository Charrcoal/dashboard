// use D3 fetch to read the JSON file - samples.json
// the data from the JSON file is named importedData
d3.json("data/samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);

// set up the initial page with the first subject ID
    var metadataKey = [];
    var metadataValue = [];
    var metadataLength = Object.keys(data.metadata[0]).length;
    for (var i = 0; i < metadataLength; i++) {
        metadataKey.push(Object.keys(data.metadata[0])[i]);
        metadataValue.push(Object.values(data.metadata[0])[i]);
    }     


    // import subject ID in the dropdown menu
    var dropdownMeau = d3.select("#selDataset");
    var dataLength = data.metadata.length;
    for (var i=0; i<dataLength; i++){
        var dataset = dropdownMeau.append("option")
                                  .attr("metadata-key", data.names[i])
                                  .text(data.names[i])
                                  .property("value")
    }

    // setting up the initial page
    function init() {
        // initial test subject ID
        d3.select("#selDataset").select("option")
                                .text(metadataValue[0])
        // initial demographic information
        var demographicInfo = d3.select("#sample-metadata").append("tbody")                       
        for (var i = 0; i < metadataLength; i++) {
            demographicInfo.append("tr").text(metadataKey[i]+ ": "+ metadataValue[i])
        }

        
        // initial bar graph 
        // sample OTU values
        var sampleKey = [];
        var sampleKeyvalues = Object.values(data.samples[0].otu_ids);
        for (var keyValue in sampleKeyvalues) {
            sampleKey.push("OTU " + sampleKeyvalues[keyValue]);
        };
        // sample OTU values
        var sampleValue = Object.values(data.samples[0].sample_values);
        var sampleLabel = Object.values(data.samples[0].otu_labels)
        // slice the first 10 values and reverse the graph 
        var trace1 = {
            x: sampleValue.slice(0,10).reverse(),
            y: sampleKey.slice(0,10).reverse(),
            text: sampleLabel.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        var data1 = [trace1];        
        Plotly.newPlot("bar", data1)

        // initial gauge graph see bonus.js

        // initial bubble graph 
        var trace3 = {
            x: sampleKeyvalues,
            y: sampleValue,
            mode: "markers",
            marker: {
                color:sampleKeyvalues,
                size: sampleValue
            },
            text: sampleLabel,
            type: "scatter"
        }

        var data3 = [trace3];
        var layout3 = {
            xaxis: {title: "OTU ID"}
        }
        Plotly.newPlot("bubble", data3, layout3)


    };


    init();



    // on change to the subject ID, change the demographic info
    d3.select("#selDataset").on("change", optionChanged);
    // function called by subject ID changes
    function optionChanged() {
    // get all of the metadata subject information 
        var selectedID = d3.select("#selDataset").property("value");
        for (var i=0; i<dataLength; i++) {  
            var metadataKey = [];
            var metadataValue = [];
            var metadataArray = [];
            // when the dropdown subject ID matches the data 
            if (selectedID == data.metadata[i].id){
                // updates the demographic information 
                for (var j = 0; j < metadataLength; j++) {
                    metadataKey.push(Object.keys(data.metadata[i])[j]);
                    metadataValue.push(Object.values(data.metadata[i])[j]);
                    metadataArray.push(metadataKey[j] + ": " + metadataValue[j])
                }
                demographicInfo = d3.select("#sample-metadata").select("tbody");
                demographicInfo.selectAll("tr")
                               .data(metadataArray)
                               .text(function(d){return d;});


                // updates the bar garph matches the dropdown subject ID 
                var sampleKey = [];
                var sampleKeyvalues = Object.values(data.samples[i].otu_ids);
                for (var keyValue in sampleKeyvalues) {
                    sampleKey.push("OTU " +sampleKeyvalues[keyValue])
                };
                // sample OTU values
                var sampleValue = Object.values(data.samples[i].sample_values);
                var sampleLabel = Object.values(data.samples[i].otu_labels)
                // slice the first 10 values and reverse the graph 
                x = sampleValue.slice(0,10).reverse();
                y = sampleKey.slice(0,10).reverse();
                text = sampleLabel.slice(0,10).reverse(),
                // update the existing bar graph by replacing x and y values
                Plotly.restyle("bar", "x", [x]);
                Plotly.restyle("bar", "y", [y]);    
                Plotly.restyle("bar", "text", [text]);
                

                // updates the bubble graph 
                var trace3 = {
                    x: sampleKeyvalues,
                    y: sampleValue,
                    
                    mode: "markers",
                    marker: {
                        color:sampleKeyvalues,
                        size: sampleValue
                    },
                    text: sampleLabel,
                    type: "scatter"
                }
        
                var data3 = [trace3];
                var layout3 = {
                    xaxis: {title: "OTU ID"}
                }
                Plotly.newPlot("bubble", data3, layout3)


                // update the scrub frequency for the gauge graph 
                value = data.metadata[i].wfreq;
                Plotly.restyle("gauge", "value", [value]);
            }
        }
    }
});