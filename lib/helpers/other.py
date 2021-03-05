from typing import Union
from flask import *


def get_token() -> Union[None, str]:
    auth = request.cookies.get('auth')

    return auth


def cors_handling(response: Response) -> Response:
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods',
                         'PUT, GET, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers',
                         'content-type, authorization')
    return response


def attach_auth_cookie(token: Union[None, str], body: dict) -> Response:
    resp = make_response(jsonify(body))
    if token:
        resp.set_cookie('auth', token, httponly=True)

    return resp


def default_route():
    return 'This is a rest-api server'
