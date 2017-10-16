var Settings = require('settings');
var mainWindow = require("mainWindow");


Settings.config({
    url: "https://greenturtwig.co.uk/pebble/hivesettings.html"
},
function(event) {
    Settings.option(event.options);
});


mainWindow.show();