import requests
import os
import json

api_key = os.environ['OPEN_AI_KEY']

def get_completion(endpoint_type, list, adjective):
    url      = os.environ['GPT_ENDPOINT']
    model_id = os.environ['MODEL_ID']

    prompt = os.environ[endpoint_type]
    print(list)
    for item in list:
        prompt += item +', '
    
    if adjective:
        prompt += "Subtitle Adjective: "+ adjective

    # Dados da solicitação
    data = {'model': model_id, 'messages': [{'role': 'user', 'content': prompt}]}

    # Passando a chave da API
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

    # Enviando solicitação POST
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        return result["choices"][0]["message"]["content"]
    
    else:
        return f"Error: {response.status_code}"