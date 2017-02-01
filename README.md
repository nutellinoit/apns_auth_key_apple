Initail setup, required apns.p8 certificate (APNs auth key) obtained from developer apple portal

```bash
#ubuntu 16.04 install nodejs
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt-get install -y nodejs

cd install_project_folder

# fresh install (not required)
npm init --yes
npm install apn --save
npm install express
npm install --save body-parser

# forever service
npm install forever -g
forever start app_express.js 
```

Change params inside app_express.js

```javascript
		var apnProvider = new apn.Provider({
			token: {
				key: 'apns.p8',
				// Path to the key p8 file
				keyId: 'XXXXXX',
				// The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
				teamId: 'XXXXXX',
				// The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
			},
			production: true // Set to true if sending a notification to a production iOS app
		});
```

Use it!