import json
from utils.rekognition.detect_text import detect_text

def handler(event, context):
    json_body = json.loads(event["body"])

    bucket_name = json_body['bucket_name']
    image_name  = json_body['image_name']

    return {"statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(detect_text(bucket_name, image_name))
           }