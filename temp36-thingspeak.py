import Adafruit_BBIO.ADC as ADC
import time  
import httplib, urllib
 
temp_pin = 'P9_38'
 
ADC.setup()
 
while True:
	print('Temperature at Ground Control')
	now = time.strftime("%c")
	reading = ADC.read(temp_pin)
	millivolts = reading * 1800  # 1.8V reference = 1800 mV
	temp_c = (millivolts - 500) / 10
	temp_f = (temp_c * 9/5) + 32
#	print('mv=%d C=%d F=%d' % (millivolts, temp_c, temp_f))
#	print (time.strftime("%I:%M:%S"))
	print ("Current time %s"  % now )
	print('Celsius: %d ' % (temp_c))
	print('Fahrenheit: %d' % (temp_f))
	
# ThingSpeak code
	params = urllib.urlencode({'field1': temp_f,'field2': temp_c, 'key':'8RAW0AKXG0J6XZX5'}) # Thingspeak field and API info
	headers = {"Content-type": "application/x-www-form-urlencoded","Accept":"text/plain"}
	connection = httplib.HTTPConnection("api.thingspeak.com:80")
	connection.request("POST", "/update", params, headers)
	res = connection.getresponse()
	print('ThingSpeak response code status: '),res.status, res.reason
	print('______________')
	time.sleep(20)
