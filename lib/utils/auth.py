from flask import request
from lib.utils.credentials import fetch_and_validate
from lib.errors import InvalidPasswordError, InvalidUsernameError
from lib.utils.auth_jwt import create_token, decode_token


def verify_auth_credentials(data: dict) -> str:
    if not data.get('username') or not data.get('password'):
        raise ValueError('There is no username or password provided')

    credentials = fetch_and_validate()

    if credentials['password'] != data['password']:
        raise InvalidPasswordError('Invalid password')
    elif credentials['username'] != data['username']:
        raise InvalidUsernameError('Invalid username')
    else:
        return create_token({'username': data['username']})


def verify_auth() -> bool:
    if 'auth' in request.cookies:
        return decode_token(request.cookies.get('auth'))
    return False