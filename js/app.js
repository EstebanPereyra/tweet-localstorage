//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//EventListener
eventListener();

function eventListener () {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    })
}


//Funciones
// Agregando Tweet
function agregarTweet (e) {
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value;

    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');

        return; // Evita que las siguientes líneas se sigan ejecutando.
    }

    // Añadir al arrego de tweets

    const tweetObj = {
        id : Date.now(),
        tweet : tweet
    }

    tweets = [...tweets, tweetObj];

    //Añadir al html

    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

function mostrarError (error) {
    const mensajeError = document.createElement('p');

    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el HTML

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Remueve el mensaje de error luego de 3 segundos

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets

function crearHTML() {

    limipiarHTML ();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btn = document.createElement('a');

            btn.textContent = 'x';
            btn.classList.add('borrar-tweet');

            //Añadir la función de eliminar al boton

            btn.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear lista de tweet
            const li = document.createElement('li');

            li.textContent = tweet.tweet;

            li.appendChild(btn);

            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

//Sincronizar storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Limpiar HTML

function limipiarHTML () {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Función de botón para borrar tweet

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}