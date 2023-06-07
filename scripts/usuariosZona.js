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
}


const abrirVentanaEnlazarUsuarioZona = (event) => {
    event.preventDefault();
    ventanaEnlazarUsuarioZona.style.display = 'block';

    const usuariosZona = document.getElementById('UsuariosZona');

    //usuarios que no estan enlazados a esta zona
    getUsuariosNoEnlazadosZona();

    let option1 = document.createElement('option');
    option1.textContent="opcion 1";
    option1.setAttribute('value', 1);

    let option2 = document.createElement('option');
    option2.textContent="opcion 2";
    option2.setAttribute('value', 2);

    let option3 = document.createElement('option');
    option3.textContent="opcion 3";
    option3.setAttribute('value', 3);


    usuariosZona.appendChild(option1);
    usuariosZona.appendChild(option2);
    usuariosZona.appendChild(option3);

    const enlazarUsuarioZona = (event) => {
        event.preventDefault();
    
        var opcionSeleccionada = usuariosZona.value;
        // Imprimir la opción seleccionada en la consola
        console.log(opcionSeleccionada);
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