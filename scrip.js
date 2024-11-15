const dado = document.getElementById("dado");
const tirarDadoBtn = document.getElementById("tirarDado");
let contadorTiradas = 0;

// Función para lanzar el dado
function tirarDado() {
    console.log("Botón presionado para tirar el dado"); // Depuración
    // Añadir clase para animación
    dado.classList.add("tirando");

    // Seleccionar un número aleatorio temporal mientras se lanza
    let resultadoAleatorio = Math.floor(Math.random() * 6) + 1;
    dado.textContent = resultadoAleatorio;

    // Incrementar el contador de tiradas
    contadorTiradas++;

    // Después de la animación, mostrar 5 cada dos tiradas o un número aleatorio
    setTimeout(() => {
        dado.classList.remove("tirando");

        // Si el contador de tiradas es par, mostrar siempre 5, sino mostrar aleatorio
        if (contadorTiradas % 2 === 0) {
            dado.textContent = 5;
        } else {
            dado.textContent = Math.floor(Math.random() * 6) + 1;
        }
        console.log("Resultado mostrado en dado:", dado.textContent); // Depuración
    }, 1200);
}

// Evento para el botón de tirar dado
tirarDadoBtn.addEventListener("click", tirarDado);
