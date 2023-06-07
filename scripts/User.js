let usuarioJSON = window.localStorage.getItem("Usuario");
const usuarioMaster = JSON.parse(usuarioJSON);
let estado = window.localStorage.getItem("Estado");

class User {

    constructor(user) {
        this.user=user;
    }
    render(){
        let estado = window.localStorage.getItem("Estado");

        let container = document.createElement('div');
        container.classList.add('Usercard');
        container.style.width = '900px';
        container.style.height = '80px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.setAttribute('id', 'NombreUsuario');

        let text = document.createElement('p');
        text.classList.add('card-title');
        text.setAttribute('id', 'DescripcionUsuario');

        let info = document.createElement('info');
        info.classList.add('btn');
        info.classList.add('btn-primary');
        info.setAttribute('id', 'detallesBTN');

        let eliminar = document.createElement('eliminar');
        eliminar.classList.add('btn');
        eliminar.classList.add('btn-primary');
        eliminar.setAttribute('id', 'eliminarBTN');

        container.appendChild(body);
        body.appendChild(title);
        body.appendChild(text);
        if(estado=="USUARIOS"){
            body.appendChild(info);
            info.textContent = "Detalles";
        }
        body.appendChild(eliminar);
        
        

        title.textContent = this.user.username;
        text.textContent = this.user.identification
        eliminar.textContent = "X";
        

        info.addEventListener('click', e => {
            e.preventDefault();
            let json = JSON.stringify(this.user);
            window.localStorage.setItem('UsuarioActual',json);
            location.href = "zonasUsuario.html";
        })
        eliminar.addEventListener('click', e => {
            e.preventDefault();
            if(estado=="USUARIOS"){
                //eliminar usuario
                let usuario = {
                    username: this.user.username,
                    identification: this.user.identification
                };
                let eliminarUsuarioRespuesta = {
                    master: usuarioMaster,
                    user: usuario
                };
                fetch('http://localhost:8080/users/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eliminarUsuarioRespuesta)
                })
                .then(response => {
                    console.log(response); // Imprime la respuesta HTTP en la consola
                    return response;
                });
            }else if(estado=="USUARIOSZONA"){
                //desenlazar usuario de una zona
                let jsonZonaActual = window.localStorage.getItem("ZonaActual");
                const zonaActual = JSON.parse(jsonZonaActual);

                let eliminarEnlaceUsuarioZonaRespuesta = {
                    master: usuarioMaster,
                    user: this.user,
                    zone: zonaActual
                };
                fetch('http://localhost:8080/zones/unlink', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eliminarEnlaceUsuarioZonaRespuesta)
                })
                .then(response => {
                    console.log(response); // Imprime la respuesta HTTP en la consola
                    return response;
                });
            }
            location.reload();//Pa recargar la pagina
        })
        return container;
    }
}