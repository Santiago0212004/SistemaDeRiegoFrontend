let jsonUsuarioActual = window.localStorage.getItem("UsuarioActual");
const usuarioActual = JSON.parse(jsonUsuarioActual);



const rectanguloCards = document.getElementById("RectanguloCards");

const atrasBTN = document.getElementById('AtrasBTN');
const agregarBTN = document.getElementById('AgregarBTM');

const ventanaEnlazarZonaUsuario = document.getElementById('VentanaEnlazarZonaUsuario');
const textoNombreUsuario = document.getElementById('textoNombreUsuario');
const detallesUsuarioBTM = document.getElementById('DetallesUsuarioBTM');
const cerrarVentanaEnlazarZonaUsuarioBTN = document.getElementById('CerrarVentanaEnlazarZonaUsuarioBTN');
const agregarVentanaEnlazarZonaUsuarioBTN = document.getElementById('AgregarVentanaEnlazarZonaUsuarioBTN');

ventanaEnlazarZonaUsuario.style.display = 'none';
textoNombreUsuario.textContent = usuarioActual.username;

async function getZonesUser(){
    let response = await fetch("http://localhost:8080/users/zones",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuarioActual.identification
        }
    });
    let json = await response.json();
    console.log(json);

    localStorage.setItem('Estado', "ZONASUSUARIO");

    json.forEach(zones => {
        let zone = new Zone(zones).render();
        console.log(zone);
        rectanguloCards.appendChild(zone);
    });
}
getZonesUser();

const atras = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    let usuarioMasterAUX = window.localStorage.getItem("Usuario");
    localStorage.clear();
    localStorage.setItem('Usuario', usuarioMasterAUX);

    window.location.href = 'usuarios.html';
};

async function getZonasNoEnlazadasUsuario(){
    //aqui va las zonas que aun no estan enlazados a un usuario

    console.log(usuarioMaster.identification);
    console.log(usuarioActual.identification);

    let response = await fetch("http://localhost:8080/zones/notLinked",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuarioMaster.identification,
            'userId': usuarioActual.identification
        }
    });
    let json = await response.json();

    console.log(json);
    let zonasUsuario = document.getElementById('ZonasUsuario');

    json.forEach(zones => {
        let option = document.createElement('option');
        option.textContent=zones.name;
        option.setAttribute('value', JSON.stringify(zones));

        zonasUsuario.appendChild(option);
    });
}


const abrirVentanaEnlazarZonaUsuario = (event) => {
    event.preventDefault();
    ventanaEnlazarZonaUsuario.style.display = 'block';
    
    let zonasUsuario = document.getElementById('ZonasUsuario');
    //usuarios que no estan enlazados a esta zona
    getZonasNoEnlazadasUsuario();

    const enlazarZonaUsuario = (event) => {
        event.preventDefault();
    
        let opcionSeleccionada = zonasUsuario.value;
        //console.log(opcionSeleccionada);
        console.log(JSON.parse(opcionSeleccionada));

        let zonaSeleccionada=JSON.parse(opcionSeleccionada);

        //enlace
    
        let agregarEnlaceUsuarioZonaRespuesta = {
            master: usuarioMaster,
            user: usuarioActual,
            zone: zonaSeleccionada
        };
        console.log(agregarEnlaceUsuarioZonaRespuesta);

        fetch('http://localhost:8080/zones/link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agregarEnlaceUsuarioZonaRespuesta)
        })
        .then(response => {
            console.log(response); // Imprime la respuesta HTTP en la consola
            return response;
        })
        location.reload();//Pa recargar la pagina
        ventanaEnlazarZonaUsuario.style.display = 'none';
    };
    agregarVentanaEnlazarZonaUsuarioBTN.addEventListener('click', enlazarZonaUsuario);
};



const cerrarVentanaEnlazarZonaUsuario = (event) => {
    event.preventDefault();
    ventanaEnlazarZonaUsuario.style.display = 'none';
};

atrasBTN.addEventListener('click', atras);
cerrarVentanaEnlazarZonaUsuarioBTN.addEventListener('click', cerrarVentanaEnlazarZonaUsuario);
agregarBTN.addEventListener('click', abrirVentanaEnlazarZonaUsuario);