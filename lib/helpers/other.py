from typing import Union
from flask import request, Response


def get_token() -> Union[None, str]:
    auth = request.headers.get('auth')
    if auth and len(auth.split(' ')) > 1:
        return auth.split(' ')[1]
    else:
        return None


def cors_handling(response: Response) -> Response:
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods',
                         'PUT, GET, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers',
                         'content-type, authorization')
    return response


def default_route():
    return 'This is a rest-api server'
