let usuarioJSON = window.localStorage.getItem("Usuario");
const usuarioMaster = JSON.parse(usuarioJSON);
class Autorizacion {

    constructor(autorizacion) {
        this.autorizacion=autorizacion;
    }
    render(){
        
        let container = document.createElement('div');
        container.classList.add('Autorizacioncard');
        container.style.width = '900px';
        container.style.height = '80px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.setAttribute('id', 'AutorizacionValue');

        let eliminar = document.createElement('eliminar');
        eliminar.classList.add('btn');
        eliminar.classList.add('btn-primary');
        eliminar.setAttribute('id', 'eliminarBTN');

        container.appendChild(body);
        body.appendChild(title);
        body.appendChild(eliminar);
        
        

        title.textContent = this.autorizacion.value;
        eliminar.textContent = "X";

        eliminar.addEventListener('click', e => {
            e.preventDefault();
            //eliminar autorizacion
            let autorizacion = {
                value: this.autorizacion.value,
                type: "USER"
            };

            let eliminarAutorizacionRespuesta = {
                user: usuarioMaster,
                authorization: autorizacion
            };

            fetch('http://localhost:8080/authorizations/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eliminarAutorizacionRespuesta)
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