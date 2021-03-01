from os import environ
from lib.helpers.fetch_smth import fetch_json


def fetch_and_validate() -> dict:
    credentials = fetch_json(environ.get('AWS_BUCKET_HOST'), environ.get("CREDENTIALS_FILE"))

    if not credentials or (not credentials.get('password') or not credentials.get('username')):
        raise ValueError('credentials from storage seem to be wrong')

    return credentials