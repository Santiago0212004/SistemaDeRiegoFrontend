class Actuador {

    constructor(actuador) {
        this.actuador=actuador;
    }
    render(){

        let container = document.createElement('div');
        container.classList.add('Actuadorcard');
        container.style.width = '400px';
        container.style.height = '60px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.setAttribute('id', 'DescripcionActuador');

        let text = document.createElement('p');
        text.classList.add('card-title');
        text.setAttribute('id', 'ModeloActuador');

        let detalles = document.createElement('detalles');
        detalles.classList.add('btn');
        detalles.classList.add('btn-primary');
        detalles.setAttribute('id', 'detallesBTN');

        let eliminar = document.createElement('eliminar');
        eliminar.classList.add('btn');
        eliminar.classList.add('btn-primary');
        eliminar.setAttribute('id', 'eliminarBTN');

        container.appendChild(body);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(eliminar);
    

        title.textContent = this.actuador.description;
        text.textContent = this.actuador.actuatorType.model
        detalles.textContent = "?";
        eliminar.textContent = "X";

        detalles.addEventListener('click', e => {
            e.preventDefault();
            

            
        })

        eliminar.addEventListener('click', e => {
            e.preventDefault();
            //eliminar sensor

            let ActuatorRequest = {
                actuator: this.actuador,
                user: usuario,
                plant:plantaActual,
                actuatorType: this.actuador.actuatorType
            };

            fetch('http://localhost:8080/actuators/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ActuatorRequest)
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