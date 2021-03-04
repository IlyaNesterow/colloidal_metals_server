from typing import Callable
from functools import wraps
from flask import request, abort
from werkzeug.exceptions import BadRequest

from lib.helpers.auth_jwt import decode_token
from lib.helpers.other import get_token


def verify_auth(func: Callable) -> Callable:
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = get_token()
        if not token:
            return abort(403, 'Authentication failed')

        auth = decode_token(token)
        if auth:
            return func(*args, **kwargs)
        else:
            return abort(403, 'Authentication failed')

    return wrapper


def check_for_json(func: Callable) -> Callable:
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
