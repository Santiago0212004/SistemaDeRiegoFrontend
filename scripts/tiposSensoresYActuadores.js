let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
localStorage.setItem('Estado', "TIPOSSENSORESYACTUADORES");


const rectanguloCards = document.getElementById("RectanguloCards");
const zonasBTN = document.getElementById('ZonasBTM');
const usuariosBTN = document.getElementById('UsuariosBTM');
const autorizacionesBTN = document.getElementById('AutorizacionesBTM');
const tiposSyABTM = document.getElementById('TiposSyABTM');
const textoMaster = document.getElementById('textoMaster');

tiposSyABTM.disabled = true;
tiposSyABTM.style.opacity = '0.9'; // Reduce la opacidad
tiposSyABTM.style.cursor = 'not-allowed'; // Cambia el cursor
tiposSyABTM.style.backgroundColor = '#D5D3D0';


const usuarios = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'usuarios.html';
};

const zonas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'zones.html';
};

const autorizaciones = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'autorizaciones.html';
};

usuariosBTN.addEventListener('click', usuarios); 
zonasBTN.addEventListener('click', zonas);
autorizacionesBTN.addEventListener('click', autorizaciones); 


//Mostrar tipos de sensor
const containerInteriorIzquierdo = document.getElementById('ContainerInteriorIzquierdo');

async function getTipoSensor(){
    let response = await fetch("http://localhost:8080/types/sensors/all",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification
        }
    });
    let json = await response.json();
    console.log(json);
    json.forEach(tipoSensores => {
        let tipoSensor = new TipoSensor(tipoSensores).render();
        console.log(tipoSensor);
        containerInteriorIzquierdo.appendChild(tipoSensor);
    });
}
getTipoSensor();

//Mostrar tipos de actuador
const containerInteriorDerecho = document.getElementById('ContainerInteriorDerecho');

async function getTipoActuador(){
    let response = await fetch("http://localhost:8080/types/actuators/all",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification
        }
    });
    let json = await response.json();
    console.log(json);
    json.forEach(tipoActuadores => {
        let tipoActuador = new TipoActuador(tipoActuadores).render();
        console.log(tipoActuador);
        containerInteriorDerecho.appendChild(tipoActuador);
    });
}
getTipoActuador();

//Agregar un tipo de Sensor
const modeloSensor = document.getElementById('modeloSensor');
const unidadesSensor = document.getElementById('unidadesSensor');
const AgregarSensorBTN = document.getElementById('AgregarSensorBTN');

const agregarTipoSensor = (event) => {
    event.preventDefault();
    let TipoSensor = {
        model: modeloSensor.value,
        unit: unidadesSensor.value
    };

    let SensorTypeRequest = {
        user: usuario,
        sensorType: TipoSensor
    };

    console.log(JSON.stringify(SensorTypeRequest));

    fetch('http://localhost:8080/types/sensors/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SensorTypeRequest)
    })
    .then(response => {
        console.log(response); // Imprime la respuesta HTTP en la consola
        return response;
    })
    location.reload();//Pa recargar la pagina
};

AgregarSensorBTN.addEventListener('click', agregarTipoSensor); 



//Agregar un tipo de Actuador
const modeloActuador = document.getElementById('modeloActuador');
const AgregarActuadorBTN = document.getElementById('AgregarActuadorBTN');

const agregarTipoActuador = (event) => {
    event.preventDefault();
    let TipoActuador = {
        model: modeloActuador.value
    };

    let ActuatorTypeRequest = {
        user: usuario,
        actuatorType: TipoActuador
    };

    console.log(JSON.stringify(ActuatorTypeRequest));

    fetch('http://localhost:8080/types/actuators/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ActuatorTypeRequest)
    })
    .then(response => {
        console.log(response); // Imprime la respuesta HTTP en la consola
        return response;
    })
    location.reload();//Pa recargar la pagina
};

AgregarActuadorBTN.addEventListener('click', agregarTipoActuador); 






