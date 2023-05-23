const Identification = document.getElementById('Identification');
const Password = document.getElementById('Password');
const LogButton = document.getElementById('LogButton');

const login = (event) => {
    event.preventDefault();

    let logRequest = {
        identification: Identification.value,
        password: Password.value,
    };

    console.log(JSON.stringify(logRequest));

    acceso=false;

    fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logRequest)
    })
    .then(response => {
        console.log(response); // Imprime la respuesta HTTP en la consola
        if(response.status=="200"){
            alert("Bienvenido")
            acceso=true;
        }else{
            alert("Verifique la identificación y contraseña")
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Imprime la respuesta en formato JSON en la consola
        // Continúa con el manejo de la respuesta aquí
        user=data;
        localStorage.setItem('Usuario', JSON.stringify(user));

        if(acceso){
            window.location.href = 'Zones.html';
        }
    })
    .catch(error => {
        console.error(error); // Imprime cualquier error en la consola
    });
    //alert("Bienvenido")
};

LogButton.addEventListener('click', login);
