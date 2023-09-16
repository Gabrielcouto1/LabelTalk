import json
import boto3

def detect_labels(bucket_name, image_name, max_labels):
    rekognition = boto3.client("rekognition")
    image = {'S3Object': {'Bucket': bucket_name,'Name': image_name}}
    

    rekognition_response = rekognition.detect_labels(Image=image, MaxLabels=max_labels)

    labels = []

    for label in rekognition_response['Labels']:
        labels.append(label['Name'])

    return labels