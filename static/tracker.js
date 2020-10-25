// don't execute any JS until after the DOM is loaded

 // pass the habitList variable
 // This does not work inside the .ready()
 function identity(list) {
    return list;
}
$(document).ready(function () {
    console.log(habitList);
  
    var allchart = document.createElement("div");
    for (var i = 0; i < habitList.length; i++) {
        var id = "chart" + i;
        // Create a new HTML element
        var newchart = document.createElement("div");
        newchart.setAttribute("id", id);
        newchart.setAttribute("class", "donutChart");
        newchart.style = "width:100%; height:500px";
        // Append the new element to the old div
        document.getElementById("piechart").appendChild(newchart);
    }

    // draw charts in the list

    for (var i = 0; i < habitList.length; i++) {
        var total = habitList[i]["frequency"];
        var done = habitList[i]["done"];
        var title = habitList[i]["habit"];
        var id = "chart" + i;
        draw(id, title, total, done);
    }

    function draw(id, title, total, done) {

        // Create an array of chart elements
        var dataPoints = [];
        for (var i = 0; i < done; i++) { // tasks done
            dataPoints.push({ y: 1, color: "rgb(119, 172, 162)" });
        }
        for (var j = 0; j < (total - done); j++) { // tasks to do
            dataPoints.push({ y: 1, color: "rgb(244, 233, 205)" });
        }

        // Draw chart
        JSC.Chart(id, {
            type: 'pie donut',
            legend_visible: false,
            title: {
                label: {
                    text: title,
                    style_fontSize: 28,
                    color: "rgb(2, 128, 144)",
                    // fontFamily: 'Montserrat, sans-serif',
                },
                position: 'center'
            },
            series: [{ points: dataPoints, }]
        });
    }
});




