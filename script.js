// Redirección a la página del dado desde el botón en index.html
document.addEventListener("DOMContentLoaded", function() {
    const botonDado = document.getElementById("botonDado");

    if (botonDado) {
        botonDado.addEventListener("click", function() {
            window.location.href = "dado.html";
        });
    }
});

// Lógica para el dado en dado.html
const dado = document.getElementById("dado");
const tirarDadoBtn = document.getElementById("tirarDado");
let contadorTiradas = 0;

function tirarDado() {
    dado.classList.add("tirando");
    let resultadoAleatorio = Math.floor(Math.random() * 6) + 1;
    dado.textContent = resultadoAleatorio;

    contadorTiradas++;

    setTimeout(() => {
        dado.classList.remove("tirando");
        
        if (contadorTiradas % 2 === 0) {
            dado.textContent = 5;
        } else {
            dado.textContent = Math.floor(Math.random() * 6) + 1;
        }
    }, 1200);
}

if (tirarDadoBtn) {
    tirarDadoBtn.addEventListener("click", tirarDado);
}
