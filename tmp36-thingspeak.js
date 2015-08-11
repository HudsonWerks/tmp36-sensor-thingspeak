//Setup
var b = require ('bonescript'); // Read bonescript library
var tempPin = 'P9_38'; // Pin location for temperature sensor

var request = require('request'); // Library for making http calls

console.log("Sensor reading started.");
console.log("Output at 10-sec intervals.");

//Check the temperature every 10 seconds. Adjust according to your preferred intervals.
setInterval(readTMP, 10000);

//Define the 'readTMP' function
function readTMP() {
	b.analogRead(tempPin, printTemp);
}

function printTemp(x) {
	var timeNow = new Date();
	var UTC = timeNow.toUTCString();
	console.log("Temperature at Ground Control for " + UTC);
	var millivolts = x.value * 1800;
	var temp_c = (millivolts - 500) / 10;
	var temp_f = (temp_c *9/5) + 32;
	console.log("Fahrenheit: " + temp_f);
	console.log("Celsius: " + temp_c);
	console.log("_____________");
	
//Post captured temperature data to ThingSpeak
	request.post('http://api.thingspeak.com:80/update',{form:{api_key: '8RAW0AKXG0J6XZX5', field1: temp_f, field2: temp_c}});

//Post captured temperature data to Twitter via ThingSpeak's API
	request.post('https://api.thingspeak.com/apps/thingtweet/1/statuses/update', {form:{api_key: 'YP8JXLM4FC0U0VTW', status: "The current Ground Control temperature is %%channel_51138_field_1%% F, %%channel_51138_field_2%% C"}});
	request.post('https://zapier.com/hooks/catch/bnqnzw/');
}
