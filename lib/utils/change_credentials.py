from os import getcwd, path

from lib.utils.credentials import fetch_and_validate
from lib.errors import InvalidPasswordError
from lib.utils.files import JSONfile
from lib.aws.client import S3client


def change_pw(data: dict) -> dict:
    if not data.get('pw') or not data.get('pw_repeat') or not data.get('new_pw'):
        raise ValueError('One of the passwords is missing')

    credentials = fetch_and_validate()

    if credentials['password'] != data['pw'] or credentials['password'] != data['pw_repeat']:
        raise InvalidPasswordError()

    file = JSONfile('credentials')
    file.create({
                  'username': credentials['username'],
                  'password': data['new_pw']
                })
    client = S3client()
    client.upload_file(JSONfile.name)

#change_pw({'pw': 'password', 'pw_repeat': 'password', 'new_pw': 'password_1'})
print(getcwd())