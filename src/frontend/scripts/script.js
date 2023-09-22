function uploadAndDisplayImage() {
    const form = document.getElementById('imageUploadForm');

    const fileInput = form.querySelector('input[name="image"]').files[0];
    const reader = new FileReader();

    const resultDiv = document.getElementById('result');
    const s3ImageDiv = document.getElementById('s3_image');

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
                const s3ImageUrl = `https://label-talk-bucket.s3.amazonaws.com/${data}`;
                
                const imageElement = document.createElement('img');
                
                testePost(data, document.getElementById('adjetivo').value);

                imageElement.src = s3ImageUrl;
                s3ImageDiv.innerHTML = '';
                s3ImageDiv.appendChild(imageElement);

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

function testePost(image_name, adjective){
    document.getElementById('loadingDiv').style.display = 'block';
    
    var form = {
        "image_name": image_name,
        "adjective": adjective
    }

    console.log(form);

    fetch("https://24hj51kpaf.execute-api.us-east-1.amazonaws.com/product", {
        method: "POST",
        headers: {'content-type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                 },
        body: JSON.stringify(form),
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        document.getElementById('headline').innerText = data.headline
        document.getElementById('descricao').innerText = data.descricao
        
        document.getElementById('loadingDiv').style.display = 'none';
    })
}