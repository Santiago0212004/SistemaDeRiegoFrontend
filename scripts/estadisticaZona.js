let jsonZonaActual = window.localStorage.getItem("ZonaActual");
const zonaActual = JSON.parse(jsonZonaActual);
localStorage.setItem('Estado', "ESTADISTICAZONA");

const textoNombreZona = document.getElementById('textoNombreZona');
const textoDescripcionZona = document.getElementById('textoDescripcionZona');
textoNombreZona.textContent = zonaActual.name;
textoDescripcionZona.textContent = zonaActual.description;

const estadisticaBTN = document.getElementById('EstadisticaBTN');
const plantasBTN = document.getElementById('PlantasBTN');
const zonasBTN = document.getElementById('ZonasBTN');

estadisticaBTN.disabled = true;
estadisticaBTN.style.opacity = '0.9'; // Reduce la opacidad
estadisticaBTN.style.cursor = 'not-allowed'; // Cambia el cursor
estadisticaBTN.style.backgroundColor = '#D5D3D0';

const plantas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantas.html';
};
plantasBTN.addEventListener('click', plantas); 

const zonas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    localStorage.removeItem('ZonaActual');
    window.location.href = 'zones.html';
};
zonasBTN.addEventListener('click', zonas);