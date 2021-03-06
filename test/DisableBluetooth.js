var ConnMan = require('connman-api');
var async = require('async');

var connman = new ConnMan();
connman.init(function() {

	var bluetooth = connman.technologies['Bluetooth'];

	// Getting current connections
	bluetooth.getServices(function(err, services) {

		async.eachSeries(Object.keys(services), function(serviceName, next) {

			connman.getConnection(serviceName, function(err, conn) {

				// Disconnect
				conn.disconnect(function(err) {

					next();

				});
				
			});

		}, function() {

			// Power off
			bluetooth.setProperty('Powered', false, function() {

				console.log('Disabled');
				process.exit();

			});
		});
	});
});
