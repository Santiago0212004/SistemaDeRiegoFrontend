let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
let jsonZonaActual = window.localStorage.getItem("ZonaActual");
const zonaActual = JSON.parse(jsonZonaActual);
let jsonPlantaActual = window.localStorage.getItem("plantaActual");
const plantaActual = JSON.parse(jsonPlantaActual);
localStorage.setItem('Estado', "AJUSTESPLANTA");

//Informacion zona
const textoNombreZona = document.getElementById('textoNombreZona');
const textoDescripcionZona = document.getElementById('textoDescripcionZona');
textoNombreZona.textContent = zonaActual.name;
textoDescripcionZona.textContent = zonaActual.description;

//Informacion Planta
const textoNombrePlanta = document.getElementById('textoNombrePlanta');
const textoDescripcionPlanta = document.getElementById('textoDescripcionPlanta');
textoNombrePlanta.textContent = plantaActual.name;
textoDescripcionPlanta.textContent = plantaActual.description;

//botones Estadistica y plantas (Volver a la Zona)
const plantasBTN = document.getElementById('PlantasBTN');

const plantas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    localStorage.removeItem('plantaActual');
    window.location.href = 'plantas.html';
};
plantasBTN.addEventListener('click', plantas); 

//Menu Bar

const syABTN = document.getElementById('SyABTN');
const historialBTN = document.getElementById('HistorialBTN');
//const ajustesBTN = document.getElementById('AjustesBTN');

const sensoresYactuadores = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaSensoresYactuadores.html';
};
const historial = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaHistorial.html';
};

syABTN.addEventListener('click', sensoresYactuadores);
historialBTN.addEventListener('click', historial);

//actualizar Limites de humedad

const actualizarBTN = document.getElementById('ActualizarBTN');
const limiteHumedad = document.getElementById('LimiteHumedad');

const ajustarLimiteHumedad = (event) => {
    event.preventDefault(); 

    let plantRequest = {
        user: usuario,
        zone: zonaActual,
        plant: plantaActual
    };

    fetch('http://localhost:8080/plants/limit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'humidityLimit': limiteHumedad.value
        },
        body: JSON.stringify(plantRequest)
    })
    .then(response => {
        console.log(response); // Imprime la respuesta HTTP en la consola
        return response;
    })

};

actualizarBTN.addEventListener('click', ajustarLimiteHumedad);


