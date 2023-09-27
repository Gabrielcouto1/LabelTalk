import json
import os
from utils.rekognition.detect_text import detect_text
from utils.openai.get_completion import get_completion

def handler(event, context):
    json_body = json.loads(event["body"])

    try:
        book_title    = json_body['book_title']

        endpoint_type = 'BOOK_PROMPT'
    except:
        return {"statusCode": 500,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"errorMsg": "Invalid request."})
                }
    try:
        strings = [book_title, " ", " "]

        openAI_response = get_completion(endpoint_type, strings, None)

        body = {
            "GPT_response": openAI_response.replace("\"", "")
        }

        return {"statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body)}
    
    except:
        return {"statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"errorMsg": "OpenAi or Rekognition error"})
           }