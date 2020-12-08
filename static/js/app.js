//function to change options 
function optionChanged (value) {
  graphs(value);
  data_table(value);
}

//function for graphs
function graphs(id) {
  d3.json("./static/js/samples.json").then((importedData) => {
      var clean_data = importedData.samples.filter(item => item.id === id);
      var values = clean_data[0].sample_values;
      var names = clean_data[0].otu_ids;
      var labels = clean_data[0].otu_labels;
      var clean_data = importedData.metadata.filter(item => item.id === parseInt(id));
      var wfreq = clean_data[0].wfreq;

      
      //append information into list for bar
      var information = [];

      for ( var i = 0 ; i < names.length ; i++ ) {
          var result = 'OTU ' + `${names[i]}`
          information.push(result);
          };
      var trace_bar = {
          x : values.slice(0, 10).reverse(),
          y : information.slice(0, 10).reverse(),
          text: labels,
          type: 'bar',
          orientation: 'h',
          marker: {
              color: 'rgba(55,70,80,1)'
          }
      };

      var layout_bar = {
          xaxis: {
            range: [0, 200],
            zeroline: false,
            showline: false,
            showticklabels: true,
            showgrid: true
          },
          
          paper_bgcolor: 'rgb(245,280,480)',
          plot_bgcolor: 'rgb(245,280,480)',
        };
  
      var data_bar = [trace_bar];
      
      //append points in for marker 
      var points = [];

      for ( var i = 0 ; i < values.length ; i++ ) {
          points.push(values[i]*30);
          };

      var trace_bubble = {
          x: names,
          y: values,
          text: labels,
          mode: 'markers',
          marker: {
            size: points,
            sizemode: 'area',
            color: names
          }
        };
        var layout_bubble = {
          xaxis: {
            showgrid: true,
            title : 'OTU IDs'
          },
          paper_bgcolor: 'rgb(245,280,480)',
          plot_bgcolor: 'rgb(245,280,480)',
        }; 
      var data_bubble = [trace_bubble];

      Plotly.newPlot("bar", data_bar, layout_bar);
      Plotly.newPlot("bubble", data_bubble, layout_bubble);

      // a single angular gauge chart
      //var data = [
        //{
          //domain: { x: [0, 1], y: [0, 1] },
          //value: 450,
          //title: { text: "Speed" },
          //type: "indicator",
          //mode: "gauge+number",
          //delta: { reference: 400 },
          //gauge: { axis: { range: [null, 500] } }
        //}
      //];
      
      //var layout = { width: 600, height: 400 };
      //Plotly.newPlot('myDiv', data, layout);

      var data_gauge = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Scrubs per Week", font: { size: 20 } },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 5 },
          gauge: {
            axis: { range: [null, 10], tickwidth: 2, tickcolor: "black" },
            bar: { color: "black" },
            borderwidth: 1,
            bordercolor: "white",
            steps: [
              { range: [0, 2], color: "purple" },
              { range: [2, 4], color: "skyblue" },
              { range: [4, 6], color: "green" },
              { range: [6, 8], color: "yellow" },
              { range: [8, 10], color: "red" },
              
            ]
          }
        }
      ];
      
      var layout_gauge = {
        paper_bgcolor: 'rgb(245,280,480)'
      };

      Plotly.newPlot('gauge', data_gauge, layout_gauge);
  });
}

//build out table for description of selection
function data_table(id) {
  d3.json("./static/js/samples.json").then((importedData) => {
  var info_lst = importedData.metadata.filter(item => item.id === parseInt(id));
  
  var table = d3.select("#summary-list");
  var add_t = table.select("li");
  add_t.html("");
  var lst_append;
  lst_append = add_t.append("li").text(`ID: ${info_lst[0].id}`);
  lst_append = add_t.append("li").text(`Age: ${info_lst[0].age}`);
  lst_append = add_t.append("li").text(`Ethnicitiy: ${info_lst[0].ethnicity}`);
  lst_append = add_t.append("li").text(`Gender: ${info_lst[0].gender}`);
  lst_append = add_t.append("li").text(`Location: ${info_lst[0].location}`);
  lst_append = add_t.append("li").text(`BB_Type: ${info_lst[0].bbtype}`);
  lst_append = add_t.append("li").text(`Wfreq: ${info_lst[0].wfreq}`);

  });
}

function execute() {
  d3.json("./static/js/samples.json").then((importedData) => {
      
      var selection = importedData.names;
      var choice = d3.select("#selDataset");
      selection.forEach((name => {
          choice.append("option").text(name).property("value", name)
      }));

      var id = selection[0];
      graphs(id);
      data_table(id);
    });
}
execute();

