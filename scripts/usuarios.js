let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
authorization=usuario.authorization.type;
identification=usuario.identification;

console.log(usuario);
console.log(authorization);
console.log(identification);


const rectanguloCards = document.getElementById("RectanguloCards");
const agregarBTN = document.getElementById('AgregarBTM');
const zonasBTN = document.getElementById('ZonasBTM');
const usuariosBTN = document.getElementById('UsuariosBTM');
const textoMaster = document.getElementById('textoMaster');



usuariosBTN.disabled = true;
usuariosBTN.style.opacity = '0.9'; // Reduce la opacidad
usuariosBTN.style.cursor = 'not-allowed'; // Cambia el cursor
usuariosBTN.style.backgroundColor = '#D5D3D0';

const zonas = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    window.location.href = 'zones.html';
};

zonasBTN.addEventListener('click', zonas);

async function getUsers(){
    let response = await fetch("http://localhost:8080/users/all",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'identification': usuario.identification
        }
    });
    let json = await response.json();
    console.log(json);

    json.forEach(users => {
        let user = new User(users).render();
        console.log(user);
        rectanguloCards.appendChild(user);
    });
}
getUsers();






