import requests
import os

api_key = os.environ['OPEN_AI_KEY']

def get_completion(endpoint_type, list, adjective):
    url = "https://api.openai.com/v1/engines/davinci/completions"

    prompt = os.environ[endpoint_type]
    print(list)
    for item in list:
        prompt += item +', '
    
    if adjective:
        prompt += "Subtitle Adjective: "+ adjective

    # Dados da solicitação
    data = {
        "prompt": prompt,
        "max_tokens": 50,
    }

    # Passando a chave da API
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

    # Enviando solicitação POST
    response = requests.post(url, json=data, headers=headers)
    return {"url": url,
            "data": data,
            "headers": headers}

    if response.status_code == 200:
        result = response.json()
        return result["choices"][0]["text"]
    else:
        return f"Erro: {response.status_code}"