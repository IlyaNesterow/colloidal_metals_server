from os import environ
import boto3
from botocore.exceptions import ClientError, NoCredentialsError


class S3client:
    def __init__(self): 
        self.client = boto3.client(
            's3', aws_access_key_id=environ.get('AWS_ACCESS_KEY'),
            aws_secret_access_key=environ.get('AWS_ACCESS_SECRET'),
            region_name=environ.get('AWS_REGION')
        )
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

    def list_obj_versions(self, obj_name: str) -> list:
        try:
            versions: dict = self.client.list_object_versions(Bucket=self.bucket)
            return [v for v in versions.get('Versions') if v.get('Key') == obj_name]
        except (TypeError, ClientError):
            return []

    def list_objects(self, marker: str) -> list[dict]:
        try:
            stuff: dict = self.client.list_objects(Bucket=self.bucket, Marker=marker)
            contents = stuff.get('Contents')
            return contents
        except (ClientError, Exception):
            return []

    def delete_file(self, object_name: str, version_id: str = None) -> None:
        try:
            kwargs = {'Bucket': self.bucket, 'Key': object_name}
            if version_id: 
                kwargs['VersionId'] = version_id

            self.client.delete_object(**kwargs)
        except ClientError:
            raise ValueError('region was not defined')

    def get_presigned_url(self, object_name: str, expiration=3600) -> str:
        try:
            response = self.client.generate_presigned_url('get_object',
                                                        Params={'Bucket': self.bucket,
                                                                'Key': object_name},
                                                        ExpiresIn=expiration)
        except ClientError as e:
            raise SystemError

        return response

    def delele_old_objects(self, obj_name: str) -> None:
        objs = self.list_obj_versions(obj_name)
        
        for obj in objs:
            if obj.get('IsLatest') == False and obj.get('VersionId'):
                self.delete_file(obj_name, obj['VersionId'])
