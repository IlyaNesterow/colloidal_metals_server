from typing import Union

from lib.helpers.upload import upload_json
from lib.helpers.credentials import fetch_and_validate
from lib.helpers.auth_jwt import create_token
from lib.helpers.validators import validate_content
from lib.errors import *


def change_pw(data: dict) -> bool:
    if not data.get('pw') or not data.get('pw_repeat') or not data.get('new_pw'):
        raise MissingCredentialsError('One of the passwords is missing')

    credentials = fetch_and_validate()

    if credentials['password'] != data['pw'] or credentials['password'] != data['pw_repeat']:
        raise InvalidPasswordError('Passwords does not match')

    if credentials['password'] == data['new_pw']:
        return True

    uploaded = upload_json(
        {'username': credentials['username'].lower(),'password': data['new_pw']}, 
        'credentials')

    if not uploaded:
        raise FailedToUploadError('Failed to upload new credentials')

    return uploaded


def change_uname(data: dict) -> tuple[Union[str, None]]:
    if not data.get('username') or not data.get('old_username'):
        raise MissingCredentialsError('Missing credentials')

    credentials = fetch_and_validate()
    credentials['username'] = credentials['username'].lower()

    if credentials['username'] != data['old_username'].lower():
        raise InvalidUsernameError('wrong old username')

    if credentials['username'] == data['username'].lower():
        return (data['username'], None)

    uploaded = upload_json(
        {'username': data['username'].lower(), 'password': credentials['password']}, 'credentials')

    if uploaded:
        token = create_token({'username': data['username']})
        return (data['username'], token)
    else:
        raise FailedToUploadError('Failed to upload new credentials')


def change_content(data: dict) -> bool:
    validate_content(data.get('pages'))

    uploaded = upload_json(data, 'data')
    if not uploaded:
        raise FailedToUploadError('Failed to upload new content')

    return uploaded
