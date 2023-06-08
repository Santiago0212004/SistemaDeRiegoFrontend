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
const plantasBTN = document.getElementById('PlantasBTN');


const plantas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    localStorage.removeItem('plantaActual');
    window.location.href = 'plantas.html';
};
plantasBTN.addEventListener('click', plantas); 

//Menu Bar

const syABTN = document.getElementById('SyABTN');
//const historialBTN = document.getElementById('HistorialBTN');
const ajustesBTN = document.getElementById('AjustesBTN');

const sensoresYactuadores = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaSensoresYactuadores.html';
};
const ajustes = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaAjustes.html';
};

syABTN.addEventListener('click', sensoresYactuadores);
ajustesBTN.addEventListener('click', ajustes);
