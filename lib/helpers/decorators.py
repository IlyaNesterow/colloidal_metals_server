from typing import Callable
from functools import wraps
from flask import request, abort
from werkzeug.exceptions import BadRequest

from lib.helpers.auth_jwt import decode_token


def verify_auth(func: Callable) -> None:
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.cookies.get('auth')
        auth = decode_token(token)
        if auth:
            return func(*args, **kwargs)
        else:
            return abort(403, 'Authentication failed')

    return wrapper


def check_for_json(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            if not request.json:
                return abort(400, 'There is an empty body')
            else:
                return func(*args, **kwargs)
        except BadRequest:
            return abort(400, 'The body is not a json')

    return wrapper
