from os import environ
from jwt import decode, encode
from jwt.exceptions import DecodeError


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
