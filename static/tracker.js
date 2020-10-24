// don't execute any JS until after the DOM is loaded

$(document).ready(function () {
    var demoList = [
        { habit: "Drink Water", total: 7, done: 4 },
        { habit: "Exercise", total: 5, done: 1 }
    ]

    var allchart = document.createElement("div");
    for (var i = 0; i < demoList.length; i++) {
        var id = "chart" + i;
        // Create a new HTML element
        var newchart = document.createElement("div");
        newchart.setAttribute("id", id);
        newchart.style = "width:100%; height:500px; margin:0 auto;";

        // style="width:50%; height:300px; margin:0 auto
        // Append the new element to the old div
        document.getElementById("piechart").appendChild(newchart);
    }

    // draw charts in the list

    for (var i = 0; i < demoList.length; i++) {
        var total = demoList[i]["total"];
        var done = demoList[i]["done"];
        var title = demoList[i]["habit"];
        var id = "chart" + i;
        console.log("habit" + title);
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




