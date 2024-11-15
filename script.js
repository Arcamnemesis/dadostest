let baseDatos = [];
let participantes = [];
let descartados = [];
let clickTimer = null; // Temporizador para detectar clics dobles
const tiempoDobleClick = 300; // Tiempo máximo entre clics para considerarse doble click
let numeroGanador = 38965; // Número ganador predefinido
let resultadoActual = ""; // Construcción del número en curso
let animacionActiva = false; // Para evitar múltiples activaciones simultáneas

// Cargar la base de datos
fetch('database.json')
    .then(response => response.json())
    .then(data => {
        baseDatos = data;
        participantes = [...baseDatos];
        actualizarTablas();
    });

const dados = [
    document.getElementById('dado1'),
    document.getElementById('dado2'),
    document.getElementById('dado3'),
    document.getElementById('dado4'),
    document.getElementById('dado5'),
];

const boton = document.getElementById('tirarDado');
const contenedorGanador = document.getElementById('ganador');
const confetiContainer = document.getElementById('confeti');

// Lógica para tirar los dados
function tirarDados() {
    if (animacionActiva) return;

    if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        simularGanador(numeroGanador);
        return;
    }

    clickTimer = setTimeout(() => {
        lanzarDadosNormal();
        clickTimer = null;
    }, tiempoDobleClick);
}

// Generar valores válidos para cada dado
function generarValorDado(posicion) {
    const rangoInicio = Math.pow(10, posicion);
    const rangoFin = Math.min(50000, Math.pow(10, posicion + 1) - 1);
    const posiblesValores = [];

    for (let i = rangoInicio; i <= rangoFin; i++) {
        if (participantes.some(persona => persona.ticket.toString().padStart(5, "0").startsWith(i.toString().slice(0, posicion + 1)))) {
            posiblesValores.push(i.toString()[posicion]);
        }
    }

    return posiblesValores[Math.floor(Math.random() * posiblesValores.length)];
}

// Lógica normal de tirar los dados
function lanzarDadosNormal() {
    resultadoActual = "";
    dados.forEach((dado, index) => {
        setTimeout(() => {
            const numero = generarValorDado(index);
            resultadoActual += numero.toString();
            dado.textContent = numero;
            filtrarParticipantesPorPosicion(index, numero);
            actualizarTablas();
        }, index * 1000);
    });

    setTimeout(reiniciarEstado, 6000); // Reiniciar después de la tirada
}

// Simulación del número ganador
function simularGanador(ganador) {
    animacionActiva = true;
    resultadoActual = "";

    const numerosGanador = ganador.toString().padStart(5, "0").split("");
    dados.forEach((dado, index) => {
        setTimeout(() => {
            const numero = numerosGanador[index];
            resultadoActual += numero;
            dado.textContent = numero;
            filtrarParticipantesPorPosicion(index, numero);
            actualizarTablas();

            if (index === dados.length - 1) {
                mostrarGanador(ganador);
            }
        }, index * 1000);
    });
}

// Mostrar efectos de ganador
function mostrarGanador(ganador) {
    confetiContainer.style.display = "block";
    contenedorGanador.textContent = `¡Número ganador: ${ganador}!`;
    contenedorGanador.style.display = "block";

    setTimeout(() => {
        confetiContainer.style.display = "none";
        contenedorGanador.style.display = "none";
        reiniciarEstado();
        animacionActiva = false;
    }, 5000);
}

// Filtrar participantes según la posición del dado
function filtrarParticipantesPorPosicion(posicion, numero) {
    const prefijoActual = resultadoActual.padEnd(posicion + 1, "0");
    const nuevosParticipantes = participantes.filter(persona =>
        persona.ticket.toString().padStart(5, "0").startsWith(prefijoActual)
    );

    descartados = [...descartados, ...participantes.filter(persona => !nuevosParticipantes.includes(persona))];
    participantes = nuevosParticipantes;
}

// Reiniciar el estado
function reiniciarEstado() {
    resultadoActual = "";
    participantes = [...baseDatos];
    descartados = [];
    dados.forEach(dado => (dado.textContent = "-"));
    actualizarTablas();
}

// Actualizar las tablas
function actualizarTablas() {
    const listaDescartados = document.getElementById('listaDescartados');
    const listaParticipantes = document.getElementById('listaParticipantes');

    listaDescartados.innerHTML = descartados.map(persona => `<li>${persona.ticket} - ${persona.nombre}</li>`).join('');
    listaParticipantes.innerHTML = participantes.map(persona => `<li>${persona.ticket} - ${persona.nombre}</li>`).join('');
}

boton.addEventListener('click', tirarDados);
