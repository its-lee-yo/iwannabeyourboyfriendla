const cuerpo = document.body;

/* ================= PANTALLAS ================= */
const pantallaInicio = document.getElementById("pantallaInicio");
const passInicio = document.getElementById("passInicio");
const btnInicio = document.getElementById("btnInicio");

const pantallaTiempo = document.getElementById("pantallaTiempo");
const passTiempo = document.getElementById("passTiempo");
const btnTiempo = document.getElementById("btnTiempo");

const pantallaRoja = document.getElementById("pantallaRoja");
const textoInterrogacion = document.getElementById("textoInterrogacion");

const quiz = document.getElementById("quiz");
const clave = document.getElementById("clave");

const errorCorazon = document.getElementById("errorCorazon");
const corazon = document.getElementById("corazon");
const flash = document.getElementById("flash");

/* ================= CONTRASEÑAS ================= */
btnInicio.onclick = () => {
    if (passInicio.value === "Noni") {
        pantallaInicio.classList.add("oculto");
    } else {
        pantallaInicio.classList.add("shake");
        pantallaInicio.style.background = "red";
        setTimeout(() => location.href = "about:blank", 2000);
    }
};

btnTiempo.onclick = () => {
    if (passTiempo.value === "ILoveYouNoni") {
        pantallaTiempo.classList.add("oculto");
        activar("tiempo");
    } else {
        mostrarPantallaRoja();
    }
};

/* ================= PANTALLA ROJA ??? ================= */
function mostrarPantallaRoja() {
    pantallaRoja.classList.remove("oculto");
    textoInterrogacion.textContent = "";
    let i = 0;
    const texto = "???";

    const escribir = setInterval(() => {
        textoInterrogacion.textContent += texto[i];
        i++;
        if (i === texto.length) {
            clearInterval(escribir);
            setTimeout(() => location.reload(), 2000);
        }
    }, 400);
}

/* ================= NAVEGACIÓN ================= */
function activar(id) {
    cuerpo.classList.add("activo");
    document.querySelectorAll(".contenido").forEach(c => c.classList.add("oculto"));
    document.getElementById(id).classList.remove("oculto");
    iniciarCorazones(id);
    if (id === "amor") iniciarQuiz();
}

function abrirVida() { activar("vida"); }
function abrirAmor() { activar("amor"); }
function abrirTiempo() { pantallaTiempo.classList.remove("oculto"); }

function volver() {
    cuerpo.classList.remove("activo");
    document.querySelectorAll(".contenido").forEach(c => c.classList.add("oculto"));
    document.querySelector(".corazones").innerHTML = "";
    clave.classList.add("oculto");
}

/* ================= CORAZONES ================= */
function iniciarCorazones(tipo) {
    setInterval(() => {
        if (document.querySelectorAll(".corazones span").length > 40) return;

        const c = document.createElement("span");
        c.textContent = "❤";
        c.style.left = Math.random() * 100 + "vw";
        c.style.fontSize = 16 + Math.random() * 20 + "px";
        c.style.animationDuration = 4 + Math.random() * 4 + "s";
        if (tipo === "tiempo") c.classList.add("luminoso");
        document.querySelector(".corazones").appendChild(c);
        setTimeout(() => c.remove(), 9000);
    }, window.innerWidth < 480 ? 400 : 180);
}

/* ================= QUIZ ================= */
function iniciarQuiz() {
    quiz.innerHTML = "";
    clave.classList.add("oculto");
    let correctas = 0;

    const preguntas = [
        {pregunta: "¿Cómo se dice 'te amo' en alemán?", izquierda: "Ich liebe dich", derecha: "Ich hab dich lieb", correcta: "i"},
        {pregunta: "¿Desde qué fecha llevamos juntos?", izquierda: "19/12", derecha: "17/12", correcta: "i"},
        {pregunta: "¿Cómo se llaman mis tres gatos?", izquierda: "Billy, Nino y Nucita", derecha: "Willy, Nico y Nucita", correcta: "d"},
        {pregunta: "Si pudiera vivir en cualquier lugar, ¿cuál elegiría?", izquierda: "Hamburgo, es la ciudad que conozco desde hace tiempo y me parece hermosa", derecha: "Cualquier lugar donde estés tú", correcta: "d"},
        {pregunta: "La última pregunta fue muy fácil, así que déjame preguntarte: ¿cuántos lunares tengo en la cara?", izquierda: "13 lunares", derecha: "11 lunares", correcta: "d"}
    ];

    preguntas.forEach(p => {
        const contenedor = document.createElement("div");
        contenedor.className = "pregunta";

        const texto = document.createElement("div");
        texto.textContent = p.pregunta;

        const respuestas = document.createElement("div");
        respuestas.className = "respuestas";

        const btnIzq = document.createElement("button");
        const btnDer = document.createElement("button");

        btnIzq.textContent = p.izquierda;
        btnDer.textContent = p.derecha;

        btnIzq.onclick = () => evaluar(btnIzq, btnDer, p.correcta, "i");
        btnDer.onclick = () => evaluar(btnIzq, btnDer, p.correcta, "d");

        respuestas.append(btnIzq, btnDer);
        contenedor.append(texto, respuestas);
        quiz.appendChild(contenedor);
    });

    function evaluar(bi, bd, correcta, seleccion) {
        const esCorrecta = correcta === seleccion;
        const btn = seleccion === "i" ? bi : bd;

        btn.classList.add(esCorrecta ? "correcto" : "incorrecto");
        bi.disabled = bd.disabled = true;

        if (esCorrecta) {
            correctas++;
            if (correctas === 5) clave.classList.remove("oculto");
        } else {
            animacionError();
        }
    }
}

/* ================= ERROR CORAZÓN ================= */
function animacionError() {
    errorCorazon.classList.add("activo");
    corazon.classList.remove("encoger");

    setTimeout(() => {
        corazon.classList.add("encoger", "luminoso");
        setTimeout(() => {
            flash.classList.add("on");
            setTimeout(() => location.reload(), 2000);
        }, 1000);
    }, 3000);
}
