var Settings = require('settings');
var ajax = require("ajax");


function getHeating(success, error) {
    ajax({
        url: "https://beekeeper.hivehome.com/1.0/gateway/login",
        method: "post",
        type: "json",
        data: {"username": Settings.option("email"), "password": Settings.option("password"), "products": true}
    },
    function(response) {
        var token = response.token;
        var products = response.products;
        for (var i = 0; i < products.length; i++) {
            if (products[i].type == "heating") {
                var heating = products[i];
                success(heating, token);
                break;
            }
        }
    },
    function(data, status) {
        console.log(data);
        error(data, status);
    });
}


this.exports = {
    update: function(success, error) {
        getHeating(success, error);
    },
    mode: function(mode, error) {
        getHeating(function(heating, token) {
            ajax({
                url: "https://beekeeper.hivehome.com/1.0/nodes/heating/" + heating.id,
                method: "post",
                type: "json",
                data: {"mode": mode},
                headers: {"authorization": token}
            },
            function(response) {
                console.log("The mode is now set to " + mode + ".");
            },
            function(data, status) {
                console.log(data);
                error(data, status);
            });
        });
    },
    target: function(temp, error) {
        getHeating(function(heating, token) {
            ajax({
                url: "https://beekeeper.hivehome.com/1.0/nodes/heating/" + heating.id,
                method: "post",
                type: "json",
                data: {"target": temp, mode: "MANUAL"},
                headers: {"authorization": token}
            },
            function(response) {
                console.log("The target temperature is now set to " + temp + "°.");
            },
            function(data, status) {
                console.log(data);
                error(data, status);
            });
        });
    }
};