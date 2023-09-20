import json
import os
from utils.rekognition.detect_labels import detect_labels
from utils.openai.get_completion import get_completion


def handler(event, context):
    json_body = json.loads(event["body"])

    try:
        image_name      = json_body['image_name']
        adjective       = json_body['adjective']

        max_labels      = 10
        endpoint_type   = 'PRODUCT_PROMPT'
        bucket_name     = os.environ['BUCKET_NAME']
    except:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"errorMsg": "Invalid request"}),
        }
    
    labels = detect_labels(bucket_name, image_name, max_labels)

    openAI_response = get_completion(endpoint_type, labels, adjective)
    
    strings = openAI_response.replace("\n", "").split("DESC: ")

    headline = strings[0].replace("HEAD: ", "")
    descricao = strings[1]

    body = {"headline": headline,
            "descricao": descricao}   

    return {"statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body)}

    # except:
    #     return {
    #         "statusCode": 500,
    #         "headers": {"Content-Type": "application/json"},
    #         "body": json.dumps({"errorMsg": "OpeAi or Rekognition error"}),
    #     }
