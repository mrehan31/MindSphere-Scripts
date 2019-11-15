"""
Get MindSphere Env Vars

"""
import os
from pprint import pprint
from flask import Flask


app = Flask(__name__)

# Get port from environment variable or choose 9099 as local default
port = int(os.getenv("PORT", 9099))

@app.route('/')
def evars():
    environment_variables = {key: os.environ[key] for key in os.environ.keys()}
    return environment_variables

if __name__ == '__main__':
    # Run the app, listening on all IPs with our chosen port number
    app.run(host='0.0.0.0', port=port)

#pprint(environment_variables)