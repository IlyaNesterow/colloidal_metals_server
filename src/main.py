from os import environ
from flask import *

app = Flask(__name__)

@app.route('/login', methods=['put'])
def login():
  pass


@app.route('/')
def test():
  return f'Hi, there, access key is {environ.get("AWS_ACCESS_KEY")}!'

app.run(port=3000, debug=True)