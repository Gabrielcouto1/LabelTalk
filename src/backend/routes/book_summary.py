import json
import os
from utils.rekognition.detect_text import detect_text
from utils.openai.get_completion import get_completion

def handler(event, context):
    json_body = json.loads(event["body"])

    try:
        image_name    = json_body['image_name']

        endpoint_type = 'BOOK_PROMPT'
        bucket_name   = os.environ['BUCKET_NAME'] 
    except:
        return {"statusCode": 500,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"errorMsg": "Invalid request."})
                }
    try:
        strings = detect_text(bucket_name, image_name)

        openAI_response = get_completion(endpoint_type, strings, None)

        return {"statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(openAI_response)
           }
    
    except:
        return {"statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"errorMsg": "OpenAi or Rekognition error"})
           }