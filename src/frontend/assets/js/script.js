// Apply naturally hover
var product = document.getElementById("product");
var book = document.getElementById("book");
var instagram = document.getElementById("instagram");
var home = document.getElementById("home");
var background = document.getElementById("main-background");

// Muda automático
var colors = [
    "linear-gradient(127deg, #A9D6C2 28.02%, rgba(255, 209, 173, 0.2) 72.09%)",
    "linear-gradient(105deg, rgba(175, 206, 232, 0.2) 23.52%, rgba(204, 228, 247, 0.2) 80.07%)",
    "linear-gradient(127deg, #A9D6C2 28.02%, rgba(255, 209, 173, 0.2) 72.09%)"
];


var currentIndex = 0;
//   var body = document.body;

function changeBackground() {
    background.style.opacity = 0; // Define a opacidade para 0
    setTimeout(function () {
        background.style.background = colors[currentIndex];
        background.style.opacity = 1; // Define a opacidade de volta para 1
        currentIndex = (currentIndex + 1) % colors.length;
    }, 300); // Tempo de transição, aqui definido como 1 segundo (1000 ms)
}

// Chame a função para iniciar a mudança de fundo
changeBackground();

// Defina um intervalo para alterar o fundo ciclicamente a cada 5 segundos (ou o valor desejado)
setInterval(changeBackground, 5000); // 5000 milissegundos = 5 segundos