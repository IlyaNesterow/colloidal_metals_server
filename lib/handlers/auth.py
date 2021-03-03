from os import environ
from flask import request
from jwt import decode
from jwt.exceptions import DecodeError

from lib.errors import AuthError
from lib.helpers.credentials import fetch_and_validate
from lib.errors import InvalidPasswordError, InvalidUsernameError
from lib.helpers.auth_jwt import create_token


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


def get_username() -> dict:
    token = request.cookies.get('auth')
    if not token:
        raise AuthError('Token not found')
    try:
        res = decode(token, environ.get('JWT_SECRET', 'default'), algorithms=['HS256'])
        return res
    except DecodeError:
        raise AuthError('Token forged')