import json
from utils.rekognition.detect_labels import detect_labels

def handler(event, context):
    json_body = json.loads(event["body"])

    bucket_name = json_body['bucket_name']
    image_name  = json_body['image_name']
    max_labels  = json_body['max_labels']

    return {"statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(detect_labels(bucket_name, image_name, max_labels))
           }