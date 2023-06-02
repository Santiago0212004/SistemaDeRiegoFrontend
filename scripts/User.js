class User {

    constructor(user) {
        this.user=user;
    }
    render(){
        
        let container = document.createElement('div');
        container.classList.add('Usercard');
        container.style.width = '900px';
        container.style.height = '80px';

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

        container.appendChild(body);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(a);
        
        

        title.textContent = this.user.username;
        text.textContent = this.user.authorization.type;
        a.textContent = "Detalles";
        
        a.addEventListener('click', e => {
            e.preventDefault();

        })
        return container;
    }
}