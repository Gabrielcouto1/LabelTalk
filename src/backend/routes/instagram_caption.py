import json
import os
from utils.rekognition.detect_labels import detect_labels
from utils.openai.get_completion import get_completion

def handler(event, context):
    json_body = json.loads(event["body"])

    try:
        image_name    = json_body['image_name']
        adjective     = json_body['adjective']

        max_labels    = 10
        endpoint_type = 'INSTA_PROMPT'
        bucket_name   = os.environ['BUCKET_NAME'] 
    except:
        return {"statusCode": 500,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"errorMsg": "Invalid request."})
                }
    try:
        labels = detect_labels(bucket_name, image_name, max_labels)

        openAI_response = get_completion(endpoint_type, labels, adjective)

        return {"statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(openAI_response)
           }
    
    except:
        return {"statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"errorMsg": "OpenAi or Rekognition error"})
           }