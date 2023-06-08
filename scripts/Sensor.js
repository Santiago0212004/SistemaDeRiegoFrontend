class Sensor {

    constructor(sensor) {
        this.sensor=sensor;
    }
    render(){

        let container = document.createElement('div');
        container.classList.add('Sensorcard');
        container.style.width = '495px';
        container.style.height = '60px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let id = document.createElement('p');
        id.classList.add('card-title');
        id.setAttribute('id', 'idSensor');

        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.setAttribute('id', 'DescripcionSensorEntrada');

        let text = document.createElement('p');
        text.classList.add('card-title');
        text.setAttribute('id', 'ModeloSensor');

        let text2 = document.createElement('p');
        text2.classList.add('card-title');
        text2.setAttribute('id', 'UnidadesSensor');

        let detalles = document.createElement('detalles');
        detalles.classList.add('btn');
        detalles.classList.add('btn-primary');
        detalles.setAttribute('id', 'detallesBTN');

        let eliminar = document.createElement('eliminar');
        eliminar.classList.add('btn');
        eliminar.classList.add('btn-primary');
        eliminar.setAttribute('id', 'eliminarBTN');

        container.appendChild(body);
        body.appendChild(id);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(text2);
        body.appendChild(detalles);
        body.appendChild(eliminar);
    
        
        id.textContent = this.sensor.id;
        title.textContent = this.sensor.description;
        text.textContent = this.sensor.sensorType.model
        text2.textContent = this.sensor.sensorType.unit
        detalles.textContent = "?";
        eliminar.textContent = "X";

        detalles.addEventListener('click', e => {
            e.preventDefault();
            

            
        })

        eliminar.addEventListener('click', e => {
            e.preventDefault();
            //eliminar sensor

            let SensorRequest = {
                sensor: this.sensor,
                user: usuario,
                plant:plantaActual,
                sensorType: this.sensor.sensorType
            };

            fetch('http://localhost:8080/sensors/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SensorRequest)
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