class Planta{
    constructor(planta){
        this.planta = planta;
    }
    
    render(){

        let container = document.createElement('div');
        container.classList.add('Plantacard');
        container.style.width = '400px';
        container.style.height = '340px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');

        let text = document.createElement('p');
        text.classList.add('card-text');

        let a = document.createElement('a');
        a.classList.add('btn');
        a.classList.add('btn-primary');
        a.setAttribute('id', 'detallesBTN');

        
        let eliminar = document.createElement('eliminar');
        eliminar.classList.add('btn');
        eliminar.classList.add('btn-primary');
        eliminar.setAttribute('id', 'eliminarBTN');
        

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src','images/imagen2.png')
        img.setAttribute('style','width: 350px; height: 220px;')
        
        container.appendChild(img);
        container.appendChild(body);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(a);
        body.appendChild(eliminar);
            
        
        title.textContent = this.planta.name;
        text.textContent = this.planta.description;
        a.textContent = "Detalles";
        eliminar.textContent = "X";
        
        a.addEventListener('click', e => {
            e.preventDefault();
            let json = JSON.stringify(this.planta);
            window.localStorage.setItem('plantaActual',json);
            location.href = "plantaSensoresYActuadores.html";
        })

        eliminar.addEventListener('click', e => {
            e.preventDefault();
            //eliminar Planta
            let plantRequest = {
                user: usuario,
                zone: zonaActual,
                plant: this.planta
            };
            console.log(plantRequest);

            fetch('http://localhost:8080/plants/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plantRequest)
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