let usuarioJSON = window.localStorage.getItem("Usuario");
authorization=JSON.parse(usuarioJSON).authorization.type;

class Zone{
    constructor(zone){
        this.zone = zone;
    }


    render(){
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

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src','images/imagen1.png')
        img.setAttribute('style','width: 350px; height: 220px;')
        
        container.appendChild(img);
        container.appendChild(body);
        body.appendChild(title);
        //body.appendChild(text);
        body.appendChild(a);
        
        

        title.textContent = this.zone.name;
        //text.textContent = this.zone.description;
        a.textContent = "Detalles";
        
        a.addEventListener('click', e => {
            e.preventDefault();
            let json = JSON.stringify(this.zone);
            window.localStorage.setItem('Zona',json);
            if(authorization=="MASTER"){
                location.href = "agregarUsuario.html";
            }else if(authorization=="USER"){
                location.href = "estadisticaZona.html";
            }
        })
        return container;
    }
}