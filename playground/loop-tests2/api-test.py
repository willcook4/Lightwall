#!/usr/bin/python

import requests
# import json
import time

payload = {'q': 'bristol,uk', 'units': 'metric', 'appid': 'c546ac2b40211482401c8b1390f57cca'}

#resp = requests.get('http://api.openweathermap.org/data/2.5/find/', params=payload)

count = 0

while(count <= 100):
	resp = requests.get('http://api.openweathermap.org/data/2.5/find/', params=payload)

    if resp.status_code !=200:
        print "Something went wrong with the api request", resp.text()
    else:
        respJSON = resp.json()
	    print(respJSON['list'][0]['wind']['speed'])
	count += 1
	time.sleep(30)

