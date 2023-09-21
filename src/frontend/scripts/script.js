function testePost(){
    document.getElementById('loadingDiv').style.display = 'block';

    var form = {
        "image_name": "produto_geladeira2.jpg",
        "adjective": "grande"
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