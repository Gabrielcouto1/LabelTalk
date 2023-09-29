const service = document.getElementById("service");
const btn = document.querySelectorAll(".btn");

const item1 = document.getElementById("service-one");
const item2 = document.getElementById("service-two");
const item3 = document.getElementById("service-three");

const pictureText = "";

// Create new div
btn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        service.style.display = "flex";

        if (btn.id === "prod") {
            item1.style.display = "flex";
            item2.style.display = "none";
            item3.style.display = "none";

            service.style.background = "linear-gradient(118deg, #F17300 0%, rgba(217, 217, 217, 0.00) 89.78%)";
            scrollItem(service);
        }

        if (btn.id === "bk") {
            item1.style.display = "none";
            item2.style.display = "flex";
            item3.style.display = "none";

            service.style.background = "linear-gradient(117deg, rgba(0, 51, 86, 0.88) 0%, rgba(0, 51, 86, 0.30) 54.17%, rgba(217, 217, 217, 0.00) 100%)";
            scrollItem(service);
        }

        if (btn.id === "insta") {
            item1.style.display = "none";
            item2.style.display = "none";
            item3.style.display = "flex";

            service.style.background = "linear-gradient(117deg, #A1BBA8 0%, rgba(187, 201, 191, 0.54) 54.17%, rgba(217, 217, 217, 0.00) 100%)";
            scrollItem(service);
        }
    });
});

// Scroll functions
async function scrollItem(elem) {
    try {
        if (!elem)
            throw new Error("Element not found.");

        const position = elem.getBoundingClientRect().top;

        await scrollSmoothly(position);

        console.log("Scroll successfully!");
    } catch (erro) {
        console.error("Error while scrolling: ", erro);
    }
}

function scrollSmoothly(destiny) {
    return new Promise((resolve, reject) => {
        const duration = 150;
        const interval = 5;
        const steps = duration / interval;
        const distance = destiny / steps;

        let actualPosition = window.scrollY;

        function scroll() {
            if (window.scrollY === destiny) {

                // Bounce Effect
                document.documentElement.style.animation = "bounce 0.5s";

                setTimeout(() => {
                    document.documentElement.style.animation = "";
                    resolve();
                }, 500);
                return;
            }

            actualPosition += distance;
            window.scrollTo(0, actualPosition);

            if (window.scrollY === destiny)
                resolve();
            else
                requestAnimationFrame(scroll);
        }
        scroll();
    });
}

// PROD Input file
const inputFileProd = document.querySelector('#image-input-prod');
const pictureImageProd = document.querySelector('#input-bg-prod');

inputFileProd.addEventListener('change', function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
        console.log(file);
        const reader = new FileReader();

        reader.addEventListener('load', function(e){
            const readerTarget = e.target;

            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture');

            pictureImageProd.innerHTML = '';

            pictureImageProd.appendChild(img);

            
        });

        reader.readAsDataURL(file);
    } else{
        pictureImageProd.innerHTML = pictureText
    }
});

// Insta Input file
const inputFileInsta = document.querySelector('#image-input-insta');
const pictureImageInsta = document.querySelector('#input-bg-insta');

inputFileInsta.addEventListener('change', function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
        console.log(file);
        const reader = new FileReader();

        reader.addEventListener('load', function(e){
            const readerTarget = e.target;

            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture');

            pictureImageInsta.innerHTML = '';

            pictureImageInsta.appendChild(img);

            
        });

        reader.readAsDataURL(file);
    } else{
        pictureImageInsta.innerHTML = pictureText
    }
});