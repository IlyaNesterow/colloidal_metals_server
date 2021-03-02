from os import environ
from jwt import decode, encode
from flask import request
from jwt.exceptions import DecodeError

from lib.errors import AuthError

data_for_jwt = dict[str]


def create_token(data: data_for_jwt) -> str:
    result = encode(
        data,
        environ.get('JWT_SECRET', 'default'),
        algorithm='HS256',
    )
    return result


def decode_token(token: str) -> bool:
    try:
        decode(token, environ.get('JWT_SECRET', 'default'), algorithms=['HS256'])
        return True
    except DecodeError:
        return False


def get_username() -> dict:
    token = request.cookies.get('auth')
    if not token:
        raise AuthError('Token not found')
    try:
        res = decode(token, environ.get('JWT_SECRET', 'default'), algorithms=['HS256'])
        return res
    except DecodeError:
        raise AuthError('Token forged')