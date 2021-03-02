from lib.helpers.files import JSONfile
from lib.aws.client import S3client


def upload_json(data: dict, filename: str) -> bool:
    file = JSONfile(filename)
    file.create(data)
    
    client = S3client()
    uploaded = client.upload_file(file.name)
    file.delete()

    if uploaded:
        client.delele_old_objects(file.name)

    return uploaded