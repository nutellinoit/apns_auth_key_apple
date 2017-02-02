var apn = require('apn');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
//Lets define a port we want to listen to
app.listen(9876, function() {
	console.log("Started on PORT 9876");
})
app.post('/sendpush', function(request, response) {
	var token_app = request.body.token;
	var bundle_app = request.body.bundle;
	var text_app = request.body.testo;
	console.log("token = " + token_app + ", bundle is " + bundle_app + " text is " + text_app);
	try {
		//log the request on console
		console.log(request.url);
		//Disptach
		// Set up apn with the APNs Auth Key
		var apnProvider = new apn.Provider({
			token: {
				key: 'apns.p8',
				// Path to the key p8 file
				keyId: 'XXXXXXX',
				// The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
				teamId: 'XXXXXXX',
				// The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
			},
			production: true // Set to true if sending a notification to a production iOS app
		});
		// Enter the device token from the Xcode console
		var deviceToken = token_app;
		// Prepare a new notification
		var notification = new apn.Notification();
		// Specify your iOS app's Bundle ID (accessible within the project editor)
		notification.topic = bundle_app;
		// Set expiration to 1 hour from now (in case device is offline)
		notification.expiry = Math.floor(Date.now() / 1000) + 3600;
		// Set app badge indicator
		notification.badge = 1;
		// Play ping.aiff sound when the notification is received
		//notification.sound = 'ping.aiff';
		// Display the following message (the actual notification text, supports emoji)
		notification.alert = text_app;
		// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
		//notification.payload = {id: 123};
		// Actually send the notification
		apnProvider.send(notification, deviceToken).then(function(result) {
			// Check the result for any failed devices
			console.log(result);
		});
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.end('Notifica inviata');
		//dispatcher.dispatch(request, response);
	} catch (err) {
		console.log(err);
	}
	response.end("OK");
});