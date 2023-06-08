let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
let jsonZonaActual = window.localStorage.getItem("ZonaActual");
const zonaActual = JSON.parse(jsonZonaActual);
localStorage.setItem('Estado', "PLANTASZONA");

const textoNombreZona = document.getElementById('textoNombreZona');
const textoDescripcionZona = document.getElementById('textoDescripcionZona');
textoNombreZona.textContent = zonaActual.name;
textoDescripcionZona.textContent = zonaActual.description;

const estadisticaBTN = document.getElementById('EstadisticaBTN');
const plantasBTN = document.getElementById('PlantasBTN');
const zonasBTN = document.getElementById('ZonasBTN');

plantasBTN.disabled = true;
plantasBTN.style.opacity = '0.9'; // Reduce la opacidad
plantasBTN.style.cursor = 'not-allowed'; // Cambia el cursor
plantasBTN.style.backgroundColor = '#D5D3D0';

const estadistica = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'estadisticaZona.html';
};
estadisticaBTN.addEventListener('click', estadistica);

const zonas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    localStorage.removeItem('ZonaActual');
    window.location.href = 'zones.html';
};
zonasBTN.addEventListener('click', zonas);


//INICIA VISUALIZAR PLANTAS
const rectanguloCards = document.getElementById("RectanguloCards");

async function getPlantas(){
    let response = await fetch("http://localhost:8080/zones/plants",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'zoneId': zonaActual.id,
            'identification': usuario.identification
        }
    });
    let json = await response.json();
    console.log(json);

    localStorage.setItem('Estado', "PLANTAS");

    json.forEach(plantas => {
        let planta = new Planta(plantas).render();
        console.log(planta);
        rectanguloCards.appendChild(planta);
    });
}
getPlantas();
//TERMINA VISUALIZAR PLANTAS




//Agregar planta ventana

const ventanaAgregarPlanta = document.getElementById('VentanaAgregarPlanta');

const cerrarVentanaAgregarPlantaBTN = document.getElementById('CerrarVentanaAgregarPlantaBTN');
const agregarVentanaAgregarPlantaBTN = document.getElementById('AgregarVentanaAgregarPlantaBTN');
const agregarBTN = document.getElementById('AgregarBTN');
const nombrePlanta = document.getElementById('NombrePlanta');
const descripcionPlanta = document.getElementById('DescripcionPlanta');

ventanaAgregarPlanta.style.display = 'none';


const abrirVentanaAgregarPlanta = (event) => {
    event.preventDefault();
    ventanaAgregarPlanta.style.display = 'block';
};

const cerrarVentanaAgregarPlanta = (event) => {
    event.preventDefault();
    ventanaAgregarPlanta.style.display = 'none';
};

const agregarZonaVentanaAgregarPlanta = (event) => {
    event.preventDefault();

    let planta = {
        name: nombrePlanta.value,
        description: descripcionPlanta.value
    };
    let plantRequest = {
        user: usuario,
        zone: zonaActual,
        plant: planta
    };
    console.log(plantRequest);

    fetch('http://localhost:8080/plants/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantRequest)
    })
    .then(response => {
        console.log(response); // Imprime la respuesta HTTP en la consola
        return response;
    })

    location.reload();//Pa recargar la pagina
    ventanaAgregarPlanta.style.display = 'none';
};

agregarBTN.addEventListener('click', abrirVentanaAgregarPlanta);
cerrarVentanaAgregarPlantaBTN.addEventListener('click', cerrarVentanaAgregarPlanta);
agregarVentanaAgregarPlantaBTN.addEventListener('click', agregarZonaVentanaAgregarPlanta);

// TERMINA AGREGAR PLANTA NUEVA