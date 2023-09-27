const empty_chars = "‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎"

function uploadAndDisplayImage(type) {
    const resultDiv = document.getElementById('text-output');

    resultDiv.innerHTML = empty_chars + "Gerando legenda ...";

    const form = document.getElementById('imageUploadForm');

    const fileInput = form.querySelector('input[name="image"]').files[0];
    const reader = new FileReader();


    reader.onload = async () => {
        const base64Data = reader.result.split(',')[1]; // Remover o cabeçalho "data:image/jpeg;base64,"

        const formData = {
            "image": base64Data
        };

        try {
            const response = await fetch('https://24hj51kpaf.execute-api.us-east-1.amazonaws.com/upload', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                if(type=="product"||type=="insta")
                    post(data, document.getElementById('adjetivo').value, type);
                else
                    post(data, null, type)
            } else {
                resultDiv.innerHTML = 'Erro ao enviar a imagem.';
            }
        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = 'Erro ao enviar a imagem.';
        }
    };
    reader.readAsDataURL(fileInput);
}

function post(image_name, adjective, type){
    // document.getElementById('loadingDiv').style.display = 'block';

    url = `https://24hj51kpaf.execute-api.us-east-1.amazonaws.com/${type}`

    if(adjective){
        var form = {
            "image_name": image_name,
            "adjective": adjective
        }
    }
    else{
        var form = {
            "image_name": image_name
        }
    }
        
    fetch(url, {
        method: "POST",
        headers: {'content-type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                 },
        body: JSON.stringify(form),
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        if(type=="product"){
            document.getElementById('headline').innerText = data.headline
            document.getElementById('descricao').innerText = data.descricao
        }
        else
            document.getElementById('text-output').innerText = empty_chars +data.GPT_response
        
        // document.getElementById('loadingDiv').style.display = 'none';
    })
}

function redirectTo(path) {
    window.location.href = path; // Redireciona para a URL da subpágina desejada
}