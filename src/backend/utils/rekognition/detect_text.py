import json
import boto3

def detect_text(bucket_name, image_name):
    rekognition = boto3.client("rekognition")
    image = {'S3Object': {'Bucket': bucket_name,'Name': image_name}}
    

    rekognition_response = rekognition.detect_text(Image=image)

    texts = []

    for text in rekognition_response['TextDetections']:
        texts.append(text['DetectedText'])

    return texts