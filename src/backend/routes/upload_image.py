import json
import boto3
import uuid
import os
import io
from base64 import b64decode

s3 = boto3.client('s3')
bucket_name = os.environ['BUCKET_NAME']

def handler(event, context):
    
        # Decodificar a imagem da solicitação JSON
        json_body = json.loads(event["body"])
        image_data_base64 = json_body.get('image', None)

        if image_data_base64 is None:
            return {
                'statusCode': 400,
                'body': json.dumps('Imagem não encontrada na solicitação.')
            }
        image_data = b64decode(image_data_base64)

        # Gerar um nome único para a imagem (por exemplo, usando um UUID)
        image_name = str(uuid.uuid4()) + '.jpg'  # Você pode ajustar a extensão conforme necessário

        # Fazer o upload da imagem para o Amazon S3
        with io.BytesIO(image_data) as file_obj:
            s3.upload_fileobj(file_obj, bucket_name, image_name)

        return {
            'statusCode': 200,
            'body': json.dumps(image_name)
        }