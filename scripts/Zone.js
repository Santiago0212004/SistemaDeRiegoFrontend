let usuarioJSON = window.localStorage.getItem("Usuario");
const usuarioMaster = JSON.parse(usuarioJSON);
const authorization=JSON.parse(usuarioJSON).authorization.type;

class Zone{
    constructor(zone){
        this.zone = zone;
    }
    
    render(){
        let estado = window.localStorage.getItem("Estado");

        
        let container = document.createElement('div');
        container.classList.add('Zonecard');
        container.style.width = '400px';
        container.style.height = '340px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');

        //let text = document.createElement('p');
        //text.classList.add('card-text');

        let a = document.createElement('a');
        a.classList.add('btn');
        a.classList.add('btn-primary');
        a.setAttribute('id', 'detallesBTN');

        
        if(authorization=="MASTER"){
            let eliminar = document.createElement('eliminar');
            eliminar.classList.add('btn');
            eliminar.classList.add('btn-primary');
            eliminar.setAttribute('id', 'eliminarBTN');
            
             body.appendChild(eliminar);
             
            eliminar.textContent = "X";

            eliminar.addEventListener('click', e => {
                e.preventDefault();
                
                if(estado=="ZONAS"){
                        //eliminar Zona
                        let zona = {
                            name: this.zone.name,
                            description: this.zone.description,
                            id:this.zone.id
                        };
                        let eliminarZonaRespuesta = {
                            master: usuarioMaster,
                            zone: zona
                        };
                        fetch('http://localhost:8080/zones/delete', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(eliminarZonaRespuesta)
                        })
                        .then(response => {
                            console.log(response); // Imprime la respuesta HTTP en la consola
                            return response;
                        });
                    }else if(estado=="ZONASUSUARIO"){
                        //desenlazar zona de un usuario
                        let jsonUsuarioActual = window.localStorage.getItem("UsuarioActual");
                        const usuarioActual = JSON.parse(jsonUsuarioActual);
        
                        let eliminarEnlaceZonaUsuarioRespuesta = {
                            master: usuarioMaster,
                            user: usuarioActual,
                            zone: this.zone
                        };
                        fetch('http://localhost:8080/zones/unlink', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(eliminarEnlaceZonaUsuarioRespuesta)
                        })
                        .then(response => {
                            console.log(response); // Imprime la respuesta HTTP en la consola
                            return response;
                        });   
                    }
                location.reload();//Pa recargar la pagina
            })
        }

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src','images/imagen1.png')
        img.setAttribute('style','width: 350px; height: 220px;')
        
        container.appendChild(img);
        container.appendChild(body);
        body.appendChild(title);
        //body.appendChild(text);
        if(estado!="ZONASUSUARIO"){
            body.appendChild(a);
        }
        
        

        title.textContent = this.zone.name;
        //text.textContent = this.zone.description;
        a.textContent = "Detalles";
        
        a.addEventListener('click', e => {
            e.preventDefault();
            let json = JSON.stringify(this.zone);
            window.localStorage.setItem('ZonaActual',json);
            if(authorization=="MASTER"){
                location.href = "usuariosZona.html";
            }else if(authorization=="USER"){
                location.href = "plantas.html";
            }
        })
        return container;
    }
}