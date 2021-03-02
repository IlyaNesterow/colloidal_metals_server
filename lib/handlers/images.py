from os import environ

from lib.aws.client import S3client
from lib.errors import MissingCredentialsError, FormatError


def list_all_images() -> None:
    client = S3client()

    stuff = client.list_objects('images/')
    output = [ f"https://{environ['AWS_BUCKET_HOST']}/{img['Key']}" for img in stuff ]
    return output


def delete_img(obj_name: str) -> None:
    client = S3client()
    client.delete_file(f'images/{obj_name}')
    

def presigned_url(data: dict) -> str:
    name = data.get('name')
    
    if not name or type(name) != str:
        raise MissingCredentialsError('Incorrect image name')

    parts = name.split('.')

    if len(parts) == 1:
        name += '.png'

    if len(parts) > 1 and parts[-1] not in ['jpg', 'png', 'jpeg']:
        raise FormatError('Not acceptable format')

    client = S3client()
    url = client.get_presigned_url(f'images/{name}', 10000)
    return url