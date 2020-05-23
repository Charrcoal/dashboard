// use D3 fetch to read the JSON file - samples.json
// the data from the JSON file is named importedData
d3.json("data/samples.json").then((importedData) => {
    var data = importedData;

    function init() {

        // initial gauge graph 
        var trace2 = {
            domain: {x: [0,1], y: [0,1]},
            value: data.metadata[0].wfreq,
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: {visible: true, range:[null, 9]},
                steps: [{range: [0,1], color: 'lightyellow'}, 
                        {range: [1,2], color: 'cornsilk'},
                        {range: [2,3], color: 'papayawhip'},
                        {range: [3,4], color: 'palegoldenrod'}, 
                        {range: [4,5], color: 'lightcoral'},
                        {range: [5,6], color: 'lightsalmon'},
                        {range: [6,7], color: 'darksalmon'}, 
                        {range: [7,8], color: 'salmon'},
                        {range: [8,9], color: 'indianred'}],
            },
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
            textinfo: "text",
            textposition: "inside"
        }
        
        var data2 = [trace2]
        var layout2 = {
            title: {text: ([("Belly Button Washing Frequency" + "<br>").bold(), "Scrubs per Week"].join("\n"))}
        }
        Plotly.newPlot("gauge",data2, layout2)


    };

    init();

});





