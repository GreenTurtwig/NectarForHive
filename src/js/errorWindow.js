var UI = require('ui');


this.exports = {
    show: function(text) {
        var error = new UI.Card({
            status: false,
            title: "Nectar Error.",
            body: text
        });
        error.show();
    }
};