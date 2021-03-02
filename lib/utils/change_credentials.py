from lib.utils.credentials import fetch_and_validate
from lib.errors import InvalidPasswordError, MissingCredentialsError
from lib.utils.files import JSONfile
from lib.aws.client import S3client


def change_pw(data: dict) -> bool:
    if not data.get('pw') or not data.get('pw_repeat') or not data.get('new_pw'):
        raise MissingCredentialsError('One of the passwords is missing')

    credentials = fetch_and_validate()

    if credentials['password'] != data['pw'] or credentials['password'] != data['pw_repeat']:
        raise InvalidPasswordError('Passwords does not match')

    if credentials['password'] == data['new_pw']:
        return True

    file = JSONfile('credentials')
    file.create({
                  'username': credentials['username'],
                  'password': data['new_pw']
                })
    
    client = S3client()
    uploaded = client.upload_file(file.name)
    file.delete()

    if uploaded:
        client.delele_old_objects('credentials.json')

    return uploaded