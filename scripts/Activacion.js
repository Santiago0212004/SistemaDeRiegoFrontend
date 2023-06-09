class Activacion {

    constructor(activacion) {
        this.activacion=activacion;
    }
    render(){

        let container = document.createElement('div');
        container.classList.add('Activacioncard');
        container.style.width = '600px';
        container.style.height = '40px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let id = document.createElement('h5');
        id.classList.add('card-title');
        id.setAttribute('id', 'idActivacion');

        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.setAttribute('id', 'FechaActivacion');

        let text = document.createElement('p');
        text.classList.add('card-title');
        text.setAttribute('id', 'TipoDeActivacion');

        container.appendChild(body);
        body.appendChild(id);
        body.appendChild(title);
        body.appendChild(text);
    
        
        id.textContent = this.activacion.id;
        title.textContent = this.activacion.activationType.name;
        text.textContent = this.activacion.date;
        
        return container;
    }
}