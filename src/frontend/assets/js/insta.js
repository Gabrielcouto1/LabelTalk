const empty_chars = "‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎"
let adjetivo = "Estética";

function uploadAndDisplayImage(type) {
    const resultDiv = document.getElementById('text-output');

    resultDiv.innerHTML = empty_chars + "Gerando legenda ...";

    const form = document.getElementById(`imageUploadForm_${type}`);

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
                    post(data, adjetivo, type);
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
            "adjective": adjetivo
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
            document.getElementById('headline').innerText = data.headline;
            document.getElementById('descricao').innerText = data.descricao;
            document.getElementById('text-output').innerHTML="";
        }
        else
            document.getElementById('text-output').innerText = empty_chars +data.GPT_response
        
        // document.getElementById('loadingDiv').style.display = 'none';
    })
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
//setando event listeners e elementos do html

const imageInput = document.getElementById('imageInput');
const imageDiv = document.getElementById('image-output');

imageInput.addEventListener('change', function () {
    const file = imageInput.files[0]; // Pega o primeiro arquivo selecionado (você pode tratar múltiplos arquivos se necessário)

    if (file) {
        const reader = new FileReader();

        // O evento 'load' será acionado quando a leitura do arquivo estiver concluída
        const imageElement = document.createElement('img');

        reader.addEventListener('load', function () {
            imageElement.src = reader.result;
        });
        imageElement.id='image_output_id'
        imageDiv.innerHTML = '';
        imageDiv.appendChild(imageElement);

        // Lê o arquivo como uma URL de dados
        reader.readAsDataURL(file);
    }
});




//DEIXAR DESCOMENTADO APENAS O FORM DA DIV Q FOR SER USADA

//FORM DO PRODUTO-----------------------------------------------------------------------------------------------------------------------------------------------
const form_product = document.getElementById('imageUploadForm_product');

form_product.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadAndDisplayImage("product"); // Chame a função quando o botão de submit for clicado
});


//FORM DO INSTA-----------------------------------------------------------------------------------------------------------------------------------------------
// const form_insta = document.getElementById('imageUploadForm_insta');

// form_insta.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     uploadAndDisplayImage("insta"); // Chame a função quando o botão de submit for clicado
// });


//FORM DO BOOK-----------------------------------------------------------------------------------------------------------------------------------------------
// const form_book = document.getElementById('imageUploadForm_book');

// form_book.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     uploadAndDisplayImage("book"); // Chame a função quando o botão de submit for clicado
// });



//COMENTAR ISSO QUANDO ATIVAR A DIV DE BOOK
//-----------------------------------------------------------------------------------------------------------------------------------------------
//Setar os eventlisteners dos botoes de adjetivos
//-----------------------------------------------------------------------------------------------------------------------------------------------

const adjetivos_buttons=[
    document.getElementById("1"),
    document.getElementById("2"),
    document.getElementById("3"),
    document.getElementById("4"),
    document.getElementById("5"),
    document.getElementById("6")
];

const adjetivos_value=[
    "Estética",
    "Dark",

    "Conceitual",
    "Pensativa",
    "Chamativa",
    "Engraçada"
];


for (let i = 0; i < adjetivos_buttons.length; i++) {
    const element = adjetivos_buttons[i];

    element.addEventListener("click", function() {
        adjetivo = adjetivos_value[i];
        console.log(adjetivo);
    });
}