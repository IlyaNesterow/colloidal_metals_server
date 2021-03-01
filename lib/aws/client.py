from os import environ, getcwd
import boto3
from botocore.exceptions import ClientError, NoCredentialsError


class S3client:
    def __init__(self):
        self.client = boto3.client('s3')
        self.bucket = environ.get('AWS_BUCKET_NAME')

    def upload_file(self, file_name: str, object_name: str=None) -> bool:
        if object_name is None:
            object_name = file_name

        try:
            with open(file_name, "rb") as f:
                self.client.upload_fileobj(f, self.bucket, object_name)
        except (ClientError, NoCredentialsError, FileNotFoundError):
            return False
        return True

    def delete_file(self, object_name: str) -> None:
        try:
            self.client.delete_object(Bucket=self.bucket, Key=object_name)
        except ClientError:
            raise ValueError('region was not defined')

    def get_presigned_url(self, object_name, expiration=3600) -> str:
        try:
            response = self.client.generate_presigned_url('get_object',
                                                        Params={'Bucket': self.bucket,
                                                                'Key': object_name},
                                                        ExpiresIn=expiration)
        except ClientError as e:
            raise SystemError

        return response

print(getcwd())