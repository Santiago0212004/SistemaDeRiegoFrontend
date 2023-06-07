let jsonZonaActual = window.localStorage.getItem("ZonaActual");
const zonaActual = JSON.parse(jsonZonaActual);



const rectanguloCards = document.getElementById("RectanguloCards");

const atrasBTN = document.getElementById('AtrasBTN');
const agregarBTN = document.getElementById('AgregarBTM');

const ventanaEnlazarUsuarioZona = document.getElementById('VentanaEnlazarUsuarioZona');
const textoNombreZona = document.getElementById('textoNombreZona');
const textoDescripcionZona = document.getElementById('textoDescripcionZona');
const detallesZonaBTN = document.getElementById('DetallesZonaBTM');
const cerrarVentanaEnlazarUsuarioZonaBTN = document.getElementById('CerrarVentanaEnlazarUsuarioZonaBTN');
const agregarVentanaEnlazarUsuarioZonaBTN = document.getElementById('AgregarVentanaEnlazarUsuarioZonaBTN');

ventanaEnlazarUsuarioZona.style.display = 'none';
textoNombreZona.textContent = zonaActual.name;
textoDescripcionZona.textContent = zonaActual.description;

async function getUsersZone(){
    let response = await fetch("http://localhost:8080/zones/users",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'id': zonaActual.id
        }
    });
    let json = await response.json();
    console.log(json);

    localStorage.setItem('Estado', "USUARIOSZONA");

    json.forEach(users => {
        let user = new User(users).render();
        console.log(user);
        rectanguloCards.appendChild(user);
    });
}

const atras = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    let usuarioMasterAUX = window.localStorage.getItem("Usuario");
    localStorage.clear();
    localStorage.setItem('Usuario', usuarioMasterAUX);

    window.location.href = 'zones.html';
};

async function getUsuariosNoEnlazadosZona(){

    //aqui va los usuarios que aun no estan enlazados a una zona
    console.log(usuarioMaster.identification);
    console.log(zonaActual.id);
    let response = await fetch("http://localhost:8080/users/notLinked",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuarioMaster.identification,
            'zoneId': zonaActual.id
        }
    });
    let json = await response.json();

    console.log(json);
    let usuariosZona = document.getElementById('UsuariosZona');

    json.forEach(users => {
        let option = document.createElement('option');
        option.textContent=users.username;
        option.setAttribute('value', JSON.stringify(users));

        usuariosZona.appendChild(option);
    });
}


const abrirVentanaEnlazarUsuarioZona = (event) => {
    event.preventDefault();
    ventanaEnlazarUsuarioZona.style.display = 'block';
    
    let usuariosZona = document.getElementById('UsuariosZona');
    //usuarios que no estan enlazados a esta zona
    getUsuariosNoEnlazadosZona();

    const enlazarUsuarioZona = (event) => {
        event.preventDefault();
    
        let opcionSeleccionada = usuariosZona.value;
        //console.log(opcionSeleccionada);
        console.log(JSON.parse(opcionSeleccionada));

        let usuarioSeleccionado=JSON.parse(opcionSeleccionada);

        //enlace
    
        let agregarEnlaceUsuarioZonaRespuesta = {
            master: usuarioMaster,
            user: usuarioSeleccionado,
            zone: zonaActual
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
        ventanaEnlazarUsuarioZona.style.display = 'none';
        location.reload();//Pa recargar la pagina
    };
    agregarVentanaEnlazarUsuarioZonaBTN.addEventListener('click', enlazarUsuarioZona);
};



const cerrarVentanaEnlazarUsuarioZona = (event) => {
    event.preventDefault();
    ventanaEnlazarUsuarioZona.style.display = 'none';
};

atrasBTN.addEventListener('click', atras);
getUsersZone();
cerrarVentanaEnlazarUsuarioZonaBTN.addEventListener('click', cerrarVentanaEnlazarUsuarioZona);
agregarBTN.addEventListener('click', abrirVentanaEnlazarUsuarioZona);