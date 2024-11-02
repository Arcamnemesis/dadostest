const dado = document.getElementById("dado");
const tirarDadoBtn = document.getElementById("tirarDado");

// Función para cambiar el resultado del dado
function cambiarResultado() {
    const resultado = prompt("Elige el resultado del dado (1 a 6):");
    if (resultado >= 1 && resultado <= 6) {
        dado.textContent = resultado;
    } else {
        alert("Por favor, introduce un número entre 1 y 6.");
    }
}

// Función para animar el dado
function tirarDado() {
    // Añadir clase para animación
    dado.classList.add("tirando");

    // Seleccionar un número aleatorio temporal mientras se lanza
    let resultadoAleatorio = Math.floor(Math.random() * 6) + 1;
    dado.textContent = resultadoAleatorio;

    // Después de 600ms, permite elegir resultado y reinicia animación
    setTimeout(() => {
        cambiarResultado();
        dado.classList.remove("tirando");
    }, 600);
}

// Evento para botón de tirar dado
tirarDadoBtn.addEventListener("click", tirarDado);
