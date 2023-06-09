let usuarioJSON = window.localStorage.getItem("Usuario");
const usuarioMaster = JSON.parse(usuarioJSON);
let estado = window.localStorage.getItem("Estado");

class TipoSensor {

    constructor(tipoSensor) {
        this.tipoSensor=tipoSensor;
    }
    render(){

        let container = document.createElement('div');
        container.classList.add('TipoSensorcard');
        container.style.width = '500px';
        container.style.height = '60px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.setAttribute('id', 'NombreTipoSensor');

        let text = document.createElement('p');
        text.classList.add('card-title');
        text.setAttribute('id', 'DescripcionTipoSensor');

        let eliminar = document.createElement('eliminar');
        eliminar.classList.add('btn');
        eliminar.classList.add('btn-primary');
        eliminar.setAttribute('id', 'eliminarBTN');

        container.appendChild(body);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(eliminar);
    

        title.textContent = this.tipoSensor.model;
        text.textContent = this.tipoSensor.unit
        eliminar.textContent = "X";

        eliminar.addEventListener('click', e => {
            e.preventDefault();
            //eliminar tipo de sensor

            let TipoSensor = {
                id: this.tipoSensor.id,
                model: this.tipoSensor.model,
                unit: this.tipoSensor.unit
            };
        
            let SensorTypeRequest = {
                user: usuarioMaster,
                sensorType: TipoSensor
            };

            fetch('http://localhost:8080/sistema_de_riego_api/types/sensors/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SensorTypeRequest)
            })
            .then(response => {
                console.log(response); // Imprime la respuesta HTTP en la consola
                return response;
            });
            location.reload();//Pa recargar la pagina
        })
        return container;
    }
}