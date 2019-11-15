from flask import Flask, request, jsonify, redirect, url_for, Markup, render_template
import requests
import os

# This is my Python app in MindSphere to test python stuff and different endpoints

# Read mdsp environment from environment variables
ENV = os.getenv("MDSP-ENV", 'eu1')
IOT_TS_SUB_PATH = 'https://gateway.{0}.mindsphere.io/api/iottimeseries/v3/timeseries/de9a6c4180a04ec9b373c51d00b86f78/CElliott_ESP8266_Variables/?from=2019-05-29T00:00:00.000Z&to=2019-05-29T01:00:00.000Z&sort=desc'.format(ENV)


JSONIFY_PRETTYPRINT_REGULAR = True

app = Flask(__name__)

# Get CF port from environment variable or use default
port = int(os.getenv("PORT", 9099))

@app.route('/')
def get_time_series_sub():
    auth_header = request.headers.get('Authorization', None)
    print(request.headers)
    if auth_header is not None:
        print('Authorization: ', auth_header)
        # Add headers for authorization (use token from requesting user) and the accept type
        iot_ts_sub_headers = {'Authorization': auth_header, 'Content-Type': "application/json"}
        try:
            r = requests.request("GET", IOT_TS_SUB_PATH, headers=iot_ts_sub_headers)
            resp = r.json() # response as json
            print(resp)
            print('Testing the error checking')
        except Exception as err:
            print(err)
            resp = str(err)
        try:
            return jsonify(resp) # return json response from MindSphere API
        except Exception as err:
            print('Failed to jsonify', err)
    else:
        return 'Retrieved no Authorization header - this should not happen when deployed.'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)