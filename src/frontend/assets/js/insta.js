const empty_chars = "‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎"
let adjetivo = "Estética";

function uploadAndDisplayImage(type) {

    // Altera fundo do texto
    let textExample = document.querySelectorAll('.text-example');
    textExample[0].style.backgroundImage = 'none';
    textExample[0].style.backgroundColor = `#ECECEC`;
    console.log('Deu certo: ' + textExample.id);

    textExample[1].style.backgroundImage = 'none';
    textExample[1].style.backgroundColor = `#ECECEC`;

    console.log('Deu certo: ' + textExample.id);

    let resultDiv = document.getElementById(`text-output-${type}`);
    
    console.log(resultDiv.id + 'estou aqui!');


    // resultDiv.innerHTML = empty_chars + "Gerando legenda ...";
    let form = document.getElementById(`imageUploadForm_${type}`);

    if (type == "book_title") {
        const formData = {
            "book_title": form.querySelector('input[name="title"]').value
        };
        console.log(formData);

        fetch("https://24hj51kpaf.execute-api.us-east-1.amazonaws.com/book_title", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(form),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById('text-output-book').innerText = data.GPT_response
            })
    }

    const fileInput = form.querySelector('input[name="image"]').files[0];
    const reader = new FileReader();


    reader.onload = async () => {
        const base64Data = reader.result.split(',')[1]; // Remover o cabeçalho "data:image/jpeg;base64,"

        const formData = {
            "image": base64Data
        };

        // Resposta em texto formatada
        let fastResponse = document.createElement('p');
        fastResponse.classList.add('p-result');
        fastResponse = 'Erro ao enviar a imagem.';

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

                if (type == "product" || type == "insta")
                    post(data, adjetivo, type);
                else
                    post(data, null, type)
            } else {
                resultDiv.innerHTML = data.GPT_response;
            }
        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = data.GPT_response;
        }
    };
    reader.readAsDataURL(fileInput);
}

// FINAL RESPONSE
let textDiv = document.getElementById('text-output');

function post(image_name, adjective, type) {
    url = `https://24hj51kpaf.execute-api.us-east-1.amazonaws.com/${type}`

    if (adjective) {
        var form = {
            "image_name": image_name,
            "adjective": adjetivo
        }
    }
    else {
        var form = {
            "image_name": image_name
        }
    }

    fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(form),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (type == "product") {
                let textDiv = document.querySelector('#text-output-product');

                let head = document.createElement('h1');
                head.innerText = data.headline;
                head.classList.add('h1-result');

                let desc = document.createElement('p');
                desc.innerText = data.descricao;
                desc.classList.add('p-result');

                document.getElementById('text-output-product').innerHTML = "";

                textDiv.appendChild(head);
                textDiv.appendChild(desc);
            } 
            else if (type == "insta") {
                let textDiv = document.querySelector('#text-output-insta');

                let response = document.createElement('p');
                response.innerText = data.GPT_response;
                response.classList.add('p-result');

                textDiv.innerHTML = "";
                textDiv.appendChild(response);
            }
            else{
                document.getElementById('text-output-product').innerText = empty_chars + data.GPT_response
                document.getElementById('text-output-insta').innerText = empty_chars + data.GPT_response
            }

        })
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
//setando event listeners e elementos do html
// const imageInputBook = document.querySelector('.imageInput');

const imageInputProd = document.querySelector('#image-input-prod');
// INPUT PROD
imageInputProd.addEventListener('change', function () {
    let file = imageInputProd.files[0]; // Pega o primeiro arquivo selecionado (você pode tratar múltiplos arquivos se necessário)

    let imageDiv = document.querySelector('#image-output-product');

    if (file) {
        let reader = new FileReader();

        // O evento 'load' será acionado quando a leitura do arquivo estiver concluída
        let imageElement = document.createElement('img');

        reader.addEventListener('load', function () {
            imageElement.src = reader.result;
        });
        imageElement.classList.add('image_output_class');

        imageDiv.innerHTML = '';
        imageDiv.appendChild(imageElement);

        // Lê o arquivo como uma URL de dados
        reader.readAsDataURL(file);
    }
});

const imageInputInsta = document.querySelector('#image-input-insta');
// INPUT INSTA
imageInputInsta.addEventListener('change', function () {
    let file = imageInputInsta.files[0]; // Pega o primeiro arquivo selecionado (você pode tratar múltiplos arquivos se necessário)

    let imageDiv = document.querySelector('#image-output-instagram');

    if (file) {
        let reader = new FileReader();

        // O evento 'load' será acionado quando a leitura do arquivo estiver concluída
        let imageElement = document.createElement('img');

        reader.addEventListener('load', function () {
            imageElement.src = reader.result;
        });
        imageElement.classList.add('image_output_class');

        imageDiv.innerHTML = '';
        imageDiv.appendChild(imageElement);

        // Lê o arquivo como uma URL de dados
        reader.readAsDataURL(file);
    }
});


//DEIXAR DESCOMENTADO APENAS O FORM DA DIV FOR SER USADA
//FORM DO PRODUTO-----------------------------------------------------------------------------------------------------------------------------------------------
const form_product = document.getElementById('imageUploadForm_product');
// INPUT INSTA
form_product.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadAndDisplayImage("product"); // Chame a função quando o botão de submit for clicado
});

//FORM DO INSTA-----------------------------------------------------------------------------------------------------------------------------------------------
const form_insta = document.getElementById('imageUploadForm_insta');

form_insta.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadAndDisplayImage("insta"); // Chame a função quando o botão de submit for clicado
});


//FORM DO BOOK-----------------------------------------------------------------------------------------------------------------------------------------------
// const form_book = document.getElementById('imageUploadForm_book');

// form_book.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     uploadAndDisplayImage("book"); // Chame a função quando o botão de submit for clicado
// });

// const form_book_title = document.getElementById('imageUploadForm_book_title');

// form_book.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     uploadAndDisplayImage("book_title"); // Chame a função quando o botão de submit for clicado
// });


//COMENTAR ISSO QUANDO ATIVAR A DIV DE BOOK
//-----------------------------------------------------------------------------------------------------------------------------------------------
//Setar os eventlisteners dos botoes de adjetivos
//-----------------------------------------------------------------------------------------------------------------------------------------------



//ADJECTIVES
//-----------------------------------------------------------------------------------------------------------------------------------------------
// PRODUCT ADJECTIVES
const adjetivos_buttons_product = [
    // PRODUCT
    document.getElementById("1-prod"),
    document.getElementById("2-prod"),
    document.getElementById("3-prod"),
    document.getElementById("4-prod"),
    document.getElementById("5-prod"),
    document.getElementById("6-prod")
];

const adjetivos_value_product = [
    "Estética",
    "Dark",
    "Conceitual",
    "Pensativa",
    "Chamativa",
    "Engraçada"
];


for (let i = 0; i < adjetivos_buttons_product.length; i++) {
    const element = adjetivos_buttons_product[i];

    element.addEventListener("click", function () {
        adjetivo = adjetivos_value_product[i];
        console.log(adjetivo);
        element.disabled = true;
        for (let j = 0; j < adjetivos_buttons_product.length; j++) {
            if (j != i)
                adjetivos_buttons_product[j].disabled = false;
        }
    });
}

adjetivos_buttons_product[1].disabled = true;

adjetivos_buttons_product[1].disabled = true;


// INSTA ADJECTIVES
const adjetivos_buttons_insta = [
    // INSTA
    document.getElementById("1-insta"),
    document.getElementById("2-insta"),
    document.getElementById("3-insta"),
    document.getElementById("4-insta"),
    document.getElementById("5-insta"),
    document.getElementById("6-insta")
];

const adjetivos_value_insta = [
    "Estética",
    "Dark",
    "Conceitual",
    "Pensativa",
    "Chamativa",
    "Engraçada"
];

for (let i = 0; i < adjetivos_buttons_insta.length; i++) {
    const element = adjetivos_buttons_insta[i];

    element.addEventListener("click", function () {
        adjetivo = adjetivos_value_insta[i];
        console.log(adjetivo);
        element.disabled = true;
        for (let j = 0; j < adjetivos_buttons_insta.length; j++) {
            if (j != i)
                adjetivos_buttons_insta[j].disabled = false;
        }
    });
}

adjetivos_buttons_insta[1].disabled = true;