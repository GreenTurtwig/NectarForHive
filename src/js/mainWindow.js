var UI = require('ui');
var Vector2 = require("vector2");
var request = require("request");
var menuWindow = require("menuWindow");
var errorWindow = require("errorWindow");


var currentTarget;

var main = new UI.Window({
    status: false
});

var hiveText = new UI.Text({
    text: "Hive",
    font: "gothic-14-bold",
    textAlign: "left",
    position: new Vector2(4, 0),
    size: new Vector2(140, 14)
});

var menuCircle = new UI.Circle({
    radius: 7,
    backgroundColor: "white",
    position: new Vector2(146, 84)
});

var target = new UI.Text({
    text: "",
    font: "bitham-42-bold",
    textAlign: "center",
    position: new Vector2(0, 55),
    size: new Vector2(144, 42)
});

var temp = new UI.Text({
    text: "Loading...",
    font: "gothic-24-bold",
    textAlign: "center",
    position: new Vector2(0, 35),
    size: new Vector2(144, 24)
});

var mode = new UI.Text({
    text: "",
    font: "gothic-18-bold",
    textAlign: "center",
    position: new Vector2(0, 140),
    size: new Vector2(144, 18)
});

main.add(hiveText);
main.add(menuCircle);
main.add(target);
main.add(temp);
main.add(mode);

main.on("click", "up", function() {
    currentTarget += 0.5;
    if (currentTarget >= 32.5) {
        currentTarget = 32;
    }
    target.text(currentTarget + "°");
    mode.text("MANUAL");
    request.target(currentTarget,
        function() {
            main.hide();
            errorWindow.show("Uh oh, an error occured with the Hive API while increasing the temperature.");
        }
    );
});

main.on("click", "down", function() {
    currentTarget -= 0.5;
    if (currentTarget <= 4.5) {
        currentTarget = 5;
    }
    target.text(currentTarget + "°");
    mode.text("MANUAL");
    request.target(currentTarget,
        function() {
            main.hide();
            errorWindow.show("Uh oh, an error occured with the Hive API while decreasing the temperature.");
        }
    );
});

main.on("click", "select", function() {
    menuWindow.show(mode, main);
});

// IMPLEMENT BOOST
// main.on("longClick", "select", function() {
    
// });

// IMPLEMENT REFRESH
// main.on("accelTap", function() {
//     target.text("Refreshing...");
//     temp.text("");
//     mode.text("");
//     request.update(function(heating) {
//         target.text(heating.state.target + "°");
//         temp.text(heating.props.temperature + "°");
//         mode.text(heating.state.mode);
//         currentTarget = heating.state.target;
//     },
//     function() {
//         main.hide();
//         errorWindow.show("Uh oh, an error occured while retrieving data from the Hive API.");
//     });
// });


this.exports = {
    show: function() {
        main.show();
        request.update(function(heating) {
            target.text(heating.state.target + "°");
            temp.text(heating.props.temperature + "°");
            mode.text(heating.state.mode);
            currentTarget = heating.state.target;
        },
        function(data, status) {
            main.hide();
            if (status == 401) {
                errorWindow.show("Hive login details are invalid, please check your settings.");
            } else {
                errorWindow.show("Uh oh, an error occured while retrieving data from the Hive API.");
            }
        });
    }
};
// 144 x 168