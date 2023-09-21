def handler(event, context):
    response = {
        "headers": {"Location": "http://label-talk-frontend.s3-website-us-east-1.amazonaws.com", },
        "statusCode": 301,
    }

    return response