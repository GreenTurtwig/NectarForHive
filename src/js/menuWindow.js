var UI = require("ui");
var Vibe = require("ui/vibe");
var request = require("request");
var errorWindow = require("errorWindow");

    
this.exports = {
    show: function(modeElement, main) {
        var menu = new UI.Menu({
            status: false,
            backgroundColor: "black",
            textColor: "white",
            highlightBackgroundColor: "white",
            highlightTextColor: "black",
            sections: [{
                items: [{
                    title: "Schedule"
                },
                {
                    title: "Manual"
                },
                {
                    title: "Off"
                }]
            }]
        });
    
        menu.on("select", function(event) {
            var title = event.item.title;
            modeElement.text(event.item.title.toUpperCase());
            request.mode(title.toUpperCase(),
                function() {
                    main.hide();
                    errorWindow.show("Uh oh, an error occured with the Hive API while changing the mode.");
                }
            );
            Vibe.vibrate("short");
            menu.hide();
        });
        
        menu.show();
    }
};