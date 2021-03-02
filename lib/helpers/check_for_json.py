from functools import wraps
from flask import request, jsonify
from werkzeug.exceptions import BadRequest


def check_for_json(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            if not request.json:
                return jsonify({'error': 'There is an empty body'}), 400
            else: 
                return func(*args, **kwargs)
        except BadRequest:
            return jsonify({'error': 'The body is not a json'}), 400 

    return wrapper
