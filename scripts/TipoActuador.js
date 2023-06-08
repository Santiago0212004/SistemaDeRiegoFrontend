
class TipoActuador {

    constructor(tipoActuador) {
        this.tipoActuador=tipoActuador;
    }
    render(){

        let container = document.createElement('div');
        container.classList.add('TipoActuadorcard');
        container.style.width = '400px';
        container.style.height = '60px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.setAttribute('id', 'NombreTipoActuador');

        let eliminar = document.createElement('eliminar');
        eliminar.classList.add('btn');
        eliminar.classList.add('btn-primary');
        eliminar.setAttribute('id', 'eliminarBTN');

        container.appendChild(body);
        body.appendChild(title);
        body.appendChild(eliminar);
    

        title.textContent = this.tipoActuador.model;
        eliminar.textContent = "X";

        eliminar.addEventListener('click', e => {
            e.preventDefault();
            //eliminar tipo de sensor

            let TipoActuador = {
                id: this.tipoActuador.id,
                model: this.tipoActuador.model
            };
        
            let ActuatorTypeRequest = {
                user: usuarioMaster,
                actuatorType: TipoActuador
            };

            fetch('http://localhost:8080/types/actuators/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ActuatorTypeRequest)
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