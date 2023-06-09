let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
let jsonZonaActual = window.localStorage.getItem("ZonaActual");
const zonaActual = JSON.parse(jsonZonaActual);
let jsonPlantaActual = window.localStorage.getItem("plantaActual");
const plantaActual = JSON.parse(jsonPlantaActual);
localStorage.setItem('Estado', "SENSORESYACTUADORESPLANTA");

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
//const syABTN = document.getElementById('SyABTN');
const ajustesBTN = document.getElementById('AjustesBTN');

const ajustes = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'plantaAjustes.html';
};

ajustesBTN.addEventListener('click', ajustes);

//Mostrar los sensores
const containerInteriorIzquierdo = document.getElementById('ContainerInteriorIzquierdo');

async function getSensor(){
    let response = await fetch("http://localhost:8080/sistema_de_riego_api/plants/sensors",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification,
            'plantId': plantaActual.id
        }
    });
    let json = await response.json();
    console.log(json);
    json.forEach(sensores => {
        let sensor = new Sensor(sensores).render();
        console.log(sensor);
        containerInteriorIzquierdo.appendChild(sensor);
    });
}
getSensor();

//Mostrar los Actuadores
const containerInteriorDerecho = document.getElementById('ContainerInteriorDerecho');

async function getActuador(){
    let response = await fetch("http://localhost:8080/sistema_de_riego_api/plants/actuators",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification,
            'plantId': plantaActual.id
        }
    });
    let json = await response.json();
    console.log(json);
    json.forEach(actuadores => {
        let actuador = new Actuador(actuadores).render();
        console.log(actuador);
        containerInteriorDerecho.appendChild(actuador);
    });
}
getActuador();


//Agregar Sensores
const ventanaAgregarSensor = document.getElementById('VentanaAgregarSensor');
const agregarSensorBTN = document.getElementById('AgregarSensorBTN');

const cerrarVentanaAgregarSensorBTN = document.getElementById('CerrarVentanaAgregarSensorBTN');
const agregarVentanaAgregarSensorBTN = document.getElementById('AgregarVentanaAgregarSensorBTN');
const descripcionSensor = document.getElementById('DescripcionSensor');
const tipoSensor = document.getElementById('TipoSensor');

ventanaAgregarSensor.style.display = 'none';

async function getTiposSensor(){

    let response = await fetch("http://localhost:8080/sistema_de_riego_api/types/sensors/all",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification
        }
    });
    let json = await response.json();

    console.log(json);
    let tipoSensor = document.getElementById('TipoSensor');

    json.forEach(tiposSensores => {
        let option = document.createElement('option');
        option.textContent=tiposSensores.model;
        option.setAttribute('value', JSON.stringify(tiposSensores));

        tipoSensor.appendChild(option);
    });
}


const abrirVentanaAgregarSensor = (event) => {
    event.preventDefault();
    ventanaAgregarSensor.style.display = 'block';

    getTiposSensor();

    const agregarSensor = (event) => {
        event.preventDefault();

        let opcionSeleccionada = tipoSensor.value;
        console.log(JSON.parse(opcionSeleccionada));
        let tipoSensorSeleccionado=JSON.parse(opcionSeleccionada);

        let Sensor = {
            description: descripcionSensor.value
        };

        let SensorRequest = {
            sensor: Sensor,
            user: usuario,
            plant: plantaActual,
            sensorType: tipoSensorSeleccionado
        };
        console.log(SensorRequest);

        fetch('http://localhost:8080/sistema_de_riego_api/sensors/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(SensorRequest)
        })
        .then(response => {
            console.log(response); // Imprime la respuesta HTTP en la consola
            return response;
        })
        location.reload();//Pa recargar la pagina
        ventanaAgregarSensor.style.display = 'none';
    };
    agregarVentanaAgregarSensorBTN.addEventListener('click', agregarSensor); 
};

const cerrarVentanaAgregarSensor = (event) => {
    event.preventDefault();
    ventanaAgregarSensor.style.display = 'none';
};

agregarSensorBTN.addEventListener('click', abrirVentanaAgregarSensor); 
cerrarVentanaAgregarSensorBTN.addEventListener('click', cerrarVentanaAgregarSensor); 

//agregar Actuadores
const ventanaAgregarActuador = document.getElementById('VentanaAgregarActuador');
const agregarActuadorBTN = document.getElementById('AgregarActuadorBTN');

const cerrarVentanaAgregarActuadorBTN = document.getElementById('CerrarVentanaAgregarActuadorBTN');
const agregarVentanaAgregarActuadorBTN = document.getElementById('AgregarVentanaAgregarActuadorBTN');
const descripcionActuador = document.getElementById('DescripcionActuador');
const tipoActuador = document.getElementById('TipoActuador');

ventanaAgregarActuador.style.display = 'none';

async function getTiposActuador(){

    let response = await fetch("http://localhost:8080/sistema_de_riego_api/types/actuators/all",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification
        }
    });
    let json = await response.json();

    console.log(json);
    let tipoActuador = document.getElementById('TipoActuador');

    json.forEach(tiposActuador => {
        let option = document.createElement('option');
        option.textContent=tiposActuador.model;
        option.setAttribute('value', JSON.stringify(tiposActuador));

        tipoActuador.appendChild(option);
    });
}

const abrirVentanaAgregarActuador = (event) => {
    event.preventDefault();
    ventanaAgregarActuador.style.display = 'block';

    getTiposActuador();

    const agregarActuador = (event) => {
        event.preventDefault();

        let opcionSeleccionada = tipoActuador.value;
        console.log(JSON.parse(opcionSeleccionada));
        let tipoActuadorSeleccionado=JSON.parse(opcionSeleccionada);

        let Actuador = {
            description: descripcionActuador.value
        };

        let ActuatorRequest = {
            actuator: Actuador,
            user: usuario,
            plant: plantaActual,
            actuatorType: tipoActuadorSeleccionado
        };
        console.log(ActuatorRequest);

        fetch('http://localhost:8080/sistema_de_riego_api/actuators/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ActuatorRequest)
        })
        .then(response => {
            console.log(response); // Imprime la respuesta HTTP en la consola
            return response;
        })
        location.reload();//Pa recargar la pagina
        ventanaAgregarActuador.style.display = 'none';
    };
    agregarVentanaAgregarActuadorBTN.addEventListener('click', agregarActuador); 
};

const cerrarVentanaAgregarActuador = (event) => {
    event.preventDefault();
    ventanaAgregarActuador.style.display = 'none';
};

agregarActuadorBTN.addEventListener('click', abrirVentanaAgregarActuador); 
cerrarVentanaAgregarActuadorBTN.addEventListener('click', cerrarVentanaAgregarActuador);


//Ver Mediciones de un Sensor
const ventanaVerDatosSensor = document.getElementById('VentanaVerDatosSensor');
ventanaVerDatosSensor.style.display = 'none';
const cerrarVentanaVerDatosSensorBTN = document.getElementById('CerrarVentanaVerDatosSensorBTN');

const cerrarVentanaVerDatosSensor = (event) => {
    event.preventDefault();
    ventanaVerDatosSensor.style.display = 'none';
};

cerrarVentanaVerDatosSensorBTN.addEventListener('click', cerrarVentanaVerDatosSensor);

//Ver Activaciones de un actuador
const ventanaVerDatosActuador = document.getElementById('VentanaVerDatosActuador');
ventanaVerDatosActuador.style.display = 'none';
const cerrarVentanaVerDatosActuadorBTN = document.getElementById('CerrarVentanaVerDatosActuadorBTN');

const cerrarVentanaVerDatosActuador = (event) => {
    event.preventDefault();
    ventanaVerDatosActuador.style.display = 'none';
};

cerrarVentanaVerDatosActuadorBTN.addEventListener('click', cerrarVentanaVerDatosActuador);