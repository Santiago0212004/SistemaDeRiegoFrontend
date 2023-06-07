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

const ventanaAgregarZona = document.getElementById('VentanaAgregarZona');

if(authorization=="MASTER"){
    const cerrarVentanaAgregarZonaBTN = document.getElementById('CerrarVentanaAgregarZonaBTN');
    const agregarVentanaAgregarZonaBTN = document.getElementById('AgregarVentanaAgregarZonaBTN');
    const nombreZona = document.getElementById('NombreZona');
    const descripcionZona = document.getElementById('DescripcionZona');
    //const plantaZona = document.getElementById('PlantaZona');

    ventanaAgregarZona.style.display = 'none';
    agregarBTN.style.display = 'block';
    zonasBTN.style.display = 'block';
    usuariosBTN.style.display = 'block';
    autorizacionesBTN.style.display = 'block';
    textoMaster.style.display = 'block';

    zonasBTN.disabled = true;
    zonasBTN.style.opacity = '0.9'; // Reduce la opacidad
    zonasBTN.style.cursor = 'not-allowed'; // Cambia el cursor
    zonasBTN.style.backgroundColor = '#D5D3D0';

    
    async function getZones(){
        let response = await fetch("http://localhost:8080/zones/all",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'identification': usuario.identification
            }
        });
        let json = await response.json();
        console.log(json);

        localStorage.setItem('Estado', "ZONAS");

        json.forEach(zones => {
            let zone = new Zone(zones).render();
            console.log(zone);
            rectanguloCards.appendChild(zone);
        });
    }
    getZones();

    const usuarios = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón
        window.location.href = 'usuarios.html';
    };

    const autorizaciones = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón
        window.location.href = 'autorizaciones.html';
    };
    
    const abrirVentanaAgregarZona = (event) => {
        event.preventDefault();
        ventanaAgregarZona.style.display = 'block';
    };

    const cerrarVentanaAgregarZona = (event) => {
        event.preventDefault();
        ventanaAgregarZona.style.display = 'none';
    };

    const agregarZonaVentanaAgregarZona = (event) => {
        event.preventDefault();

        let zona = {
            name: nombreZona.value,
            description: descripcionZona.value
        };

        
        let agregarZonaRespuesta = {
            user: usuario,
            zone: zona
        };
    
        console.log(JSON.stringify(agregarZonaRespuesta));

        fetch('http://localhost:8080/zones/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agregarZonaRespuesta)
        })
        .then(response => {
            console.log(response); // Imprime la respuesta HTTP en la consola
            return response;
        })
        location.reload();//Pa recargar la pagina
        ventanaAgregarZona.style.display = 'none';
    };
    
    usuariosBTN.addEventListener('click', usuarios); 
    autorizacionesBTN.addEventListener('click', autorizaciones);  
    agregarBTN.addEventListener('click', abrirVentanaAgregarZona);
    cerrarVentanaAgregarZonaBTN.addEventListener('click', cerrarVentanaAgregarZona);
    agregarVentanaAgregarZonaBTN.addEventListener('click', agregarZonaVentanaAgregarZona);

}else if(authorization=="USER"){
    ventanaAgregarZona.style.display = 'none';
    agregarBTN.style.display = 'none';
    zonasBTN.style.display = 'none';
    usuariosBTN.style.display = 'none';
    autorizacionesBTN.style.display = 'none';
    textoMaster.style.display = 'none';


}




