from typing import Callable
from functools import wraps
from flask import request, jsonify
from lib.utils.credentials import fetch_and_validate
from lib.errors import InvalidPasswordError, InvalidUsernameError
from lib.utils.auth_jwt import create_token, decode_token


def verify_auth_credentials(data: dict) -> str:
    if not data.get('username') or not data.get('password'):
        raise ValueError('There is no username or password provided')

    credentials = fetch_and_validate()

    if credentials['password'] != data['password']:
        raise InvalidPasswordError('Invalid password')
    elif credentials['username'].lower() != data['username'].lower():
        raise InvalidUsernameError('Invalid username')
    else:
        return create_token({'username': data['username']})


def verify_auth(func: Callable) -> None:
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.cookies.get('auth')
        auth = decode_token(token)
        if auth:
            return func(*args, **kwargs)
        else: 
            return jsonify({'error': 'Authentication failed'}), 400

    return wrapper