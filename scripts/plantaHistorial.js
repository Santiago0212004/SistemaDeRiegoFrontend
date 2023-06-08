let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
let jsonZonaActual = window.localStorage.getItem("ZonaActual");
const zonaActual = JSON.parse(jsonZonaActual);
let jsonPlantaActual = window.localStorage.getItem("plantaActual");
const plantaActual = JSON.parse(jsonPlantaActual);
localStorage.setItem('Estado', "HISTORIALPLANTA");

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
const estadisticaBTN = document.getElementById('EstadisticaBTN');
const plantasBTN = document.getElementById('PlantasBTN');

const estadistica = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    localStorage.removeItem('plantaActual');
    window.location.href = 'estadisticaZona.html';
};
estadisticaBTN.addEventListener('click', estadistica);

const plantas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    localStorage.removeItem('plantaActual');
    window.location.href = 'plantas.html';
};
plantasBTN.addEventListener('click', plantas); 

//Menu Bar

const datosBTN = document.getElementById('DatosBTN');
const syABTN = document.getElementById('SyABTN');
//const historialBTN = document.getElementById('HistorialBTN');
const ajustesBTN = document.getElementById('AjustesBTN');

const datos = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaDatos.html';
};
const sensoresYactuadores = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaSensoresYactuadores.html';
};
const ajustes = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaAjustes.html';
};

datosBTN.addEventListener('click', datos);
syABTN.addEventListener('click', sensoresYactuadores);
ajustesBTN.addEventListener('click', ajustes);
