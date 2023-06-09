class Medida {

    constructor(medida) {
        this.medida=medida;
    }
    render(){

        let container = document.createElement('div');
        container.classList.add('Medidacard');
        container.style.width = '710px';
        container.style.height = '40px';

        let body = document.createElement('div');
        body.classList.add('card-body');

        let id = document.createElement('p');
        id.classList.add('card-title');
        id.setAttribute('id', 'idMedida');

        let title = document.createElement('p');
        title.classList.add('card-title');
        title.setAttribute('id', 'FechaMedida');

        let text = document.createElement('p');
        text.classList.add('card-title');
        text.setAttribute('id', 'Medicion');

        container.appendChild(body);
        body.appendChild(id);
        body.appendChild(title);
        body.appendChild(text);
    
        
        id.textContent = this.medida.id;
        title.textContent = this.medida.date;
        text.textContent = this.medida.value+" "+this.medida.sensor.sensorType.unit;

        return container;
    }
}