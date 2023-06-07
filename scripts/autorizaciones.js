let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
authorization=usuario.authorization.type;
identification=usuario.identification;

console.log(usuario);
console.log(authorization);
console.log(identification);


const rectanguloCards = document.getElementById("RectanguloCards");
const agregarBTN = document.getElementById('AgregarBTM');
const zonasBTN = document.getElementById('ZonasBTM');
const usuariosBTN = document.getElementById('UsuariosBTM');
const autorizacionesBTN = document.getElementById('AutorizacionesBTM');
const textoMaster = document.getElementById('textoMaster');

autorizacionesBTN.disabled = true;
autorizacionesBTN.style.opacity = '0.9'; // Reduce la opacidad
autorizacionesBTN.style.cursor = 'not-allowed'; // Cambia el cursor
autorizacionesBTN.style.backgroundColor = '#D5D3D0';


async function getAutorizaciones(){
    let response = await fetch("http://localhost:8080/authorizations/all",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification
        }
    });
    let json = await response.json();
    console.log(json);

    localStorage.setItem('Estado', "AUTORIZACIONES");

    json.forEach(autorizaciones => {
        let autorizacion = new Autorizacion(autorizaciones).render();
        console.log(autorizacion);
        rectanguloCards.appendChild(autorizacion);
    });
}
getAutorizaciones();


const zonas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'zones.html';
};

const usuarios = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'usuarios.html';
};

const agregarAutorizacion = (event) => {
    event.preventDefault();
    let autorizacion = {
        value: ValorAutorizacion.value,
        type: "USER"
    };

    let agregarAutorizacionRespuesta = {
        user: usuario,
        authorization: autorizacion
    };

    console.log(JSON.stringify(agregarAutorizacionRespuesta));

    fetch('http://localhost:8080/authorizations/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(agregarAutorizacionRespuesta)
    })
    .then(response => {
        console.log(response); // Imprime la respuesta HTTP en la consola
        return response;
    })
    location.reload();//Pa recargar la pagina
};

zonasBTN.addEventListener('click', zonas); 
usuariosBTN.addEventListener('click', usuarios);  
agregarBTN.addEventListener('click', agregarAutorizacion);






